# Task advanced — карта зон и волн Ventum

Короткое задание текущей волны: [TASK.md](TASK.md).  
Git: [CONTRIBUTING.md](CONTRIBUTING.md).  
Макет: [Figma Untitled](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12495).  
Оплата: [docs/idram.md](docs/idram.md). Письмо магазину: [docs/order-email.md](docs/order-email.md).  
PostgreSQL и VPS: [docs/postgresql.md](docs/postgresql.md) — только волна **D1**.

**Сейчас открыта волна B1.** Волны B2, B3, F1–F6 и D1 ниже — программа, её не делать заранее.

Пять имён уже назначены. Остальные клетки пустые: учитель допишет имя, ученик возьмёт ветку `feat/<имя>-<зона>`. Доска merge: [docs/zones/lead/README.md](docs/zones/lead/README.md).

---

## Ритм урока

Один урок = один день работы. Следующий день = merge в `dev` и новая волна.

1. **День задания.** `git checkout dev && git pull`, ветка `feat/<имя>-<зона>`, работа только в своих файлах, PR в `dev`.
2. **День merge.** Lead мержит строго по порядку этой волны. Остальные подтягивают `dev` и берут следующую волну из [TASK.md](TASK.md).
3. В `main` не пушить. Один PR = одна зона.

Пока волна не смержена, следующую не начинать: иначе модели и API разъедутся.

---

## Команда на весь проект

Одна зона от B1 до D1. Чужие файлы не переписывать.

| # | Имя | Ветка | Зона |
|---|-----|--------|------|
| 1 | Aram | `feat/aram-lead` | `lead` |
| 2 | Suro | `feat/suro-api` | `api` |
| 3 | Artush | `feat/artush-i18n` | `i18n` |
| 4 | Hayk | `feat/hayk-gateway` | `gateway` |
| 5 | Mariam | `feat/mariam-header` | `header` |
| 6 |  | `feat/<имя>-footer` | `footer` |
| 7 |  | `feat/<имя>-textile` | `textile` |
| 8 |  | `feat/<имя>-baby` | `baby` |
| 9 |  | `feat/<имя>-catalog` | `catalog` |
| 10 |  | `feat/<имя>-ui` | `ui` |

---

## Карта слоёв

| Слой | Где | Волна |
|------|-----|--------|
| Lead | git, порядок PR, CI | все |
| Модели каталога | `backend/apps/catalog/` | **B1** |
| Аккаунт | `backend/apps/accounts/` | **B1** модель, **B2** JWT |
| Переводы am / en / ru | модели `*Translation` и JSON | **B1** контент, **F1** `ru.json` |
| Публичное API | DRF, Swagger, `?language=` `?store=` | **B2** |
| Корзина | `backend/apps/cart/` | **B2** |
| Заказ, Idram, письмо, история | `backend/apps/orders/` | **B3** |
| Frontend Figma | `frontend/src/` | **F1–F6** |
| Deploy | VPS, Docker Compose, домен, Postgres | **D1** |

Два перевода:

1. **Контент** — названия товаров и категорий в БД (`am`, `en`, `ru`). Волна **B1**, отдача в API — **B2**.
2. **Интерфейс** — подписи кнопок в `frontend/src/i18n/am.json`, `en.json`, `ru.json`. Файл `ru.json` добавляет зона `i18n` в **F1**. Коды языка везде: `am`, `en`, `ru`. `<html lang>` равен активному коду.

---

## Календарь (ориентир)

Даты можно сдвинуть. Смысл тот же: день работы, следующий день merge. Декабрь начинается с доделки F6 и deploy, если ноябрь кончится на F5.

| День | Что |
|------|-----|
| 6 ноя | **B1** задание |
| 9 ноя | **B1** merge, выдача **B2** |
| 10 ноя | **B2** работа |
| 11 ноя | **B2** merge, выдача **B3** |
| 12 ноя | **B3** работа |
| 13 ноя | **B3** merge, backend заморожен |
| 16–17 ноя | **F1** работа / merge |
| 18–19 ноя | **F2** |
| 20 и 23 ноя | **F3** |
| 24–25 ноя | **F4** |
| 26–27 ноя | **F5** |
| 30 ноя – 1 дек | **F6** |
| 2–3 дек | **D1** VPS |

---

## Чьи файлы

| Зона | Можно править | Нельзя |
|------|----------------|--------|
| `lead` | CI, порядок merge, конфликт только чтобы собрать `dev` | бизнес-логику зон |
| `api` | `apps/accounts/`, `apps/orders/`, `config/settings.py`, `config/urls.py` (только `include`) | модели каталога и корзины |
| `i18n` | `apps/core/languages.py`, базовый класс перевода, `frontend/src/i18n/*` | тексты чужих страниц «от себя» — ключ заводит владелец экрана, перевод трёх языков делает `i18n` |
| `gateway` | `apps/content/`, `frontend/src/pages/Gateway/` | Header/Footer |
| `header` | `apps/catalog/search.py`, `frontend/src/components/Header/` | модели Product |
| `footer` | `apps/leads/`, `frontend/src/components/Footer/` | checkout |
| `textile` | фикстуры textile, `frontend/src/pages/Textile/` | общее поле `store` (его делает `catalog`) |
| `baby` | фикстуры baby, `frontend/src/pages/Baby/` | то же |
| `catalog` | `apps/catalog/` кроме `search.py`, `apps/cart/`, страницы каталога, карточка товара, checkout UI | Idram callback и `Order` |
| `ui` | тесты, токены в `frontend/src/index.css`, `pages/NotFound/` | чужие страницы, кроме бага вёрстки по чеклисту |

