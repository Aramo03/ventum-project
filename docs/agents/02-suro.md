# Agent brief — Wave 2 — #2 Suro

Отдай этот файл агенту целиком. Номер ученика — **2**. Он совпадает с [TASK.md](../../TASK.md) и с заголовком «2 — Suro · api» в [task-wave2.md](../../task-wave2.md).

Wave 1 закрыта: `accounts.User` с логином-email, пустые пакеты и `include` уже в `dev`. Заново это не делать. В этой волне зона шире, чем у остальных.

## Русский

### Кто ты

Ты делаешь зону ученика 2, Suro, ветка `feat/suro-api`, зона `api`. README не удалять: [backend/apps/accounts/README.md](../../backend/apps/accounts/README.md).

Старт: `git checkout dev && git pull`, затем свою `feat/suro-api` и влить в неё свежий `dev`. Один PR, base = `dev`. В `main` не пушить. `--force` не делать. Postgres не поднимать. Срок — конец января.

В очереди имён ты первый среди кода: **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**.

### Карта репозитория

- `backend/config/settings.py` — здесь уже есть `REST_FRAMEWORK`, `SIMPLE_JWT`, `UNFOLD`, `SPECTACULAR_SETTINGS`. Описание Spectacular всё ещё говорит, что живо только health.
- `backend/config/urls.py` — админка на `api/admin/`. Каталог, заявки и контент уже подключены. У `accounts` своего `urls.py` ещё нет.
- `AUTH_USER_MODEL = "accounts.User"`. `USERNAME_FIELD` — email. Модель не переписывать.
- Health в `apps.core` отвечает `{"status":"ok"}`. Его не менять.
- `frontend/` не трогать. Экрана входа в этой волне нет.
- Новые приложения в `INSTALLED_APPS` по-прежнему не добавлять. `cart` и `orders` не наполнять.

### Зона ответственности

Можно: `backend/apps/accounts/` (вью входа, аналитика, шаблон, `urls.py`), точечно `REST_FRAMEWORK`, `SPECTACULAR_SETTINGS`, `UNFOLD` и два новых пути в `config/urls.py`.

Нельзя: поля товара, заявок и `HomeBlock`, публичная страница аналитики, React, снятие `AllowAny` с API по умолчанию.

### Шаги

1. Staff-страница `GET /api/admin/analytics/`. Путь зарегистрировать в `config/urls.py` **выше** `path("api/admin/", admin.site.urls)`. Иначе include админки заберёт адрес и снаружи будет 404. Декоратор — `staff_member_required`, аргумент `login_url="/api/admin/login/"`. Гость уходит на логин админки и чисел не видит.
2. Шаблон лежит в `backend/apps/accounts/templates/` и использует оформление Unfold, а не отдельный публичный сайт. В `UNFOLD["SIDEBAR"]` есть пункт на `/api/admin/analytics/`. Если `navigation` заменяет автоматический список моделей, в том же списке остаются Catalog, Leads, Content, Users и Groups.
3. Только чтение, без новых моделей и без сырого SQL:
   - товары published и unpublished, отдельно `textile` и `baby` (через `category__store`);
   - число категорий в каждом магазине;
   - подписчики: всего и с `created_at` за последние 7 дней;
   - опт: всего и пять последних — имя, email, дата;
   - пользователи: всего и сколько `is_staff`;
   - число `HomeBlock`.
   Ссылки ведут на существующие списки: `/api/admin/catalog/product/`, `/api/admin/catalog/category/`, `/api/admin/leads/newslettersubscriber/`, `/api/admin/leads/wholesaleinquiry/`, `/api/admin/accounts/user/`, `/api/admin/content/homeblock/`.
4. JWT в `apps/accounts/urls.py`, include на `api/auth/`:
   - `POST /api/auth/token/` — тело `email` и `password`, ответ `access` и `refresh`. Поле называется `email`, потому что `USERNAME_FIELD` уже email.
   - `POST /api/auth/token/refresh/` — тело `refresh`, ответ `access`.
   - `GET /api/auth/me/` — `IsAuthenticated`. Без заголовка **401**. С токеном — `email`, `first_name`, `last_name`.
