from fastapi import APIRouter, HTTPException, Depends
from typing import List

router = APIRouter(
    prefix="/users",
    tags=["users"]
)

@router.get("/")
async def get_users():
    return {"message": "List of users"}