# Agent brief — Wave 1 — #9 Vach

Отдай этот файл агенту целиком. Номер ученика — **9**. Он совпадает с [TASK.md](../../TASK.md), с заголовком «9 — Vach · catalog» в [task-advanced.md](../../task-advanced.md) и с [backend/apps/catalog/README.md](../../backend/apps/catalog/README.md).

## Русский

### Кто ты

Ты делаешь зону ученика 9, Vach, ветка `feat/vach-catalog`, зона `catalog`.

Старт: `git checkout dev && git pull`, затем `git checkout -b feat/vach-catalog`. Один pull request, **base = `dev`**. В `main` не пушить. `--force` на `dev` и `main` не делать. Postgres не поднимать. README не удалять. Срок — конец декабря. Страницы по макету не собирать.

Ждать merge Suro (2) и Artush (3). Пакет `catalog` уже пустой: его заводит Suro. В очередь имён ты встаёшь сразу после Artush и до Daniel:

**Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**

Номер 9 — это твой номер ученика. Это не четвёртый шаг очереди.

### Карта репозитория

- `backend/` — Django 5, DRF, Unfold, Pillow. База — `backend/ventum.sqlite3`.
- Админка: `http://127.0.0.1:8000/api/admin/`.
- Health: `http://127.0.0.1:8000/api/health/` должен остаться `{"status":"ok"}`. Его вью не менять.
- Коды языков и абстрактный класс перевода — в `backend/apps/core/`, их пишет Artush. Импортируй класс, не копируй список языков в каталог.
- Два магазина макета, Textile и Baby, — один каталог. Их делит поле `store` со значениями ровно `textile` или `baby`.
- `frontend/` в этом задании не трогать. Karen (7) и Svet (8) потом нальют данные. Mariam (5) потом создаст `search.py`.
- Новые приложения в `INSTALLED_APPS` регистрирует только Suro. Второй раз `catalog` не регистрировать.

Макеты только для смысла полей, не для вёрстки:

- [кадр магазина](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12495)
- [второй файл](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=0-1)

### Зона ответственности

Можно менять только:

- `backend/apps/catalog/models.py`
- `backend/apps/catalog/admin.py`
- миграции приложения `catalog`

Нельзя:

- создавать `backend/apps/catalog/search.py`;
- менять React: Textile, Baby, Header, Footer, Gateway, NotFound, `frontend/src/index.css`, `frontend/src/i18n/`;
- менять пользователя Suro, заявки Daniel, `HomeBlock` Hayk, `languages.py` Artush;
- добавлять URL и API-список товаров;
- поднимать Postgres.

### Шаги

1. `Category`
   - родитель необязателен;
   - `store` принимает ровно `textile` или `baby`;
   - `slug` уникален;
   - перевод `name` на `am`, `en`, `ru` через абстрактный класс Artush;
   - пара «категория + язык» уникальна.
2. `Product`
   - внешний ключ на категорию;
   - цена `Decimal` в AMD, не `float` и не строка;
   - `sku` уникален;
   - флаг публикации;
   - переводы `name` и `description` на `am`, `en`, `ru`.
3. `ProductImage`
   - файл изображения (Pillow уже в зависимостях);
   - `alt`;
   - целое поле порядка.
4. Админка Unfold
   - категория и товар в `/api/admin/`;
   - инлайн переводов у категории и у товара;
   - инлайн картинок у товара;
   - фильтр списка по `store`.

Правило Artush не копировать в другой модуль: если перевода на язык нет, объект не исчезает; текст берётся из `en`, иначе из любого имеющегося перевода. Это уже в docstring его класса.

### Definition of Done

Lead не мержит, пока одновременно верно всё:

- в `/api/admin/` сохраняется категория с `name` на `am`, `en` и `ru`;
- сохраняется товар: цена `Decimal` в AMD, уникальный sku, флаг публикации, `name` и `description` на трёх языках, картинка с alt и порядком;
- фильтр `store` отделяет `textile` от `baby`;
- `python manage.py migrate` проходит после удаления `backend/ventum.sqlite3`;
- файла `search.py` нет;
- diff не меняет модель пользователя, `HomeBlock` и страницы React.

### Проверка

