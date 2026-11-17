# Agent brief — Wave 3 — #6 Daniel

Отдай этот файл агенту целиком. Номер ученика — **6**. Он совпадает с [TASK.md](../../TASK.md) и с заголовком «6 — Daniel · orders» в [task-wave3.md](../../task-wave3.md).

Ветка по-прежнему `feat/daniel-footer`. Зона этой волны — заказы, не подвал. Формы Footer не трогать. Модели заявок не трогать.

## Русский

### Кто ты

Ты делаешь зону ученика 6, Daniel, ветка `feat/daniel-footer`, зона `orders`. Срок — конец января 2027.

Один PR, base = `dev`. В `main` не пушить. Postgres не поднимать.

В очереди ты после Svet: **Lead → Suro → Artush → Vach → Karen → Svet → Daniel → Hayk → Mariam → Ashot**.

### Карта репозитория

- Письмо: [docs/order-email.md](../order-email.md).
- Приложение `orders` уже пустое и подключено Suro. Ты наполняешь модели и `urls.py`.
- `payment_urls.py` не твой: его заполняет Hayk.

### Зона ответственности

Можно: модели `Order` и `OrderLine`, миграция, админка, `GET` в `orders/urls.py`, `apps/orders/mail.py`.

Нельзя: вью Idram, модели корзины, Footer, `payment_urls.py`.

### Шаги

1. `Order`: пользователь, уникальный `bill_no`, статус `pending` или `paid`, сумма, email, имя, пустые `idram_trans_id` и `paid_at`, `created_at`.
2. `OrderLine`: заказ, `sku`, снимок имени, `qty`, `price`, `line_total`.
3. `GET /api/orders/<bill_no>/` только владелец. Чужой и гость — **404**, не 403. Тело: `bill_no`, `status`, `amount`, `items`.
4. `send_order_paid_email(order)` не меняет статус. Получатель — `settings.ORDER_NOTIFY_EMAIL`. Пустой адрес: вернуть `False` и записать в лог, что письмо пропущено. Иначе одно русское письмо и `True`. Секретов и карты в письме нет.

### Definition of Done

Чужой `bill_no` даёт 404. Функция письма не пишет статус. Пустой адрес не бросает исключение.

### Нельзя

Ставить `paid` внутри письма. Это делает callback Hayk, и только после верного checksum.

## English

You are student **6**, Daniel, branch `feat/daniel-footer`, zone `orders`. Do not edit the Footer.

Add `Order` and `OrderLine`, admin, and `GET /api/orders/<bill_no>/` for the owner only. Anyone else gets 404. Add `send_order_paid_email(order)` in `mail.py`. It does not change status. An empty `ORDER_NOTIFY_EMAIL` returns `False` and logs a skip. The body is the Russian shop email from [docs/order-email.md](../order-email.md).

Do not write the Idram view. Hayk calls your function.

**Done when** a foreign bill is 404, the mail function does not write status, and an empty address does not raise.

## Հայերեն

Դու աշակերտ **6**-ն ես, Daniel, ճյուղը՝ `feat/daniel-footer`, գոտին՝ `orders`։ Footer-ը չխմբագրել։

Ավելացրու `Order` և `OrderLine`, ադմին և `GET /api/orders/<bill_no>/` միայն տիրոջ համար։ Մնացածը 404 է ստանում։ Ավելացրու `send_order_paid_email(order)`՝ `mail.py`-ում։ Այն կարգավիճակը չի փոխում։ Դատարկ `ORDER_NOTIFY_EMAIL`-ը վերադարձնում է `False` և գրում է լոգ։ Տեքստը ռուսերեն նամակն է [docs/order-email.md](../order-email.md)-ից։

Idram-ի վյու չգրել։ Hayk-ը կանչում է քո ֆունկցիան։

**Ավարտված է, երբ** օտար համարը 404 է, նամակի ֆունկցիան կարգավիճակ չի գրում, և դատարկ հասցեն բացառություն չի բարձրացնում։
