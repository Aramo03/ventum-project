# Ventum — Wave 1

Настоящий магазин: вход, витрина Textile и витрина Baby. Wave 1 собирает данные и админку, на которых магазин потом стоит. Вёрстку по макету здесь не делаем.

Макеты интерфейса:

- [Ventum — кадр магазина](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12495)
- [Ventum — второй файл макета](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=0-1)

**Срок:** закончить до конца декабря.  
**Git:** [CONTRIBUTING.md](CONTRIBUTING.md). Короткий список: [TASK.md](TASK.md). Доска merge: [docs/zones/lead/README.md](docs/zones/lead/README.md).

Номер ученика один. Он стоит в таблице ниже, в заголовке раздела (`## 9 — Vach`) и в имени файла `docs/agents/09-vach.md`. Очередь merge этим номером не пользуется.

База — SQLite. Postgres не поднимать. Админка: `http://127.0.0.1:8000/api/admin/`. Проверка жизни сервера: `http://127.0.0.1:8000/api/health/`. Swagger: `http://127.0.0.1:8000/api/schema/swagger-ui/`.

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

Очередь merge (это порядок имён, не номера учеников):

```
Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot
```

Suro первый среди кода: приложения и пользователь должны существовать до чужих миграций. Vach после Artush: переводы наследуют его класс. Karen и Svet после Vach: им нужны готовые модели. Mariam после Karen и Svet: поиск проверяется на их данных. Ashot последний: тесты на уже смерженные модели.

---

## Как сдать

1. `git checkout dev && git pull`, затем ветка из таблицы.
2. Работа только в своих файлах. README в папке не удалять.
3. Один pull request, **base = `dev`**. В описании — что сделано и что `python manage.py migrate` проходит на SQLite.
4. В `main` не пушить. `--force` на `dev` и `main` не делать.

Каркас уже проверен: миграции применяются, `manage.py check` без замечаний, `/api/health/` отвечает `{"status":"ok"}`, `/api/admin/login/` открывается. Lead чужие модели не пишет и мержит только в очереди выше.

---

## Чьи файлы

| # | Можно | Нельзя |
|---|--------|--------|
| 1 Lead | порядок PR, конфликт только чтобы собрать `dev` | модели и вёрстку зон |
| 2 Suro | `apps/accounts/`, пустые пакеты приложений, `INSTALLED_APPS`, `include` в `config/urls.py` | поля товара, заявки, слоты главной, `search.py` |
| 3 Artush | `apps/core/languages.py`, абстрактный перевод | вью `/api/health/`, JSON фронта |
| 4 Hayk | `apps/content/` | `pages/Gateway/` |
| 5 Mariam | `apps/catalog/search.py` | модели, миграции, `Header.jsx` |
| 6 Daniel | `apps/leads/` | API-ручки и `Footer.jsx` |
| 7 Karen | команда или фикстура textile | поля моделей и страницу `/textile` |
| 8 Svet | команда или фикстура baby | поля моделей и страницу `/baby` |
| 9 Vach | `apps/catalog/models.py`, `admin.py`, миграции каталога | `search.py`, страницы React |
| 10 Ashot | тесты моделей в `backend/` | `NotFound` и `index.css`, поля моделей |

Новые приложения в `INSTALLED_APPS` регистрирует только Suro (ученик 2).

Языки контента: `am`, `en`, `ru`. Нет перевода на запрошенный язык — запись не пропадает; текст берётся из `en`, иначе из любого существующего. Это правило Artush (ученик 3) пишет в docstring. Список API в этом задании не делаем.

---

## 1 — Lead

**Папка:** [docs/zones/lead/README.md](docs/zones/lead/README.md). **Ветка:** `feat/lead`. **Агент:** [docs/agents/01-lead.md](docs/agents/01-lead.md).

Каркас уже проверен. Дальше Lead принимает PR в `dev` строго по очереди имён. Конфликт чинит вместе с владельцем файла и не переписывает зону.

После merge Ashot (ученик 10): удалить `backend/ventum.sqlite3`, снова `migrate`, создать суперпользователя с email, открыть `/api/health/` и `/api/admin/`.

**Не закрывать Wave 1, пока:** в админке есть пользователь с логином-email, категории и товары Textile и Baby с переводами `am`/`en`/`ru`, подписчик рассылки и слот главной; health и Swagger живы.

## 2 — Suro · api

**Папка:** [backend/apps/accounts/README.md](backend/apps/accounts/README.md). **Ветка:** `feat/suro-api`. **Агент:** [docs/agents/02-suro.md](docs/agents/02-suro.md).

**Сделать**

