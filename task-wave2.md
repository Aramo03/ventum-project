# Ventum — Wave 2

Wave 1 закрыта и уже лежит в `dev`: пользователь с логином-email, языки `am` / `en` / `ru`, `HomeBlock`, каталог, заявки, `search_products`, сиды Textile и Baby, тесты моделей. Заново это не делать и не ломать.

Wave 2 открывает магазин наружу: публичное API и страницы по макету. Админка остаётся. База — SQLite.

Макеты:

- [Ventum — кадр магазина](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12495)
- [Ventum — второй файл макета](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=0-1)

**Срок:** до конца января.  
**Git:** [CONTRIBUTING.md](CONTRIBUTING.md). Короткий список: [TASK.md](TASK.md). Доска: [docs/zones/lead/README.md](docs/zones/lead/README.md). Архив волны 1: [task-advanced.md](task-advanced.md).

Номер ученика один. Он стоит в таблице, в заголовке раздела и в имени файла `docs/agents/`. Очередь merge этим номером не пользуется.

Админка: `http://127.0.0.1:8000/api/admin/`. Аналитика Suro: `http://127.0.0.1:8000/api/admin/analytics/`. Health: `http://127.0.0.1:8000/api/health/` — по-прежнему `{"status":"ok"}`. Swagger: `http://127.0.0.1:8000/api/schema/swagger-ui/`. Сайт: `http://127.0.0.1:3000/`.

Postgres, корзина, заказы, Idram и письмо об оплате в эту волну не входят. Пакеты `cart` и `orders` не наполнять. Кнопки Account и Cart в шапке остаются выключенными: экрана входа и корзины в этой волне нет.

---

## Команда

Одна зона на человека. Чужие файлы не переписывать. Файл из колонки «Агент» ученик отдаёт своему агенту целиком.

| # | Имя | Ветка | Зона | Агент |
|---|-----|--------|------|--------|
| 1 | Lead | `feat/lead` | `lead` | [01-lead.md](docs/agents/01-lead.md) |
| 2 | Suro | `feat/suro-api` | `api` | [02-suro.md](docs/agents/02-suro.md) |
| 3 | Artush | `feat/artush-i18n` | `i18n` | [03-artush.md](docs/agents/03-artush.md) |
| 4 | Hayk | `feat/hayk-gateway` | `gateway` | [04-hayk.md](docs/agents/04-hayk.md) |
| 5 | Mariam | `feat/mariam-header` | `header` | [05-mariam.md](docs/agents/05-mariam.md) |
| 6 | Daniel | `feat/daniel-footer` | `footer` | [06-daniel.md](docs/agents/06-daniel.md) |
| 7 | Karen | `feat/karen-textile` | `textile` | [07-karen.md](docs/agents/07-karen.md) |
| 8 | Svet | `feat/svet-baby` | `baby` | [08-svet.md](docs/agents/08-svet.md) |
| 9 | Vach | `feat/vach-catalog` | `catalog` | [09-vach.md](docs/agents/09-vach.md) |
| 10 | Ashot | `feat/ashot-ui` | `ui` | [10-ashot.md](docs/agents/10-ashot.md) |

Очередь merge (порядок имён, не номера учеников):

```
Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot
```

Suro первый среди кода: размер страницы, описание Swagger и ручки входа должны лежать в `dev` до чужих вью. Artush следом: выбор перевода и разбор `language` пишут один раз, до сериализаторов. Vach после Artush: список товаров вызывает его функцию и `search_products`. Hayk, Daniel и страницы магазинов читают уже согласованный контракт. Mariam после Vach: поле поиска бьёт в его список. Karen и Svet после списка. Ashot последний: тесты на уже смерженное API и страница 404.

Ветка волны 1 уже есть. Её не переименовывать. Старт: `git checkout dev && git pull`, затем своя `feat/...`, влить в неё свежий `dev`. Один новый pull request, **base = `dev`**. В `main` не пушить. `--force` на `dev` и `main` не делать.

Новую строку интерфейса ученик добавляет сразу в три файла: `frontend/src/i18n/am.json`, `en.json`, `ru.json`. Второй axios не создавать. Запросы идут через [frontend/src/api/client.js](frontend/src/api/client.js): на GET он уже подставляет `language`. У компонента по-прежнему три файла: `Name.jsx`, `name.css`, `name.js`.

---

## Контракт API

Волна 1 писала будущий поиск как `GET /api/products/`. В коде каталог уже подключён как `api/catalog/`. Канон волны 2 — пути ниже. Второй префикс не добавлять.

Общее:

- Коды языка только `am`, `en`, `ru`. Пустой или отсутствующий `language` значит `en`. Любое другое значение — **400**.
- Нет перевода на запрошенный язык — объект остаётся в выдаче. Текст берётся из `en`, иначе из любого существующего перевода. Это функция Artush. Свои копии правила не писать.
- `store` принимает только `textile` или `baby`. Другое значение — **400**. Параметр можно не передавать: тогда оба магазина.
- Публичный список и карточка товара показывают только `is_published=True`. Чужой или снятый с публикации sku — **404**.
- Цена — строка десятичной дроби с двумя знаками, в AMD. Не float.
- Картинка — абсолютный URL или `null`, если файла нет.
- `DEFAULT_PERMISSION_CLASSES` остаётся `AllowAny`. Закрывать весь API авторизацией нельзя: витрина публичная. `GET /api/auth/me/` закрыт отдельно.
- Размер страницы — 12. Его ставит Suro. Списки категорий и товаров — страница DRF: `count`, `next`, `previous`, `results`. Блоки главной страницей не режутся: это JSON-массив.

| Метод | Путь | Кто |
|--------|------|-----|
| `POST` | `/api/auth/token/` | Suro |
| `POST` | `/api/auth/token/refresh/` | Suro |
| `GET` | `/api/auth/me/` | Suro |
| `GET` | `/api/catalog/categories/?store=&language=` | Vach |
| `GET` | `/api/catalog/products/?store=&language=&q=` | Vach, поиск — функция Mariam |
| `GET` | `/api/catalog/products/<sku>/?language=` | Vach |
| `GET` | `/api/content/home-blocks/?language=` | Hayk |
| `POST` | `/api/leads/newsletter/` | Daniel |
| `POST` | `/api/leads/wholesale/` | Daniel |

