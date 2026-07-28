from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.user import router as userRouter
from app.api.category import router as categoryRouter
from app.api.course import router as courseRouter

app = FastAPI(title="Course Management API")

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

app.include_router(userRouter, prefix="/api")
app.include_router(categoryRouter, prefix="/api")
app.include_router(courseRouter, prefix="/api")


@app.get("/")
async def root():
    return {"message": "Course Management API Running"}
