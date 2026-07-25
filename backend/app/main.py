from fastapi import FastAPI

from app.api.user import router as userRouter
from app.api.category import router as categoryRouter

app = FastAPI(title="Course Management API")

app.include_router(userRouter)
app.include_router(categoryRouter)


@app.get("/")
async def root():
    return {"message": "Course Management API Running"}
