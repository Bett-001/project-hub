from app.database import SessionLocal
from app.models.project import Project, ProjectTech
from datetime import datetime

db = SessionLocal()

projects_data = [
    {
        "name": "SafariPay",
        "description": "A mobile payment solution for seamless M-Pesa integration with e-commerce platforms.",
        "github_url": "https://github.com/moringa/safaripay",
        "live_url": "https://safaripay.demo.com",
        "tech_stack": ["React", "Python", "Flask", "PostgreSQL"],
        "cohort": "MC-45",
        "owner_id": 1,
    },
    {
        "name": "FarmConnect",
        "description": "Connecting farmers directly with consumers through a marketplace platform.",
        "github_url": "https://github.com/moringa/farmconnect",
        "tech_stack": ["React", "Node.js", "MongoDB"],
        "cohort": "MC-45",
        "owner_id": 2,
    },
    {
        "name": "HealthMate",
        "description": "A health tracking Android application for monitoring vitals and medication reminders.",
        "github_url": "https://github.com/moringa/healthmate",
        "live_url": "https://play.google.com/healthmate",
        "tech_stack": ["Android", "Python", "Flask"],
        "cohort": "MC-44",
        "owner_id": 3,
    },
]

for project_data in projects_data:
    tech_stack = project_data.pop("tech_stack")
    project = Project(**project_data)
    db.add(project)
    db.flush()
    
    for tech in tech_stack:
        project_tech = ProjectTech(project_id=project.id, tech_name=tech)
        db.add(project_tech)

db.commit()
db.close()

print("Projects added successfully!")
