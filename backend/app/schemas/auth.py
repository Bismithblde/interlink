from pydantic import BaseModel, EmailStr

class UserAuth(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    email: EmailStr
    
class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"