Новые приложения в `INSTALLED_APPS` регистрирует только `api`.

---

## Оплата (зафиксировано)

Гостевого заказа нет. Перед оплатой покупатель **регистрируется или входит** (email + пароль, JWT). Дальше заказ `pending` и редирект на страницу **Idram**. Карту VISA или Mastercard вводят **только на стороне Idram**, не в форме Ventum. После подтверждения на `RESULT_URL` статус `paid`, заказ виден в `GET /api/orders/me/`, магазину уходит одно письмо на `ORDER_NOTIFY_EMAIL`. Подробности — в docs, не в этой волне, пока не открыта **B3** (сервер) и **F5–F6** (экраны).

---

# B1 — модели и админка (открыта)

SQLite. Idram, корзину, JWT-ручки и вёрстку Figma не делать. Админка этого проекта: `/api/admin/`. Health: `/api/health/`.

Порядок merge (Aram мержит только так):

```
Aram → Suro → Artush → catalog → footer → Hayk → textile → baby → Mariam → ui
```

Suro первый среди кода: пустые приложения и `accounts.User` должны появиться до миграций с внешними ключами. Catalog после Artush, потому что переводы наследуют общий класс. Фикстуры textile/baby после моделей. ui последний — тесты на уже смерженные модели.

День задания **Aram** закрыт 6 ноября 2026: `migrate` без новых миграций, `manage.py check` без замечаний, `GET /api/health/` отвечает `{"status":"ok"}`, страница входа `/api/admin/login/` открывается. Он ждёт PR остальных и не пишет их модели.

### Общие шаги

1. Прочитай свою секцию ниже и README в своей папке.
2. `git checkout dev && git pull`, затем ветка из таблицы команды.
3. `python manage.py migrate` и `runserver` на SQLite. Postgres не поднимать.
4. Один PR в `dev`. В описании: что сделано и вывод `migrate`.

### 1 — Aram · lead

**Папка:** [docs/zones/lead/README.md](docs/zones/lead/README.md). Чужие `models.py` не писать.

**Уже сделано:** доска merge с пустой колонкой PR; каркас проверен (см. выше).

**Дальше, в день merge:** мержить строго по порядку. Конфликт чинить вместе с владельцем файла. После ui: удалить `backend/ventum.sqlite3`, снова `migrate`, создать суперпользователя с email, открыть `/api/health/` и `/api/admin/`.

**Lead не закрывает волну, пока:** на `dev` есть пользователь с логином-email, категория и товар textile и baby с переводами `am`/`en`/`ru`, заявка newsletter, слот главной; health и Swagger живы; в git нет секрета Idram.

### 2 — Suro · api

**Папка:** [backend/apps/accounts/README.md](backend/apps/accounts/README.md).

**Файлы:** `apps/accounts/` (модель здесь), пустые пакеты `catalog`, `cart`, `orders`, `leads`, `content` (`apps.py`, `__init__.py`, пустой `models.py`, пустой `urls.py`). Плюс `AUTH_USER_MODEL`, `INSTALLED_APPS`, `include` в [backend/config/urls.py](backend/config/urls.py). README в папках не удалять.

**Не трогать:** поля Category/Product, `search.py`, модели заявок и HomeBlock, фронт.

**Шаги:**

1. `accounts.User` наследует `AbstractUser`. `USERNAME_FIELD = "email"`, email уникален, есть имя для заказа. `REQUIRED_FIELDS` без email. Это первая миграция с пользователем: `AUTH_USER_MODEL = "accounts.User"` до `makemigrations`.
2. Остальные пять приложений зарегистрируй, но модели в них не пиши. `makemigrations` только для `accounts`.
3. `GET /api/health/` оставь как есть.

**Lead не мержит, пока:** `createsuperuser` спрашивает email; в админке виден пользователь; Swagger открывается; в `catalog/models.py` нет Category; `migrate` на чистом SQLite проходит; health по-прежнему `{"status":"ok"}`.

### 3 — Artush · i18n

**Папка:** [backend/apps/core/README.md](backend/apps/core/README.md). Фронт `ru.json` не в этой волне.

**Файлы:** `backend/apps/core/languages.py` и абстрактная модель перевода (в `apps/core`, чтобы catalog и content её наследовали). Health-вью не менять.

**Шаги:**

