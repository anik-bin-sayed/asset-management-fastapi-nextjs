import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from app.core.config import settings


def send_verification_email(
    recipient_email: str,
    verification_code: str,
):
    sender_email = settings.SMTP_GMAIL
    sender_password = settings.SMTP_PASSWORD

    message = MIMEMultipart("alternative")

    message["Subject"] = "Verify your email"
    message["From"] = sender_email
    message["To"] = recipient_email

    html = f"""
    <html>
        <body>
            <h2>Email Verification</h2>

            <p>Your verification code is:</p>

            <h1>{verification_code}</h1>

            <p>This code will expire in 10 minutes.</p>
        </body>
    </html>
    """

    message.attach(MIMEText(html, "html"))

    with smtplib.SMTP_SSL(
        "smtp.gmail.com",
        465,
    ) as server:
        server.login(
            sender_email,
            sender_password,
        )

        server.sendmail(
            sender_email,
            recipient_email,
            message.as_string(),
        )
