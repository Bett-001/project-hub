from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth, projects, cohorts, users

app = FastAPI(title="Project Hub API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(projects.router)
app.include_router(cohorts.router)
app.include_router(users.router)

@app.get("/")
def root():
    return {"message": "Project Hub API"}

@app.get("/health")
def health():
    return {"status": "healthy"}