5. В `REST_FRAMEWORK`: `DEFAULT_PAGINATION_CLASS = "rest_framework.pagination.PageNumberPagination"` и `PAGE_SIZE = 12`. `DEFAULT_PERMISSION_CLASSES` оставить `AllowAny`. Сессионную аутентификацию в список по умолчанию не добавлять: иначе публичные POST витрины упрутся в CSRF.
6. `SPECTACULAR_SETTINGS["DESCRIPTION"]` называет каталог, блоки главной, заявки и вход. Формулировку «Health only» убрать.

### Definition of Done

Lead не мержит, пока: staff видит шесть групп чисел, и они сходятся со списками админки; гость чисел не видит; `POST /api/auth/token/` с email суперпользователя возвращает `access` и `refresh`; `GET /api/auth/me/` без токена даёт 401; Swagger открывается и больше не описан как «Health only»; health по-прежнему `{"status":"ok"}`; `migrate` на чистом SQLite проходит; модели каталога, заявок и контента в diff нет.

### Проверка

```bash
cd backend
python manage.py runserver
```

Войти в `/api/admin/` как суперпользователь. Открыть `/api/admin/analytics/`. Сверить числа со списками. В Swagger вызвать `POST /api/auth/token/` телом `{"email":"...","password":"..."}`, затем `GET /api/auth/me/` с `Authorization: Bearer <access>` и без него. Выйти из админки и убедиться, что аналитика чисел не показывает.

### Нельзя

Не менять модели Vach, Daniel и Hayk. Не делать аналитику доступной без staff. Не ставить `IsAuthenticated` на весь API. Не строить страницу входа на React. Не наполнять `cart` и `orders`.

## English

You are student **2**, Suro, branch `feat/suro-api`, zone `api`. Do not delete [backend/apps/accounts/README.md](../../backend/apps/accounts/README.md).

Wave 1 is in `dev`: email user, empty packages, URL includes. Do not redo that. This wave your zone is heavier than the others.

Start from `dev`: pull, update `feat/suro-api`, one PR, base `dev`. No force-push. No Postgres. No React login. Finish by the end of January.

You are first among the code. Queue: **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**.

`AUTH_USER_MODEL` is already `accounts.User`. Do not rewrite the model. Do not register new apps. Do not touch health. Do not fill `cart` or `orders`.

**Own:** `backend/apps/accounts/` (analytics, JWT, template, `urls.py`), plus `PAGE_SIZE`, the Spectacular description, the Unfold sidebar item, and two paths in `config/urls.py`.

**Do not own:** product, lead, and `HomeBlock` fields; a public analytics URL; the storefront.

**Steps**

1. Staff-only `GET /api/admin/analytics/`. Register it **before** `path("api/admin/", admin.site.urls)`. Use `staff_member_required` with `login_url="/api/admin/login/"`. A guest goes to the admin login and sees no numbers.
2. Template under `backend/apps/accounts/templates/`, Unfold chrome, sidebar link to `/api/admin/analytics/`. If `navigation` replaces the automatic model list, keep Catalog, Leads, Content, Users, and Groups.
3. Read-only, no new models, no raw SQL. Published and unpublished products for `textile` and for `baby`. Categories per store. Newsletter total and created in the last 7 days. Wholesale total and the five latest (name, email, date). Users total and staff. `HomeBlock` count. Link each group to `/api/admin/catalog/product/`, `/api/admin/catalog/category/`, `/api/admin/leads/newslettersubscriber/`, `/api/admin/leads/wholesaleinquiry/`, `/api/admin/accounts/user/`, `/api/admin/content/homeblock/`.
4. `POST /api/auth/token/` with `email` and `password` returns `access` and `refresh`. `POST /api/auth/token/refresh/` takes `refresh`. `GET /api/auth/me/` is `IsAuthenticated`: 401 without a bearer token, otherwise `email`, `first_name`, `last_name`. Mount them at `api/auth/`.
5. Set `PageNumberPagination` and `PAGE_SIZE = 12`. Leave `AllowAny` as the default permission. Do not add session authentication.
6. Replace the Spectacular “Health only” description with catalog, home blocks, leads, and auth.

**Done when** the six groups match the admin lists, a guest sees no numbers, token login returns both tokens, `me` without a token is 401, Swagger no longer says “Health only”, health is still `{"status":"ok"}`, and catalog, lead, and content models are untouched.

