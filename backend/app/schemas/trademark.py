from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel

from app.models.trademark import TrademarkStatus, TrademarkType


class TrademarkBase(BaseModel):
    name: str
    description: Optional[str] = None
    type: TrademarkType
    nice_classes: Optional[List[int]] = None
    goods_services: Optional[str] = None
    jurisdiction: str
    image_url: Optional[str] = None


class TrademarkCreate(TrademarkBase):
    pass


class TrademarkUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    type: Optional[TrademarkType] = None
    nice_classes: Optional[List[int]] = None
    goods_services: Optional[str] = None
    jurisdiction: Optional[str] = None
    image_url: Optional[str] = None
    status: Optional[TrademarkStatus] = None


class TrademarkInDBBase(TrademarkBase):
    id: str
    status: TrademarkStatus
    owner_id: str
    application_number: Optional[str] = None
    registration_number: Optional[str] = None
    filing_date: Optional[datetime] = None
    registration_date: Optional[datetime] = None
    expiration_date: Optional[datetime] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class Trademark(TrademarkInDBBase):
    pass


class TrademarkInDB(TrademarkInDBBase):
    pass


# Search related schemas
class TrademarkSearchQuery(BaseModel):
    query: str
    jurisdiction: Optional[str] = None
    nice_classes: Optional[List[int]] = None
    trademark_type: Optional[TrademarkType] = None
    status: Optional[TrademarkStatus] = None


class TrademarkSearchResult(BaseModel):
    id: Optional[str] = None
    name: str
    description: Optional[str] = None
    type: TrademarkType
    status: TrademarkStatus
    jurisdiction: str
    nice_classes: Optional[List[int]] = None
    goods_services: Optional[str] = None
    application_number: Optional[str] = None
    registration_number: Optional[str] = None
    filing_date: Optional[datetime] = None
    registration_date: Optional[datetime] = None
    similarity_score: Optional[float] = None  # For search relevance
    source: str  # e.g., "TMview", "EUIPO", "Local"
    

class TrademarkSearchResponse(BaseModel):
    results: List[TrademarkSearchResult]
    total_results: int
    query: str
    jurisdiction: Optional[str] = None
    nice_classes: Optional[List[int]] = None