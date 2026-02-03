from app.database import SessionLocal
from app.models.user import User
from app.models.cohort import Cohort
from app.models.project import Project
from app.utils.auth import get_password_hash
from datetime import date

db = SessionLocal()

# Create cohorts
cohorts_data = [
    {"name": "MC-45", "start_date": date(2024, 1, 15), "end_date": date(2024, 7, 15)},
    {"name": "MC-44", "start_date": date(2023, 7, 15), "end_date": date(2024, 1, 15)},
    {"name": "MC-43", "start_date": date(2023, 1, 15), "end_date": date(2023, 7, 15)},
]

for cohort_data in cohorts_data:
    cohort = Cohort(**cohort_data)
    db.add(cohort)

# Create users
users_data = [
    {"email": "john@moringa.com", "name": "John Kamau", "password": "password123", "role": "student", "cohort": "MC-45"},
    {"email": "sarah@moringa.com", "name": "Sarah Wanjiku", "password": "password123", "role": "student", "cohort": "MC-45"},
    {"email": "david@moringa.com", "name": "David Ochieng", "password": "password123", "role": "student", "cohort": "MC-44"},
    {"email": "grace@moringa.com", "name": "Grace Muthoni", "password": "password123", "role": "admin", "cohort": None},
]

for user_data in users_data:
    password = user_data.pop("password")
    user = User(**user_data, password=get_password_hash(password))
    db.add(user)

db.commit()

# Create projects
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
        from app.models.project import ProjectTech
        project_tech = ProjectTech(project_id=project.id, tech_name=tech)
        db.add(project_tech)

db.commit()
db.close()

print("Database seeded successfully!")
