# Ventum — задание B1

Настоящий магазин: вход, витрина Textile и витрина Baby. Это задание собирает данные и админку, на которых магазин потом стоит. Вёрстку по макету здесь не делаем.

Макеты интерфейса:

- [Ventum — кадр магазина](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12495)
- [Ventum — второй файл макета](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=0-1)

**Срок:** закончить до конца декабря.  
**Git:** [CONTRIBUTING.md](CONTRIBUTING.md). Короткий список: [TASK.md](TASK.md). Доска merge: [docs/zones/lead/README.md](docs/zones/lead/README.md).

База — SQLite. Postgres не поднимать. Админка: `http://127.0.0.1:8000/api/admin/`. Проверка жизни сервера: `http://127.0.0.1:8000/api/health/`.

---

## Команда

Одна зона на человека. Чужие файлы не переписывать. Имена catalog и ui учитель допишет; до этого ветка с `<имя>`.

| # | Имя | Ветка | Зона |
|---|-----|--------|------|
| 1 | Lead | `feat/lead` | `lead` |
| 2 | Suro | `feat/suro-api` | `api` |
| 3 | Artush | `feat/artush-i18n` | `i18n` |
| 4 | Hayk | `feat/hayk-gateway` | `gateway` |
| 5 | Mariam | `feat/mariam-header` | `header` |
| 6 | Daniel | `feat/daniel-footer` | `footer` |
| 7 | Karen | `feat/karen-textile` | `textile` |
| 8 | Svet | `feat/svet-baby` | `baby` |
| 9 |  | `feat/<имя>-catalog` | `catalog` |
| 10 |  | `feat/<имя>-ui` | `ui` |

Порядок merge:

```
Lead → Suro → Artush → catalog → Daniel → Hayk → Karen → Svet → Mariam → ui
```

Suro первый среди кода: приложения и пользователь должны существовать до чужих миграций. Catalog после Artush: переводы наследуют его класс. Karen и Svet после catalog: им нужны готовые модели. Mariam после Karen и Svet: поиск проверяется на их данных. ui последний: тесты на уже смерженные модели.

---

## Как сдать

1. `git checkout dev && git pull`, затем ветка из таблицы.
2. Работа только в своих файлах. README в папке не удалять.
3. Один pull request, **base = `dev`**. В описании — что сделано и что `python manage.py migrate` проходит на SQLite.
4. В `main` не пушить. `--force` на `dev` и `main` не делать.

Каркас уже проверен: миграции применяются, `manage.py check` без замечаний, `/api/health/` отвечает `{"status":"ok"}`, `/api/admin/login/` открывается. Lead чужие модели не пишет и мержит только в порядке выше.

---

## Чьи файлы

| Зона | Можно | Нельзя |
|------|--------|--------|
| Lead | порядок PR, конфликт только чтобы собрать `dev` | модели и вёрстку зон |
| Suro | `apps/accounts/`, пустые пакеты приложений, `INSTALLED_APPS`, `include` в `config/urls.py` | поля товара, заявки, слоты главной, `search.py` |
| Artush | `apps/core/languages.py`, абстрактный перевод | вью `/api/health/`, JSON фронта |
| catalog | `apps/catalog/models.py`, `admin.py`, миграции | `search.py`, страницы React |
| Daniel | `apps/leads/` | API-ручки и `Footer.jsx` |
| Hayk | `apps/content/` | `pages/Gateway/` |
| Karen | команда или фикстура textile | поля моделей и страницу `/textile` |
| Svet | команда или фикстура baby | поля моделей и страницу `/baby` |
| Mariam | `apps/catalog/search.py` | модели, миграции, `Header.jsx` |
| ui | тесты моделей | `NotFound` и `index.css` |

Новые приложения в `INSTALLED_APPS` регистрирует только Suro.

Языки контента: `am`, `en`, `ru`. Нет перевода на запрошенный язык — запись не пропадает; текст берётся из `en`, иначе из любого существующего. Это правило Artush пишет в docstring. Список API в этом задании не делаем.

---

## 1 — Lead

**Папка:** [docs/zones/lead/README.md](docs/zones/lead/README.md). **Ветка:** `feat/lead`.

Каркас уже проверен. Дальше Lead принимает PR в `dev` строго по порядку. Конфликт чинит вместе с владельцем файла и не переписывает зону.

После merge ui: удалить `backend/ventum.sqlite3`, снова `migrate`, создать суперпользователя с email, открыть `/api/health/` и `/api/admin/`.

**Не закрывать задание, пока:** в админке есть пользователь с логином-email, категории и товары Textile и Baby с переводами `am`/`en`/`ru`, подписчик рассылки и слот главной; health и Swagger живы.

