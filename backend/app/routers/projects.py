from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from ..database import get_db
from ..models import Project, ProjectMember, ProjectTech, User
from ..schemas import ProjectCreate, ProjectUpdate, ProjectResponse
from ..utils.auth import get_current_user

router = APIRouter(prefix="/api/projects", tags=["projects"])

@router.get("")
def get_projects(cohort: Optional[str] = None, tech: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Project)
    if cohort:
        query = query.filter(Project.cohort == cohort)
    if tech:
        query = query.join(ProjectTech).filter(ProjectTech.tech_name == tech)
    
    projects = query.all()
    return [format_project(p, db) for p in projects]

@router.post("")
def create_project(project: ProjectCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_project = Project(
        name=project.name,
        description=project.description,
        cohort=project.cohort,
        github_url=project.github_url,
        live_url=project.live_url,
        owner_id=current_user.id
    )
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    
    for tech in project.tech_stack:
        db.add(ProjectTech(project_id=db_project.id, tech_name=tech))
    
    for member_id in project.member_ids:
        db.add(ProjectMember(project_id=db_project.id, user_id=member_id))
    
    db.commit()
    return format_project(db_project, db)

@router.get("/{project_id}")
def get_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return format_project(project, db)

@router.put("/{project_id}")
def update_project(project_id: int, project_update: ProjectUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    if project.owner_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    for key, value in project_update.dict(exclude_unset=True).items():
        if key == "tech_stack" and value:
            db.query(ProjectTech).filter(ProjectTech.project_id == project_id).delete()
            for tech in value:
                db.add(ProjectTech(project_id=project_id, tech_name=tech))
        else:
            setattr(project, key, value)
    
    db.commit()
    db.refresh(project)
    return format_project(project, db)

@router.delete("/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    if project.owner_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    db.delete(project)
    db.commit()
    return {"message": "Project deleted"}

def format_project(project: Project, db: Session):
    tech_stack = [t.tech_name for t in db.query(ProjectTech).filter(ProjectTech.project_id == project.id).all()]
    members = db.query(User).join(ProjectMember).filter(ProjectMember.project_id == project.id).all()
    
    return {
        **project.__dict__,
        "tech_stack": tech_stack,
        "members": [{"id": m.id, "name": m.name, "avatar": m.avatar} for m in members]
    }
