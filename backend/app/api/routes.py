from fastapi import APIRouter

from app.api.auth import router as auth_router
from app.api.category import router as category_router
from app.api.course import router as course_router
from app.api.profile import router as profile_router
from app.api.users import router as users_router
from app.api.free_course import router as free_course_router
from app.api.enrollments import router as enrollment_router
from app.api.payment import router as payment_router
from app.api.module import router as module_router

api_router = APIRouter()

api_router.include_router(auth_router)
api_router.include_router(category_router)
api_router.include_router(course_router)
api_router.include_router(profile_router)
api_router.include_router(users_router)
api_router.include_router(free_course_router)
api_router.include_router(enrollment_router)
api_router.include_router(payment_router)
api_router.include_router(module_router)
