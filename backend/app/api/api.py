from fastapi import APIRouter

from app.api.endpoints import users, auth, trademarks, payments, search

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(trademarks.router, prefix="/trademarks", tags=["trademarks"])
api_router.include_router(payments.router, prefix="/payments", tags=["payments"])
api_router.include_router(search.router, prefix="/search", tags=["search"])