1. Коды только `am`, `en`, `ru`, с человекочитаемыми подписями. Другие модули импортируют список отсюда, не копируют строки.
2. Абстрактная модель: поле языка из этого списка, связь с родителем задаёт наследник, пара (родитель, язык) уникальна.
3. В docstring правило: нет перевода на запрошенный язык — объект не пропадает; текст берётся из `en`, иначе из любого существующего. Сам API в B1 не делать.

**Lead не мержит, пока:** `from apps.core.languages import ...` отдаёт три кода; миграция ядра применяется на SQLite; `GET /api/health/` не сломан.

### 4 — catalog · имя пока пустое

**Папка:** [backend/apps/catalog/README.md](backend/apps/catalog/README.md). Ветка `feat/<имя>-catalog`, когда имя появится.

**Файлы:** `models.py`, `admin.py`, миграции каталога. Не создавать `search.py` — его пишет Mariam после твоего merge.

**Шаги:**

1. `Category`: необязательный родитель, `store` ровно `textile` или `baby`, уникальный slug, переводы `name` на `am`/`en`/`ru` через класс Artush.
2. `Product`: категория, цена `Decimal` в AMD (не строка), уникальный sku, флаг публикации, переводы `name` и `description`.
3. `ProductImage`: файл через Pillow, alt, порядок.
4. Unfold: инлайн картинок и переводов, в списке фильтр по `store`.

**Lead не мержит, пока:** в `/api/admin/` создаётся категория и товар с тремя переводами; `migrate` на чистом SQLite проходит; файла `search.py` нет; модели User и HomeBlock не изменены.

### 5 — footer · имя пока пустое

**Папка:** [backend/apps/leads/README.md](backend/apps/leads/README.md).

**Файлы:** только `apps/leads/` (пакет уже заведёт Suro). Фронт Footer в B1 не верстать.

**Шаги:**

1. `NewsletterSubscriber`: email уникален, дата создания.
2. `WholesaleInquiry`: имя, телефон, email, текст, дата. Это заявка опта, не заказ и не Idram.
3. Админка показывает список. Добавление вручную можно оставить, API не делать.

**Lead не мержит, пока:** обе модели видны в админке; повторный email подписки база не принимает; в `urls` нет `POST` этих заявок.

### 6 — Hayk · gateway

**Папка:** [backend/apps/content/README.md](backend/apps/content/README.md). Страницу `/` по Figma не делать (это F1).

**Файлы:** `apps/content/models.py` и админка. Пакет регистрирует Suro.

**Шаги:**

1. `HomeBlock`: ключ слота (`hero`, `stores`), порядок, переводы `title` и `text` на `am`/`en`/`ru` через класс Artush.
2. Админка с инлайном переводов.

**Lead не мержит, пока:** в админке сохраняется слот `hero` с тремя языками; модели товара не изменены; `frontend/src/pages/Gateway/` без новой вёрстки.

### 7 — textile · имя пока пустое

**Папка:** [frontend/src/pages/Textile/README.md](frontend/src/pages/Textile/README.md). Код данных — в backend, страница в B1 не макет.

**Файлы:** команда `seed_textile` или фикстура. Поля `Category` / `Product` не менять. Ждать merge catalog.

**Шаги:**

1. Минимум две категории `store=textile` и один опубликованный товар с ценой AMD.
2. У каждой записи переводы `am`, `en`, `ru`.
3. Картинка — свой файл или уже лежащий в репозитории плейсхолдер, не случайный внешний URL.

**Lead не мержит, пока:** команда (или `loaddata`) на чистой базе создаёт эти записи и не падает повторно; baby-категорий команда не удаляет.

### 8 — baby · имя пока пустое

**Папка:** [frontend/src/pages/Baby/README.md](frontend/src/pages/Baby/README.md).

То же для `store=baby`: команда `seed_baby`, свои две категории и один товар, три языка. Textile-данные не стирать и не переписывать.

**Lead не мержит, пока:** фильтр админки по `store` показывает и textile, и baby; повторный запуск не плодит дубликаты slug.

### 9 — Mariam · header

**Папка:** [frontend/src/components/Header/README.md](frontend/src/components/Header/README.md). Шапку по Figma не верстать (это F1).

**Файлы:** только `backend/apps/catalog/search.py`. Модели, миграции и `admin.py` не менять. Ждать merge catalog.

**Шаги:**

1. Функция `search_products(queryset, query)`.
2. Пустой запрос или пробелы — вернуть queryset без фильтра.
3. Иначе фильтр по sku и по переведённому имени (`am`, `en` или `ru`), без учёта регистра.
4. В docstring будущий контракт: `GET /api/products/?q=&store=&language=`. URL и вью не добавлять.

**Lead не мержит, пока:** на данных textile/baby функция находит товар по sku и по имени на каждом из трёх языков; пустой запрос ничего не отрезает; diff не содержит правок `models.py`.

### 10 — ui · имя пока пустое

**Папка:** [frontend/src/pages/NotFound/README.md](frontend/src/pages/NotFound/README.md). В B1 это тесты, не страница 404.

**Файлы:** тесты, например `apps/catalog/tests.py`, `apps/accounts/tests.py`, `apps/leads/tests.py`. Ждать все модели.

