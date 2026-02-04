from app.database import SessionLocal
from app.models import User
from app.utils.auth import get_password_hash

db = SessionLocal()

try:
    # Check if admin exists
    admin = db.query(User).filter(User.email == "admin@moringa.com").first()
    if not admin:
        hashed_password = get_password_hash("admin123")
        admin = User(
            email="admin@moringa.com",
            name="Admin User",
            password=hashed_password,
            role="admin",
            cohort=None
        )
        db.add(admin)
        db.commit()
        print("Admin user created: admin@moringa.com / admin123")
    else:
        print("Admin user already exists")
except Exception as e:
    print(f"Error: {e}")
finally:
    db.close()
