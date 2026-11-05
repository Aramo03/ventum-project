# Task advanced — карта зон и волн Ventum

Короткое задание текущей волны: [TASK.md](TASK.md).  
Git: [CONTRIBUTING.md](CONTRIBUTING.md).  
Макет: [Figma Untitled](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12495).  
Оплата: [docs/idram.md](docs/idram.md). Письмо магазину: [docs/order-email.md](docs/order-email.md).  
PostgreSQL и VPS: [docs/postgresql.md](docs/postgresql.md) — только волна **D1**.

**Сейчас открыта волна B1.** Волны B2, B3, F1–F6 и D1 ниже — программа, её не делать заранее.

Имена в таблицах **пустые**. Учитель вписывает имя, ученик создаёт ветку `feat/<имя>-<зона>`.

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
| 1 |  | `feat/<имя>-lead` | `lead` |
| 2 |  | `feat/<имя>-api` | `api` |
| 3 |  | `feat/<имя>-i18n` | `i18n` |
| 4 |  | `feat/<имя>-gateway` | `gateway` |
| 5 |  | `feat/<имя>-header` | `header` |
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

SQLite. Idram, корзину и JWT-ручки не делать.

Порядок merge:

```
lead → api → i18n → catalog → footer → gateway → textile → baby → header → ui
```

`api` первый среди кода: пустые приложения и `accounts.User` должны появиться до миграций с внешними ключами. `catalog` после `i18n`, потому что переводы наследуют общий класс. Фикстуры textile/baby после моделей. `ui` последний — тесты на уже смерженные модели.

### Общие шаги

1. Прочитай свою секцию B1 и границы файлов.
2. `git checkout dev && git pull && git checkout -b feat/<имя>-<зона>`
3. `python manage.py migrate` и `runserver` на SQLite. Postgres не поднимать.
4. PR в `dev`. В описании: что сделано и что `migrate` проходит.

### 1 — lead

**Слой:** порядок PR.

1. Таблица в чате: имя (как вписал учитель), ветка, PR, когда мержить.
2. Мержи только по порядку выше. Конфликт чини вместе с владельцем файла, не переписывай зону.
3. После последнего PR: `migrate` с нуля на пустом sqlite и открытие `/admin/` и `/api/health/`.

**DoD:** на `dev` есть приложения и суперпользователь создаётся; health отвечает.

### 2 — api

**Слой:** каркас приложений и пользователь.

1. Пакеты `apps.accounts`, `apps.catalog`, `apps.cart`, `apps.orders`, `apps.leads`, `apps.content` — `apps.py`, пустой `models.py` там, где модель пишет другая зона. Исключение: **`accounts` заполняешь ты**.
2. `accounts.User`: email уникален и является логином (`USERNAME_FIELD = "email"`), имя для заказа. `AUTH_USER_MODEL` до первой миграции.
3. Пропиши приложения в `INSTALLED_APPS` и `include` в `config/urls.py` (пустые `urls.py` с `urlpatterns = []` допустимы). `GET /api/health/` не ломай.
4. `makemigrations` только для `accounts`.

**DoD:** `createsuperuser` с email; Swagger открывается; чужие модели не созданы.

### 3 — i18n

**Слой:** три языка контента.

1. `apps/core/languages.py`: коды `am`, `en`, `ru` и подписи.
2. Абстрактная модель перевода: язык из этого списка, `unique_together` с родителем. Её наследуют Category, Product, HomeBlock.
3. Правило на будущее (задокументируй в docstring): нет перевода на запрошенный язык — объект не исчезает, текст берётся из `en`, иначе из любого существующего.

**DoD:** три кода импортируются из одного модуля; миграции ядра применяются.

### 4 — catalog

**Слой:** товар.

1. `Category`: родитель необязателен, `store` = `textile` или `baby`, slug, переводы name (`am`/`en`/`ru`).
2. `Product`: категория, цена `Decimal` в **AMD**, sku, флаг публикации, переводы name + description.
3. `ProductImage`: картинка (Pillow), alt, порядок.
4. Unfold-админка: товар, инлайн картинок и переводов. В списке фильтр по `store`.

**DoD:** в админке можно создать категорию и товар с тремя переводами; `migrate` на SQLite чистый. `search.py` не трогать.

### 5 — footer

**Слой:** заявки.

1. В `apps/leads`: `NewsletterSubscriber` (email уникален, дата).
2. `WholesaleInquiry`: имя, телефон, email, текст, дата. Это заявка опта, **не** оплата Idram.
3. Админка только для чтения списка.

**DoD:** обе модели в админке, без API (API — волна B2).

### 6 — gateway

**Слой:** блоки главной.

1. `apps/content`: `HomeBlock` — ключ слота (`hero`, `stores`), порядок, переводы title и text на `am`/`en`/`ru`.
2. Админка с инлайном переводов.
3. Не верстай страницу `/` в B1.

**DoD:** слот создаётся в админке на трёх языках.

### 7 — textile

**Слой:** данные Textile.

