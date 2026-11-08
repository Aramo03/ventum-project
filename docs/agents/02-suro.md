# Agent brief — Wave 1 — #2 Suro

Отдай этот файл агенту целиком. Номер ученика — **2**. Он совпадает с [TASK.md](../../TASK.md) и с заголовком «2 — Suro · api» в [task-advanced.md](../../task-advanced.md).

## Русский

### Кто ты

Ты делаешь зону ученика 2, Suro, ветка `feat/suro-api`, зона `api`. README не удалять: [backend/apps/accounts/README.md](../../backend/apps/accounts/README.md).

Старт: `git checkout dev && git pull`, затем `git checkout -b feat/suro-api`. Один PR, base = `dev`. В `main` не пушить. `--force` не делать. Postgres не поднимать. Срок — конец декабря. Вёрстку не делать.

В очереди имён Suro первый среди кода, сразу после Lead: **Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**.

### Карта репозитория

- `backend/` — Django 5. База `backend/ventum.sqlite3`. Сейчас в `INSTALLED_APPS` есть `apps.core` и нет каталога.
- `backend/config/settings.py` — сюда ты добавляешь приложения и `AUTH_USER_MODEL`.
- `backend/config/urls.py` — админка уже на `api/admin/`. Сюда ты добавляешь `include` пустых приложений.
- Health уже живёт в `apps.core` и отвечает `{"status":"ok"}`. Его не менять.
- `frontend/` не трогать.
- Только ты регистрируешь новые приложения в `INSTALLED_APPS`.

### Зона ответственности

Можно: `backend/apps/accounts/`, пустые пакеты `catalog`, `leads`, `content`, `INSTALLED_APPS`, `include` в `config/urls.py`.

Нельзя: поля товара (их пишет Vach, 9), заявки (Daniel, 6), слоты главной (Hayk, 4), `search.py` (Mariam, 5), вью health.

### Шаги

1. `accounts.User` от `AbstractUser`. `USERNAME_FIELD = "email"`. Email уникален. Имя есть. `REQUIRED_FIELDS` без email.
2. `AUTH_USER_MODEL = "accounts.User"` записать до `makemigrations`. Иначе Django оставит стандартного пользователя.
3. Пакеты `backend/apps/catalog/`, `backend/apps/leads/`, `backend/apps/content/`: `apps.py`, `__init__.py`, пустой `models.py`, пустой `urls.py`. Модели в них не писать. README, которые уже лежат в этих папках, не удалять.
4. Прописать три приложения и `accounts` в `INSTALLED_APPS`. Подключить их `include` в [backend/config/urls.py](../../backend/config/urls.py), не ломая админку, schema и health.
5. `makemigrations` только для `accounts`.

### Definition of Done

Lead не мержит, пока: `createsuperuser` спрашивает email; пользователь виден в `/api/admin/`; Swagger открывается; в `catalog/models.py` нет товара; `migrate` на чистом SQLite проходит; health по-прежнему `{"status":"ok"}`.

### Проверка