`POST /api/auth/token/` принимает `email` и `password` и возвращает `access` и `refresh`. Без токена `GET /api/auth/me/` отвечает **401**. С токеном отдаёт `email`, `first_name`, `last_name`.

Элемент списка товаров:

```json
{
  "sku": "TX-001",
  "store": "textile",
  "price": "12000.00",
  "name": "Sheet",
  "category": {"slug": "linen", "name": "Linen"},
  "image": null
}
```

Карточка добавляет `description` и `images`: массив `{url, alt, order}` по полю `order`. `image` в списке — первая картинка или `null`.

Категория: `slug`, `store`, `name`, `parent` (slug родителя или `null`). Плоский список, без вложенного дерева.

Блок главной: `slot`, `order`, `title`, `text`. Порядок — как у модели: `order`, затем `id`.

Подписка: тело `{"email": "..."}`. Первая запись — **201**. Тот же email снова — **400**, вторая строка в базе не появляется. Невалидный email — **400**.

Опт: тело `name`, `phone`, `email`, `text`. Все четыре обязательны. Успех — **201** и `id`. Пустое поле — **400**.

Пустой `q` или одни пробелы список не сужают. Иначе поиск по sku и по переведённому имени без учёта регистра, через уже существующий `search_products`.

---

## Чьи файлы

| # | Можно | Нельзя |
|---|--------|--------|
| 1 Lead | доска волны 2, конфликт только чтобы собрать `dev` | фичи зон |
| 2 Suro | `apps/accounts/` (аналитика, JWT, `urls.py`), `PAGE_SIZE`, текст Spectacular, пункт Unfold, путь аналитики и `include` auth в `config/urls.py` | модели каталога, заявок и слотов; `AllowAny` как право по умолчанию не снимать; фронт |
| 3 Artush | `apps/core/translations.py`, `ru.json`, регистрация `ru` в `i18n/index.js` | вью health, модели товара, шапка |
| 4 Hayk | `apps/content/` сериализатор, вью, `urls.py`; `pages/Gateway/` | поля `HomeBlock`, страницы магазинов |
| 5 Mariam | `Header`, при необходимости правка `search.py` | `models.py`, миграции, вью каталога, кнопки Account и Cart |
| 6 Daniel | `apps/leads/` сериализатор, вью, `urls.py`; `components/Footer/` | поля моделей заявок |
| 7 Karen | `pages/Textile/` | сид, поля моделей, API |
| 8 Svet | `pages/Baby/` | сид, данные и страница Textile |
| 9 Vach | `catalog/serializers.py`, `views.py`, `urls.py` | поля моделей, `search.py` целиком, страницы React |
| 10 Ashot | тесты API в `backend/`, `pages/NotFound/` | поля моделей, `index.css` |

---

## 1 — Lead

**Папка:** [docs/zones/lead/README.md](docs/zones/lead/README.md). **Ветка:** `feat/lead`. **Агент:** [docs/agents/01-lead.md](docs/agents/01-lead.md).

Принимать PR в `dev` строго по очереди имён этой волны. Конфликт чинить вместе с владельцем файла. Чужую зону не переписывать. Колонку статуса на доске вести самому.

После merge Ashot (ученик 10):

```bash
cd backend
python manage.py test
python manage.py runserver
```

Открыть `/api/health/`, Swagger, `/api/admin/analytics/` под staff, затем сайт: `/`, `/textile`, `/baby` и несуществующий путь.

**Не закрывать Wave 2, пока:** health отвечает `{"status":"ok"}`; в Swagger видны пути контракта; страница аналитики открывается только staff и показывает живые числа; главная, Textile и Baby читают API; повторная подписка не создаёт вторую строку; `python manage.py test` зелёный целиком; корзина, заказы и Postgres не появились.

## 2 — Suro · api

**Папка:** [backend/apps/accounts/README.md](backend/apps/accounts/README.md). **Ветка:** `feat/suro-api`. **Агент:** [docs/agents/02-suro.md](docs/agents/02-suro.md).

Зона шире, чем у остальных: платформа админки и вход. Модель пользователя волны 1 не переписывать. Новые приложения не регистрировать.

**Сделать**

1. Страница аналитики только для staff: `GET /api/admin/analytics/`. Путь в [backend/config/urls.py](backend/config/urls.py) стоит **выше** `path("api/admin/", admin.site.urls)`, иначе его съест include админки. Декоратор — `staff_member_required` с `login_url="/api/admin/login/"`. Гость попадает на логин админки, не на публичную страницу. Шаблон в `apps/accounts/templates/` и выглядит как Unfold, не как отдельный сайт. В `UNFOLD["SIDEBAR"]` есть пункт на этот путь. Если `navigation` заменяет автоматический список приложений, в том же списке остаются Catalog, Leads, Content, Users и Groups.
2. На странице только чтение, без новых моделей и без сырого SQL. Числа считаются запросами к уже существующим таблицам:
   - товары: published и unpublished, отдельно для `textile` и для `baby`;
   - категории: сколько в каждом магазине;
   - подписчики: всего и созданные за последние 7 дней;
   - опт: всего и пять последних (имя, email, дата);
   - пользователи: всего и сколько `is_staff`;
   - сколько записей `HomeBlock`.
   Каждая группа ведёт на уже существующий changelist: `/api/admin/catalog/product/`, `/api/admin/catalog/category/`, `/api/admin/leads/newslettersubscriber/`, `/api/admin/leads/wholesaleinquiry/`, `/api/admin/accounts/user/`, `/api/admin/content/homeblock/`.
3. JWT. В настройках SimpleJWT уже есть, ручек нет. `apps/accounts/urls.py` и `include` на `api/auth/`:
   - `POST /api/auth/token/` — тело `email` и `password`, ответ `access` и `refresh`;
   - `POST /api/auth/token/refresh/` — тело `refresh`, ответ `access`;
   - `GET /api/auth/me/` — `IsAuthenticated`, без заголовка **401**, с токеном `email`, `first_name`, `last_name`.
4. В `REST_FRAMEWORK` поставить `PageNumberPagination` и `PAGE_SIZE = 12`. `DEFAULT_PERMISSION_CLASSES` оставить `AllowAny`. `DEFAULT_AUTHENTICATION_CLASSES` не дополнять сессией.
5. `SPECTACULAR_SETTINGS["DESCRIPTION"]` больше не говорит, что живо только health. Описание называет каталог, блоки главной, заявки и вход.