## 2 — Suro · api

**Папка:** [backend/apps/accounts/README.md](backend/apps/accounts/README.md). **Ветка:** `feat/suro-api`.

**Сделать**

1. `accounts.User` от `AbstractUser`. `USERNAME_FIELD = "email"`, email уникален, есть имя. `REQUIRED_FIELDS` без email.
2. `AUTH_USER_MODEL = "accounts.User"` до `makemigrations`. Иначе Django оставит стандартного пользователя, и магазин потом не пересядет на email.
3. Пакеты `catalog`, `leads`, `content`: `apps.py`, `__init__.py`, пустой `models.py`, пустой `urls.py`. Модели туда не писать — их пишут владельцы зон. README не удалять.
4. Прописать приложения в `INSTALLED_APPS` и `include` в [backend/config/urls.py](backend/config/urls.py).
5. `makemigrations` только для `accounts`. `GET /api/health/` не менять.

**Lead не мержит, пока:** `createsuperuser` спрашивает email; пользователь виден в `/api/admin/`; Swagger открывается; в `catalog/models.py` нет товара; `migrate` на чистом SQLite проходит; health по-прежнему `{"status":"ok"}`.

## 3 — Artush · i18n

**Папка:** [backend/apps/core/README.md](backend/apps/core/README.md). **Ветка:** `feat/artush-i18n`.

**Сделать**

1. `backend/apps/core/languages.py`: только коды `am`, `en`, `ru` и подписи. Остальные модули импортируют их отсюда.
2. Абстрактная модель перевода в `apps/core`: язык из этого списка. Наследник задаёт связь с родителем. Пара «родитель + язык» уникальна.
3. В docstring: нет перевода на язык запроса — объект не удаляется из выдачи; текст из `en`, иначе из любого перевода, который есть.

Вью health не трогать. Файлы `frontend/src/i18n/` не трогать.

**Lead не мержит, пока:** три кода импортируются из одного модуля; миграция ядра проходит на SQLite; `/api/health/` отвечает `{"status":"ok"}`.

## 4 — catalog · имя пока пустое

**Папка:** [backend/apps/catalog/README.md](backend/apps/catalog/README.md). **Ветка:** `feat/<имя>-catalog`.

Ждать merge Suro и Artush. Пакет уже заведёт Suro.

**Сделать**

1. `Category`: необязательный родитель, `store` ровно `textile` или `baby` (так разделены два магазина в макете), уникальный slug, перевод `name` на `am`/`en`/`ru` через класс Artush.
2. `Product`: категория, цена `Decimal` в AMD, уникальный sku, флаг публикации, переводы `name` и `description`.
3. `ProductImage`: файл (Pillow), alt, порядок.
4. Админка Unfold: инлайн картинок и переводов, фильтр списка по `store`.

`search.py` не создавать. Его пишет Mariam после этого merge. Страницы React не менять.

**Lead не мержит, пока:** в `/api/admin/` сохраняются категория и товар с тремя переводами; `migrate` на чистом SQLite проходит; `search.py` нет; модели пользователя и слота главной не изменены.

## 5 — Daniel · footer

**Папка:** [backend/apps/leads/README.md](backend/apps/leads/README.md). **Ветка:** `feat/daniel-footer`.

Ждать, пока Suro заведёт пакет `leads`. Страницу Footer не верстать.

**Сделать**

1. `NewsletterSubscriber`: email уникален, дата создания.
2. `WholesaleInquiry`: имя, телефон, email, текст, дата. Это заявка, не товар.
3. Обе модели в админке, списком. URL для отправки с сайта не добавлять.

**Lead не мержит, пока:** обе модели видны в `/api/admin/`; второй такой же email подписки база не принимает; в `urls` нет ручек этих заявок.

## 6 — Hayk · gateway

**Папка:** [backend/apps/content/README.md](backend/apps/content/README.md). **Ветка:** `feat/hayk-gateway`.

Ждать Suro и Artush. Страницу `/` не верстать: макет лежит в Figma, в этом задании только данные слота.

**Сделать**

1. `HomeBlock`: ключ слота (`hero` или `stores` — блоки входа в макете), порядок, переводы `title` и `text` на `am`/`en`/`ru`.
2. Админка с инлайном переводов.

**Lead не мержит, пока:** слот `hero` сохраняется на трёх языках; модели товара не изменены; `frontend/src/pages/Gateway/` без новой вёрстки.

## 7 — Karen · textile

**Папка:** [frontend/src/pages/Textile/README.md](frontend/src/pages/Textile/README.md). **Ветка:** `feat/karen-textile`.

