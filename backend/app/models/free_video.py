from datetime import datetime
from enum import Enum

from sqlalchemy import (
    DateTime,
    Enum as SqlEnum,
    ForeignKey,
    String,
    Text,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class CourseLanguage(str, Enum):
    BANGLA = "bangla"
    ENGLISH = "english"


class CourseStatus(str, Enum):
    DRAFT = "draft"
    PUBLISHED = "published"
    ARCHIVED = "archived"


class FreeVideo(Base):
    __tablename__ = "free_courses"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    title: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
        index=True,
    )

    slug: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        nullable=False,
        index=True,
    )

    language: Mapped[CourseLanguage] = mapped_column(
        SqlEnum(CourseLanguage),
        default=CourseLanguage.BANGLA,
        nullable=False,
    )

    status: Mapped[CourseStatus] = mapped_column(
        SqlEnum(CourseStatus),
        default=CourseStatus.DRAFT,
        nullable=False,
    )

    thumbnail: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    thumbnail_public_id: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    video_url: Mapped[str] = mapped_column(
        String(500),
        nullable=False,
    )

    short_description: Mapped[str] = mapped_column(
        String(500),
        nullable=False,
    )

    description: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    duration: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True,
    )

    tags: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    created_by: Mapped[str] = mapped_column(
        ForeignKey(
            "users.id",
            ondelete="CASCADE",
        ),
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )

    published_at: Mapped[datetime | None] = mapped_column(
        DateTime,
        nullable=True,
    )

    creator = relationship(
        "User",
        back_populates="free_courses",
    )
