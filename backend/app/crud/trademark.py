from typing import Any, Dict, List, Optional, Union
import uuid

from sqlalchemy.orm import Session
from sqlalchemy import and_, or_

from app.crud.base import CRUDBase
from app.models.trademark import Trademark, TrademarkStatus, TrademarkType
from app.schemas.trademark import TrademarkCreate, TrademarkUpdate, TrademarkSearchQuery


class CRUDTrademark(CRUDBase[Trademark, TrademarkCreate, TrademarkUpdate]):
    def create_with_owner(
        self, db: Session, *, obj_in: TrademarkCreate, owner_id: str
    ) -> Trademark:
        obj_in_data = obj_in.dict()
        db_obj = self.model(
            id=str(uuid.uuid4()),
            owner_id=owner_id,
            **obj_in_data,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_by_owner(
        self, db: Session, *, owner_id: str, skip: int = 0, limit: int = 100
    ) -> List[Trademark]:
        return (
            db.query(self.model)
            .filter(Trademark.owner_id == owner_id)
            .offset(skip)
            .limit(limit)
            .all()
        )

    def get_by_application_number(
        self, db: Session, *, application_number: str
    ) -> Optional[Trademark]:
        return (
            db.query(self.model)
            .filter(Trademark.application_number == application_number)
            .first()
        )

    def get_by_registration_number(
        self, db: Session, *, registration_number: str
    ) -> Optional[Trademark]:
        return (
            db.query(self.model)
            .filter(Trademark.registration_number == registration_number)
            .first()
        )

    def search_local(
        self, db: Session, *, search_query: TrademarkSearchQuery, skip: int = 0, limit: int = 100
    ) -> List[Trademark]:
        """Search local trademark database"""
        query = db.query(self.model)
        
        # Filter by name (case-insensitive partial match)
        if search_query.query:
            query = query.filter(
                Trademark.name.ilike(f"%{search_query.query}%")
            )
        
        # Filter by jurisdiction
        if search_query.jurisdiction:
            query = query.filter(Trademark.jurisdiction == search_query.jurisdiction)
        
        # Filter by Nice classes
        if search_query.nice_classes:
            # Check if any of the requested classes are in the trademark's nice_classes JSON array
            for nice_class in search_query.nice_classes:
                query = query.filter(
                    Trademark.nice_classes.op('?')(str(nice_class))
                )
        
        # Filter by trademark type
        if search_query.trademark_type:
            query = query.filter(Trademark.type == search_query.trademark_type)
        
        # Filter by status
        if search_query.status:
            query = query.filter(Trademark.status == search_query.status)
        
        return query.offset(skip).limit(limit).all()

    def get_by_status(
        self, db: Session, *, status: TrademarkStatus, skip: int = 0, limit: int = 100
    ) -> List[Trademark]:
        return (
            db.query(self.model)
            .filter(Trademark.status == status)
            .offset(skip)
            .limit(limit)
            .all()
        )

    def get_by_jurisdiction(
        self, db: Session, *, jurisdiction: str, skip: int = 0, limit: int = 100
    ) -> List[Trademark]:
        return (
            db.query(self.model)
            .filter(Trademark.jurisdiction == jurisdiction)
            .offset(skip)
            .limit(limit)
            .all()
        )

    def get_expiring_soon(
        self, db: Session, *, days: int = 90, skip: int = 0, limit: int = 100
    ) -> List[Trademark]:
        """Get trademarks expiring within specified number of days"""
        from datetime import datetime, timedelta
        expiration_threshold = datetime.utcnow() + timedelta(days=days)
        
        return (
            db.query(self.model)
            .filter(
                and_(
                    Trademark.expiration_date.is_not(None),
                    Trademark.expiration_date <= expiration_threshold,
                    Trademark.status == TrademarkStatus.REGISTERED
                )
            )
            .offset(skip)
            .limit(limit)
            .all()
        )

    def update_status(
        self, db: Session, *, db_obj: Trademark, status: TrademarkStatus
    ) -> Trademark:
        db_obj.status = status
        if status == TrademarkStatus.REGISTERED:
            from datetime import datetime
            db_obj.registration_date = datetime.utcnow()
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj


trademark = CRUDTrademark(Trademark)