1. `accounts.User` от `AbstractUser`. `USERNAME_FIELD = "email"`, email уникален, есть имя. `REQUIRED_FIELDS` без email.
2. `AUTH_USER_MODEL = "accounts.User"` до `makemigrations`. Иначе Django оставит стандартного пользователя, и магазин потом не пересядет на email.
3. Пакеты `catalog`, `leads`, `content`: `apps.py`, `__init__.py`, пустой `models.py`, пустой `urls.py`. Модели туда не писать. Каталог пишет Vach (9), заявки — Daniel (6), слоты — Hayk (4). README не удалять.
4. Прописать приложения в `INSTALLED_APPS` и `include` в [backend/config/urls.py](backend/config/urls.py).
5. `makemigrations` только для `accounts`. `GET /api/health/` не менять.

**Зона ответственности:** пользователь и регистрация пустых приложений.  
**Нельзя:** поля товара, заявки, слоты, `search.py`.

**Lead не мержит, пока:** `createsuperuser` спрашивает email; пользователь виден в `/api/admin/`; Swagger открывается; в `catalog/models.py` нет товара; `migrate` на чистом SQLite проходит; health по-прежнему `{"status":"ok"}`.

## 3 — Artush · i18n

**Папка:** [backend/apps/core/README.md](backend/apps/core/README.md). **Ветка:** `feat/artush-i18n`. **Агент:** [docs/agents/03-artush.md](docs/agents/03-artush.md).

**Сделать**

1. `backend/apps/core/languages.py`: только коды `am`, `en`, `ru` и подписи. Остальные модули импортируют их отсюда.
2. Абстрактная модель перевода в `apps/core`: язык из этого списка. Наследник задаёт связь с родителем. Пара «родитель + язык» уникальна.
3. В docstring: нет перевода на язык запроса — объект не удаляется из выдачи; текст из `en`, иначе из любого перевода, который есть.

Вью health не трогать. Файлы `frontend/src/i18n/` не трогать.

**Зона ответственности:** список языков и абстрактный класс, от которого наследуют Vach (9) и Hayk (4).  
**Нельзя:** вью `/api/health/`, JSON фронта, модели товара.

**Lead не мержит, пока:** три кода импортируются из одного модуля; миграция ядра проходит на SQLite; `/api/health/` отвечает `{"status":"ok"}`.

## 4 — Hayk · gateway

**Папка:** [backend/apps/content/README.md](backend/apps/content/README.md). **Ветка:** `feat/hayk-gateway`. **Агент:** [docs/agents/04-hayk.md](docs/agents/04-hayk.md).

Ждать Suro и Artush. Страницу `/` не верстать: макет лежит в Figma, в этом задании только данные слота. В очередь merge Hayk встаёт после Daniel.

**Сделать**

1. `HomeBlock`: ключ слота (`hero` или `stores` — блоки входа в макете), порядок, переводы `title` и `text` на `am`/`en`/`ru`.
2. Админка с инлайном переводов.

**Зона ответственности:** `apps/content/`.  
**Нельзя:** `frontend/src/pages/Gateway/`, модели товара Vach.

**Lead не мержит, пока:** слот `hero` сохраняется на трёх языках; модели товара не изменены; `frontend/src/pages/Gateway/` без новой вёрстки.

## 5 — Mariam · header

**Папка:** [frontend/src/components/Header/README.md](frontend/src/components/Header/README.md). **Ветка:** `feat/mariam-header`. **Агент:** [docs/agents/05-mariam.md](docs/agents/05-mariam.md).

Ждать merge Vach (9), Karen (7) и Svet (8). `Header.jsx` не менять. В очередь merge Mariam встаёт после Svet.

**Сделать** только `backend/apps/catalog/search.py`:

1. `search_products(queryset, query)`.
2. Пустой запрос или пробелы — тот же queryset, без фильтра.
3. Иначе поиск по sku и по переведённому имени (`am`, `en` или `ru`), без учёта регистра.
4. В docstring контракт на будущее, без вью и без URL: `GET /api/products/?q=&store=&language=`.

**Зона ответственности:** один файл `search.py`.  
**Нельзя:** `models.py`, миграции, `Header.jsx`.

**Lead не мержит, пока:** на данных Karen и Svet функция находит товар по sku и по имени на каждом из трёх языков; пустой запрос ничего не отрезает; в diff нет правок `models.py`.

## 6 — Daniel · footer

**Папка:** [backend/apps/leads/README.md](backend/apps/leads/README.md). **Ветка:** `feat/daniel-footer`. **Агент:** [docs/agents/06-daniel.md](docs/agents/06-daniel.md).

Ждать, пока Suro заведёт пакет `leads`. Страницу Footer не верстать. В очередь merge Daniel встаёт после Vach.

**Сделать**

