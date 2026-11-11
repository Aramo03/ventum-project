# Agent brief — Wave 2 — #5 Mariam

Отдай этот файл агенту целиком. Номер ученика — **5**. Он совпадает с [TASK.md](../../TASK.md) и с заголовком «5 — Mariam · header» в [task-wave2.md](../../task-wave2.md).

Wave 1 закрыта: `search_products` уже в `backend/apps/catalog/search.py`. Пустой запрос возвращает тот же queryset. Имя и sku ищутся без учёта регистра. В той волне URL и шапку не трогали. Теперь подключаешь поиск в шапке.

## Русский

### Кто ты

Ты делаешь зону ученика 5, Mariam, ветка `feat/mariam-header`, зона `header`. README не удалять: [frontend/src/components/Header/README.md](../../frontend/src/components/Header/README.md).

Старт: `git checkout dev && git pull`, затем `feat/mariam-header` со свежим `dev`. Один PR, base = `dev`. В `main` не пушить. `--force` не делать. Postgres не поднимать. Срок — конец января.

Ждать merge Vach (9). Список `GET /api/catalog/products/` пишет он и сам вызывает `search_products`. В очереди ты после Daniel: **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**. Номер 5 — номер ученика, не шаг очереди.

### Карта репозитория

- Поле поиска в [Header.jsx](../../frontend/src/components/Header/Header.jsx) сейчас `readOnly`.
- Языки в [header.js](../../frontend/src/components/Header/header.js): только `am` и `en`. Кнопки Account и Cart — `disabled`. Так и оставить.
- HTTP — [frontend/src/api/client.js](../../frontend/src/api/client.js). Он сам кладёт `language` на GET.
- Канон пути — `/api/catalog/products/?q=&store=&language=`. Префикс `/api/products/` не добавлять. Волна 1 писала его как будущий черновик.
- Словарь `ru` регистрирует Artush. Кнопку ставишь ты.

### Зона ответственности

Можно: `Header.jsx`, `header.css`, `header.js` и точечная правка `search.py`, если функция не выполняет свой контракт. Новые строки — в `am.json`, `en.json` и `ru.json`.

Нельзя: `models.py`, миграции, `views.py` и `serializers.py` каталога, включение Account и Cart, новый маршрут под результаты.

### Шаги

1. Убрать `readOnly`. Отправка запрашивает `GET /api/catalog/products/` с параметром `q`. `store` передавать только если он известен. Без `store` приходят оба магазина.
2. Под полем короткий список: имя, sku, цена с подписью AMD, магазин. Отдельный route не создавать.
3. В `LANGUAGES` добавить `{ code: 'ru', label: 'RU' }`.
4. Пустой ввод не показывает «ничего не найдено» вместо всего каталога и не должен сужать API. Если `search.py` на пустой строке всё ещё возвращает исходный queryset, файл не переписывать.
5. Если во вью Vach нет вызова `search_products`, не править его файл. Написать Lead.

### Definition of Done

Lead не мержит, пока: товар сида Textile находится по sku и по имени на `am`, `en` и `ru`; пустой `q` не уменьшает выдачу; в diff нет `models.py` и нет вью каталога; Account и Cart остаются `disabled`; в шапке есть кнопка `ru`.

### Проверка

Поднять backend и `npm run dev`. В шапке ввести sku товара Karen и имя на каждом языке. Очистить поле и убедиться, что пустой запрос не рисует пустой каталог. В DevTools смотреть URL: префикс `/api/catalog/products/`.

### Нельзя

Не менять модели, миграции и сериализатор Vach. Не включать корзину и экран входа. Не создавать вторую функцию поиска рядом с `search_products`.

## English

You are student **5**, Mariam, branch `feat/mariam-header`, zone `header`. Do not delete the Header README.

Wave 1 `search_products` is in `dev`. A blank query returns the same queryset. This wave you connect that function to the header. You do not own the list view.