**Шаги:**

1. Тест создаёт пользователя с email.
2. Тест создаёт категорию с тремя переводами, товар textile и товар baby.
3. Товар без перевода на `ru` всё равно сохраняется.
4. Тест создаёт `NewsletterSubscriber`.
5. `python manage.py test` локально, база теста — SQLite, не Postgres.

**Lead не мержит, пока:** `manage.py test` зелёный целиком; тесты не ходят в сеть и не требуют Docker.

### DoD волны B1

Волна закрыта только после merge ui и повторной проверки Aram на пустом sqlite: админка наполняется данными сидов, три языка у контента, health и Swagger живы, секретов Idram в репозитории нет.

---

# B2 — публичное API, JWT, корзина (после merge B1)

Порядок merge:

```
Aram → Suro → Artush → catalog → Mariam → footer → Hayk → textile → baby → ui
```

JWT и список товаров раньше корзины. Поиск (`header`) после списка (`catalog`).

### 1 — Aram · lead

Swagger после мержа открывает все новые пути. CI гоняет `manage.py test`. В чате — порядок PR.

**Перед merge следующего:** предыдущий PR уже в `dev`.

**DoD:** на `dev` тесты B1+B2 зелёные.

### 2 — Suro · api

1. `POST /api/auth/register/` — email, password, name. `POST /api/auth/token/` и refresh (SimpleJWT).
2. Подключи `urls` приложений. Пагинация списка товаров.
3. Ошибки DRF единообразны. Пароли и секреты не логировать.

**Перед merge:** регистрация в Swagger создаёт пользователя, повторный email — 400.

**DoD:** регистрация и токен в Swagger; повторный email — 400.

### 3 — Artush · i18n

1. Общий helper: выбрать перевод `am`/`en`/`ru` с запасным `en`.
2. Опиши в Swagger query `language`. Неверный код — как `en`, не 500.

**Перед merge:** `?language=ru` у товара без русского текста не даёт 404 и не роняет список.

**DoD:** товар без `ru` не пропадает из списка при `?language=ru`.

### 4 — catalog · имя пока пустое

1. `GET /api/products/`, `GET /api/products/{slug}/`, `GET /api/categories/?store=`.
2. Поля: имя и описание на выбранном языке, цена AMD, картинки, `store`.
3. Приложение `cart`: модель корзины **пользователя** (не гостя), строки qty и product. `GET/POST/PATCH/DELETE /api/cart/`. Чужой корзины не видно.

**Перед merge:** `?store=textile` не показывает baby; чужая корзина по чужому токену не читается.

**DoD:** список фильтруется по `store`; в корзину кладётся только опубликованный товар.

### 5 — Mariam · header

1. `GET /api/products/?q=` через `search.py`.
2. В ответе корзины есть число штук — договорись с полем `catalog`, не дублируй endpoint.

**Перед merge:** `?q=` находит sku и имя; отдельного второго endpoint корзины нет.

**DoD:** поиск по sku и по имени на любом из трёх языков.

### 6 — footer · имя пока пустое

`POST /api/newsletter/` и `POST /api/wholesale/`. Повтор email подписки — 200 без второй строки. Опт не создаёт заказ.

**Перед merge:** оба POST есть в Swagger и не создают `Order`.

**DoD:** оба POST в Swagger, письма здесь не слать.

### 7 — Hayk · gateway

`GET /api/home/?language=` отдаёт блоки `HomeBlock` с запасным языком.

**Перед merge:** пустая база на `GET /api/home/` даёт пустой список, не 500.

**DoD:** пустая база — пустой список, не 500.

### 8 — textile · имя пока пустое

Тесты API: `store=textile` не содержит baby-товары.

**Перед merge:** тест `store=textile` зелёный и не требует Postgres.

**DoD:** тест в CI.

### 9 — baby · имя пока пустое

Тесты API: `store=baby` не содержит textile.

**Перед merge:** тест `store=baby` зелёный и не удаляет textile-товары.

**DoD:** тест в CI.

### 10 — ui · имя пока пустое

Тесты регистрации, списка, корзины без токена (401) и с токеном.

**Перед merge:** `manage.py test` зелёный целиком на SQLite.

**DoD:** `manage.py test` зелёный целиком.

### DoD волны B2

Каталог, поиск, главная, подписка, опт и корзина авторизованного пользователя работают на SQLite. Оплаты ещё нет.

---

# B3 — заказ, Idram, история, письмо (после B2)

Backend после этой волны **не расширять** новыми сущностями. Баги — точечно.

Порядок merge:

```
Aram → Suro → catalog → Mariam → Artush → footer → ui → Hayk → textile → baby
```

Сначала заказ и Idram (Suro), затем контракт корзины при checkout (catalog).

### 1 — Aram · lead

Проверь, что в git нет `IDRAM_SECRET_KEY` и пароля SMTP. Напомни: боевой callback заработает на публичном домене в D1; в B3 обязателен тест с поддельным POST.

**Перед merge следующего:** в diff нет секретов.