```bash
cd backend
del ventum.sqlite3
python manage.py makemigrations accounts
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

На Linux/macOS: `rm -f ventum.sqlite3`. Открыть `/api/health/`, `/api/admin/`, `/api/schema/swagger-ui/`.

### Нельзя

Не заполнять модели каталога, заявок и слотов. Не менять `GET /api/health/`. Не создавать `search.py`.

## English

You are student **2**, Suro, branch `feat/suro-api`, zone `api`. Do not delete [backend/apps/accounts/README.md](../../backend/apps/accounts/README.md).

Start from `dev`: `git checkout dev && git pull`, then `git checkout -b feat/suro-api`. One PR, base `dev`. Do not push `main`. No force-push. No Postgres. No page layout. Finish by the end of December.

You are first among the code, right after Lead. Queue: **Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**.

Django lives in `backend/`. Database file: `backend/ventum.sqlite3`. Add apps and `AUTH_USER_MODEL` in `backend/config/settings.py`. Add `include` entries in `backend/config/urls.py`. Health already returns `{"status":"ok"}` from `apps.core`. Do not change it. Do not touch `frontend/`. You are the only student who registers apps in `INSTALLED_APPS`.

**Own:** `backend/apps/accounts/`, empty packages `catalog`, `leads`, `content`, `INSTALLED_APPS`, URL includes.

**Do not own:** product fields (Vach, 9), leads (Daniel, 6), home slots (Hayk, 4), `search.py` (Mariam, 5), the health view.

**Steps**

1. `accounts.User` extends `AbstractUser`. `USERNAME_FIELD = "email"`. Email is unique. A name field exists. `REQUIRED_FIELDS` does not include email.
2. Set `AUTH_USER_MODEL = "accounts.User"` before `makemigrations`.
3. Create `catalog`, `leads`, and `content` with `apps.py`, `__init__.py`, empty `models.py`, empty `urls.py`. Leave existing READMEs in place. Do not write models.
4. Register the apps and include their URLs without breaking admin, schema, or health.
5. Run `makemigrations` only for `accounts`.

**Done when** `createsuperuser` asks for email, the user is visible in `/api/admin/`, Swagger opens, `catalog/models.py` has no product, migrate passes on a fresh SQLite file, and health is still `{"status":"ok"}`.

```bash
cd backend
del ventum.sqlite3
python manage.py makemigrations accounts
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Linux/macOS: `rm -f ventum.sqlite3`.

## Հայերեն

Դու աշակերտ **2**-ն ես, Suro, ճյուղը՝ `feat/suro-api`, գոտին՝ `api`։ Չջնջել [backend/apps/accounts/README.md](../../backend/apps/accounts/README.md)։

Սկսիր `dev`-ից՝ `git checkout dev && git pull`, հետո `git checkout -b feat/suro-api`։ Մեկ PR, base-ը `dev`։ `main` չpush անել։ `--force` չանել։ Postgres չբարձրացնել։ Էջ չձևավորել։ Ավարտել մինչև դեկտեմբերի վերջ։

Կոդի մեջ առաջինը դու ես, Lead-ից հետո։ Հերթը՝ **Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**։

Django-ն `backend/`-ում է։ Բազան՝ `backend/ventum.sqlite3`։ Հավելվածները և `AUTH_USER_MODEL`-ը ավելացրու `backend/config/settings.py`-ում։ `include`-ները՝ `backend/config/urls.py`-ում։ Health-ը `apps.core`-ից արդեն վերադարձնում է `{"status":"ok"}`։ Այն չփոխել։ `frontend/`-ին չդիպչել։ `INSTALLED_APPS`-ում նոր հավելված գրանցում ես միայն դու։

**Քոնն է՝** `backend/apps/accounts/`, դատարկ `catalog`, `leads`, `content`, `INSTALLED_APPS`, URL include-ներ։

**Քոնը չէ՝** ապրանքի դաշտերը (Vach, 9), հայտերը (Daniel, 6), գլխավոր սլոթը (Hayk, 4), `search.py` (Mariam, 5), health view-ը։

**Քայլեր**

1. `accounts.User`-ը `AbstractUser`-ից է։ `USERNAME_FIELD = "email"`։ Email-ը եզակի է։ Անուն կա։ `REQUIRED_FIELDS`-ում email չկա։
2. `AUTH_USER_MODEL = "accounts.User"` գրիր `makemigrations`-ից առաջ։
3. Ստեղծիր `catalog`, `leads`, `content`՝ `apps.py`, `__init__.py`, դատարկ `models.py`, դատարկ `urls.py`։ README-ները թող։ Մոդելներ մի գրիր։
4. Գրանցիր հավելվածները և մի կոտրիր ադմինը, schema-ն և health-ը։
5. `makemigrations` միայն `accounts`-ի համար։

**Ավարտված է, երբ** `createsuperuser`-ը հարցնում է email, user-ը երևում է `/api/admin/`-ում, Swagger-ը բացվում է, `catalog/models.py`-ում ապրանք չկա, migrate-ը անցնում է մաքուր SQLite-ով, health-ը մնում է `{"status":"ok"}`։

```bash
cd backend
del ventum.sqlite3
python manage.py makemigrations accounts
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Linux/macOS՝ `rm -f ventum.sqlite3`։
