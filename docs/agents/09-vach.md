# Agent brief — Wave 3 — #9 Vach

Отдай этот файл агенту целиком. Номер ученика — **9**. Он совпадает с [TASK.md](../../TASK.md) и с заголовком «9 — Vach · cart» в [task-wave3.md](../../task-wave3.md).

Каталог волны 2 не переписывать. Поля `Product` не менять. `search.py` не переписывать.

## Русский

### Кто ты

Ты делаешь зону ученика 9, Vach, ветка `feat/vach-catalog`, зона `cart`. Срок — конец января 2027.

Один PR, base = `dev`. В `main` не пушить. Postgres не поднимать.

В очереди ты после Artush: **Lead → Suro → Artush → Vach → Karen → Svet → Daniel → Hayk → Mariam → Ashot**.

Приложение `cart` уже зарегистрировал Suro. Пустой `urls.py` заполняешь ты.

### Зона ответственности

Можно: модели в `apps/cart/`, миграция, админка, сериализатор, вью, `urls.py`.

Нельзя: React, модели заказа, поля каталога, `search.py`.

### Шаги

1. Один открытый cart на пользователя. Строка: товар и `qty`. Повтор того же товара увеличивает `qty`.
2. `GET /api/cart/` — JWT, иначе **401**. Тело: `count` (сумма qty), `total`, `items` с `sku`, `name`, `store`, `qty`, `price`, `line_total`. Цена — текущая цена опубликованного товара, строка с двумя знаками. Имя через `pick_translation`. Язык через `parse_language`, ошибка — **400**.
3. `POST /api/cart/items/` тело `{sku, qty}`. Нет товара или черновик — **404**.
4. `PATCH /api/cart/items/<sku>/`. `qty: 0` удаляет строку и отвечает **200** корзиной. Чужой sku — **404**.
5. `DELETE /api/cart/items/<sku>/` — **204**.

### Definition of Done

Гость получает 401. Черновик — 404. Повтор sku не плодит строку. `qty` 0 удаляет строку. `models.py` каталога в diff нет.

### Нельзя

Запоминать цену в корзине навсегда. Снимок цены делает заказ Hayk в момент checkout.

## English

You are student **9**, Vach, branch `feat/vach-catalog`, zone `cart`. The catalog API stays.

Add cart models, a migration, admin, and four JWT routes: `GET /api/cart/`, `POST /api/cart/items/`, `PATCH /api/cart/items/<sku>/`, `DELETE /api/cart/items/<sku>/`. One cart per user. No token is 401. Unknown or unpublished sku is 404. The same sku increases qty. `qty: 0` deletes the line. Prices are two-decimal AMD strings from the current product. Names go through `pick_translation`.

Do not edit catalog fields, `search.py`, React, or orders.

**Done when** a guest is 401, a draft is 404, a repeat sku does not insert a second row, and catalog `models.py` is untouched.

## Հայերեն

Դու աշակերտ **9**-ն ես, Vach, ճյուղը՝ `feat/vach-catalog`, գոտին՝ `cart`։ Կատալոգի API-ն մնում է։

Ավելացրու զամբյուղի մոդելներ, միգրացիա, ադմին և չորս JWT ուղի՝ `GET /api/cart/`, `POST /api/cart/items/`, `PATCH /api/cart/items/<sku>/`, `DELETE /api/cart/items/<sku>/`։ Մեկ զամբյուղ՝ մեկ օգտատիրոջ։ Առանց թոքենի՝ 401։ Անհայտ կամ չհրապարակված sku՝ 404։ Նույն sku-ն qty-ն է ավելացնում։ `qty: 0`-ն ջնջում է տողը։ Գինը երկու նիշով AMD տող է՝ ընթացիկ ապրանքից։ Անունը՝ `pick_translation`։

Կատալոգի դաշտերը, `search.py`-ն, React-ը և պատվերները չխմբագրել։

**Ավարտված է, երբ** հյուրը 401 է, սևագիրը 404 է, կրկնակի sku-ն երկրորդ տող չի ստեղծում, և կատալոգի `models.py`-ն չի դիպչվել։