1. `NewsletterSubscriber`: email уникален, дата создания.
2. `WholesaleInquiry`: имя, телефон, email, текст, дата. Это заявка, не товар.
3. Обе модели в админке, списком. URL для отправки с сайта не добавлять.

**Зона ответственности:** `apps/leads/`.  
**Нельзя:** API-ручки и `Footer.jsx`.

**Lead не мержит, пока:** обе модели видны в `/api/admin/`; второй такой же email подписки база не принимает; в `urls` нет ручек этих заявок.

## 7 — Karen · textile

**Папка:** [frontend/src/pages/Textile/README.md](frontend/src/pages/Textile/README.md). **Ветка:** `feat/karen-textile`. **Агент:** [docs/agents/07-karen.md](docs/agents/07-karen.md).

Ждать merge Vach (ученик 9, зона catalog). Страницу `/textile` не собирать. Поля `Category` и `Product` не менять. В очередь merge Karen встаёт после Hayk.

**Сделать**

Команда `seed_textile` или фикстура:

- минимум две категории с `store=textile` и переводами `am`, `en`, `ru`;
- один опубликованный товар с ценой в AMD и тремя переводами имени;
- картинка — файл из репозитория, не случайная ссылка в интернет;
- повторный запуск не создаёт второй slug;
- записи Baby не удаляются.

**Зона ответственности:** данные Textile, не схема.  
**Нельзя:** поля моделей и страница `/textile`.

**Lead не мержит, пока:** команда или `loaddata` на чистой базе создаёт эти записи и второй запуск не падает и не плодит дубликаты.

## 8 — Svet · baby

**Папка:** [frontend/src/pages/Baby/README.md](frontend/src/pages/Baby/README.md). **Ветка:** `feat/svet-baby`. **Агент:** [docs/agents/08-svet.md](docs/agents/08-svet.md).

То же для `store=baby`: команда `seed_baby`, две свои категории и один товар, три языка. Данные Karen не стирать и не переписывать. Страницу `/baby` не собирать. Поля моделей не менять. Ждать merge Vach (ученик 9). В очередь merge Svet встаёт после Karen.

**Зона ответственности:** данные Baby, не схема.  
**Нельзя:** поля моделей, страница `/baby`, данные Textile.

**Lead не мержит, пока:** фильтр админки по `store` показывает и Textile, и Baby; повторный запуск не плодит slug.

## 9 — Vach · catalog

**Номер:** 9. Так он записан в [TASK.md](TASK.md), на доске Lead и в [docs/agents/09-vach.md](docs/agents/09-vach.md).  
**Папка:** [backend/apps/catalog/README.md](backend/apps/catalog/README.md). **Ветка:** `feat/vach-catalog`.

Два магазина макета, Textile и Baby, живут в одном каталоге. Их различает поле `store`, а не два разных приложения.

Ждать merge Suro (2) и Artush (3). Пакет `catalog` заводит Suro пустым: `apps.py`, `__init__.py`, пустой `models.py`, пустой `urls.py`. README не удалять. В `INSTALLED_APPS` приложение уже будет зарегистрировано Suro; второй раз его не регистрировать.

В очередь merge Vach встаёт сразу после Artush, до Daniel.

### Зона ответственности

Только каталог:

- `backend/apps/catalog/models.py`
- `backend/apps/catalog/admin.py`
- миграции приложения `catalog`

Этого хватает, чтобы в админке появились категория, товар и картинка с переводами.

### Что делать нельзя

- Не создавать `backend/apps/catalog/search.py`. Его пишет Mariam (ученик 5) после данных Karen и Svet.
- Не менять страницы React: `frontend/src/pages/Textile/`, `frontend/src/pages/Baby/`, Header, Footer, Gateway, NotFound, `index.css`.
- Не менять пользователя Suro, заявки Daniel, `HomeBlock` Hayk, `languages.py` и абстрактный класс Artush.
- Не добавлять URL и API-список товаров. В Wave 1 списка API нет.
- Не поднимать Postgres.

### Сделать

1. `Category`
   - родитель необязателен, чтобы категорию можно было вложить;
   - `store` принимает ровно `textile` или `baby`;
   - `slug` уникален;
   - перевод поля `name` на `am`, `en` и `ru` через абстрактный класс Artush;
   - пара «категория + язык» уникальна, потому что так устроен класс Artush.
2. `Product`
   - внешний ключ на категорию;
   - цена `Decimal` в AMD, не `float` и не строка;
   - `sku` уникален;
   - флаг публикации;
   - переводы `name` и `description` на `am`, `en` и `ru`.
3. `ProductImage`
   - файл изображения, поле с загрузкой файла (в стеке уже есть Pillow);
   - `alt`;
   - целое поле порядка, чтобы картинки товара шли списком.