```bash
cd backend
del ventum.sqlite3
python manage.py makemigrations catalog
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

На Linux/macOS: `rm -f ventum.sqlite3`.

Открыть `/api/admin/`. Создать категорию `store=textile` со slug и тремя переводами имени. Создать опубликованный товар: цена в AMD, sku, три имени, три описания, одна картинка. Фильтр `store` показывает эту категорию. В `git status` нет `search.py` и нет правок чужих приложений.

### Нельзя

Не писать сиды Textile и Baby. Не писать поиск. Не писать тесты за Ashot (10), если для DoD они не требуются: твой DoD — админка и migrate.

## English

You are student **9**, Vach, branch `feat/vach-catalog`, zone `catalog`.

Start with `git checkout dev && git pull`, then `git checkout -b feat/vach-catalog`. One pull request, base `dev`. Do not push `main`. No force-push. No Postgres. Do not delete the catalog README. Finish by the end of December. Do not build pages from the designs.

Wait for Suro (2) and Artush (3). The `catalog` package is already an empty shell from Suro. In the name queue you are immediately after Artush and before Daniel:

**Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**

Number 9 is your student number. It is not “merge step 4”.

Repository: Django in `backend/`, SQLite file `backend/ventum.sqlite3`, admin `/api/admin/`, health `/api/health/` stays `{"status":"ok"}`. Import Artush’s translation class from `backend/apps/core/`. Do not copy the language list. Textile and Baby are one catalog split by `store` (`textile` or `baby`). Do not touch `frontend/`. Do not register `catalog` in `INSTALLED_APPS` again.

**You may edit only**

- `backend/apps/catalog/models.py`
- `backend/apps/catalog/admin.py`
- catalog migrations

**You do not touch** `search.py`, React pages, `index.css`, `frontend/src/i18n/`, the user, leads, `HomeBlock`, Artush’s `languages.py`, product URLs, or Postgres.

**Steps**

1. `Category`: optional parent, `store` exactly `textile` or `baby`, unique slug, `name` in `am` / `en` / `ru` through Artush’s abstract class, unique pair of category and language.
2. `Product`: foreign key to category, `Decimal` AMD price (not float, not a string), unique sku, published flag, `name` and `description` in three languages.
3. `ProductImage`: image file (Pillow is installed), alt, integer order.
4. Unfold admin: translation inlines, image inline, list filter on `store`.

Do not reimplement Artush’s fallback. A missing language does not drop the row; text comes from `en`, otherwise from any translation that exists.

**Done when** all of these are true: a category with three names saves in admin; a product saves with an AMD `Decimal` price, sku, published flag, three names, three descriptions, and an image; the `store` filter separates the shops; `migrate` passes on a deleted sqlite file; `search.py` does not exist; user, `HomeBlock`, and React are unchanged.

```bash
cd backend
del ventum.sqlite3
python manage.py makemigrations catalog
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Linux/macOS: `rm -f ventum.sqlite3`.

Do not write Textile or Baby seeds, search, or Ashot’s tests. Your done-state is admin plus migrate.

## Հայերեն

Դու աշակերտ **9**-ն ես, Vach, ճյուղը՝ `feat/vach-catalog`, գոտին՝ `catalog`։

Սկսիր `git checkout dev && git pull`, հետո `git checkout -b feat/vach-catalog`։ Մեկ PR, base-ը `dev`։ `main` չpush անել։ `--force` չանել։ Postgres չբարձրացնել։ README-ն չջնջել։ Ավարտել մինչև դեկտեմբերի վերջ։ Էջերը մակետից չհավաքել։

Սպասիր Suro-ի (2) և Artush-ի (3) merge-ին։ `catalog` փաթեթը դատարկ է թողել Suro-ն։ Անունների հերթում դու Artush-ից անմիջապես հետո ես և Daniel-ից առաջ.

**Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**

9-ը քո աշակերտի համարն է։ Դա merge-ի չորրորդ քայլը չէ։

Քարտեզ՝ Django `backend/`-ում, բազան `backend/ventum.sqlite3`, ադմին `/api/admin/`, health-ը մնում է `{"status":"ok"}`։ Artush-ի դասը ներմուծիր `backend/apps/core/`-ից։ Լեզուների ցանկը մի կրկնօրինակիր։ Textile-ը և Baby-ն մեկ կատալոգ են, բաժանված `store`-ով (`textile` կամ `baby`)։ `frontend/`-ին չդիպչել։ `catalog`-ը `INSTALLED_APPS`-ում երկրորդ անգամ չգրանցել։

**Կարող ես փոխել միայն**

- `backend/apps/catalog/models.py`
- `backend/apps/catalog/admin.py`
- catalog-ի միգրացիաները

**Չդիպչել** `search.py`-ին, React էջերին, `index.css`-ին, `frontend/src/i18n/`-ին, user-ին, հայտերին, `HomeBlock`-ին, Artush-ի `languages.py`-ին, ապրանքի URL-ներին, Postgres-ին։

**Քայլեր**

1. `Category`՝ ծնողը պարտադիր չէ, `store`-ը ճիշտ `textile` կամ `baby`, եզակի slug, `name` `am` / `en` / `ru` Artush-ի դասով, կատեգորիա + լեզու զույգը եզակի է։
2. `Product`՝ կապ կատեգորիայի հետ, գինը `Decimal` AMD-ով (ոչ float, ոչ տող), եզակի sku, հրապարակման դրոշ, `name` և `description` երեք լեզվով։
3. `ProductImage`՝ նկարի ֆայլ (Pillow-ն կա), alt, հերթականության ամբողջ թիվ։
4. Unfold ադմին՝ թարգմանությունների inline, նկարների inline, ֆիլտր `store`-ով։

Artush-ի կանոնը ուրիշ տեղ մի գրիր. լեզու չկա՝ տողը չի անհետանում. տեքստը `en`-ից է, այլապես առկա ցանկացած թարգմանությունից։

**Ավարտված է, երբ** այս բոլորը ճիշտ են. երեք անունով կատեգորիան պահվում է ադմինում. ապրանքը պահվում է AMD `Decimal` գնով, sku-ով, դրոշով, երեք անունով, երեք նկարագրությամբ և նկարով. `store` ֆիլտրը բաժանում է խանութները. `migrate`-ը անցնում է ջնջված sqlite-ի վրա. `search.py` չկա. user-ը, `HomeBlock`-ը և React-ը չեն փոխվել։

```bash
cd backend
del ventum.sqlite3
python manage.py makemigrations catalog
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Linux/macOS՝ `rm -f ventum.sqlite3`։

Textile/Baby seed, որոնում և Ashot-ի թեստերը չգրել։ Քո ավարտը ադմինն է և migrate-ը։