**Нельзя:** поля товара, заявок и `HomeBlock`; публичный URL аналитики; экран входа на React; корзина и заказы.

**Lead не мержит, пока:** staff видит шесть групп чисел, и они сходятся со списками админки; гость на `/api/admin/analytics/` не видит числа; `POST /api/auth/token/` с email суперпользователя возвращает пару токенов; `GET /api/auth/me/` без токена даёт 401; Swagger открывается и больше не описан как «Health only»; health по-прежнему `{"status":"ok"}`; `migrate` на чистом SQLite проходит.

## 3 — Artush · i18n

**Папка:** [backend/apps/core/README.md](backend/apps/core/README.md) и [frontend/src/i18n/README.md](frontend/src/i18n/README.md). **Ветка:** `feat/artush-i18n`. **Агент:** [docs/agents/03-artush.md](docs/agents/03-artush.md).

Ждать Suro. Вью `/api/health/` не менять. Список `LANGUAGE_CODES` не дублировать.

**Сделать**

1. `backend/apps/core/translations.py`:
   - `parse_language(value)` — `None` и пустая строка дают `en`; `am`, `en`, `ru` возвращаются как есть; всё остальное, включая другой регистр и `hy`, поднимает `ValueError`.
   - `pick_translation(rows, language)` — строка с этим `language`, иначе строка `en`, иначе первая по коду языка, иначе `None`. Родительский объект функция не фильтрует и не удаляет.
2. Вью Vach и Hayk вызывают эти функции. Свой разбор query им писать нельзя: если `parse_language` бросил `ValueError`, ответ **400**.
3. `frontend/src/i18n/ru.json` — те же ключи, что сейчас в `en.json`, текст по-русски. В [frontend/src/i18n/index.js](frontend/src/i18n/index.js) язык `ru` добавлен в `resources` и в `supportedLngs`. Значения `am.json` и `en.json` не переписывать.

**Нельзя:** шапка, модели каталога, health.

**Lead не мержит, пока:** три кода по-прежнему импортируются из `languages.py`; неизвестный язык не становится `en` молча; `ru` переключается в интерфейсе после того, как Mariam добавит кнопку, а до этого `i18n.changeLanguage('ru')` не падает; health отвечает `{"status":"ok"}`.

## 4 — Hayk · gateway

**Папка:** [backend/apps/content/README.md](backend/apps/content/README.md) и [frontend/src/pages/Gateway/README.md](frontend/src/pages/Gateway/README.md). **Ветка:** `feat/hayk-gateway`. **Агент:** [docs/agents/04-hayk.md](docs/agents/04-hayk.md).

Ждать Artush. Поля `HomeBlock` не менять. Маршруты `/`, `/textile`, `/baby` не менять.

**Сделать**

1. `GET /api/content/home-blocks/?language=` — JSON-массив, без пагинации. Поля `slot`, `order`, `title`, `text`. Язык через `parse_language` и `pick_translation`.
2. Страница `/` по макету: слот `hero` (title и text) и выбор магазина. Ссылки на `/textile` и `/baby` остаются. Данные читает `api` из `frontend/src/api/client.js`. Если запрос упал, выбор магазина всё равно на экране.
3. Новые строки — в `am.json`, `en.json` и `ru.json`.

**Нельзя:** модели товара, страницы Textile и Baby, поля `HomeBlock`.

**Lead не мержит, пока:** слот `hero` отдаётся на `am`, `en` и `ru`; `?language=de` даёт 400; главная показывает текст слота и оба магазина; модели контента в diff не изменены.

## 5 — Mariam · header

**Папка:** [frontend/src/components/Header/README.md](frontend/src/components/Header/README.md). **Ветка:** `feat/mariam-header`. **Агент:** [docs/agents/05-mariam.md](docs/agents/05-mariam.md).

Ждать Vach. `search_products` уже в `dev`. Вью списка пишет Vach и сам вызывает эту функцию. Её файл можно починить, если контракт поиска не выполняется. `views.py` каталога не редактировать: дыру во вью отдавать Lead, а не закрывать чужим коммитом.

**Сделать**

1. Поле поиска в `Header.jsx` больше не `readOnly`. Отправка вызывает `GET /api/catalog/products/?q=&language=` через `api`. Магазин можно передать как `store`, если он выбран; без `store` приходят оба.
2. Под полем короткий список: имя, sku, цена AMD, магазин. Новый маршрут не заводить.
3. В `header.js` у `LANGUAGES` появляется `{ code: 'ru', label: 'RU' }`. Кнопки Account и Cart остаются `disabled`.
4. Пустой запрос не рисует «ничего не найдено» поверх всего каталога и не сужает выборку. Новые строки — в трёх JSON.

**Нельзя:** `models.py`, миграции, сериализатор Vach, корзина, экран входа.

**Lead не мержит, пока:** товар Karen находится по sku и по имени; пустой ввод не режет список на API; в diff нет `models.py`; Account и Cart выключены.

## 6 — Daniel · footer

**Папка:** [backend/apps/leads/README.md](backend/apps/leads/README.md) и [frontend/src/components/Footer/README.md](frontend/src/components/Footer/README.md). **Ветка:** `feat/daniel-footer`. **Агент:** [docs/agents/06-daniel.md](docs/agents/06-daniel.md).

Ждать, пока пакет `leads` в `dev`. Модели волны 1 не менять.

**Сделать**

1. `POST /api/leads/newsletter/` и `POST /api/leads/wholesale/` по контракту выше. Оба без авторизации. Повторный email подписки — 400 с ошибкой поля `email`, не 500.
2. В Footer две формы на `react-hook-form`: email рассылки и заявка опта (имя, телефон, email, текст). Успех и ошибка видны в самой форме. Отправка идёт через `api`.
3. Новые строки — в трёх JSON.

**Нельзя:** поля `NewsletterSubscriber` и `WholesaleInquiry`, шапка, корзина.

**Lead не мержит, пока:** первая подписка даёт 201 и строку в админке; вторая с тем же email даёт 400 и не плодит строку; опт без текста даёт 400; формы в Footer реально вызывают эти пути.