4. Админка Unfold
   - категория и товар в `/api/admin/`;
   - инлайн переводов у категории и у товара;
   - инлайн картинок у товара;
   - фильтр списка по `store`, чтобы Textile и Baby было видно раздельно.

Правило «нет перевода — объект не исчезает, текст из `en`, иначе из любого имеющегося» пишет Artush в docstring базового класса. Vach этот класс наследует и не копирует правило в другой модуль.

### Definition of Done

Lead не мержит PR Vach, пока одновременно верно всё:

- в `/api/admin/` сохраняется категория с переводами `name` на `am`, `en` и `ru`;
- в `/api/admin/` сохраняется товар этой категории: цена `Decimal` в AMD, уникальный sku, флаг публикации, переводы `name` и `description` на трёх языках, и к нему можно прикрепить картинку с alt и порядком;
- фильтр по `store` отделяет `textile` от `baby`;
- `python manage.py migrate` на чистом SQLite (файл `backend/ventum.sqlite3` удалён) проходит без ошибок;
- файла `search.py` в каталоге нет;
- diff не меняет модель пользователя и `HomeBlock`;
- diff не меняет страницы React.

### Как проверить самому

```bash
cd backend
del ventum.sqlite3
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Открыть `http://127.0.0.1:8000/api/admin/`. Создать категорию `store=textile` со slug и тремя переводами имени. Создать опубликованный товар: цена в AMD, sku, три имени, три описания, одна картинка. Убедиться, что фильтр `store` показывает эту категорию. В `git status` нет `search.py` и нет правок чужих приложений.

## 10 — Ashot · ui

**Номер:** 10. Так он записан в [TASK.md](TASK.md), на доске Lead и в [docs/agents/10-ashot.md](docs/agents/10-ashot.md).  
**Папка зоны:** [frontend/src/pages/NotFound/README.md](frontend/src/pages/NotFound/README.md). **Ветка:** `feat/ashot-ui`.

Папка называется NotFound, потому что зона исторически сидит рядом со страницей 404. Саму страницу 404 в Wave 1 не делать. Работа Ashot — тесты уже смерженных моделей.

Ждать, пока в `dev` есть модели всех предыдущих: пользователь Suro, переводы Artush, каталог Vach, заявки Daniel, слот Hayk. В очередь merge Ashot встаёт последним, после Mariam. Данные Karen и Svet к этому моменту тоже уже в `dev`, но тесты создают свои записи и не зависят от сидов.

### Зона ответственности

Тесты Django в `backend/`, рядом с уже смерженными приложениями: `tests.py` или пакет `tests/` внутри приложения. Запускаются командой `python manage.py test`. База тестов — SQLite проекта, без отдельного сервера.

Покрыть поведение моделей, которое Wave 1 обещает админке:

- пользователь с логином-email;
- категория с тремя переводами;
- товар магазина Textile и товар магазина Baby;
- товар, у которого нет перевода `ru`, всё равно сохраняется;
- `NewsletterSubscriber`.

### Что делать нельзя

- Не менять `frontend/src/pages/NotFound/` (`NotFound.jsx`, `notFound.css`, `notFound.js`).
- Не менять `frontend/src/index.css`.
- Не менять поля моделей, `admin.py` и миграции. Если тест не проходит из-за поля, это баг зоны-владельца, а не повод переписать модель.
- Не писать тесты, которым нужна сеть, Postgres, внешний API или уже запущенный `runserver`.
- Не собирать страницу 404 и не верстать магазин.

### Сделать

Тесты на SQLite, без сети и без Postgres:

1. Создаётся пользователь, у которого логин — email, email уникален.
2. Создаётся категория с переводами `name` на `am`, `en` и `ru`.
3. Создаётся опубликованный товар с `store` категории `textile` и отдельный товар с `store=baby`. У обоих цена `Decimal` в AMD и sku.
4. Товар без перевода `ru` сохраняется. Отсутствие одного языка не отвергает запись. Это прямое следствие правила Artush.
5. `NewsletterSubscriber` сохраняется, а вторая запись с тем же email не сохраняется.
6. `python manage.py test` из каталога `backend/` зелёный целиком, не только новый файл.

### Definition of Done

Lead не мержит PR Ashot, пока `python manage.py test` из `backend/` завершается зелёным целиком, тесты не ходят в сеть и не требуют Postgres, страница NotFound и `index.css` в diff не изменены, поля моделей в diff не изменены.

### Как проверить самому

```bash
cd backend
python manage.py test
```

Команда должна закончиться без ошибок. Затем `git diff` по `frontend/src/pages/NotFound/` и `frontend/src/index.css` пустой, и в diff нет правок полей в `models.py`.

---

## Готово, когда

