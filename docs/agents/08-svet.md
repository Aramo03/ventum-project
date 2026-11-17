# Agent brief — Wave 3 — #8 Svet

Отдай этот файл агенту целиком. Номер ученика — **8**. Он совпадает с [TASK.md](../../TASK.md) и с заголовком «8 — Svet · baby» в [task-wave3.md](../../task-wave3.md).

Страница `/baby` уже читает каталог. Сид и модели не трогать. Файлы Textile не трогать.

## Русский

### Кто ты

Ты делаешь зону ученика 8, Svet, ветка `feat/svet-baby`. Срок — конец января 2027.

Один PR, base = `dev`. В `main` не пушить. Postgres не поднимать.

В очереди ты после Karen: **Lead → Suro → Artush → Vach → Karen → Svet → Daniel → Hayk → Mariam → Ashot**.

### Зона ответственности

Можно: `frontend/src/pages/Baby/` и новые ключи в трёх JSON.

Нельзя: `seed_baby`, модели, страница Textile, API корзины.

### Шаги

1. На каждом опубликованном товаре кнопка шлёт `POST /api/cart/items/` с его `sku` и `qty: 1` через `api`.
2. **401** показывает на карточке, что нужен вход.
3. Успех виден на карточке.
4. Свои строки — в трёх JSON. Ключи Karen не затирать: у Baby свой блок, если строки другие.

### Definition of Done

Кнопка кладёт товар Baby. Страница Textile в diff не меняется.

### Нельзя

Копировать файлы Textile поверх Baby.

## English

You are student **8**, Svet, branch `feat/svet-baby`. Add the same add-to-cart button on `/baby` only. Post `{sku, qty: 1}`. A 401 says sign-in is required. Show success on the card. Add strings to all three JSON files without wiping Karen’s keys.

Do not change the seed, the models, or any Textile file.

**Done when** the button adds a Baby product and the Textile page is untouched.

## Հայերեն

Դու աշակերտ **8**-ն ես, Svet, ճյուղը՝ `feat/svet-baby`։ Նույն «զամբյուղ» կոճակը դիր միայն `/baby`-ում։ Ուղարկիր `{sku, qty: 1}`։ 401-ը ասում է, որ մուտք է պետք։ Հաջողությունը երևում է քարտի վրա։ Տողերը՝ երեք JSON-ում, Karen-ի բանալիները չջնջել։

Seed-ը, մոդելները և Textile-ի ֆայլերը չփոխել։

**Ավարտված է, երբ** կոճակը դնում է Baby ապրանք, և Textile էջը չի դիպչվել։
