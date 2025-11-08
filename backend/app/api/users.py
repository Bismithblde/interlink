from fastapi import APIRouter, HTTPException
from app.schemas.user import UserProfileUpdate, UserProfileResponse
from app.services.supabase import get_supabase
from typing import Any

router = APIRouter()

@router.post("/{user_id}/profile", response_model=UserProfileResponse)
async def update_user_profile(user_id: str, profile_data: UserProfileUpdate) -> Any:
    try:
        supabase = get_supabase()
        
        print(f"Updating profile for user: {user_id}")
        print(f"Profile data: {profile_data}")
        
        # Convert class schedule to dict format
        schedule_data = [schedule.dict() for schedule in profile_data.classSchedule]
        
        profile_dict = {
            "id": user_id,
            "age": profile_data.age,
            "gender": profile_data.gender,
            "major": profile_data.major,
            "hobbies": profile_data.hobbies,
            "class_schedule": schedule_data,
        }
        
        print(f"Attempting to upsert: {profile_dict}")
        
        # Update user profile in Supabase
        response = supabase.table("profiles").upsert(profile_dict).execute()
        
        print(f"Supabase response: {response}")
        
        if not response.data:
            raise HTTPException(
                status_code=400,
                detail="Failed to update profile - no data returned"
            )
        
        # Get user email from auth
        try:
            user = supabase.auth.admin.get_user_by_id(user_id)
            email = user.user.email if user.user else ""
        except Exception as e:
            print(f"Could not get user email: {e}")
            email = ""
        
        return {
            "id": user_id,
            "email": email,
            "age": profile_data.age,
            "gender": profile_data.gender,
            "major": profile_data.major,
            "hobbies": profile_data.hobbies,
            "classSchedule": profile_data.classSchedule,
        }
    except HTTPException:
        raise
    except Exception as e:
        error_msg = str(e)
        print(f"Profile update error: {error_msg}")
        print(f"Error type: {type(e)}")
        raise HTTPException(
            status_code=400,
            detail=f"Failed to update profile: {error_msg}"
        )

@router.get("/{user_id}/profile", response_model=UserProfileResponse)
async def get_user_profile(user_id: str) -> Any:
    try:
        supabase = get_supabase()
        
        # Get profile from Supabase
        response = supabase.table("profiles").select("*").eq("id", user_id).execute()
        
        if not response.data or len(response.data) == 0:
            raise HTTPException(
                status_code=404,
                detail="Profile not found"
            )
        
        profile = response.data[0]
        
        # Get user email
        user = supabase.auth.admin.get_user_by_id(user_id)
        
        return {
            "id": user_id,
            "email": user.user.email if user.user else "",
            "age": profile.get("age"),
            "gender": profile.get("gender"),
            "major": profile.get("major"),
            "hobbies": profile.get("hobbies"),
            "classSchedule": profile.get("class_schedule", []),
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Get profile error: {str(e)}")
        raise HTTPException(
            status_code=400,
            detail=f"Failed to get profile: {str(e)}"
        )