**DoD:** секреты только в `.env`, не в коммите.

### 2 — Suro · api

1. `Order` и строки: пользователь, сумма AMD, статус `pending` / `paid` / `failed`, номер счёта для Idram (`EDP_BILL_NO`).
2. `POST /api/checkout/` только с JWT. Создаёт заказ из корзины, корзину очищает, отдаёт данные для редиректа на Idram (см. [docs/idram.md](docs/idram.md)). Пустая корзина — 400.
3. `RESULT_URL`: precheck отвечает `OK` только если счёт и сумма совпали; подтверждение сверяет `EDP_CHECKSUM`, один раз ставит `paid`, пишет id транзакции. Повтор того же callback не шлёт второе письмо.
4. При переходе в `paid` — письмо на `ORDER_NOTIFY_EMAIL` по [docs/order-email.md](docs/order-email.md).
5. `GET /api/orders/me/` — заказы текущего пользователя.
6. Переменные в `settings` из env: `IDRAM_*`, `ORDER_NOTIFY_EMAIL`. В репозиторий ключи не класть.

**Перед merge:** фейковый confirmation с верной суммой ставит `paid` и шлёт одно письмо; неверная сумма не ставит `paid`.

**DoD:** тест: фейковый confirmation с верной суммой → `paid` + одно письмо в console backend; неверная сумма → заказ не `paid`.

### 3 — catalog · имя пока пустое

1. Checkout читает корзину и не даёт заказать чужой `cart`.
2. Цена строки фиксируется в заказе (смена цены товара потом не переписывает старый заказ).
3. Не реализуй callback Idram.

**Перед merge:** цена в строке заказа не меняется, если потом изменить цену товара. Callback Idram в этом PR нет.

**DoD:** тест цены в строке заказа.

### 4 — Mariam · header

Зафиксируй в Swagger-описании (текстом рядом с auth, без нового платежного кода): без токена checkout недоступен; регистрация — ручка B2.

**Перед merge:** checkout без JWT отвечает 401.

**DoD:** 401 на checkout без JWT.

### 5 — Artush · i18n

Письмо магазину можно на русском (внутреннее). Ошибки API checkout имеют понятный `detail`. Названия товаров в письме — язык `ru`, если перевода нет — `en`.

**Перед merge:** в тестовом письме имя товара не пустое (`ru`, иначе `en`).

**DoD:** письмо содержит имя товара не пустым.

### 6 — footer · имя пока пустое

Оптовая заявка по-прежнему не создаёт `Order` и не ходит в Idram.

**Перед merge:** тест опта не создаёт `Order`.

**DoD:** тест, что wholesale не меняет заказы.

### 7 — ui · имя пока пустое

Тесты precheck и checksum по [docs/idram.md](docs/idram.md). Секрет в тесте — фиктивная строка.

**Перед merge:** тесты precheck и checksum зелёные без сети.

**DoD:** тесты оплаты зелёные без сети Idram.

### 8 — Hayk · gateway

Не ломай `/api/home/` при новых `include`.

**Перед merge:** тест `GET /api/home/` всё ещё зелёный.

**DoD:** тест главной всё ещё зелёный.

### 9 — textile · имя пока пустое / 10 — baby · имя пока пустое

Регрессия: checkout товара своего `store` создаёт строку с этим товаром.

**Перед merge:** у textile и у baby есть тест, что свой товар попадает в строку заказа.

**DoD:** по одному тесту на магазин.

### DoD волны B3

Регистрация → корзина → заказ `pending` → подтверждение Idram → `paid` → письмо → запись в истории. Карточные данные на сервер Ventum не приходят. Новых фич backend после merge нет.

---

# F1 — оболочка и Figma (после B3)

Имена те же: **Aram** lead, **Suro** api, **Artush** i18n, **Hayk** gateway, **Mariam** header. Остальные клетки пустые. Не мержить строку, пока её DoD не виден на `dev`.

Порядок merge:

```
lead → ui → i18n → header → footer → gateway → catalog → textile → baby → api
```

Сначала токены и три языка интерфейса, потом каркас страниц. `api` в конце только если надо поправить CORS или поле, без новых моделей.

### Зоны

| Зона | Сделать | DoD |
|------|---------|-----|
| lead | мерж, `npm run build` на `dev` | build зелёный |
| ui | цвета и отступы из Figma в Tailwind / `index.css`, 404 | 375px без горизонтального скролла на 404 |
| i18n | `ru.json`, `supportedLngs`: `am`, `en`, `ru`, переключатель на три языка, `<html lang>` | все ключи Header/Footer есть в трёх файлах |
| header | каркас шапки по макету: поиск, язык, аккаунт, корзина, меню. Данные API можно заглушить | три языка переключаются |
| footer | подвал и слоты форм по макету, без боевой отправки если API ещё не подключён на экране | вёрстка desktop и 375px |
| gateway | страница `/` по кадру Gateway: выбор Textile и Baby | ссылки ведут на `/textile` и `/baby` |
| catalog | пустые состояния списка (loading / empty / error) как компоненты, без обязательной боевой сетки | компоненты не тянут чужой CSS |
| textile | секции `/textile` по Figma, тексты через i18n-ключи | страница открывается |
| baby | секции `/baby` по Figma | страница открывается |
| api | не менять модели; только если фронт упёрся в CORS локального Vite | health жив |

