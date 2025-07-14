from sqlalchemy import Column, String, DateTime, ForeignKey, Float, Enum, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum

from app.db.base_class import Base


class PaymentStatus(str, enum.Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"
    REFUNDED = "refunded"


class PaymentType(str, enum.Enum):
    FILING_FEE = "filing_fee"
    REGISTRATION_FEE = "registration_fee"
    RENEWAL_FEE = "renewal_fee"
    OTHER = "other"


class Payment(Base):
    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("user.id"), nullable=False)
    trademark_id = Column(String, ForeignKey("trademark.id"), nullable=False)
    amount = Column(Float, nullable=False)
    currency = Column(String, default="USD")
    status = Column(Enum(PaymentStatus), default=PaymentStatus.PENDING)
    type = Column(Enum(PaymentType), nullable=False)
    stripe_payment_intent_id = Column(String)
    stripe_payment_method_id = Column(String)
    description = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="payments")
    trademark = relationship("Trademark", back_populates="payments")