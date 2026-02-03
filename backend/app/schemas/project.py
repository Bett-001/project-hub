from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ProjectMemberSchema(BaseModel):
    id: int
    name: str
    avatar: Optional[str] = None

    class Config:
        from_attributes = True

class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None
    cohort: str
    github_url: str
    live_url: Optional[str] = None

class ProjectCreate(ProjectBase):
    tech_stack: List[str]
    member_ids: List[int] = []

class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    tech_stack: Optional[List[str]] = None

class ProjectResponse(ProjectBase):
    id: int
    owner_id: int
    tech_stack: List[str]
    members: List[ProjectMemberSchema]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
