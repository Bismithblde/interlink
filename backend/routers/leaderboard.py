from fastapi import APIRouter, HTTPException, Depends
from typing import List

router = APIRouter(
    prefix="/leaderboard",
    tags=["leaderboard"]
)

@router.get("/")
async def get_leaderboard():
    return {"message": "Leaderboard data"}