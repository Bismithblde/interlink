from pydantic import BaseModel
from typing import List, Optional

class ClassSchedule(BaseModel):
    day: str
    startTime: str
    endTime: str
    courseName: Optional[str] = None

class UserProfileUpdate(BaseModel):
    age: int
    gender: str
    major: str
    hobbies: List[str]
    classSchedule: List[ClassSchedule] = []

class UserProfileResponse(BaseModel):
    id: str
    email: str
    age: Optional[int] = None
    gender: Optional[str] = None
    major: Optional[str] = None
    hobbies: Optional[List[str]] = None
    classSchedule: Optional[List[ClassSchedule]] = None
