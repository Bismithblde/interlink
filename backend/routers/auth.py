from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

router = APIRouter(
    prefix="/auth",
    tags=["authentication"]
)

@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    return {"message": "Login endpoint"}

@router.post("/register")
async def register():
    return {"message": "Register endpoint"}