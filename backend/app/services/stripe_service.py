from typing import Dict, List, Optional, Any
import stripe

from app.core.config import settings

# Initialize Stripe with API key
stripe.api_key = settings.STRIPE_API_KEY


def create_payment_intent(
    amount: float,
    currency: str = "usd",
    payment_method_types: Optional[List[str]] = None,
    metadata: Optional[Dict[str, str]] = None
) -> Any:
    """
    Create a payment intent with Stripe.
    
    Args:
        amount: Amount to charge (in the smallest currency unit, e.g., cents for USD)
        currency: Three-letter ISO currency code
        payment_method_types: List of payment method types to include
        metadata: Additional metadata to attach to the payment intent
    
    Returns:
        Stripe PaymentIntent object
    """
    # Convert amount to cents/smallest currency unit
    amount_in_cents = int(amount * 100)
    
    # Set default payment method types if not provided
    if payment_method_types is None:
        payment_method_types = ["card"]
    
    # Create the payment intent
    payment_intent = stripe.PaymentIntent.create(
        amount=amount_in_cents,
        currency=currency,
        payment_method_types=payment_method_types,
        metadata=metadata
    )
    
    return payment_intent


def confirm_payment_intent(
    payment_intent_id: str,
    payment_method_id: str
) -> Any:
    """
    Confirm a payment intent with a specific payment method.
    
    Args:
        payment_intent_id: The ID of the payment intent to confirm
        payment_method_id: The ID of the payment method to use
    
    Returns:
        Updated Stripe PaymentIntent object
    """
    payment_intent = stripe.PaymentIntent.confirm(
        payment_intent_id,
        payment_method=payment_method_id
    )
    
    return payment_intent


def create_webhook_event(payload: bytes, signature: str) -> Any:
    """
    Construct a Stripe event from webhook payload.
    
    Args:
        payload: The request body from the webhook
        signature: The Stripe-Signature header
    
    Returns:
        Stripe Event object
    """
    event = stripe.Webhook.construct_event(
        payload=payload,
        sig_header=signature,
        secret=settings.STRIPE_WEBHOOK_SECRET
    )
    
    return event