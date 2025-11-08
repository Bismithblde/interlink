from fastapi import APIRouter, HTTPException, Depends
from app.schemas.auth import UserAuth, UserResponse, TokenResponse
from app.services.supabase import get_supabase
from typing import Any

router = APIRouter()

@router.post("/signup", response_model=UserResponse)
async def signup(user_data: UserAuth) -> Any:
    try:
        supabase = get_supabase()
        auth_response = supabase.auth.sign_up({
            "email": user_data.email,
            "password": user_data.password
        })
        
        if auth_response.user is None:
            raise HTTPException(
                status_code=400,
                detail="Failed to create user"
            )
            
        return {
            "id": auth_response.user.id,
            "email": auth_response.user.email
        }
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

@router.post("/login", response_model=TokenResponse)
async def login(user_data: UserAuth) -> Any:
    try:
        supabase = get_supabase()
        auth_response = supabase.auth.sign_in_with_password({
            "email": user_data.email,
            "password": user_data.password
        })
        
        if auth_response.session is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid credentials"
            )
            
        return {
            "access_token": auth_response.session.access_token,
            "token_type": "bearer"
        }
    except Exception as e:
        raise HTTPException(
            status_code=401,
            detail="Authentication failed"
        )