## 7 — Karen · textile

**Папка:** [frontend/src/pages/Textile/README.md](frontend/src/pages/Textile/README.md). **Ветка:** `feat/karen-textile`. **Агент:** [docs/agents/07-karen.md](docs/agents/07-karen.md).

Ждать Vach. Страница `/textile` собирается по макету из публичного API. Сид `seed_textile` и поля моделей не менять.

**Сделать**

1. `GET /api/catalog/categories/?store=textile` и `GET /api/catalog/products/?store=textile` через `api`.
2. На экране категории, опубликованные товары, имя, цена с подписью AMD, картинка (`image`, если `null` — место без сломанной иконки).
3. Состояния: загрузка, пустой список, ошибка сети. Новые строки — в трёх JSON.

**Нельзя:** `seed_textile`, `models.py`, вью каталога, страница Baby.

**Lead не мержит, пока:** после `seed_textile` витрина показывает товар Textile и не показывает товар Baby; черновик с `is_published=False` на витрину не попадает.

## 8 — Svet · baby

**Папка:** [frontend/src/pages/Baby/README.md](frontend/src/pages/Baby/README.md). **Ветка:** `feat/svet-baby`. **Агент:** [docs/agents/08-svet.md](docs/agents/08-svet.md).

То же, что у Karen, для `store=baby` и маршрута `/baby`. Данные и файлы Textile не менять. Сид `seed_baby` не переписывать. В очередь Svet встаёт после Karen.

**Lead не мержит, пока:** витрина Baby показывает свой товар и не затирает страницу Textile.

## 9 — Vach · catalog

**Номер:** 9. **Папка:** [backend/apps/catalog/README.md](backend/apps/catalog/README.md). **Ветка:** `feat/vach-catalog`. **Агент:** [docs/agents/09-vach.md](docs/agents/09-vach.md).

Ждать Artush. Пакет и модели уже в `dev`. В `INSTALLED_APPS` каталог не регистрировать второй раз. Поля `Category`, `Product`, `ProductImage` не менять. `search.py` не переписывать: из списка одна строка вызывает `search_products(queryset, query)`.

**Сделать**

1. `serializers.py`, `views.py`, заполнить пустой `urls.py`.
2. Три GET из контракта. Список и карточка — только опубликованные. Пагинация берёт `PAGE_SIZE` Suro, свой размер не хардкодить.
3. `language` и текст — только `parse_language` и `pick_translation`. `ValueError` снаружи становится 400.
4. `store` опционален. Неверное значение — 400. `image` — абсолютный URL первой картинки по `order` или `null`. В карточке полный `images`.
5. Имена в Swagger появляются сами, если у вью указан сериализатор. Тег группы — `catalog`.

**Нельзя:** миграции ради этой волны, страницы React, модели заявок и слотов, второй префикс `/api/products/`.

**Lead не мержит, пока:** опубликованный товар Textile виден в списке `store=textile` и не виден в `store=baby`; черновик отсутствует и в списке, и по sku (404); товар без `ru` остаётся в выдаче, а имя берётся из `en`; `?language=de` даёт 400; пустой `q` не уменьшает `count`; `models.py` в diff нет.

## 10 — Ashot · ui

**Номер:** 10. **Папка:** [frontend/src/pages/NotFound/README.md](frontend/src/pages/NotFound/README.md). **Ветка:** `feat/ashot-ui`. **Агент:** [docs/agents/10-ashot.md](docs/agents/10-ashot.md).

Ждать, пока в `dev` есть API предыдущих. В очереди он последний. Тесты волны 1 не удалять. Они создают свои строки и не зависят от сидов. Сеть, Postgres и живой `runserver` тестам не нужны: клиент DRF `APIClient`.

**Сделать**

1. Страница 404: заголовок, короткий текст, ссылка на `/`. Файлы только `NotFound.jsx`, `notFound.css`, `notFound.js`. `index.css` не трогать. Новые строки — в трёх JSON.
2. Тесты API в `backend/`:
   - список товаров отдаёт только опубликованные;
   - `store=textile` не содержит baby;
   - `language=ru` берёт русское имя; товар только с `en` всё равно в списке, имя из `en`;
   - `language=de` даёт 400;
   - `q` находит sku; пустой `q` не уменьшает набор опубликованных;
   - второй `POST` подписки даёт 400 и одну строку в базе;
   - опт без `text` даёт 400;
   - `GET /api/auth/me/` без токена даёт 401;
   - `GET /api/content/home-blocks/?language=en` отдаёт `title` слота.
3. `python manage.py test` из `backend/` зелёный целиком.

**Нельзя:** поля моделей, `admin.py`, миграции, правка чужого вью, чтобы «тест позеленел».

**Lead не мержит, пока:** весь прогон тестов зелёный, 404 ведёт на главную, diff не содержит полей моделей и `index.css`.

---

## Готово, когда

После merge Ashot Lead открывает health, Swagger, аналитику staff, три маршрута сайта и несуществующий URL. `python manage.py test` зелёный. В репозитории нет корзины, заказа, Idram и Postgres.

---

## English

Wave 1 is closed and already in `dev`: email login, `am` / `en` / `ru`, `HomeBlock`, catalog, leads, `search_products`, Textile and Baby seeds, model tests. Do not rebuild or break that work.

Wave 2 is the public API and the storefront. SQLite stays. Finish by the end of January. One new pull request per zone, base `dev`. Do not push `main`. Do not start Postgres, cart, orders, Idram, or the payment email. Leave the Account and Cart buttons disabled.

Designs: [shop frame](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12495), [second file](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=0-1).

Short list: [TASK.md](TASK.md). Board: [docs/zones/lead/README.md](docs/zones/lead/README.md). Wave 1 archive: [task-advanced.md](task-advanced.md).

The student number matches the heading and `docs/agents/`. The merge queue is names, not a second numbering:

**Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**.

Continue the same `feat/...` branch. Pull `dev` into it first. Use [frontend/src/api/client.js](frontend/src/api/client.js) for HTTP. It already sends `language` on GET. Any new UI string goes into `am.json`, `en.json`, and `ru.json` in the same PR. Keep the three component files: `Name.jsx`, `name.css`, `name.js`.

### API contract

