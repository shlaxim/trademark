from sqlalchemy import Column, String, DateTime, ForeignKey, Text, Enum, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum

from app.db.base_class import Base


class TrademarkStatus(str, enum.Enum):
    DRAFT = "draft"
    SUBMITTED = "submitted"
    UNDER_EXAMINATION = "under_examination"
    PUBLISHED = "published"
    REGISTERED = "registered"
    REJECTED = "rejected"
    ABANDONED = "abandoned"
    EXPIRED = "expired"


class TrademarkType(str, enum.Enum):
    WORD = "word"
    FIGURATIVE = "figurative"
    COMBINED = "combined"
    THREE_DIMENSIONAL = "three_dimensional"
    SOUND = "sound"
    COLOR = "color"
    OTHER = "other"


class Trademark(Base):
    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    description = Column(Text)
    type = Column(Enum(TrademarkType), nullable=False)
    status = Column(Enum(TrademarkStatus), default=TrademarkStatus.DRAFT)
    owner_id = Column(String, ForeignKey("user.id"), nullable=False)
    application_number = Column(String, index=True)
    registration_number = Column(String, index=True)
    filing_date = Column(DateTime(timezone=True))
    registration_date = Column(DateTime(timezone=True))
    expiration_date = Column(DateTime(timezone=True))
    nice_classes = Column(JSON)  # Store selected Nice classification classes
    goods_services = Column(Text)  # Description of goods and services
    jurisdiction = Column(String, nullable=False)  # Country or region code
    image_url = Column(String)  # For figurative marks
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    owner = relationship("User", back_populates="trademarks")
    payments = relationship("Payment", back_populates="trademark")
    documents = relationship("Document", back_populates="trademark")