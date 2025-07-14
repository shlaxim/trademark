from sqlalchemy import Column, String, DateTime, ForeignKey, Text, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum

from app.db.base_class import Base


class DocumentType(str, enum.Enum):
    APPLICATION = "application"
    CERTIFICATE = "certificate"
    OFFICE_ACTION = "office_action"
    RESPONSE = "response"
    RENEWAL = "renewal"
    ASSIGNMENT = "assignment"
    OTHER = "other"


class Document(Base):
    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("user.id"), nullable=False)
    trademark_id = Column(String, ForeignKey("trademark.id"), nullable=True)
    type = Column(Enum(DocumentType), nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text)
    file_path = Column(String, nullable=False)
    file_name = Column(String, nullable=False)
    file_size = Column(String)
    file_type = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="documents")
    trademark = relationship("Trademark", back_populates="documents")