---

# F2 — каталог с API

Имена те же: **Aram**, **Suro**, **Artush**, **Hayk**, **Mariam**. Остальные пустые. Не мержить строку, пока её DoD не виден на `dev`.

Порядок: `lead → catalog → i18n → header → textile → baby → ui → gateway → footer → api`.

| Зона | Сделать | DoD |
|------|---------|-----|
| lead | merge | списки открываются с живого API |
| catalog | сетка товаров и категорий с `GET /api/products` и `categories`, состояния loading/error/empty | смена языка перезапрашивает `language` |
| i18n | ключи пустого каталога и ошибок на am/en/ru | нет сырого ключа на экране |
| header | поиск дергает `?q=` | пустой ввод не ломает список |
| textile | `/textile` показывает только `store=textile` | baby-товар не виден |
| baby | `/baby` только `store=baby` | textile-товар не виден |
| ui | общий вид карточки, alt у картинок | 375px |
| gateway | блоки `GET /api/home/` вместо заглушки, если слоты есть | пустой API не роняет страницу |
| footer | подписка `POST /api/newsletter/` | повтор email не пугает ошибкой 500 |
| api | правки только по багу списка | контракт B2 не ломать |

---

# F3 — карточка товара и Textile

Имена те же: **Aram**, **Suro**, **Artush**, **Hayk**, **Mariam**. Остальные пустые. Не мержить строку, пока её DoD не виден на `dev`.

Порядок: `lead → catalog → textile → i18n → ui → header → baby → gateway → footer → api`.

| Зона | Сделать | DoD |
|------|---------|-----|
| catalog | маршрут карточки товара: цена AMD, описание, картинки | 404 неизвестного slug |
| textile | страница магазина собрана секциями макета и ведёт в карточку | desktop и 375px |
| i18n | ключи карточки на трёх языках | |
| ui | галерея не растягивает страницу | |
| header | иконка корзины видна на карточке | |
| baby | не переписывать textile; только не сломать свои ссылки | |
| остальные | регрессия своих маршрутов | |

---

# F4 — Baby и узкая ширина

Имена те же: **Aram**, **Suro**, **Artush**, **Hayk**, **Mariam**. Остальные пустые. Не мержить строку, пока её DoD не виден на `dev`.

Порядок: `lead → baby → ui → catalog → i18n → header → footer → textile → gateway → api`.

| Зона | Сделать | DoD |
|------|---------|-----|
| baby | `/baby` по Figma на уровне textile | 375px |
| ui | проход 375px: `/`, `/textile`, `/baby`, карточка | нет горизонтального скролла |
| catalog | карточка на 375px | |
| i18n | недостающие строки baby | три языка |
| header / footer | меню на узком экране | |
| textile | не ломать F3 | |

---

# F5 — корзина, регистрация, checkout

Имена те же: **Aram**, **Suro**, **Artush**, **Hayk**, **Mariam**. Остальные пустые. Не мержить строку, пока её DoD не виден на `dev`.

Порядок: `lead → catalog → header → i18n → api → ui → footer → gateway → textile → baby`.

| Зона | Сделать | DoD |
|------|---------|-----|
| catalog | экран корзины и checkout: qty, сумма AMD, кнопка оплаты | без JWT форма регистрации/входа, затем `POST /api/checkout/` |
| header | вход, регистрация, выход, бейдж количества, ссылка «мои заказы» (список дорисует F6) | токен хранится и уходит в `Authorization` |
| i18n | тексты форм auth и checkout на am/en/ru | |
| api | только баг контракта checkout/cart | новые поля оплаты с карты не добавлять |
| ui | фокус и ошибки полей | |
| footer | форма опта `POST /api/wholesale/` | это не checkout |

На этом шаге браузер уходит на Idram (или получает URL). Статус `paid` на экране ещё можно не рисовать — это F6. Номер карты, срок и CVV **не** вводить в React.

---

# F6 — возврат с Idram, история, QA

Имена те же: **Aram**, **Suro**, **Artush**, **Hayk**, **Mariam**. Остальные пустые. Не мержить строку, пока её DoD не виден на `dev`.

Порядок: `lead → api → header → catalog → i18n → ui → gateway → footer → textile → baby`.

| Зона | Сделать | DoD |
|------|---------|-----|
| api | `SUCCESS_URL` / `FAIL_URL` отдают заказ; статус на экране читать из API, не из query «success» | query success без `paid` не показывает «оплачено» |
| header | страница истории `GET /api/orders/me/` | чужие заказы не видны |
| catalog | страницы возврата success/fail по макету | кнопка в историю |
| i18n | статусы pending/paid/failed на трёх языках | |
| ui | чеклист: главная, оба магазина, карточка, корзина, checkout, история, 404, 375px и desktop | `npm run build` |
| lead | таблица «волна закрыта» | backend-тесты и build зелёные |
| остальные | визуальные дыры только своей страницы | |

