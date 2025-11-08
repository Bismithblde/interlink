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
        
        if not auth_response.user:
            raise HTTPException(
                status_code=400,
                detail="Failed to create user"
            )
        
        # Check if email confirmation is required
        if auth_response.user.email and not auth_response.user.confirmed_at:
            print(f"User created but needs email confirmation: {user_data.email}")
            
        return {
            "id": auth_response.user.id,
            "email": auth_response.user.email
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Signup error: {str(e)}")
        raise HTTPException(
            status_code=400,
            detail=f"Signup failed: {str(e)}"
        )

@router.post("/login", response_model=TokenResponse)
async def login(user_data: UserAuth) -> Any:
    try:
        supabase = get_supabase()
        
        # Try to sign in
        auth_response = supabase.auth.sign_in_with_password({
            "email": user_data.email,
            "password": user_data.password
        })
        
        # Check if session exists
        if not auth_response.session or not auth_response.session.access_token:
            raise HTTPException(
                status_code=401,
                detail="Invalid email or password"
            )
            
        return {
            "access_token": auth_response.session.access_token,
            "token_type": "bearer"
        }
    except HTTPException:
        raise
    except Exception as e:
        error_msg = str(e)
        print(f"Login error: {error_msg}")
        
        # If email not confirmed, give clear instructions
        if "Email not confirmed" in error_msg or "not confirmed" in error_msg.lower():
            raise HTTPException(
                status_code=401,
                detail="Email not confirmed. Please delete this user from Supabase dashboard and sign up again with email confirmation disabled."
            )
        
        raise HTTPException(
            status_code=401,
            detail=f"Authentication failed: {error_msg}"
        )