Ждать merge catalog. Страницу `/textile` не собирать. Поля `Category` и `Product` не менять.

**Сделать**

Команда `seed_textile` или фикстура:

- минимум две категории с `store=textile` и переводами `am`, `en`, `ru`;
- один опубликованный товар с ценой в AMD и тремя переводами имени;
- картинка — файл из репозитория, не случайная ссылка в интернет;
- повторный запуск не создаёт второй slug;
- записи Baby не удаляются.

**Lead не мержит, пока:** команда или `loaddata` на чистой базе создаёт эти записи и второй запуск не падает и не плодит дубликаты.

## 8 — Svet · baby

**Папка:** [frontend/src/pages/Baby/README.md](frontend/src/pages/Baby/README.md). **Ветка:** `feat/svet-baby`.

То же для `store=baby`: команда `seed_baby`, две свои категории и один товар, три языка. Данные Karen не стирать и не переписывать. Страницу `/baby` не собирать. Поля моделей не менять.

**Lead не мержит, пока:** фильтр админки по `store` показывает и Textile, и Baby; повторный запуск не плодит slug.

## 9 — Mariam · header

**Папка:** [frontend/src/components/Header/README.md](frontend/src/components/Header/README.md). **Ветка:** `feat/mariam-header`.

Ждать merge catalog, Karen и Svet. `Header.jsx` не менять.

**Сделать** только `backend/apps/catalog/search.py`:

1. `search_products(queryset, query)`.
2. Пустой запрос или пробелы — тот же queryset, без фильтра.
3. Иначе поиск по sku и по переведённому имени (`am`, `en` или `ru`), без учёта регистра.
4. В docstring контракт на будущее, без вью и без URL: `GET /api/products/?q=&store=&language=`.

**Lead не мержит, пока:** на данных Karen и Svet функция находит товар по sku и по имени на каждом из трёх языков; пустой запрос ничего не отрезает; в diff нет правок `models.py`.

## 10 — ui · имя пока пустое

**Папка:** [frontend/src/pages/NotFound/README.md](frontend/src/pages/NotFound/README.md). **Ветка:** `feat/<имя>-ui`.

Ждать все модели. Страницу 404 и `index.css` не менять.

**Сделать** тесты на SQLite, без сети и без Postgres:

- пользователь с email;
- категория с тремя переводами, товар Textile и товар Baby;
- товар без перевода `ru` всё равно сохраняется;
- `NewsletterSubscriber`;
- `python manage.py test` целиком зелёный.

**Lead не мержит, пока:** `manage.py test` зелёный целиком.

---

## Готово, когда

После merge ui Lead поднимает пустой SQLite. В админке без правки кода видны пользователь, слот главной, подписчик, категории и товары обоих магазинов на `am`, `en` и `ru`. Health и Swagger отвечают.

---

## English

Real shop data for Textile and Baby. This assignment is models and admin only. Do not build pages from the designs yet.

Designs:

- [Ventum shop frame](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12495)
- [Second Ventum design file](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=0-1)

Finish by the end of December. SQLite only. Admin: `/api/admin/`. Health: `/api/health/`. One pull request per zone, base `dev`. Do not push `main`.

| # | Name | Branch | Zone |
|---|------|--------|------|
| 1 | Lead | `feat/lead` | lead |
| 2 | Suro | `feat/suro-api` | api |
| 3 | Artush | `feat/artush-i18n` | i18n |
| 4 | Hayk | `feat/hayk-gateway` | gateway |
| 5 | Mariam | `feat/mariam-header` | header |
| 6 | Daniel | `feat/daniel-footer` | footer |
| 7 | Karen | `feat/karen-textile` | textile |
| 8 | Svet | `feat/svet-baby` | baby |
| 9 |  | `feat/<name>-catalog` | catalog |
| 10 |  | `feat/<name>-ui` | ui |

Merge order: **Lead → Suro → Artush → catalog → Daniel → Hayk → Karen → Svet → Mariam → ui**.