**DoD волны F6:** путь регистрация → корзина → Idram → история. Письмо магазину при `paid` видно в console или в ящике `ORDER_NOTIFY_EMAIL`.

---

# D1 — VPS, Docker, домен (после F6)

Имена те же: **Aram**, **Suro**, **Artush**, **Hayk**, **Mariam**. Остальные пустые. Не мержить строку, пока её DoD не виден на домене.

Хост: свой VPS. Стек уже намечен в [docker-compose.yml](docker-compose.yml): Postgres, gunicorn, собранный frontend. HTTPS и домен добавляет эта волна. SQLite на сервере не использовать.

Порядок merge:

```
lead → api → ui → i18n → catalog → header → footer → gateway → textile → baby
```

| Зона | Сделать | DoD |
|------|---------|-----|
| lead | домен, DNS, `docker compose` на сервере, чеклист smoke, короткий `docs/deploy.md` | сайт открывается по https |
| api | `DEBUG=False`, свой `SECRET_KEY`, `ALLOWED_HOSTS`, Postgres из env, gunicorn как в compose, SMTP и `IDRAM_*` только на сервере, в кабинете Idram прописать боевые SUCCESS/FAIL/RESULT URL | callback с Idram доходит до `RESULT_URL` |
| ui | production-сборка frontend, `VITE_BASE_URL` на API домена | нет запросов на `127.0.0.1` с боевого сайта |
| i18n | `<html lang>` на боевом сайте | |
| catalog / header / footer / gateway / textile / baby | smoke своего маршрута на домене, фикс только своего бага | путь покупки на textile и baby |
| все | пароли не в git | `.env` на сервере не коммитить |

**DoD D1:** класс открывает домен, регистрируется, платит тестовым платежом Idram (кошелёк или VISA/Mastercard на странице Idram), заказ `paid`, письмо на почту магазина, строка в истории.

---

## English

Full program for the same ten zones. Assigned names: **Aram** (lead), **Suro** (api), **Artush** (i18n), **Hayk** (gateway), **Mariam** (header). The other five names stay blank. Current wave is **B1** in [TASK.md](TASK.md). Aram’s task day is done: he keeps the merge board and waits for pull requests. One day is the task, the next day is the merge into `dev`. Do not push `main`.

Languages of content and UI: **`am`, `en`, `ru`**. `ru.json` is added in F1. `<html lang>` matches the active code.

Checkout: the buyer registers or logs in, then pays on **Idram** (Armenia). Visa and Mastercard are entered only on Idram’s page. On `paid`, the shop receives one email (`ORDER_NOTIFY_EMAIL`) and the order appears in `GET /api/orders/me/`. See [docs/idram.md](docs/idram.md) and [docs/order-email.md](docs/order-email.md).

| # | Name | Branch | Zone |
|---|------|--------|------|
| 1 | Aram | `feat/aram-lead` | lead |
| 2 | Suro | `feat/suro-api` | api |
| 3 | Artush | `feat/artush-i18n` | i18n |
| 4 | Hayk | `feat/hayk-gateway` | gateway |
| 5 | Mariam | `feat/mariam-header` | header |
| 6 |  | `feat/<name>-footer` | footer |
| 7 |  | `feat/<name>-textile` | textile |
| 8 |  | `feat/<name>-baby` | baby |
| 9 |  | `feat/<name>-catalog` | catalog |
| 10 |  | `feat/<name>-ui` | ui |

| Wave | Merge order | Done when |
|------|-------------|-----------|
| B1 | lead → api → i18n → catalog → footer → gateway → textile → baby → header → ui | Admin can create a user, textile/baby products with am/en/ru, newsletter, home block. SQLite. |
| B2 | lead → api → i18n → catalog → header → footer → gateway → textile → baby → ui | JWT, catalog API, search, cart for the logged-in user, newsletter, wholesale, home API. |
| B3 | lead → api → catalog → header → i18n → footer → ui → gateway → textile → baby | Order pending → Idram confirmation → paid, one shop email, `GET /api/orders/me/`. No card data on our server. Backend feature freeze. |
| F1 | lead → ui → i18n → header → footer → gateway → catalog → textile → baby → api | Figma shell, three UI languages including `ru.json`. |
| F2 | lead → catalog → i18n → header → textile → baby → ui → gateway → footer → api | Lists come from the API; stores do not mix. |
| F3 | lead → catalog → textile → i18n → ui → header → baby → gateway → footer → api | Product page and Textile layout. |
| F4 | lead → baby → ui → catalog → i18n → header → footer → textile → gateway → api | Baby layout and 375px pass. |
| F5 | lead → catalog → header → i18n → api → ui → footer → gateway → textile → baby | Cart, register/login, redirect to Idram. No card fields in React. |
| F6 | lead → api → header → catalog → i18n → ui → gateway → footer → textile → baby | Return pages do not trust `?success`; order history; QA. |
| D1 | lead → api → ui → i18n → catalog → header → footer → gateway → textile → baby | VPS, Docker Compose, domain, HTTPS, Postgres. Live Idram URLs. |