После merge Ashot (ученик 10) Lead поднимает пустой SQLite. В админке без правки кода видны пользователь, слот главной, подписчик, категории и товары обоих магазинов на `am`, `en` и `ru`. Health и Swagger отвечают. `python manage.py test` зелёный.

---

## English

Wave 1 is the real shop data for Textile and Baby: models and admin only. Do not build pages from the designs yet.

Designs:

- [Ventum shop frame](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12495)
- [Second Ventum design file](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=0-1)

Finish by the end of December. SQLite only. Admin: `/api/admin/`. Health: `/api/health/`. One pull request per zone, base `dev`. Do not push `main`.

The student number is the same number in [TASK.md](TASK.md), in the headings above, and in `docs/agents/`. The merge queue is a list of names, not a second numbering.

| # | Name | Branch | Zone | Agent |
|---|------|--------|------|--------|
| 1 | Lead | `feat/lead` | lead | [01-lead.md](docs/agents/01-lead.md) |
| 2 | Suro | `feat/suro-api` | api | [02-suro.md](docs/agents/02-suro.md) |
| 3 | Artush | `feat/artush-i18n` | i18n | [03-artush.md](docs/agents/03-artush.md) |
| 4 | Hayk | `feat/hayk-gateway` | gateway | [04-hayk.md](docs/agents/04-hayk.md) |
| 5 | Mariam | `feat/mariam-header` | header | [05-mariam.md](docs/agents/05-mariam.md) |
| 6 | Daniel | `feat/daniel-footer` | footer | [06-daniel.md](docs/agents/06-daniel.md) |
| 7 | Karen | `feat/karen-textile` | textile | [07-karen.md](docs/agents/07-karen.md) |
| 8 | Svet | `feat/svet-baby` | baby | [08-svet.md](docs/agents/08-svet.md) |
| 9 | Vach | `feat/vach-catalog` | catalog | [09-vach.md](docs/agents/09-vach.md) |
| 10 | Ashot | `feat/ashot-ui` | ui | [10-ashot.md](docs/agents/10-ashot.md) |

Merge queue: **Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**.

| # | Do this | Lead merges only when |
|---|---------|------------------------|
| 1 Lead | Merge in that named queue. After Ashot, migrate a fresh sqlite and open health and admin | User, both stores, newsletter, and home slot exist in admin |
| 2 Suro | Email is the login. Empty `catalog`, `leads`, `content` packages. Register them. Do not fill their models | Superuser asks for email; Swagger opens; health stays `{"status":"ok"}` |
| 3 Artush | `languages.py` with `am`, `en`, `ru` and an abstract translation. Do not edit the health view or frontend JSON | Three codes import from one module; core migration applies |
| 4 Hayk | `HomeBlock` with title and text in three languages. Do not restyle `/` | Slot `hero` saves in three languages |
| 5 Mariam | `search_products` in `search.py` only. Match sku and translated name. Empty query returns the queryset | Finds Karen’s and Svet’s products; `models.py` is untouched |
| 6 Daniel | `NewsletterSubscriber` (unique email) and `WholesaleInquiry`. No public URL | Both models are in admin; duplicate subscriber email is rejected |
| 7 Karen | `seed_textile`: two categories, one product, three languages. Do not change model fields or the page | Second run does not duplicate slugs or delete Baby |
| 8 Svet | `seed_baby`, same rules, `store=baby`. Do not delete Textile | Admin filter shows both stores |
| 9 Vach | Category, Product, images, Unfold admin. Full steps are in the next section | A product with three translations saves in admin; no `search.py` |
| 10 Ashot | SQLite model tests. Full steps are in the section after Vach | `manage.py test` is green with no network |

Students 1–8: the Russian sections above are the full steps. Students 9 and 10 are written in full in this language below. Give your agent the file from the table.

### 9 — Vach · catalog

**Number:** 9. **Branch:** `feat/vach-catalog`. **Zone folder:** [backend/apps/catalog/README.md](backend/apps/catalog/README.md). **Agent file:** [docs/agents/09-vach.md](docs/agents/09-vach.md).

Textile and Baby are one catalog. The `store` field is `textile` or `baby`.

Wait until Suro (2) and Artush (3) are merged. Suro creates the empty `catalog` package. Do not register the app again. In the merge queue Vach is immediately after Artush and before Daniel.

**You own**

- `backend/apps/catalog/models.py`
- `backend/apps/catalog/admin.py`
- catalog migrations

**You do not touch**

- `search.py` (Mariam, student 5, writes it later)
- React pages, Header, Footer, Gateway, NotFound, `index.css`
- Suro’s user, Daniel’s leads, Hayk’s `HomeBlock`, Artush’s language module
- product list URLs
- Postgres

**Build**

