"""add course type table

Revision ID: 5f704f89267d
Revises: e7f886f7f659
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = "5f704f89267d"
down_revision: Union[str, Sequence[str], None] = "e7f886f7f659"
branch_labels = None
depends_on = None


course_type_enum = sa.Enum(
    "FREE",
    "PAID",
    name="coursetype",
)


def upgrade() -> None:
    course_type_enum.create(op.get_bind(), checkfirst=True)

    op.add_column(
        "courses",
        sa.Column(
            "course_type",
            course_type_enum,
            nullable=False,
            server_default="FREE",
        ),
    )

    op.alter_column(
        "courses",
        "course_type",
        server_default=None,
    )


def downgrade() -> None:
    op.drop_column("courses", "course_type")

    course_type_enum.drop(op.get_bind(), checkfirst=True)
