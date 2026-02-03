from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import User
from ..schemas import UserResponse
from ..utils.auth import get_current_user

router = APIRouter(prefix="/api/users", tags=["users"])

@router.get("/me", response_model=UserResponse)
def get_current_user_info(current_user: User = Depends(get_current_user)):
    return current_user

@router.get("", response_model=List[UserResponse])
def get_users(cohort: str = None, db: Session = Depends(get_db)):
    query = db.query(User).filter(User.role == "student")
    if cohort:
        query = query.filter(User.cohort == cohort)
    return query.all()

@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    return db.query(User).filter(User.id == user_id).first()
