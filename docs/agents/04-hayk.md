# Agent brief — Wave 3 — #4 Hayk

Отдай этот файл агенту целиком. Номер ученика — **4**. Он совпадает с [TASK.md](../../TASK.md) и с заголовком «4 — Hayk · payments» в [task-wave3.md](../../task-wave3.md).

Ветка по-прежнему `feat/hayk-gateway`. Зона этой волны — `payments`, не главная. `HomeBlock` и страницу `/` не переписывать.

## Русский

### Кто ты

Ты делаешь зону ученика 4, Hayk, ветка `feat/hayk-gateway`. Срок — конец января 2027.

Один PR, base = `dev`. В `main` не пушить. Postgres не поднимать. Карту, срок и CVV не принимать.

В очереди ты после Daniel: **Lead → Suro → Artush → Vach → Karen → Svet → Daniel → Hayk → Mariam → Ashot**.

### Карта репозитория

- Спека оплаты: [docs/idram.md](../idram.md).
- Письмо пишет Daniel: `send_order_paid_email(order)` в `apps/orders/mail.py`. Ты её вызываешь и не переписываешь.
- Язык Idram: `idram_language` Artush.
- Токен уже умеет [frontend/src/api/client.js](../../frontend/src/api/client.js): `setAuthToken`. Второй перехватчик не писать.
- Пустой `payment_urls.py` подключает Suro. Ты заполняешь его.

### Зона ответственности

Можно: `apps/orders/checkout.py`, `apps/orders/idram.py`, `payment_urls.py`, `frontend/src/pages/Account/` (`Account.jsx`, `account.css`, `account.js`), одна строка маршрута `/account` в `App.jsx`.

Нельзя: `mail.py`, модели корзины и заказа, страница `/cart`, новый пакет JWT.

### Шаги

1. `POST /api/checkout/` только с JWT. Пустая корзина — **400**. Иначе заказ `pending`, строки скопированы, корзина пустая, `paid` не ставить. `bill_no` = `VNT-` и первичный ключ. Ответ: `bill_no`, `payment_url`, `fields` из контракта. `EDP_LANGUAGE` только из `idram_language`.
2. `POST /api/payments/idram/result/` без JWT, CSRF снят, тело — голое `OK` или не `OK`. Precheck статус не меняет. Верный MD5 ставит `paid`, пишет `EDP_TRANS_ID` и время, один раз зовёт письмо. Повтор не зовёт. Плохой checksum, чужая сумма или чужой счёт оставляют `pending`.
3. `/account`: форма email и пароль на `POST /api/auth/token/`. Успех — `setAuthToken(access)`. Выход — `setAuthToken(null)`. С токеном показать `GET /api/auth/me/`.

### Definition of Done

Пустой checkout — 400. Precheck не ставит `paid`. Верный checksum ставит `paid` и шлёт одно письмо. Повтор письма не шлёт. `/account` берёт токен из уже существующей ручки.

### Нельзя

Считать query `success=1` оплатой. Хранить номер карты.

## English

You are student **4**, Hayk, branch `feat/hayk-gateway`, zone `payments`. Do not rebuild the home page.

`POST /api/checkout/` creates a `pending` order, clears the cart, and returns the Idram fields. An empty cart is 400. It does not set `paid`. `EDP_LANGUAGE` comes from `idram_language`.

`POST /api/payments/idram/result/` is public, CSRF-exempt, and returns plain `OK`. Precheck does not change status. A valid checksum sets `paid`, stores `EDP_TRANS_ID`, and calls `send_order_paid_email` once. A duplicate does not call it again. A bad checksum leaves `pending`.

`/account` uses the existing token endpoint and `setAuthToken`. Do not rewrite `mail.py` or add a second JWT client.

**Done when** empty checkout is 400, precheck is not paid, a good checksum pays once, and the duplicate sends no second email.

## Հայերեն

Դու աշակերտ **4**-ն ես, Hayk, ճյուղը՝ `feat/hayk-gateway`, գոտին՝ `payments`։ Գլխավոր էջը չվերաշարադրել։

`POST /api/checkout/`-ը ստեղծում է `pending` պատվեր, մաքրում է զամբյուղը և վերադարձնում է Idram-ի դաշտերը։ Դատարկ զամբյուղը 400 է։ `paid` չի դրվում։ `EDP_LANGUAGE`-ը գալիս է `idram_language`-ից։

`POST /api/payments/idram/result/`-ը հրապարակային է, առանց CSRF, պատասխանը մերկ `OK`։ Precheck-ը կարգավիճակը չի փոխում։ Ճիշտ checksum-ը դնում է `paid`, պահում է `EDP_TRANS_ID` և մեկ անգամ կանչում է `send_order_paid_email`։ Կրկնօրինակը նորից չի կանչում։ Վատ checksum-ը թողնում է `pending`։

`/account`-ը գործածում է արդեն եղած token endpoint-ը և `setAuthToken`-ը։ `mail.py`-ն չվերաշարադրել և երկրորդ JWT հաճախորդ չավելացնել։

**Ավարտված է, երբ** դատարկ checkout-ը 400 է, precheck-ը `paid` չի դնում, ճիշտ checksum-ը վճարում է մեկ անգամ, և կրկնօրինակը երկրորդ նամակ չի ուղարկում։