Pull `dev` into `feat/mariam-header`. One PR, base `dev`. No force-push. No Postgres. Finish by the end of January. Wait for Vach (9). Queue: **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**.

**Own:** `Header.jsx`, `header.css`, `header.js`, and a fix to `search.py` only when the function breaks its contract. New strings go into all three JSON files.

**Do not own:** `models.py`, migrations, catalog `views.py` and `serializers.py`, enabling Account or Cart, a new results route.

**Steps**

1. Remove `readOnly`. Submit `GET /api/catalog/products/` with `q`. Pass `store` only when it is known. Use `frontend/src/api/client.js`.
2. Show a short list under the field: name, sku, AMD price, store. No new route.
3. Add `{ code: 'ru', label: 'RU' }` to `LANGUAGES`. Leave Account and Cart `disabled`.
4. A blank query must not paint an empty catalog. Do not rewrite `search.py` if the blank-query behavior is already correct.
5. If Vach’s view never calls `search_products`, tell Lead. Do not edit his file.

**Done when** Karen’s product is found by sku and by name in `am`, `en`, and `ru`, a blank `q` does not shrink the result, `models.py` and the catalog view are untouched, and Account, Cart stay disabled while `ru` is present.

Do not add `/api/products/` and do not write a second search function.

## Հայերեն

Դու աշակերտ **5**-ն ես, Mariam, ճյուղը՝ `feat/mariam-header`, գոտին՝ `header`։ Header-ի README-ն չջնջել։

Wave 1-ի `search_products`-ն արդեն `dev`-ում է։ Դատարկ հարցումը վերադարձնում է նույն queryset-ը։ Այս ալիքում այն միացնում ես Header-ին։ Ցանկի վью-ն քոնը չէ։

Թարմ `dev`-ը ձուլիր `feat/mariam-header`-ի մեջ։ Մեկ PR, base-ը `dev`։ `--force` չանել։ Postgres չբարձրացնել։ Ավարտել մինչև հունվարի վերջ։ Սպասիր Vach-ին (9)։ Հերթը՝ **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**։

**Քոնն է՝** `Header.jsx`, `header.css`, `header.js` և `search.py`-ի ուղղում միայն եթե ֆունկցիան դրժում է իր պայմանագիրը։ Նոր տողերը՝ երեք JSON-ում։

**Քոնը չէ՝** `models.py`, միգրացիաները, կատալոգի `views.py`-ն և `serializers.py`-ն, Account-ի կամ Cart-ի միացումը, արդյունքների նոր երթուղին։

**Քայլեր**

1. Հանիր `readOnly`։ Ուղարկիր `GET /api/catalog/products/`՝ `q`-ով։ `store` փոխանցիր միայն եթե այն հայտնի է։ Գործածիր `frontend/src/api/client.js`։
2. Դաշտի տակ ցույց տուր կարճ ցանկ՝ անուն, sku, AMD գին, խանութ։ Նոր երթուղի չբացել։
3. `LANGUAGES`-ին ավելացրու `{ code: 'ru', label: 'RU' }`։ Account-ը և Cart-ը թող `disabled`։
4. Դատարկ հարցումը դատարկ կատալոգ չպետք է նկարի։ `search.py`-ն չվերաշարադրել, եթե դատարկ հարցումն արդեն ճիշտ է։
5. Եթե Vach-ի վью-ն չի կանչում `search_products`, գրիր Lead-ին։ Նրա ֆայլը չխմբագրել։

**Ավարտված է, երբ** Karen-ի ապրանքը գտնվում է sku-ով և անունով `am`, `en` և `ru` լեզվով, դատարկ `q`-ն արդյունքը չի փոքրացնում, `models.py`-ն և կատալոգի վью-ն չեն դիպչվել, Account-ը և Cart-ը անջատված են, իսկ `ru` կոճակը կա։

`/api/products/` մի ավելացրու և որոնման երկրորդ ֆունկցիա մի գրիր։