1. Фикстура или команда `seed_textile`: хотя бы две категории с `store=textile` и переводами `am`, `en`, `ru`. Один черновой товар со ценой AMD.
2. Не меняй поля модели. Нет модели — жди merge `catalog`.
3. Картинки только свои файлы или плейсхолдер из репозитория, не случайные URL.

**DoD:** после команды в админке видны textile-категории.

### 8 — baby

**Слой:** данные Baby. То же, что textile, для `store=baby`: команда `seed_baby`, свои категории и один товар. Textile-данные не удалять.

**DoD:** baby и textile живут рядом, фильтр по `store` их разделяет.

### 9 — header

**Слой:** контракт поиска.

1. Файл `backend/apps/catalog/search.py`: функция `search_products(queryset, query)`, фильтр по переведённому имени и sku, пустой запрос возвращает queryset как есть.
2. Вью и URL не добавлять (это B2).
3. Кратко в docstring: `GET /api/products/?q=&store=&language=`.

**DoD:** функция покрыта простым тестом или проверяется из shell на фикстуре; модели не изменены.

### 10 — ui

**Слой:** тесты моделей.

1. Тесты: пользователь с email, категория с тремя переводами, товар textile и товар baby, заявка newsletter.
2. Проверь, что товар без перевода на `ru` всё равно создаётся (перевод необязателен поштучно).
3. `python manage.py test` локально.

**DoD:** тесты зелёные и не зависят от Postgres.

### DoD волны B1

Админка наполняется без правки кода. Три языка у контента. Health и Swagger живы. Секретов Idram в репозитории нет.

---

# B2 — публичное API, JWT, корзина (после merge B1)

Порядок merge:

```
lead → api → i18n → catalog → header → footer → gateway → textile → baby → ui
```

JWT и список товаров раньше корзины. Поиск (`header`) после списка (`catalog`).

### 1 — lead

Swagger после мержа открывает все новые пути. CI гоняет `manage.py test`. В чате — порядок PR.

**DoD:** на `dev` тесты B1+B2 зелёные.

### 2 — api

1. `POST /api/auth/register/` — email, password, name. `POST /api/auth/token/` и refresh (SimpleJWT).
2. Подключи `urls` приложений. Пагинация списка товаров.
3. Ошибки DRF единообразны. Пароли и секреты не логировать.

**DoD:** регистрация и токен в Swagger; повторный email — 400.

### 3 — i18n

1. Общий helper: выбрать перевод `am`/`en`/`ru` с запасным `en`.
2. Опиши в Swagger query `language`. Неверный код — как `en`, не 500.

**DoD:** товар без `ru` не пропадает из списка при `?language=ru`.

### 4 — catalog

1. `GET /api/products/`, `GET /api/products/{slug}/`, `GET /api/categories/?store=`.
2. Поля: имя и описание на выбранном языке, цена AMD, картинки, `store`.
3. Приложение `cart`: модель корзины **пользователя** (не гостя), строки qty и product. `GET/POST/PATCH/DELETE /api/cart/`. Чужой корзины не видно.

**DoD:** список фильтруется по `store`; в корзину кладётся только опубликованный товар.

### 5 — header

1. `GET /api/products/?q=` через `search.py`.
2. В ответе корзины есть число штук — договорись с полем `catalog`, не дублируй endpoint.

**DoD:** поиск по sku и по имени на любом из трёх языков.

### 6 — footer

`POST /api/newsletter/` и `POST /api/wholesale/`. Повтор email подписки — 200 без второй строки. Опт не создаёт заказ.

**DoD:** оба POST в Swagger, письма здесь не слать.

### 7 — gateway

`GET /api/home/?language=` отдаёт блоки `HomeBlock` с запасным языком.

**DoD:** пустая база — пустой список, не 500.

### 8 — textile

Тесты API: `store=textile` не содержит baby-товары.

**DoD:** тест в CI.

### 9 — baby

Тесты API: `store=baby` не содержит textile.

**DoD:** тест в CI.

### 10 — ui

Тесты регистрации, списка, корзины без токена (401) и с токеном.

**DoD:** `manage.py test` зелёный целиком.

### DoD волны B2

Каталог, поиск, главная, подписка, опт и корзина авторизованного пользователя работают на SQLite. Оплаты ещё нет.

---

# B3 — заказ, Idram, история, письмо (после B2)

Backend после этой волны **не расширять** новыми сущностями. Баги — точечно.

Порядок merge:

```
lead → api → catalog → header → i18n → footer → ui → gateway → textile → baby
```

Сначала заказ и Idram (`api`), затем контракт корзины при checkout (`catalog`).

### 1 — lead

Проверь, что в git нет `IDRAM_SECRET_KEY` и пароля SMTP. Напомни: боевой callback заработает на публичном домене в D1; в B3 обязателен тест с поддельным POST.

**DoD:** секреты только в `.env`, не в коммите.

### 2 — api