Wave 1 wrote a future `GET /api/products/`. The include is already `api/catalog/`. Use the paths in this table only.

Language codes are `am`, `en`, `ru`. A missing `language` means `en`. Anything else is **400**. A missing translation does not drop the object: text comes from `en`, otherwise from any translation that exists. Call Artush’s functions. `store` is `textile` or `baby`; anything else is **400**; omit it to return both stores. Public product list and detail return `is_published=True` only. An unknown or unpublished sku is **404**. `price` is a two-decimal string in AMD. `image` is an absolute URL or `null`.

Leave `DEFAULT_PERMISSION_CLASSES` as `AllowAny`. Page size is 12, set by Suro. Category and product lists use the DRF page envelope. Home blocks are a JSON array, not a page.

| Method | Path | Owner |
|--------|------|--------|
| `POST` | `/api/auth/token/` | Suro |
| `POST` | `/api/auth/token/refresh/` | Suro |
| `GET` | `/api/auth/me/` | Suro |
| `GET` | `/api/catalog/categories/?store=&language=` | Vach |
| `GET` | `/api/catalog/products/?store=&language=&q=` | Vach calls Mariam’s `search_products` |
| `GET` | `/api/catalog/products/<sku>/?language=` | Vach |
| `GET` | `/api/content/home-blocks/?language=` | Hayk |
| `POST` | `/api/leads/newsletter/` | Daniel |
| `POST` | `/api/leads/wholesale/` | Daniel |

Token body is `email` and `password`. Response is `access` and `refresh`. `GET /api/auth/me/` without a bearer token is **401**; with a token it returns `email`, `first_name`, `last_name`.

Product list item: `sku`, `store`, `price`, `name`, `category` (`slug`, `name`), `image`. Detail adds `description` and `images` (`url`, `alt`, `order`). Category: `slug`, `store`, `name`, `parent` slug or `null`. Home block: `slot`, `order`, `title`, `text`.

Newsletter body is `{"email": "..."}`. First save is **201**. The same email again is **400** and does not insert a second row. Wholesale body is `name`, `phone`, `email`, `text`, all required. Success is **201** with `id`. A blank `q` does not narrow the list.

### 1 — Lead

Merge in the named queue. Fix a conflict with the file owner. After Ashot, run `python manage.py test`, open health, Swagger, `/api/admin/analytics/` as staff, and the three store routes plus an unknown path.

**Done when** health is `{"status":"ok"}`, Swagger lists the contract, analytics shows live counts for staff only, the three pages read the API, a duplicate subscription does not insert a second row, the test suite is green, and cart, orders, and Postgres are still absent.

### 2 — Suro · api

Heavier zone: admin platform and auth. Do not rewrite the Wave 1 user model. Do not register new apps.

1. Staff-only `GET /api/admin/analytics/`. Register that path in `config/urls.py` **before** `path("api/admin/", admin.site.urls)`. Decorate the view with `staff_member_required` and `login_url="/api/admin/login/"`. A guest is sent to the admin login. The template lives under `apps/accounts/templates/` and uses the Unfold chrome. Add a sidebar item. If `SIDEBAR.navigation` replaces the automatic app list, keep Catalog, Leads, Content, Users, and Groups in that list.
2. Read-only counts, no new models, no raw SQL: published and unpublished products for `textile` and for `baby`; categories per store; newsletter subscribers total and created in the last 7 days; wholesale total and the five latest (name, email, date); users total and staff; `HomeBlock` count. Each group links to the existing changelist (`/api/admin/catalog/product/`, `/api/admin/catalog/category/`, `/api/admin/leads/newslettersubscriber/`, `/api/admin/leads/wholesaleinquiry/`, `/api/admin/accounts/user/`, `/api/admin/content/homeblock/`).
3. `POST /api/auth/token/`, `POST /api/auth/token/refresh/`, `GET /api/auth/me/` under `api/auth/`.
4. `PageNumberPagination` and `PAGE_SIZE = 12`. Leave the default permission as `AllowAny`. Do not add session authentication.
5. Replace the Spectacular description that says only health exists.

**Done when** a staff user sees the six groups and they match the admin lists, a guest does not see the numbers, token login with the superuser email returns both tokens, `me` without a token is 401, Swagger no longer says “Health only”, and health is still `{"status":"ok"}`.

### 3 — Artush · i18n

Add `backend/apps/core/translations.py`. `parse_language`: empty becomes `en`; `am`, `en`, `ru` pass through; every other value, including a different case and `hy`, raises `ValueError`. `pick_translation`: the requested language, else `en`, else the first row by language code, else `None`. It does not drop the parent. Views turn `ValueError` into **400**.

Add `frontend/src/i18n/ru.json` with the same keys as today’s `en.json`, in Russian. Register `ru` in `resources` and `supportedLngs`. Do not rewrite `am.json` or `en.json`. Do not edit the health view or the header.

**Done when** the three codes still come from `languages.py`, an unknown language is not silently treated as `en`, and `i18n.changeLanguage('ru')` does not throw.

### 4 — Hayk · gateway

`GET /api/content/home-blocks/?language=` returns a JSON array of `slot`, `order`, `title`, `text`, using Artush’s functions. No pagination. Do not change `HomeBlock` fields.

Build `/` from the Figma frames: hero title and text, and the store choice. Keep links to `/textile` and `/baby`. Read data with `api`. If the request fails, the store choice still renders. Add new strings to all three JSON files.

**Done when** `hero` is served in `am`, `en`, and `ru`, `?language=de` is 400, and the content models are unchanged.

### 5 — Mariam · header

Wait for Vach. The list view calls `search_products`. You may fix `search.py`. Do not edit the catalog view; send that gap to Lead.

Make the search box submit `GET /api/catalog/products/?q=&language=`. Show a short list: name, sku, AMD price, store. No new route. Add `ru` to `LANGUAGES` in `header.js`. Leave Account and Cart `disabled`. A blank query does not paint an empty state over the whole catalog. Add new strings to all three JSON files.

**Done when** a Textile product is found by sku and by name, `models.py` is untouched, and Account and Cart stay disabled.

### 6 — Daniel · footer

`POST /api/leads/newsletter/` and `POST /api/leads/wholesale/` with no auth. A duplicate subscriber email is 400 on the `email` field, not 500, and does not insert a second row.