Calendar to adjust: B1 6 Nov / merge 9 Nov; B2 10 / 11; B3 12 / 13; F1 16–17; F2 18–19; F3 20 and 23; F4 24–25; F5 26–27; F6 30 Nov–1 Dec; D1 2–3 Dec.

Zone files match the Russian section «Чьи файлы». Step-by-step for every zone is in the Russian sections **B1**–**D1** above; the done-when column is the contract in English.

## Հայերեն

Նույն տասը գոտիները։ Նշված են **Aram** (lead), **Suro** (api), **Artush** (i18n), **Hayk** (gateway), **Mariam** (header)։ Մյուս հինգ անունները դատարկ են։ Հիմա բաց է **B1**-ը ([TASK.md](TASK.md))։ Aram-ի առաջադրանքի օրը փակ է. նա վարում է merge-ը և սպասում է PR-ներին։ Մեկ օրը առաջադրանք է, հաջորդ օրը՝ merge `dev`-ի մեջ։ `main` չենք push անում։

Լեզուներ՝ **`am`, `en`, `ru`**։ `ru.json`-ը F1-ում։ `<html lang>`-ը ակտիվ կոդն է։

Վճարում․ գնորդը գրանցվում կամ մտնում է, հետո վճարում է **Idram**-ի էջում (Հայաստան)։ VISA և Mastercard լրացվում են միայն Idram-ում։ `paid` լինելուց հետո խանութը ստանում է մեկ նամակ (`ORDER_NOTIFY_EMAIL`), պատվերը երևում է `GET /api/orders/me/`-ում։

| # | Անուն | Ճյուղ | Գոտի |
|---|------|--------|------|
| 1 | Aram | `feat/aram-lead` | lead |
| 2 | Suro | `feat/suro-api` | api |
| 3 | Artush | `feat/artush-i18n` | i18n |
| 4 | Hayk | `feat/hayk-gateway` | gateway |
| 5 | Mariam | `feat/mariam-header` | header |
| 6 |  | `feat/<անուն>-footer` | footer |
| 7 |  | `feat/<անուն>-textile` | textile |
| 8 |  | `feat/<անուն>-baby` | baby |
| 9 |  | `feat/<անուն>-catalog` | catalog |
| 10 |  | `feat/<անուն>-ui` | ui |

| Ալիք | Merge | Պատրաստ է, երբ |
|------|--------|----------------|
| B1 | lead → api → i18n → catalog → footer → gateway → textile → baby → header → ui | Admin-ում կա user, textile/baby ապրանք am/en/ru թարգմանությամբ, newsletter, գլխավոր բլոկ։ SQLite։ |
| B2 | lead → api → i18n → catalog → header → footer → gateway → textile → baby → ui | JWT, կատալոգ, որոնում, զամբյուղ միայն մտած օգտատիրոջ, newsletter, wholesale, home API։ |
| B3 | lead → api → catalog → header → i18n → footer → ui → gateway → textile → baby | Պատվեր pending → Idram հաստատում → paid, մեկ նամակ, պատվերի պատմություն։ Քարտի տվյալ չենք պահում։ Backend-ը սառեցվում է։ |
| F1 | lead → ui → i18n → header → footer → gateway → catalog → textile → baby → api | Figma կարկաս, երեք լեզու, այդ թվում `ru.json`։ |
| F2 | lead → catalog → i18n → header → textile → baby → ui → gateway → footer → api | Ցուցակները API-ից են, խանութները չեն խառնվում։ |
| F3 | lead → catalog → textile → i18n → ui → header → baby → gateway → footer → api | Ապրանքի էջ և Textile։ |
| F4 | lead → baby → ui → catalog → i18n → header → footer → textile → gateway → api | Baby և 375px։ |
| F5 | lead → catalog → header → i18n → api → ui → footer → gateway → textile → baby | Զամբյուղ, գրանցում/մուտք, անցում Idram։ React-ում քարտի դաշտ չկա։ |
| F6 | lead → api → header → catalog → i18n → ui → gateway → footer → textile → baby | Վերադարձի էջը չի հավատում `?success`-ին, պատմություն, QA։ |
| D1 | lead → api → ui → i18n → catalog → header → footer → gateway → textile → baby | VPS, Docker Compose, դոմեն, HTTPS, Postgres, կենդանի Idram URL-ներ։ |

Օրացույց (կարելի է տեղափոխել)՝ B1 նոյ 6 / merge նոյ 9; B2 10 / 11; B3 12 / 13; F1 16–17; F2 18–19; F3 20 և 23; F4 24–25; F5 26–27; F6 նոյ 30 – դեկ 1; D1 դեկ 2–3։

Ֆայլերի սահմանները և քայլ առ քայլ առաջադրանքը ռուսերեն **B1**–**D1** բաժիններում են։ Աղյուսակի «պատրաստ է» սյունը հայերեն պայմանագիրն է։
