from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.auth import router as authRouter
from app.api.category import router as categoryRouter
from app.api.course import router as courseRouter
from app.api.profile import router as profileRouter
from app.api.users import router as usersRouter

# initialize app
app = FastAPI(title="Course Management API")

# cors
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# router
app.include_router(authRouter, prefix="/api")
app.include_router(categoryRouter, prefix="/api")
app.include_router(courseRouter, prefix="/api")
app.include_router(profileRouter, prefix="/api")
app.include_router(usersRouter, prefix="/api")


@app.get("/")
async def root():
    return {"message": "Course Management API Running"}