Two `react-hook-form` forms in the Footer: newsletter email, and wholesale name, phone, email, and text. Show success and error in the form. Submit through `api`. Add new strings to all three JSON files. Do not change the lead models.

**Done when** the first subscription is 201 and visible in admin, the second is 400, and wholesale without text is 400.

### 7 — Karen · textile

Build `/textile` from `GET /api/catalog/categories/?store=textile` and `GET /api/catalog/products/?store=textile`. Show categories, published products, name, AMD price, and `image` (a quiet placeholder when `image` is `null`). Include loading, empty, and error states. Do not change `seed_textile`, model fields, or the Baby page.

**Done when** the seeded Textile product is visible and the Baby product is not, and a draft is absent.

### 8 — Svet · baby

Same page for `store=baby` at `/baby`. Do not edit Textile files or `seed_baby`. You follow Karen in the queue.

**Done when** the Baby storefront shows its own product and the Textile page is unchanged.

### 9 — Vach · catalog

**Number:** 9. **Branch:** `feat/vach-catalog`. **Agent:** [docs/agents/09-vach.md](docs/agents/09-vach.md).

Wait for Artush. Models already exist. Do not register the app again and do not change fields. Do not rewrite `search.py`. The list view calls `search_products(queryset, query)` once.

Add `serializers.py`, `views.py`, and routes in the empty `urls.py`. Three GETs from the contract. Published rows only. Use Suro’s page size; do not hardcode another. Language text goes through `parse_language` and `pick_translation`. `ValueError` becomes 400. Optional `store`. Absolute `image` URL or `null`. Detail includes `images`. Schema tag: `catalog`. Do not add `/api/products/`.

**Done when** a published Textile product appears for `store=textile` and not for `store=baby`, a draft is 404 by sku, a product with no `ru` stays in the list with the `en` name, `?language=de` is 400, a blank `q` does not lower `count`, and `models.py` is untouched.

### 10 — Ashot · ui

**Number:** 10. **Branch:** `feat/ashot-ui`. **Agent:** [docs/agents/10-ashot.md](docs/agents/10-ashot.md).

You are last. Keep the Wave 1 tests. Use DRF `APIClient`. No network, no Postgres, no running server.

Build the 404 page in `NotFound.jsx`, `notFound.css`, and `notFound.js`: heading, short text, link to `/`. Do not edit `index.css`.

API tests: published-only list; `store=textile` excludes baby; `language=ru` uses the Russian name, and an English-only product still appears; `language=de` is 400; `q` finds a sku and a blank `q` does not shrink the published set; a second newsletter POST is 400 and leaves one row; wholesale without `text` is 400; `GET /api/auth/me/` without a token is 401; home blocks return a `title` for `language=en`.

**Done when** `python manage.py test` from `backend/` is fully green, the 404 page links home, and the diff has no model fields and no `index.css`.

---

## Հայերեն

Wave 1-ը փակ է և արդեն `dev`-ում է՝ email մուտք, `am` / `en` / `ru`, `HomeBlock`, կատալոգ, հայտեր, `search_products`, Textile և Baby seed-եր, մոդելների թեստեր։ Դա նորից չսարքել և չկոտրել։

Wave 2-ը հրապարակային API-ն ու խանութի էջերն են։ Մնում է SQLite։ Ավարտել մինչև հունվարի վերջ։ Մեկ նոր PR = մեկ գոտի, base-ը `dev`։ `main` չpush անել։ Postgres, զամբյուղ, պատվեր, Idram և վճարման նամակ չկան։ Account և Cart կոճակները մնում են անջատված։

Մակետներ՝ [խանութ](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12495), [երկրորդ ֆայլ](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=0-1)։

Կարճ ցանկը՝ [TASK.md](TASK.md)։ Տախտակը՝ [docs/zones/lead/README.md](docs/zones/lead/README.md)։ Wave 1-ի արխիվը՝ [task-advanced.md](task-advanced.md)։

Աշակերտի համարը նույնն է վերնագրում և `docs/agents/`-ում։ Հերթը անուններով է.

**Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**։

Շարունակիր նույն `feat/...` ճյուղը և նախ ձուլիր թարմ `dev`-ը։ HTTP-ն՝ [frontend/src/api/client.js](frontend/src/api/client.js)-ով. GET-ին այն արդեն դնում է `language`։ Նոր տողը նույն PR-ում գրիր `am.json`, `en.json` և `ru.json` ֆայլերում։ Կոմպոնենտը մնում է երեք ֆայլ՝ `Name.jsx`, `name.css`, `name.js`։

### API պայմանագիր

Wave 1-ը գրել էր ապագա `GET /api/products/`։ Կոդում կատալոգը արդեն `api/catalog/` է։ Գործածիր միայն այս աղյուսակի ուղիները։

Լեզուն՝ `am`, `en`, `ru`։ Բացակա `language`-ը նշանակում է `en`։ Ուրիշ արժեքը **400** է։ Թարգմանության բացակայությունը օբյեկտը չի հանում. տեքստը գալիս է `en`-ից, այլապես առկա ցանկացած թարգմանությունից։ Կանչիր Artush-ի ֆունկցիաները։ `store`-ը՝ `textile` կամ `baby`, ուրիշ արժեքը **400** է, բաց թողնելը վերադարձնում է երկու խանութը։ Հրապարակային ցանկը և քարտը միայն `is_published=True` են։ Անհայտ կամ չհրապարակված sku-ն **404** է։ `price`-ը AMD տող է՝ երկու նիշով։ `image`-ը բացարձակ URL է կամ `null`։

`DEFAULT_PERMISSION_CLASSES`-ը մնում է `AllowAny`։ Էջի չափը 12 է, դնում է Suro-ն։ Կատեգորիաների և ապրանքների ցանկը DRF էջ է։ Գլխավորի բլոկները JSON զանգված են, ոչ թե էջ։

| Մեթոդ | Ուղի | Ով |
|--------|------|-----|
| `POST` | `/api/auth/token/` | Suro |
| `POST` | `/api/auth/token/refresh/` | Suro |
| `GET` | `/api/auth/me/` | Suro |
| `GET` | `/api/catalog/categories/?store=&language=` | Vach |
| `GET` | `/api/catalog/products/?store=&language=&q=` | Vach-ը կանչում է Mariam-ի `search_products` |
| `GET` | `/api/catalog/products/<sku>/?language=` | Vach |
| `GET` | `/api/content/home-blocks/?language=` | Hayk |
| `POST` | `/api/leads/newsletter/` | Daniel |
| `POST` | `/api/leads/wholesale/` | Daniel |