| Zone | Do this | Lead merges only when |
|------|---------|------------------------|
| Lead | Merge in that order. After ui, migrate a fresh sqlite and open health and admin | User, both stores, newsletter, and home slot exist in admin |
| Suro | Email is the login. Empty `catalog`, `leads`, `content` packages. Register them. Do not fill their models | Superuser asks for email; Swagger opens; health stays `{"status":"ok"}` |
| Artush | `languages.py` with `am`, `en`, `ru` and an abstract translation. Do not edit the health view or frontend JSON | Three codes import from one module; core migration applies |
| catalog | Category (`store` textile or baby), Product (AMD `Decimal`, sku), images, Unfold admin | A product with three translations saves in admin; no `search.py` |
| Daniel | `NewsletterSubscriber` (unique email) and `WholesaleInquiry`. No public URL | Both models are in admin; duplicate subscriber email is rejected |
| Hayk | `HomeBlock` with title and text in three languages. Do not restyle `/` | Slot `hero` saves in three languages |
| Karen | `seed_textile`: two categories, one product, three languages. Do not change model fields or the page | Second run does not duplicate slugs or delete Baby |
| Svet | `seed_baby`, same rules, `store=baby`. Do not delete Textile | Admin filter shows both stores |
| Mariam | `search_products` in `search.py` only. Match sku and translated name. Empty query returns the queryset | Finds Karen’s and Svet’s products; `models.py` is untouched |
| ui | SQLite tests for user, both stores, a product with no `ru` translation, and a subscriber | `manage.py test` is green with no network |

The Russian sections above are the full steps. Follow the row for your zone.

## Հայերեն

Սա իրական խանութի տվյալներն են՝ Textile և Baby։ Այս առաջադրանքը միայն մոդելներ և ադմին է։ Մակետից էջ դեռ չենք հավաքում։

Մակետներ.

- [Ventum խանութ](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12495)
- [Ventum երկրորդ ֆայլ](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=0-1)

Ավարտել մինչև դեկտեմբերի վերջ։ Միայն SQLite։ Ադմին՝ `/api/admin/`։ Health՝ `/api/health/`։ Մեկ PR = մեկ գոտի, base-ը `dev`։ `main` չենք push անում։

| # | Անուն | Ճյուղ | Գոտի |
|---|------|--------|------|
| 1 | Lead | `feat/lead` | lead |
| 2 | Suro | `feat/suro-api` | api |
| 3 | Artush | `feat/artush-i18n` | i18n |
| 4 | Hayk | `feat/hayk-gateway` | gateway |
| 5 | Mariam | `feat/mariam-header` | header |
| 6 | Daniel | `feat/daniel-footer` | footer |
| 7 | Karen | `feat/karen-textile` | textile |
| 8 | Svet | `feat/svet-baby` | baby |
| 9 |  | `feat/<անուն>-catalog` | catalog |
| 10 |  | `feat/<անուն>-ui` | ui |

Merge-ի կարգը՝ **Lead → Suro → Artush → catalog → Daniel → Hayk → Karen → Svet → Mariam → ui**։

| Գոտի | Անել | Lead-ը merge է անում, երբ |
|------|------|---------------------------|
| Lead | PR-ները այս կարգով։ ui-ից հետո՝ մաքուր sqlite, health և ադմին | Ադմինում կան user, երկու խանութ, newsletter, գլխավոր սլոթ |
| Suro | Մուտքը email-ով։ Դատարկ `catalog`, `leads`, `content`։ Մոդելները չլրացնել | Superuser-ը հարցնում է email; Swagger-ը բացվում է; health-ը `{"status":"ok"}` է |
| Artush | `am`, `en`, `ru` և աբստրակտ թարգմանություն։ Health-ը և frontend JSON-ը չփոխել | Երեք կոդ մեկ մոդուլից են; միգրացիան անցնում է |
| catalog | Category (`store` textile կամ baby), Product (AMD, sku), նկարներ, ադմին | Երեք թարգմանությամբ ապրանքը պահվում է; `search.py` չկա |
| Daniel | `NewsletterSubscriber` (եզակի email) և `WholesaleInquiry`։ Հանրային URL չկա | Երկու մոդելն էլ ադմինում են; կրկնակի email-ը մերժվում է |
| Hayk | `HomeBlock` երեք լեզվով։ `/` էջը չձևավորել | `hero` սլոթը պահվում է երեք լեզվով |
| Karen | `seed_textile`՝ երկու կատեգորիա, մեկ ապրանք, երեք լեզու | Երկրորդ անգամը slug չի կրկնում և Baby-ն չի ջնջում |
| Svet | `seed_baby`, `store=baby`։ Textile-ը չջնջել | Ֆիլտրը ցույց է տալիս երկու խանութը |
| Mariam | Միայն `search.py`։ sku և թարգմանված անուն։ Դատարկ հարցումը queryset-ը չի կտրում | Գտնում է Karen-ի և Svet-ի ապրանքը; `models.py` չի փոխվել |
| ui | SQLite թեստեր՝ user, երկու խանութ, ապրանք առանց `ru`, բաժանորդ | `manage.py test`-ը կանաչ է, առանց ցանցի |

Քայլ առ քայլ տեքստը ռուսերեն բաժիններում է։ Աղյուսակի տողը քո պայմանագիրն է։
