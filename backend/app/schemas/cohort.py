from pydantic import BaseModel
from datetime import date

class CohortBase(BaseModel):
    name: str
    start_date: date
    end_date: date

class CohortCreate(CohortBase):
    pass

class CohortResponse(CohortBase):
    id: int

    class Config:
        from_attributes = True
