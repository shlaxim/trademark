from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
from app.services.stripe_service import create_payment_intent, confirm_payment_intent

router = APIRouter()


@router.get("/", response_model=List[schemas.Payment])
def read_payments(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve payments.
    """
    if crud.user.is_superuser(current_user):
        payments = crud.payment.get_multi(db, skip=skip, limit=limit)
    else:
        payments = crud.payment.get_multi_by_user(
            db=db, user_id=current_user.id, skip=skip, limit=limit
        )
    return payments


@router.post("/create-intent", response_model=schemas.PaymentIntentResponse)
def create_payment_intent_endpoint(
    *,
    db: Session = Depends(deps.get_db),
    payment_intent_in: schemas.PaymentIntentCreate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Create a payment intent with Stripe.
    """
    # Check if the trademark exists and belongs to the user
    trademark = crud.trademark.get(db=db, id=payment_intent_in.trademark_id)
    if not trademark:
        raise HTTPException(status_code=404, detail="Trademark not found")
    if trademark.owner_id != current_user.id:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    
    # Create payment intent with Stripe
    try:
        payment_intent = create_payment_intent(
            amount=payment_intent_in.amount,
            currency=payment_intent_in.currency,
            payment_method_types=["card"],
            metadata={
                "trademark_id": payment_intent_in.trademark_id,
                "user_id": current_user.id,
                "payment_type": payment_intent_in.type
            }
        )
        
        # Create payment record in database
        payment_in = schemas.PaymentCreate(
            user_id=current_user.id,
            trademark_id=payment_intent_in.trademark_id,
            amount=payment_intent_in.amount,
            currency=payment_intent_in.currency,
            type=payment_intent_in.type,
            stripe_payment_intent_id=payment_intent.id,
            description=payment_intent_in.description
        )
        payment = crud.payment.create(db=db, obj_in=payment_in)
        
        return {
            "client_secret": payment_intent.client_secret,
            "payment_id": payment.id
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/confirm/{payment_id}", response_model=schemas.Payment)
def confirm_payment(
    *,
    db: Session = Depends(deps.get_db),
    payment_id: str,
    payment_confirm: schemas.PaymentConfirm,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Confirm a payment after client-side confirmation.
    """
    payment = crud.payment.get(db=db, id=payment_id)
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    if payment.user_id != current_user.id:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    
    try:
        # Confirm payment with Stripe
        confirm_payment_intent(
            payment_intent_id=payment.stripe_payment_intent_id,
            payment_method_id=payment_confirm.payment_method_id
        )
        
        # Update payment status in database
        payment_in = schemas.PaymentUpdate(
            status="completed",
            stripe_payment_method_id=payment_confirm.payment_method_id
        )
        payment = crud.payment.update(db=db, db_obj=payment, obj_in=payment_in)
        
        return payment
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))