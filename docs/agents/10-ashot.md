# Agent brief — Wave 3 — #10 Ashot

Отдай этот файл агенту целиком. Номер ученика — **10**. Он совпадает с [TASK.md](../../TASK.md) и с заголовком «10 — Ashot · ui» в [task-wave3.md](../../task-wave3.md).

Страница 404 уже есть. Её не ломать. Тесты волны 1 и волны 2 не удалять. `index.css` не менять.

## Русский

### Кто ты

Ты делаешь зону ученика 10, Ashot, ветка `feat/ashot-ui`, зона `ui`. Срок — конец января 2027.

Один PR, base = `dev`. В `main` не пушить. Postgres не поднимать. В очереди ты последний.

### Карта репозитория

- Контракт — [task-wave3.md](../../task-wave3.md). Callback — [docs/idram.md](../idram.md).
- Тесты ходят через DRF `APIClient`. Сеть не нужна. Живой Idram не нужен.

### Зона ответственности

Можно: тесты API в `backend/`, `frontend/src/pages/Checkout/` для успеха и неуспеха, два маршрута в `App.jsx`.

Нельзя: менять поля моделей, чтобы тест позеленел. `index.css`. Настоящий секрет в тесте: секрет тестовый, из override settings.

### Шаги

1. `/checkout/success` и `/checkout/fail` читают query `bill` и делают `GET /api/orders/<bill>/`. Слово «оплачено» только при `status=paid`. Нет `bill` — нейтральная фраза, не «оплачено». `success=1` само по себе ничего не доказывает.
2. Тесты: корзина без токена — 401; снятый с публикации sku — 404; пустой checkout — 400; precheck не ставит `paid`; верный checksum ставит `paid` и зовёт отправку один раз; тот же POST не зовёт снова; плохой checksum оставляет `pending`.
3. `python manage.py test` из `backend/` зелёный целиком, вместе со старыми тестами.

### Definition of Done

Весь прогон зелёный. Экран не называет заказ оплаченным без статуса `paid`. В diff нет полей чужих моделей и нет `index.css`.

### Нельзя

Ходить в `https://web.idram.am` из теста.

## English

You are student **10**, Ashot, branch `feat/ashot-ui`. You are last. Keep the old tests and the 404 page.

Build `/checkout/success` and `/checkout/fail`. They read `?bill=` and `GET /api/orders/<bill>/`. The paid word appears only when `status` is `paid`. A missing bill is a neutral line. `success=1` alone is not proof.

API tests with `APIClient` and no network: cart without a token is 401; an unpublished sku is 404; empty checkout is 400; precheck does not set `paid`; a valid checksum sets `paid` and sends once; the same POST does not send again; a bad checksum leaves `pending`.

**Done when** `python manage.py test` is green and the screen never says paid without `status=paid`.

Do not call the real Idram host. Do not edit model fields or `index.css` to make a test pass.

## Հայերեն

Դու աշակերտ **10**-ն ես, Ashot, ճյուղը՝ `feat/ashot-ui`։ Դու վերջինն ես։ Հին թեստերը և 404 էջը թող։

Սարքի `/checkout/success` և `/checkout/fail`։ Դրանք կարդում են `?bill=` և անում են `GET /api/orders/<bill>/`։ «Վճարված» բառը կա միայն `status=paid` դեպքում։ Առանց `bill`-ի՝ չեզոք տող։ `success=1`-ը ինքնըստինքյան ապացույց չէ։

API թեստեր `APIClient`-ով, առանց ցանցի. զամբյուղն առանց թոքենի 401 է, չհրապարակված sku-ն 404 է, դատարկ checkout-ը 400 է, precheck-ը `paid` չի դնում, ճիշտ checksum-ը դնում է `paid` և ուղարկում է մեկ անգամ, նույն POST-ը երկրորդ անգամ չի ուղարկում, վատ checksum-ը թողնում է `pending`։

**Ավարտված է, երբ** `python manage.py test`-ը կանաչ է և էկրանը առանց `status=paid` «վճարված» չի գրում։

Իրական Idram հոսթ չկանչել։ Մոդելների դաշտերը և `index.css`-ը չխմբագրել, որպեսզի թեստը կանաչի։
