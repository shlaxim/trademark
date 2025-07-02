from typing import Any, List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app import models, schemas
from app.api import deps
from app.services.tmview_service import search_tmview
from app.services.euipo_service import search_euipo

router = APIRouter()


@router.get("/tmview", response_model=schemas.TMViewSearchResponse)
def search_tmview_endpoint(
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
        results = search_tmview(
            query=query,
            jurisdiction=jurisdiction,
            nice_classes=nice_classes
        )
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/euipo", response_model=schemas.EUIPOSearchResponse)
def search_euipo_endpoint(
    *,
    query: str = Query(..., description="Search query for trademark"),
    nice_classes: Optional[List[int]] = Query(None, description="Nice classification classes"),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Search for trademarks in EUIPO database.
    """
    try:
        results = search_euipo(
            query=query,
            nice_classes=nice_classes
        )
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/combined", response_model=schemas.CombinedSearchResponse)
def search_combined_endpoint(
    *,
    query: str = Query(..., description="Search query for trademark"),
    jurisdiction: Optional[str] = Query(None, description="Jurisdiction code (country)"),
    nice_classes: Optional[List[int]] = Query(None, description="Nice classification classes"),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Search for trademarks in multiple databases (TMview and EUIPO).
    """
    try:
        # Search in TMview
        tmview_results = search_tmview(
            query=query,
            jurisdiction=jurisdiction,
            nice_classes=nice_classes
        )
        
        # Search in EUIPO if no specific jurisdiction or if jurisdiction is EU
        euipo_results = None
        if not jurisdiction or jurisdiction.upper() == "EU":
            euipo_results = search_euipo(
                query=query,
                nice_classes=nice_classes
            )
        
        return {
            "tmview_results": tmview_results,
            "euipo_results": euipo_results
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))