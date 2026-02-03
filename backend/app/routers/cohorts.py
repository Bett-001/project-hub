from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import Cohort, User
from ..schemas import CohortCreate, CohortResponse
from ..utils.auth import require_admin

router = APIRouter(prefix="/api/cohorts", tags=["cohorts"])

@router.get("", response_model=List[CohortResponse])
def get_cohorts(db: Session = Depends(get_db)):
    return db.query(Cohort).all()

@router.post("", response_model=CohortResponse)
def create_cohort(cohort: CohortCreate, db: Session = Depends(get_db), admin: User = Depends(require_admin)):
    if db.query(Cohort).filter(Cohort.name == cohort.name).first():
        raise HTTPException(status_code=400, detail="Cohort already exists")
    
    db_cohort = Cohort(**cohort.dict())
    db.add(db_cohort)
    db.commit()
    db.refresh(db_cohort)
    return db_cohort

@router.delete("/{cohort_id}")
def delete_cohort(cohort_id: int, db: Session = Depends(get_db), admin: User = Depends(require_admin)):
    cohort = db.query(Cohort).filter(Cohort.id == cohort_id).first()
    if not cohort:
        raise HTTPException(status_code=404, detail="Cohort not found")
    
    db.delete(cohort)
    db.commit()
    return {"message": "Cohort deleted"}
