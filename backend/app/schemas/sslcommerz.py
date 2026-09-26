from decimal import Decimal

from pydantic import BaseModel


class SSLCommerzIPNRequest(BaseModel):
    status: str
    tran_id: str
    val_id: str | None = None
    amount: Decimal | None = None
    currency: str | None = None

    bank_tran_id: str | None = None
    tran_date: str | None = None

    verify_sign: str | None = None
    verify_key: str | None = None

    risk_level: str | None = None
    risk_title: str | None = None