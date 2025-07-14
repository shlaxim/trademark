from typing import Any, List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app import models, schemas, crud
from app.api import deps
from app.services.tmview_service import search_tmview
from app.schemas.trademark import TrademarkSearchQuery, TrademarkSearchResponse

router = APIRouter()


@router.get("/tmview", response_model=TrademarkSearchResponse)
async def search_tmview_endpoint(
    *,
    query: str = Query(..., description="Search query for trademark"),
    jurisdiction: Optional[str] = Query(None, description="Jurisdiction code (country)"),
    nice_classes: Optional[List[int]] = Query(None, description="Nice classification classes"),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Search for trademarks in TMview database.
    """
    try:
        results = await search_tmview(
            query=query,
            jurisdiction=jurisdiction,
            nice_classes=nice_classes
        )
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/local", response_model=TrademarkSearchResponse)
def search_local_endpoint(
    *,
    query: str = Query(..., description="Search query for trademark"),
    jurisdiction: Optional[str] = Query(None, description="Jurisdiction code (country)"),
    nice_classes: Optional[List[int]] = Query(None, description="Nice classification classes"),
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Search for trademarks in local database.
    """
    try:
        search_query = TrademarkSearchQuery(
            query=query,
            jurisdiction=jurisdiction,
            nice_classes=nice_classes
        )
        
        results = crud.trademark.search_local(db=db, search_query=search_query)
        
        # Convert database results to search response format
        search_results = []
        for tm in results:
            search_results.append(schemas.TrademarkSearchResult(
                id=tm.id,
                name=tm.name,
                description=tm.description,
                type=tm.type,
                status=tm.status,
                jurisdiction=tm.jurisdiction,
                nice_classes=tm.nice_classes,
                goods_services=tm.goods_services,
                application_number=tm.application_number,
                registration_number=tm.registration_number,
                filing_date=tm.filing_date,
                registration_date=tm.registration_date,
                similarity_score=1.0,  # Would calculate actual similarity
                source="Local"
            ))
        
        return TrademarkSearchResponse(
            results=search_results,
            total_results=len(search_results),
            query=query,
            jurisdiction=jurisdiction,
            nice_classes=nice_classes
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/combined", response_model=dict)
async def search_combined_endpoint(
    *,
    query: str = Query(..., description="Search query for trademark"),
    jurisdiction: Optional[str] = Query(None, description="Jurisdiction code (country)"),
    nice_classes: Optional[List[int]] = Query(None, description="Nice classification classes"),
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Search for trademarks in multiple databases (local and TMview).
    """
    try:
        # Search in local database
        search_query = TrademarkSearchQuery(
            query=query,
            jurisdiction=jurisdiction,
            nice_classes=nice_classes
        )
        
        local_results = crud.trademark.search_local(db=db, search_query=search_query)
        local_search_results = []
        for tm in local_results:
            local_search_results.append(schemas.TrademarkSearchResult(
                id=tm.id,
                name=tm.name,
                description=tm.description,
                type=tm.type,
                status=tm.status,
                jurisdiction=tm.jurisdiction,
                nice_classes=tm.nice_classes,
                goods_services=tm.goods_services,
                application_number=tm.application_number,
                registration_number=tm.registration_number,
                filing_date=tm.filing_date,
                registration_date=tm.registration_date,
                similarity_score=1.0,
                source="Local"
            ))
        
        # Search in TMview
        tmview_results = await search_tmview(
            query=query,
            jurisdiction=jurisdiction,
            nice_classes=nice_classes
        )
        
        return {
            "local_results": TrademarkSearchResponse(
                results=local_search_results,
                total_results=len(local_search_results),
                query=query,
                jurisdiction=jurisdiction,
                nice_classes=nice_classes
            ),
            "tmview_results": tmview_results,
            "summary": {
                "total_local": len(local_search_results),
                "total_tmview": tmview_results.total_results,
                "total_combined": len(local_search_results) + tmview_results.total_results
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))