Token-ի մարմինը՝ `email` և `password`։ Պատասխանը՝ `access` և `refresh`։ `GET /api/auth/me/` առանց թոքենի՝ **401**։ Թոքենով՝ `email`, `first_name`, `last_name`։

Ապրանքի տարրը՝ `sku`, `store`, `price`, `name`, `category` (`slug`, `name`), `image`։ Քարտն ավելացնում է `description` և `images` (`url`, `alt`, `order`)։ Կատեգորիա՝ `slug`, `store`, `name`, `parent` slug կամ `null`։ Բլոկ՝ `slot`, `order`, `title`, `text`։

Բաժանորդագրության մարմինը՝ `{"email": "..."}`։ Առաջինը՝ **201**։ Նույն email-ը կրկին՝ **400**, երկրորդ տող չկա։ Մեծածախը՝ `name`, `phone`, `email`, `text`, բոլորը պարտադիր։ Հաջողությունը՝ **201** և `id`։ Դատարկ `q`-ն ցանկը չի նեղացնում։

### 1 — Lead

PR-ները merge արա անունների հերթով։ Կոնֆլիկտը լուծիր ֆայլի տիրոջ հետ։ Ashot-ից հետո՝ `python manage.py test`, health, Swagger, `/api/admin/analytics/` որպես staff, երեք էջ և անհայտ ուղի։

**Ավարտված է, երբ** health-ը `{"status":"ok"}` է, Swagger-ում երևում են պայմանագրի ուղիները, անալիտիկան կենդանի թվեր է ցույց տալիս միայն staff-ին, երեք էջը կարդում են API-ն, կրկնակի բաժանորդագրությունը երկրորդ տող չի ստեղծում, թեստերն ամբողջովին կանաչ են, իսկ զամբյուղը, պատվերը և Postgres-ը չկան։

### 2 — Suro · api

Գոտին ավելի մեծ է՝ ադմինի հարթակ և մուտք։ Wave 1-ի user մոդելը չվերաշարադրել։ Նոր հավելված չգրանցել։

1. Միայն staff-ի `GET /api/admin/analytics/`։ Ուղին `config/urls.py`-ում գրիր **`path("api/admin/", admin.site.urls)`-ից առաջ**։ Դեկորատորը՝ `staff_member_required`, `login_url="/api/admin/login/"`։ Հյուրը գնում է ադմինի մուտք։ Շաբլոնը՝ `apps/accounts/templates/`-ում, Unfold-ի տեսքով։ Ավելացրու sidebar կետ։ Եթե `SIDEBAR.navigation`-ը փոխարինում է ավտոմատ ցանկը, նույն ցանկում թող Catalog, Leads, Content, Users և Groups։
2. Միայն կարդալ, առանց նոր մոդելի և առանց հում SQL. published և unpublished ապրանքներ `textile`-ի և `baby`-ի համար, կատեգորիաներ ըստ խանութի, բաժանորդներ՝ ընդամենը և վերջին 7 օրվա, մեծածախ՝ ընդամենը և վերջին հինգը (անուն, email, ամսաթիվ), user-ներ՝ ընդամենը և staff, `HomeBlock`-ի քանակ։ Ամեն խումբ տանում է իր changelist-ը (`/api/admin/catalog/product/`, `/api/admin/catalog/category/`, `/api/admin/leads/newslettersubscriber/`, `/api/admin/leads/wholesaleinquiry/`, `/api/admin/accounts/user/`, `/api/admin/content/homeblock/`)։
3. `POST /api/auth/token/`, `POST /api/auth/token/refresh/`, `GET /api/auth/me/`՝ `api/auth/` տակ։
4. `PageNumberPagination` և `PAGE_SIZE = 12`։ Լռելյայն իրավունքը թող `AllowAny`։ Session authentication մի ավելացրու։
5. Spectacular-ի նկարագրից հանիր «միայն health» ձևակերպումը։

**Ավարտված է, երբ** staff-ը տեսնում է վեց խումբ թիվ, և դրանք համընկնում են ադմինի ցանկերին, հյուրը թվերը չի տեսնում, superuser-ի email-ով token-ը վերադարձնում է զույգը, `me`-ն առանց թոքենի 401 է, Swagger-ը այլևս «Health only» չէ, health-ը մնում է `{"status":"ok"}`։

### 3 — Artush · i18n

Ավելացրու `backend/apps/core/translations.py`։ `parse_language`՝ դատարկը դառնում է `en`, `am` / `en` / `ru` անցնում են, մնացած ամեն ինչ, այդ թվում այլ մեծատառ-փոքրատառ և `hy`, բարձրացնում է `ValueError`։ `pick_translation`՝ հարցված լեզուն, ապա `en`, ապա առաջին տողը ըստ լեզվի կոդի, ապա `None`։ Ծնող օբյեկտը չի հանում։ Վью-ն `ValueError`-ն դարձնում է **400**։

Ավելացրու `frontend/src/i18n/ru.json`՝ այսօրվա `en.json`-ի նույն բանալիներով, ռուսերեն։ `ru`-ն գրանցիր `resources`-ում և `supportedLngs`-ում։ `am.json`-ը և `en.json`-ը չվերաշարադրել։ Health-ը և Header-ը չփոխել։

**Ավարտված է, երբ** երեք կոդը դեռ գալիս են `languages.py`-ից, անհայտ լեզուն լուռ `en` չի դառնում, և `i18n.changeLanguage('ru')`-ն չի ընկնում։

### 4 — Hayk · gateway

`GET /api/content/home-blocks/?language=` վերադարձնում է JSON զանգված՝ `slot`, `order`, `title`, `text`, Artush-ի ֆունկցիաներով։ Առանց էջավորման։ `HomeBlock`-ի դաշտերը չփոխել։

Հավաքիր `/` էջը մակետից՝ hero-ի title և text, և խանութի ընտրություն։ Թող `/textile` և `/baby` հղումները։ Կարդա `api`-ով։ Եթե հարցումը ձախողվի, խանութի ընտրությունը էլի երևա։ Նոր տողերը գրիր երեք JSON-ում։