1. `Category`: optional parent, `store` exactly `textile` or `baby`, unique slug, `name` translated to `am` / `en` / `ru` through Artush’s abstract class. The pair of category and language is unique.
2. `Product`: foreign key to a category, `Decimal` price in AMD (not float, not a string), unique sku, published flag, `name` and `description` translated to `am` / `en` / `ru`.
3. `ProductImage`: uploaded image file (Pillow is already installed), alt text, integer order.
4. Unfold admin: translation inlines, image inline, list filter on `store`.

Artush’s docstring owns the fallback: a missing language does not drop the row; text comes from `en`, otherwise from any translation that exists. Subclass that model. Do not reimplement the rule in another app.

**Definition of done.** Lead merges only when all of these are true:

- a category with `name` in `am`, `en`, and `ru` saves in `/api/admin/`;
- a product in that category saves with an AMD `Decimal` price, a unique sku, a published flag, `name` and `description` in three languages, and an image with alt and order;
- the `store` filter separates textile from baby;
- `python manage.py migrate` passes on a deleted `backend/ventum.sqlite3`;
- `search.py` does not exist;
- the user model, `HomeBlock`, and React pages are unchanged.

**Check**

```bash
cd backend
del ventum.sqlite3
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Open `/api/admin/`. Save a textile category and a published product with three languages and one image. `git status` must not show `search.py` or other people’s apps.

### 10 — Ashot · ui

**Number:** 10. **Branch:** `feat/ashot-ui`. **Zone folder:** [frontend/src/pages/NotFound/README.md](frontend/src/pages/NotFound/README.md). **Agent file:** [docs/agents/10-ashot.md](docs/agents/10-ashot.md).

The folder is next to the 404 page. Do not build that page. Ashot writes tests for models that are already merged.

Wait until `dev` contains Suro’s user, Artush’s translations, Vach’s catalog, Daniel’s leads, and Hayk’s home slot. Ashot is last in the merge queue, after Mariam. Tests create their own rows. They do not need Karen’s or Svet’s seed commands.

**You own**

Django tests under `backend/`, in `tests.py` or a `tests/` package beside the merged apps. Run them with `python manage.py test`. The test database is the project SQLite. No extra database server.

**You do not touch**

- `frontend/src/pages/NotFound/` and `frontend/src/index.css`
- model fields, `admin.py`, and migrations
- network, Postgres, external APIs, or a running `runserver`
- the 404 layout and the shop layout

**Build**

1. A user whose login is a unique email.
2. A category with `name` in `am`, `en`, and `ru`.
3. A published Textile product and a separate published Baby product. Both have an AMD `Decimal` price and a sku.
4. A product with no `ru` translation still saves. A missing language does not reject the row.
5. A `NewsletterSubscriber` saves, and a second row with the same email does not.
6. `python manage.py test` from `backend/` is green for the whole suite, not only the new file.

**Definition of done.** Lead merges only when `python manage.py test` from `backend/` is fully green, tests use no network and no Postgres, and the diff does not change NotFound, `index.css`, or model fields.

**Check**

```bash
cd backend
python manage.py test
```

Then confirm `git diff` is empty for `frontend/src/pages/NotFound/`, `frontend/src/index.css`, and model fields.

---

## Հայերեն

Wave 1-ը Textile և Baby խանութների տվյալներն են՝ միայն մոդելներ և ադմին։ Մակետից էջ դեռ չենք հավաքում։

Մակետներ.

- [Ventum խանութ](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12495)
- [Ventum երկրորդ ֆայլ](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=0-1)

Ավարտել մինչև դեկտեմբերի վերջ։ Միայն SQLite։ Ադմին՝ `/api/admin/`։ Health՝ `/api/health/`։ Մեկ PR = մեկ գոտի, base-ը `dev`։ `main` չենք push անում։

Աշակերտի համարը նույնն է [TASK.md](TASK.md)-ում, վերնագրերում և `docs/agents/`-ում։ Merge-ի հերթը անունների ցանկ է, ոչ թե երկրորդ համար։

| # | Անուն | Ճյուղ | Գոտի | Գործակալ |
|---|------|--------|------|-----------|
| 1 | Lead | `feat/lead` | lead | [01-lead.md](docs/agents/01-lead.md) |
| 2 | Suro | `feat/suro-api` | api | [02-suro.md](docs/agents/02-suro.md) |
| 3 | Artush | `feat/artush-i18n` | i18n | [03-artush.md](docs/agents/03-artush.md) |
| 4 | Hayk | `feat/hayk-gateway` | gateway | [04-hayk.md](docs/agents/04-hayk.md) |
| 5 | Mariam | `feat/mariam-header` | header | [05-mariam.md](docs/agents/05-mariam.md) |
| 6 | Daniel | `feat/daniel-footer` | footer | [06-daniel.md](docs/agents/06-daniel.md) |
| 7 | Karen | `feat/karen-textile` | textile | [07-karen.md](docs/agents/07-karen.md) |
| 8 | Svet | `feat/svet-baby` | baby | [08-svet.md](docs/agents/08-svet.md) |
| 9 | Vach | `feat/vach-catalog` | catalog | [09-vach.md](docs/agents/09-vach.md) |
| 10 | Ashot | `feat/ashot-ui` | ui | [10-ashot.md](docs/agents/10-ashot.md) |

Merge-ի հերթը՝ **Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**։

| # | Անել | Lead-ը merge է անում, երբ |
|---|------|---------------------------|
| 1 Lead | PR-ները անունների հերթով։ Ashot-ից հետո՝ մաքուր sqlite, health և ադմին | Ադմինում կան user, երկու խանութ, newsletter, գլխավոր սլոթ |
| 2 Suro | Մուտքը email-ով։ Դատարկ `catalog`, `leads`, `content`։ Մոդելները չլրացնել | Superuser-ը հարցնում է email; Swagger-ը բացվում է; health-ը `{"status":"ok"}` է |
| 3 Artush | `am`, `en`, `ru` և աբստրակտ թարգմանություն։ Health-ը և frontend JSON-ը չփոխել | Երեք կոդ մեկ մոդուլից են; միգրացիան անցնում է |
| 4 Hayk | `HomeBlock` երեք լեզվով։ `/` էջը չձևավորել | `hero` սլոթը պահվում է երեք լեզվով |
| 5 Mariam | Միայն `search.py`։ sku և թարգմանված անուն։ Դատարկ հարցումը queryset-ը չի կտրում | Գտնում է Karen-ի և Svet-ի ապրանքը; `models.py` չի փոխվել |
| 6 Daniel | `NewsletterSubscriber` (եզակի email) և `WholesaleInquiry`։ Հանրային URL չկա | Երկու մոդելն էլ ադմինում են; կրկնակի email-ը մերժվում է |
| 7 Karen | `seed_textile`՝ երկու կատեգորիա, մեկ ապրանք, երեք լեզու | Երկրորդ անգամը slug չի կրկնում և Baby-ն չի ջնջում |
| 8 Svet | `seed_baby`, `store=baby`։ Textile-ը չջնջել | Ֆիլտրը ցույց է տալիս երկու խանութը |
| 9 Vach | Category, Product, նկարներ, ադմին։ Քայլերը հաջորդ բաժնում են | Երեք թարգմանությամբ ապրանքը պահվում է; `search.py` չկա |
| 10 Ashot | Մոդելների SQLite թեստեր։ Քայլերը Vach-ից հետո են | `manage.py test`-ը կանաչ է, առանց ցանցի |

1–8 աշակերտների քայլ առ քայլ տեքստը ռուսերեն բաժիններում է։ 9-րդ և 10-րդ աշակերտների ամբողջ առաջադրանքը այս լեզվով ներքևում է։ Գործակալին տուր աղյուսակի ֆայլը ամբողջությամբ։

### 9 — Vach · catalog

**Համար՝** 9։ **Ճյուղ՝** `feat/vach-catalog`։ **Պանակ՝** [backend/apps/catalog/README.md](backend/apps/catalog/README.md)։ **Գործակալ՝** [docs/agents/09-vach.md](docs/agents/09-vach.md)։

Textile-ը և Baby-ն մեկ կատալոգ են։ Դրանց բաժանում է `store` դաշտը՝ `textile` կամ `baby`։

Սպասել Suro-ի (2) և Artush-ի (3) merge-ին։ Դատարկ `catalog` փաթեթը ստեղծում է Suro-ն։ Հավելվածը երկրորդ անգամ չգրանցել։ Merge-ի հերթում Vach-ը Artush-ից անմիջապես հետո է, Daniel-ից առաջ։

**Քոնն է**

- `backend/apps/catalog/models.py`
- `backend/apps/catalog/admin.py`
- catalog-ի միգրացիաները

**Չդիպչել**

- `search.py` (դա գրում է Mariam-ը, աշակերտ 5)
- React էջեր, Header, Footer, Gateway, NotFound, `index.css`
- Suro-ի user-ը, Daniel-ի հայտերը, Hayk-ի `HomeBlock`-ը, Artush-ի լեզվի մոդուլը
- ապրանքների URL-ներ
- Postgres

**Անել**

1. `Category`՝ ծնողը պարտադիր չէ, `store`-ը ճիշտ `textile` կամ `baby`, եզակի slug, `name`-ի թարգմանություն `am` / `en` / `ru` Artush-ի աբստրակտ դասով։ Կատեգորիա + լեզու զույգը եզակի է։
2. `Product`՝ կապ կատեգորիայի հետ, գինը `Decimal` AMD-ով (ոչ float, ոչ տող), եզակի sku, հրապարակման դրոշ, `name` և `description` երեք լեզվով։
3. `ProductImage`՝ նկարի ֆայլ (Pillow-ն արդեն կա), alt, հերթականության ամբողջ թիվ։
4. Unfold ադմին՝ թարգմանությունների inline, նկարների inline, ցանկի ֆիլտր `store`-ով։

Եթե թարգմանություն չկա, տողը չի անհետանում. տեքստը գալիս է `en`-ից, այլապես առկա ցանկացած թարգմանությունից։ Այդ կանոնը Artush-ի docstring-ում է։ Vach-ը դասը ժառանգում է, կանոնը ուրիշ տեղ չի կրկնօրինակում։

**Definition of Done.** Lead-ը merge է անում միայն երբ այս բոլորը ճիշտ են.

- `/api/admin/`-ում պահվում է կատեգորիա՝ `name`-ով `am`, `en`, `ru`;
- այդ կատեգորիայի ապրանքը պահվում է AMD `Decimal` գնով, եզակի sku-ով, հրապարակման դրոշով, երեք լեզվի `name`/`description`-ով և նկարով (alt, հերթ);
- `store` ֆիլտրը բաժանում է textile-ը baby-ից;
- ջնջված `backend/ventum.sqlite3`-ի վրա `python manage.py migrate`-ը անցնում է;
- `search.py` չկա;
- user-ի մոդելը, `HomeBlock`-ը և React էջերը չեն փոխվել։

**Ստուգում**

```bash
cd backend
del ventum.sqlite3
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Բացել `/api/admin/`։ Պահել textile կատեգորիա և հրապարակված ապրանք երեք լեզվով ու մեկ նկարով։ `git status`-ում չպետք է լինի `search.py` կամ ուրիշի հավելված։

