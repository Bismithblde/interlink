from fastapi import APIRouter, HTTPException, Depends
from typing import List

router = APIRouter(
    prefix="/friends",
    tags=["friends"]
)

@router.get("/")
async def get_friends():
    return {"message": "List of friends"}