1. `Order` и строки: пользователь, сумма AMD, статус `pending` / `paid` / `failed`, номер счёта для Idram (`EDP_BILL_NO`).
2. `POST /api/checkout/` только с JWT. Создаёт заказ из корзины, корзину очищает, отдаёт данные для редиректа на Idram (см. [docs/idram.md](docs/idram.md)). Пустая корзина — 400.
3. `RESULT_URL`: precheck отвечает `OK` только если счёт и сумма совпали; подтверждение сверяет `EDP_CHECKSUM`, один раз ставит `paid`, пишет id транзакции. Повтор того же callback не шлёт второе письмо.
4. При переходе в `paid` — письмо на `ORDER_NOTIFY_EMAIL` по [docs/order-email.md](docs/order-email.md).
5. `GET /api/orders/me/` — заказы текущего пользователя.
6. Переменные в `settings` из env: `IDRAM_*`, `ORDER_NOTIFY_EMAIL`. В репозиторий ключи не класть.

**DoD:** тест: фейковый confirmation с верной суммой → `paid` + одно письмо в console backend; неверная сумма → заказ не `paid`.

### 3 — catalog

1. Checkout читает корзину и не даёт заказать чужой `cart`.
2. Цена строки фиксируется в заказе (смена цены товара потом не переписывает старый заказ).
3. Не реализуй callback Idram.

**DoD:** тест цены в строке заказа.

### 4 — header

Зафиксируй в Swagger-описании (текстом рядом с auth, без нового платежного кода): без токена checkout недоступен; регистрация — ручка B2.

**DoD:** 401 на checkout без JWT.

### 5 — i18n

Письмо магазину можно на русском (внутреннее). Ошибки API checkout имеют понятный `detail`. Названия товаров в письме — язык `ru`, если перевода нет — `en`.

**DoD:** письмо содержит имя товара не пустым.

### 6 — footer

Оптовая заявка по-прежнему не создаёт `Order` и не ходит в Idram.

**DoD:** тест, что wholesale не меняет заказы.

### 7 — ui

Тесты precheck и checksum по [docs/idram.md](docs/idram.md). Секрет в тесте — фиктивная строка.

**DoD:** тесты оплаты зелёные без сети Idram.

### 8 — gateway

Не ломай `/api/home/` при новых `include`.

**DoD:** тест главной всё ещё зелёный.

### 9 — textile / 10 — baby

Регрессия: checkout товара своего `store` создаёт строку с этим товаром.

**DoD:** по одному тесту на магазин.

### DoD волны B3

Регистрация → корзина → заказ `pending` → подтверждение Idram → `paid` → письмо → запись в истории. Карточные данные на сервер Ventum не приходят. Новых фич backend после merge нет.

---

# F1 — оболочка и Figma (после B3)

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

Full program for the same ten zones. Names stay blank. Current wave is **B1** in [TASK.md](TASK.md). One day is the task, the next day is the merge into `dev`. Do not push `main`.

Languages of content and UI: **`am`, `en`, `ru`**. `ru.json` is added in F1. `<html lang>` matches the active code.

Checkout: the buyer registers or logs in, then pays on **Idram** (Armenia). Visa and Mastercard are entered only on Idram’s page. On `paid`, the shop receives one email (`ORDER_NOTIFY_EMAIL`) and the order appears in `GET /api/orders/me/`. See [docs/idram.md](docs/idram.md) and [docs/order-email.md](docs/order-email.md).

| # | Name | Branch | Zone |
|---|------|--------|------|
| 1 |  | `feat/<name>-lead` | lead |
| 2 |  | `feat/<name>-api` | api |
| 3 |  | `feat/<name>-i18n` | i18n |
| 4 |  | `feat/<name>-gateway` | gateway |
| 5 |  | `feat/<name>-header` | header |
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

Նույն տասը գոտիները։ Անունները դատարկ են։ Հիմա բաց է **B1**-ը ([TASK.md](TASK.md))։ Մեկ օրը առաջադրանք է, հաջորդ օրը՝ merge `dev`-ի մեջ։ `main` չենք push անում։

Լեզուներ՝ **`am`, `en`, `ru`**։ `ru.json`-ը F1-ում։ `<html lang>`-ը ակտիվ կոդն է։

Վճարում․ գնորդը գրանցվում կամ մտնում է, հետո վճարում է **Idram**-ի էջում (Հայաստան)։ VISA և Mastercard լրացվում են միայն Idram-ում։ `paid` լինելուց հետո խանութը ստանում է մեկ նամակ (`ORDER_NOTIFY_EMAIL`), պատվերը երևում է `GET /api/orders/me/`-ում։

| # | Անուն | Ճյուղ | Գոտի |
|---|------|--------|------|
| 1 |  | `feat/<անուն>-lead` | lead |
| 2 |  | `feat/<անուն>-api` | api |
| 3 |  | `feat/<անուն>-i18n` | i18n |
| 4 |  | `feat/<անուն>-gateway` | gateway |
| 5 |  | `feat/<անուն>-header` | header |
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
