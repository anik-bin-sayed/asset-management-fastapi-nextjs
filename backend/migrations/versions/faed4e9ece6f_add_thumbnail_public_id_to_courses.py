"""add thumbnail public id to courses

Revision ID: faed4e9ece6f
Revises: b946753f6d60
Create Date: 2026-08-16 23:10:06.905150

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = "faed4e9ece6f"
down_revision: Union[str, Sequence[str], None] = "b946753f6d60"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""

    op.add_column(
        "courses",
        sa.Column(
            "thumbnail_public_id",
            sa.String(length=255),
            nullable=True,
        ),
    )


def downgrade() -> None:
    """Downgrade schema."""

    op.drop_column(
        "courses",
        "thumbnail_public_id",
    )
