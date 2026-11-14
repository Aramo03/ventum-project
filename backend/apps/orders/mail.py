import logging
from django.conf import settings
from django.core.mail import send_mail

logger = logging.getLogger(__name__)


def send_order_paid_email(order):
    recipient_email = getattr(settings, 'ORDER_NOTIFY_EMAIL', '')

    if not recipient_email:
        logger.info(
            "Order notification email skipped: ORDER_NOTIFY_EMAIL is empty.")
        return False

    subject = f"Заказ {order.bill_no} paid"

    items_text = "\n".join([
        f"- {item.name} (SKU: {item.sku}): {item.qty} шт. по {item.price} AMD = {item.line_total} AMD"
        for item in order.items.all()
    ])

    message = (
        f"Оплачен новый заказ!\n\n"
        f"Номер заказа: {order.bill_no}\n"
        f"Имя покупателя: {order.name}\n"
        f"Email покупателя: {order.email}\n"
        f"Сумма: {order.amount} AMD\n\n"
        f"Товары:\n{items_text}\n"
    )

    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL if hasattr(
                settings, 'DEFAULT_FROM_EMAIL') else None,
            recipient_list=[recipient_email],
            fail_silently=False,
        )
        return True
    except Exception as e:
        logger.error(
            f"Failed to send order paid email for {order.bill_no}: {e}")
        return False
