# Agent brief — Wave 3 — #7 Karen

Отдай этот файл агенту целиком. Номер ученика — **7**. Он совпадает с [TASK.md](../../TASK.md) и с заголовком «7 — Karen · textile» в [task-wave3.md](../../task-wave3.md).

Страница `/textile` уже читает каталог. Сид и модели не трогать. Страницу Baby не трогать.

## Русский

### Кто ты

Ты делаешь зону ученика 7, Karen, ветка `feat/karen-textile`. Срок — конец января 2027.

Один PR, base = `dev`. В `main` не пушить. Postgres не поднимать.

В очереди ты после Vach: **Lead → Suro → Artush → Vach → Karen → Svet → Daniel → Hayk → Mariam → Ashot**.

### Зона ответственности

Можно: `frontend/src/pages/Textile/` и новые ключи в трёх JSON.

Нельзя: `seed_textile`, модели, `/baby`, API корзины.

### Шаги

1. На каждом опубликованном товаре кнопка шлёт `POST /api/cart/items/` с его `sku` и `qty: 1` через `api`.
2. **401** показывает на карточке, что нужен вход. Не уводить на `/account`: страницу входа делает Hayk.
3. Успех виден на карточке.
4. Строки кнопки, успеха и 401 — в `am.json`, `en.json`, `ru.json`.

### Definition of Done

Кнопка кладёт товар Textile. Товар Baby на этой странице не появляется.

### Нельзя

Менять список, который уже фильтрует `store=textile`.

## English

You are student **7**, Karen, branch `feat/karen-textile`. Add an add-to-cart button on each published product at `/textile`. Post `{sku, qty: 1}` through `api`. A 401 says sign-in is required and stays on the card. Show success on the card. Add the strings to all three JSON files.

Do not change the seed, the models, or `/baby`.

**Done when** the button adds a Textile product and a Baby product is still absent.

## Հայերեն

Դու աշակերտ **7**-ն ես, Karen, ճյուղը՝ `feat/karen-textile`։ `/textile`-ի յուրաքանչյուր հրապարակված ապրանքի վրա դիր «զամբյուղ» կոճակ։ Ուղարկիր `{sku, qty: 1}` `api`-ով։ 401-ը ասում է, որ մուտք է պետք, և մնում է քարտի վրա։ Հաջողությունը երևում է քարտի վրա։ Տողերը՝ երեք JSON-ում։

Seed-ը, մոդելները և `/baby`-ն չփոխել։

**Ավարտված է, երբ** կոճակը դնում է Textile ապրանք, և Baby ապրանքը էջում չկա։
