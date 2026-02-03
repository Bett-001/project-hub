from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from ..database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, default="student")
    cohort = Column(String, nullable=True)
    avatar = Column(String, nullable=True)

    projects = relationship("Project", back_populates="owner")
    project_members = relationship("ProjectMember", back_populates="user")
