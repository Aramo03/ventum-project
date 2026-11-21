# Agent brief — Wave 3 — #6 Daniel

**Волна 5.** Подвал и шесть состояний рассылки, папка `frontend/src/components/Footer/`, ветка `feat/daniel-footer`, после Svet. Контакт и copyright на главной. На витрине — сведения, делитель, legal и марки карт. Рассылка бьёт в старый `POST /api/leads/newsletter/`. Invalid не уходит. Модели заказа не трогать. Раздел «6 — Daniel · подвал и рассылка» в [task-wave5.md](../../task-wave5.md). Текст ниже не стирать.

**Wave 5.** Footer and the six newsletter states, folder `frontend/src/components/Footer/`, branch `feat/daniel-footer`, after Svet. Contact and copyright on the home page. On a shop: information, divider, legal line, and card marks. The newsletter still posts to `POST /api/leads/newsletter/`. Invalid does not send. Do not touch order models. Section “6 — Daniel · footer and newsletter” in [task-wave5.md](../../task-wave5.md). The text below stays.

**Wave 5.** Ներքևը և բաժանորդագրության վեց վիճակը, պանակ `frontend/src/components/Footer/`, ճյուղ `feat/daniel-footer`, Svet-ից հետո։ Գլխավորում՝ կոնտակտ և copyright։ Խանութում՝ տեղեկություն, բաժանարար, legal և քարտերի նշաններ։ Բաժանորդագրությունը մնում է `POST /api/leads/newsletter/`։ Invalid-ը չի ուղարկում։ Պատվերի մոդելները չկպնել։ Բաժինը՝ [task-wave5.md](../../task-wave5.md), «6 — Daniel · подвал и рассылка»։ Ներքևի տեքստը մնում է։

**Волна 4.** Текущий экран — [task-wave4.md](../../task-wave4.md), раздел «6 — Daniel · подвал». Только `frontend/src/components/Footer/` по кадру. Модели заказа не трогать. Текст ниже не стирать.

**Wave 4.** Current screen: [task-wave4.md](../../task-wave4.md), section “6 — Daniel · footer”. Only `frontend/src/components/Footer/` from the frame. Do not touch order models. The text below stays.

**Wave 4.** Ընթացիկ էկրանը՝ [task-wave4.md](../../task-wave4.md), «6 — Daniel · ներքև»։ Միայն `frontend/src/components/Footer/` կադրից։ Պատվերի մոդելները չկպնել։ Ներքևի տեքստը մնում է։

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
