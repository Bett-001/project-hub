from app.database import SessionLocal
from app.models import User
from app.utils.auth import get_password_hash

db = SessionLocal()

try:
    hashed_password = get_password_hash("password123")
    db_user = User(
        email="test@example.com",
        name="Test User",
        password=hashed_password,
        role="student",
        cohort="MC-45"
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    print(f"User created: {db_user.id}, {db_user.name}, {db_user.email}")
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
finally:
    db.close()
