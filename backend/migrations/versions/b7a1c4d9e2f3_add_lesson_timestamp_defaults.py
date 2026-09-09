"""add server defaults to lesson timestamps

Revision ID: b7a1c4d9e2f3
Revises: e3c70f9774ec
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "b7a1c4d9e2f3"
down_revision: Union[str, Sequence[str], None] = "e3c70f9774ec"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.alter_column(
        "lessons",
        "created_at",
        server_default=sa.text("now()"),
    )
    op.alter_column(
        "lessons",
        "updated_at",
        server_default=sa.text("now()"),
    )


def downgrade() -> None:
    op.alter_column(
        "lessons",
        "updated_at",
        server_default=None,
    )
    op.alter_column(
        "lessons",
        "created_at",
        server_default=None,
    )