```bash
cd backend
python manage.py runserver
```

## Հայերեն

Դու աշակերտ **2**-ն ես, Suro, ճյուղը՝ `feat/suro-api`, գոտին՝ `api`։ Չջնջել [backend/apps/accounts/README.md](../../backend/apps/accounts/README.md)։

Wave 1-ն արդեն `dev`-ում է՝ email user, դատարկ փաթեթներ, URL include-ներ։ Դա նորից չանել։ Այս ալիքում քո գոտին մյուսներից մեծ է։

Սկսիր `dev`-ից, թարմացրու `feat/suro-api`, մեկ PR, base-ը `dev`։ `--force` չանել։ Postgres չբարձրացնել։ React մուտքի էջ չսարքել։ Ավարտել մինչև հունվարի վերջ։

Կոդի մեջ առաջինը դու ես։ Հերթը՝ **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**։

`AUTH_USER_MODEL`-ն արդեն `accounts.User` է։ Մոդելը չվերաշարադրել։ Նոր հավելված չգրանցել։ Health-ը չփոխել։ `cart`-ը և `orders`-ը չլցնել։

**Քոնն է՝** `backend/apps/accounts/` (անալիտիկա, JWT, շաբլոն, `urls.py`), `PAGE_SIZE`, Spectacular-ի նկարագիրը, Unfold-ի sidebar կետը և երկու ուղի `config/urls.py`-ում։

**Քոնը չէ՝** ապրանքի, հայտի և `HomeBlock`-ի դաշտերը, հրապարակային անալիտիկայի URL-ը, խանութի էջերը։

**Քայլեր**

1. Միայն staff-ի `GET /api/admin/analytics/`։ Գրանցիր այն **`path("api/admin/", admin.site.urls)`-ից առաջ**։ Գործածիր `staff_member_required`՝ `login_url="/api/admin/login/"`։ Հյուրը գնում է ադմինի մուտք և թվեր չի տեսնում։
2. Շաբլոնը՝ `backend/apps/accounts/templates/`-ում, Unfold-ի տեսքով, sidebar հղում դեպի `/api/admin/analytics/`։ Եթե `navigation`-ը փոխարինում է ավտոմատ ցանկը, թող Catalog, Leads, Content, Users և Groups։
3. Միայն կարդալ, առանց նոր մոդելի և առանց հում SQL. published և unpublished ապրանքներ `textile`-ի և `baby`-ի համար, կատեգորիաներ ըստ խանութի, բաժանորդներ՝ ընդամենը և վերջին 7 օրվա, մեծածախ՝ ընդամենը և վերջին հինգը (անուն, email, ամսաթիվ), user-ներ՝ ընդամենը և staff, `HomeBlock`-ի քանակ։ Հղումները՝ `/api/admin/catalog/product/`, `/api/admin/catalog/category/`, `/api/admin/leads/newslettersubscriber/`, `/api/admin/leads/wholesaleinquiry/`, `/api/admin/accounts/user/`, `/api/admin/content/homeblock/`։
4. `POST /api/auth/token/`՝ `email` և `password`, պատասխանը՝ `access` և `refresh`։ `POST /api/auth/token/refresh/`՝ `refresh`։ `GET /api/auth/me/`՝ `IsAuthenticated`. առանց թոքենի 401, թոքենով՝ `email`, `first_name`, `last_name`։ Կախիր `api/auth/`-ից։
5. Դիր `PageNumberPagination` և `PAGE_SIZE = 12`։ Լռելյայն իրավունքը թող `AllowAny`։ Session authentication մի ավելացրու։
6. Spectacular-ի «Health only» նկարագրությունը փոխարինիր կատալոգով, գլխավորի բլոկներով, հայտերով և մուտքով։

**Ավարտված է, երբ** վեց խումբը համընկնում է ադմինի ցանկերին, հյուրը թվեր չի տեսնում, token մուտքը վերադարձնում է երկու թոքեն, `me`-ն առանց թոքենի 401 է, Swagger-ը այլևս «Health only» չէ, health-ը մնում է `{"status":"ok"}`, իսկ կատալոգի, հայտի և կոնտենտի մոդելները չեն դիպչվել։

```bash
cd backend
python manage.py runserver
```
