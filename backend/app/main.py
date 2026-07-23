from fastapi import FastAPI

from app.api.user import router as userRouter

app = FastAPI(title="Course Management API")

app.include_router(userRouter)


@app.get("/")
async def root():
    return {"message": "Course Management API Running"}