**Ավարտված է, երբ** `hero`-ն գալիս է `am`, `en` և `ru` լեզվով, `?language=de`-ն 400 է, իսկ կոնտենտի մոդելները չեն փոխվել։

### 5 — Mariam · header

Սպասիր Vach-ին։ Ցանկի վью-ն կանչում է `search_products`։ Կարող ես ուղղել `search.py`։ Կատալոգի վью-ն չխմբագրել. բացը տուր Lead-ին։

Որոնման դաշտը ուղարկում է `GET /api/catalog/products/?q=&language=`։ Ցույց տուր կարճ ցանկ՝ անուն, sku, AMD գին, խանութ։ Նոր երթուղի չբացել։ `header.js`-ի `LANGUAGES`-ին ավելացրու `ru`։ Account-ը և Cart-ը թող `disabled`։ Դատարկ հարցումը ամբողջ կատալոգի վրա դատարկ վիճակ չի նկարում։ Նոր տողերը՝ երեք JSON-ում։

**Ավարտված է, երբ** Textile ապրանքը գտնվում է sku-ով և անունով, `models.py`-ն չի դիպչվել, Account-ը և Cart-ը անջատված են։

### 6 — Daniel · footer

`POST /api/leads/newsletter/` և `POST /api/leads/wholesale/` առանց մուտքի։ Կրկնակի email-ը 400 է `email` դաշտի վրա, ոչ թե 500, և երկրորդ տող չի ստեղծում։

Footer-ում երկու ձև `react-hook-form`-ով՝ բաժանորդագրության email, և մեծածախի անուն, հեռախոս, email, տեքստ։ Հաջողությունն ու սխալը երևում են ձևի մեջ։ Ուղարկիր `api`-ով։ Նոր տողերը՝ երեք JSON-ում։ Հայտերի մոդելները չփոխել։

**Ավարտված է, երբ** առաջին բաժանորդագրությունը 201 է և երևում է ադմինում, երկրորդը 400 է, իսկ առանց տեքստի մեծածախը 400 է։

### 7 — Karen · textile

Հավաքիր `/textile` էջը `GET /api/catalog/categories/?store=textile` և `GET /api/catalog/products/?store=textile` հարցումներից։ Ցույց տուր կատեգորիաներ, հրապարակված ապրանքներ, անուն, AMD գին և `image` (`null`-ի դեպքում՝ առանց կոտրված պատկերակի)։ Լինեն բեռնում, դատարկ ցանկ և ցանցի սխալ։ `seed_textile`-ը, մոդելի դաշտերը և Baby էջը չփոխել։

**Ավարտված է, երբ** seed-ից հետո երևում է Textile ապրանքը, Baby ապրանքը չի երևում, և սևագիրը բացակայում է։

### 8 — Svet · baby

Նույն էջը `store=baby`-ի համար՝ `/baby`։ Textile-ի ֆայլերը և `seed_baby`-ն չփոխել։ Հերթում Karen-ից հետո ես։

**Ավարտված է, երբ** Baby խանութը ցույց է տալիս իր ապրանքը, իսկ Textile էջը չի փոխվել։

### 9 — Vach · catalog

**Համար՝** 9։ **Ճյուղ՝** `feat/vach-catalog`։ **Գործակալ՝** [docs/agents/09-vach.md](docs/agents/09-vach.md)։

Սպասիր Artush-ին։ Մոդելներն արդեն կան։ Հավելվածը երկրորդ անգամ չգրանցել և դաշտերը չփոխել։ `search.py`-ն չվերաշարադրել։ Ցանկի վью-ն մեկ անգամ կանչում է `search_products(queryset, query)`։

Ավելացրու `serializers.py`, `views.py` և ուղիները դատարկ `urls.py`-ում։ Պայմանագրի երեք GET-ը։ Միայն հրապարակված տողեր։ Գործածիր Suro-ի էջի չափը, ուրիշ չափ մի գրիր կոդի մեջ։ Լեզուն՝ `parse_language` և `pick_translation`։ `ValueError`-ն դառնում է 400։ `store`-ը պարտադիր չէ։ `image`-ը բացարձակ URL է կամ `null`։ Քարտում կա `images`։ Սխեմայի թեգը՝ `catalog`։ `/api/products/` մի ավելացրու։

**Ավարտված է, երբ** հրապարակված Textile ապրանքը երևում է `store=textile`-ում և չի երևում `store=baby`-ում, սևագիրը sku-ով 404 է, առանց `ru` ապրանքը մնում է ցանկում `en` անունով, `?language=de`-ն 400 է, դատարկ `q`-ն `count`-ը չի փոքրացնում, և `models.py`-ն չի դիպչվել։

### 10 — Ashot · ui

**Համար՝** 10։ **Ճյուղ՝** `feat/ashot-ui`։ **Գործակալ՝** [docs/agents/10-ashot.md](docs/agents/10-ashot.md)։

Դու վերջինն ես։ Wave 1-ի թեստերը թող։ Գործածիր DRF `APIClient`։ Առանց ցանցի, առանց Postgres-ի, առանց աշխատող սերվերի։

404 էջը՝ `NotFound.jsx`, `notFound.css`, `notFound.js`. վերնագիր, կարճ տեքստ, հղում դեպի `/`։ `index.css`-ը չփոխել։

API թեստեր. ցանկը միայն հրապարակված է, `store=textile`-ը baby չի պարունակում, `language=ru`-ն վերցնում է ռուսերեն անունը, իսկ միայն `en` ապրանքը մնում է ցանկում, `language=de`-ն 400 է, `q`-ն գտնում է sku, դատարկ `q`-ն հրապարակված հավաքածուն չի փոքրացնում, բաժանորդագրության երկրորդ POST-ը 400 է և թողնում է մեկ տող, առանց `text` մեծածախը 400 է, `GET /api/auth/me/` առանց թոքենի 401 է, home block-ը `language=en`-ով վերադարձնում է `title`։

**Ավարտված է, երբ** `backend/`-ից `python manage.py test`-ը ամբողջովին կանաչ է, 404-ը տանում է գլխավոր, իսկ diff-ում չկան մոդելների դաշտեր և `index.css`։