### 10 — Ashot · ui

**Համար՝** 10։ **Ճյուղ՝** `feat/ashot-ui`։ **Պանակ՝** [frontend/src/pages/NotFound/README.md](frontend/src/pages/NotFound/README.md)։ **Գործակալ՝** [docs/agents/10-ashot.md](docs/agents/10-ashot.md)։

Պանակը 404 էջի կողքին է։ Այդ էջը չենք սարքում։ Ashot-ը թեստեր է գրում արդեն merge արված մոդելների համար։

Սպասել, մինչև `dev`-ում լինեն Suro-ի user-ը, Artush-ի թարգմանությունները, Vach-ի կատալոգը, Daniel-ի հայտերը և Hayk-ի սլոթը։ Merge-ի հերթում Ashot-ը վերջինն է, Mariam-ից հետո։ Թեստերն իրենց տողերն են ստեղծում. Karen-ի և Svet-ի seed-ը պետք չէ։

**Քոնն է**

Django թեստեր `backend/`-ում՝ `tests.py` կամ `tests/` փաթեթ՝ արդեն merge արված հավելվածի կողքին։ Հրամանը՝ `python manage.py test`։ Բազան նախագծի SQLite-ն է, առանձին սերվեր չկա։

**Չդիպչել**

- `frontend/src/pages/NotFound/` և `frontend/src/index.css`
- մոդելների դաշտեր, `admin.py`, միգրացիաներ
- ցանց, Postgres, արտաքին API, աշխատող `runserver`
- 404-ի և խանութի դասավորությունը

**Անել**

1. User, որի մուտքը եզակի email է։
2. Կատեգորիա՝ `name`-ով `am`, `en`, `ru`։
3. Հրապարակված Textile ապրանք և առանձին հրապարակված Baby ապրանք։ Երկուսն էլ ունեն AMD `Decimal` գին և sku։
4. Առանց `ru` թարգմանության ապրանքը էլի պահվում է։ Մեկ լեզվի բացակայությունը տողը չի մերժում։
5. `NewsletterSubscriber`-ը պահվում է, նույն email-ով երկրորդ տողը՝ ոչ։
6. `backend/`-ից `python manage.py test`-ը ամբողջությամբ կանաչ է, ոչ միայն նոր ֆայլը։

**Definition of Done.** Lead-ը merge է անում միայն երբ `python manage.py test`-ը ամբողջությամբ կանաչ է, թեստերը ցանց և Postgres չեն ուզում, իսկ diff-ում չկան NotFound-ը, `index.css`-ը և մոդելների դաշտերը։

**Ստուգում**

```bash
cd backend
python manage.py test
```

Հետո համոզվել, որ `git diff`-ը դատարկ է `frontend/src/pages/NotFound/`-ի, `frontend/src/index.css`-ի և մոդելների դաշտերի համար։
