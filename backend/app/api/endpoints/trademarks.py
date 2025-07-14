from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps

router = APIRouter()


@router.get("/", response_model=List[schemas.Trademark])
def read_trademarks(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve trademarks.
    """
    if crud.user.is_superuser(current_user):
        trademarks = crud.trademark.get_multi(db, skip=skip, limit=limit)
    else:
        trademarks = crud.trademark.get_by_owner(
            db=db, owner_id=current_user.id, skip=skip, limit=limit
        )
    return trademarks


@router.post("/", response_model=schemas.Trademark)
def create_trademark(
    *,
    db: Session = Depends(deps.get_db),
    trademark_in: schemas.TrademarkCreate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Create new trademark.
    """
    trademark = crud.trademark.create_with_owner(
        db=db, obj_in=trademark_in, owner_id=current_user.id
    )
    return trademark


@router.get("/{id}", response_model=schemas.Trademark)
def read_trademark(
    *,
    db: Session = Depends(deps.get_db),
    id: str,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get trademark by ID.
    """
    trademark = crud.trademark.get(db=db, id=id)
    if not trademark:
        raise HTTPException(status_code=404, detail="Trademark not found")
    if not crud.user.is_superuser(current_user) and (trademark.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    return trademark


@router.put("/{id}", response_model=schemas.Trademark)
def update_trademark(
    *,
    db: Session = Depends(deps.get_db),
    id: str,
    trademark_in: schemas.TrademarkUpdate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Update a trademark.
    """
    trademark = crud.trademark.get(db=db, id=id)
    if not trademark:
        raise HTTPException(status_code=404, detail="Trademark not found")
    if not crud.user.is_superuser(current_user) and (trademark.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    trademark = crud.trademark.update(db=db, db_obj=trademark, obj_in=trademark_in)
    return trademark


@router.delete("/{id}", response_model=schemas.Trademark)
def delete_trademark(
    *,
    db: Session = Depends(deps.get_db),
    id: str,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Delete a trademark.
    """
    trademark = crud.trademark.get(db=db, id=id)
    if not trademark:
        raise HTTPException(status_code=404, detail="Trademark not found")
    if not crud.user.is_superuser(current_user) and (trademark.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    trademark = crud.trademark.remove(db=db, id=id)
    return trademark


@router.post("/{id}/upload-image", response_model=schemas.Trademark)
def upload_trademark_image(
    *,
    db: Session = Depends(deps.get_db),
    id: str,
    file: UploadFile = File(...),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Upload an image for a figurative trademark.
    """
    trademark = crud.trademark.get(db=db, id=id)
    if not trademark:
        raise HTTPException(status_code=404, detail="Trademark not found")
    if not crud.user.is_superuser(current_user) and (trademark.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    
    # Handle file upload logic here
    # This is a placeholder for actual file upload implementation
    image_url = f"/static/trademarks/{id}/{file.filename}"
    
    trademark_in = schemas.TrademarkUpdate(image_url=image_url)
    trademark = crud.trademark.update(db=db, db_obj=trademark, obj_in=trademark_in)
    return trademark