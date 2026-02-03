# Project Hub Backend

FastAPI backend for Project Hub application with JWT authentication and PostgreSQL database.

## Setup

1. **Create virtual environment:**
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate  # Windows
```

2. **Install dependencies:**
```bash
pip install -r requirements.txt
```

3. **Setup PostgreSQL database:**
```bash
# Create database
createdb project_hub

# Or using psql
psql -U postgres
CREATE DATABASE project_hub;
```

4. **Configure environment:**
```bash
cp .env.example .env
# Edit .env with your database credentials
```

5. **Run the server:**
```bash
uvicorn app.main:app --reload --port 8000
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Projects
- `GET /api/projects` - Get all projects (filter by cohort, tech)
- `POST /api/projects` - Create project (auth required)
- `GET /api/projects/{id}` - Get project by ID
- `PUT /api/projects/{id}` - Update project (auth required)
- `DELETE /api/projects/{id}` - Delete project (auth required)

### Cohorts
- `GET /api/cohorts` - Get all cohorts
- `POST /api/cohorts` - Create cohort (admin only)
- `DELETE /api/cohorts/{id}` - Delete cohort (admin only)

### Users
- `GET /api/users/me` - Get current user
- `GET /api/users` - Get all students (filter by cohort)
- `GET /api/users/{id}` - Get user by ID

## Testing

```bash
pytest
```

## API Documentation

Visit `http://localhost:8000/docs` for interactive API documentation.
