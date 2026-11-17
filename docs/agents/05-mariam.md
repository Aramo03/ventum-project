# Agent brief — Wave 3 — #5 Mariam

Отдай этот файл агенту целиком. Номер ученика — **5**. Он совпадает с [TASK.md](../../TASK.md) и с заголовком «5 — Mariam · cart-page» в [task-wave3.md](../../task-wave3.md).

Поиск волны 2 не ломать. Кнопки Account и Cart сейчас выключены.

## Русский

### Кто ты

Ты делаешь зону ученика 5, Mariam, ветка `feat/mariam-header`, зона `cart-page`. Срок — конец января 2027.

Один PR, base = `dev`. В `main` не пушить. Postgres не поднимать.

В очереди ты после Hayk: **Lead → Suro → Artush → Vach → Karen → Svet → Daniel → Hayk → Mariam → Ashot**.

### Зона ответственности

Можно: `Header`, новая папка `frontend/src/pages/Cart/` (`Cart.jsx`, `cart.css`, `cart.js`), маршрут `/cart` в `App.jsx`.

Нельзя: страницы Textile и Baby, страница `/account`, callback Idram, модели.

### Шаги

1. Account — ссылка на `/account`. Cart — ссылка на `/cart`. Если в клиенте есть токен, рядом виден `count` из `GET /api/cart/`.
2. Страница `/cart` показывает `items`. Количество — `PATCH /api/cart/items/<sku>/`. Удаление — `DELETE`. `qty` 0 тоже удаляет.
3. Кнопка оплаты: `POST /api/checkout/`, затем HTML-форма `method="POST"` на `payment_url` с полями из `fields`. Браузер уходит на Idram. Axios на Idram не слать.
4. Query `success=1` не писать как «оплачено».

### Definition of Done

Обе ссылки живые. Корзина показывает строки. `success=1` не считается оплатой. Поиск в шапке работает как раньше.

### Нельзя

Подменять сумму на клиенте. В поля формы класть только то, что вернул checkout.

## English

You are student **5**, Mariam, branch `feat/mariam-header`. Turn Account and Cart into links to `/account` and `/cart`. Show `count` from `GET /api/cart/` when a token exists. Build `/cart`: lines, PATCH qty, DELETE, and a pay button.

The pay button calls `POST /api/checkout/`, then submits a browser POST form to `payment_url` with the returned `fields`. Do not axios Idram. Do not treat `?success=1` as paid. Do not edit Textile, Baby, or `/account`.

**Done when** both links work, the cart lists lines, and `success=1` is not shown as paid.

## Հայերեն

Դու աշակերտ **5**-ն ես, Mariam, ճյուղը՝ `feat/mariam-header`։ Account-ը և Cart-ը դարձրու հղումներ դեպի `/account` և `/cart`։ Թոքենով ցույց տուր `count`-ը `GET /api/cart/`-ից։ Սարքի `/cart`՝ տողեր, PATCH qty, DELETE և վճարման կոճակ։

Կոճակը կանչում է `POST /api/checkout/`, հետո դիտարկիչով POST ձև է ուղարկում `payment_url`-ին՝ վերադարձված `fields`-ով։ Idram-ին axios չուղարկել։ `?success=1`-ը վճարված չհամարել։ Textile-ը, Baby-ն և `/account`-ը չխմբագրել։

**Ավարտված է, երբ** երկու հղումն աշխատում է, զամբյուղը ցույց է տալիս տողերը, և `success=1`-ը «վճարված» չի գրվում։
