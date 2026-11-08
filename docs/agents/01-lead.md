# Agent brief — Wave 1 — #1 Lead

Отдай этот файл агенту целиком. Номер ученика — **1**. Он совпадает с [TASK.md](../../TASK.md) и с заголовком «1 — Lead» в [task-advanced.md](../../task-advanced.md). Очередь merge — список имён, не второй номер.

## Русский

### Кто ты

Ты ведёшь ученика 1, Lead, ветка `feat/lead`. Wave 1 — модели и админка магазина Ventum на SQLite. Вёрстку по макету не делать. Срок — конец декабря.

Один PR = одна зона. Base PR = `dev`. В `main` не пушить. `--force` на `dev` и `main` не делать. Postgres не поднимать. README зоны не удалять: [docs/zones/lead/README.md](../zones/lead/README.md).

### Карта репозитория

- `backend/` — Django 5, DRF, Unfold, Pillow. База — файл `backend/ventum.sqlite3`.
- Админка: `http://127.0.0.1:8000/api/admin/`.
- Health: `http://127.0.0.1:8000/api/health/` отвечает `{"status":"ok"}`.
- Swagger: `http://127.0.0.1:8000/api/schema/swagger-ui/`.
- `frontend/` — React. Страницы `/`, `/textile`, `/baby`, 404 в этом задании пустые. Их не верстать.
- Новые приложения в `INSTALLED_APPS` регистрирует только Suro (2).

### Очередь

Имена, не номера: **Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**.

На доске колонка `#` — номер ученика. Колонка «После кого» — кто уже должен быть в `dev`.

### Зона ответственности

Порядок PR и сборка `dev`. Конфликт чинить вместе с владельцем файла. Чужие модели и вёрстку не переписывать.

### Шаги

1. Каркас уже проверен: `migrate`, `manage.py check`, health и `/api/admin/login/`.
2. Принимать PR в `dev` только в очереди имён выше.
3. После merge Ashot (ученик 10) удалить `backend/ventum.sqlite3`, снова `migrate`, создать суперпользователя с email, открыть health и админку.

### Definition of Done

Wave 1 не закрыта, пока в админке без правки кода видны: пользователь с логином-email, категории и товары Textile и Baby с переводами `am` / `en` / `ru`, подписчик рассылки, слот главной. Health и Swagger живы.

### Проверка

```bash
cd backend
del ventum.sqlite3
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

На Linux/macOS вместо `del` — `rm -f ventum.sqlite3`.

### Нельзя

Писать модели каталога, пользователя, заявок, слотов, поиск, сиды и тесты за других учеников.

## English

You are student **1**, Lead, branch `feat/lead`. Wave 1 is Ventum models and admin on SQLite. Do not build the Figma layout. Finish by the end of December.

One pull request is one zone. Base is `dev`. Do not push `main`. Do not force-push `dev` or `main`. Do not start Postgres. Do not delete [docs/zones/lead/README.md](../zones/lead/README.md).

Repository: Django in `backend/` with SQLite file `backend/ventum.sqlite3`. Admin `/api/admin/`. Health `/api/health/` returns `{"status":"ok"}`. Swagger `/api/schema/swagger-ui/`. React in `frontend/` stays unstyled in this wave. Only Suro (2) registers new apps in `INSTALLED_APPS`.

Merge queue, by name: **Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**. The `#` column is the student number.

You own the merge board. Fix a conflict with the file owner. Do not rewrite their models.

After Ashot (student 10) is merged, delete `backend/ventum.sqlite3`, migrate, create a superuser with email, and open health and admin.

**Done when** admin shows an email user, Textile and Baby categories and products in `am` / `en` / `ru`, a newsletter subscriber, and a home slot, and health and Swagger respond.

```bash
cd backend
del ventum.sqlite3
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

On Linux/macOS use `rm -f ventum.sqlite3` instead of `del`.

Do not write catalog, user, lead, home-slot, search, seed, or test code for other students.

## Հայերեն

Դու աշակերտ **1**-ն ես, Lead, ճյուղը՝ `feat/lead`։ Wave 1-ը Ventum-ի մոդելներն ու ադմինն են SQLite-ով։ Մակետը չհավաքել։ Ավարտել մինչև դեկտեմբերի վերջ։

Մեկ PR = մեկ գոտի։ Base-ը `dev` է։ `main` չpush անել։ `dev` և `main` `--force` չանել։ Postgres չբարձրացնել։ Չջնջել [docs/zones/lead/README.md](../zones/lead/README.md)։

Քարտեզ՝ Django `backend/`-ում, բազան `backend/ventum.sqlite3`։ Ադմին `/api/admin/`։ Health `/api/health/`-ը վերադարձնում է `{"status":"ok"}`։ Swagger `/api/schema/swagger-ui/`։ React-ը `frontend/`-ում այս ալիքում չձևավորել։ Նոր հավելվածները `INSTALLED_APPS`-ում գրանցում է միայն Suro-ն (2)։

Հերթը անուններով՝ **Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**։ `#` սյունը աշակերտի համարն է։

Քոնն է merge-ի տախտակը։ Կոնֆլիկտը լուծիր ֆայլի տիրոջ հետ։ Նրանց մոդելները մի վերաշարադրիր։

Ashot-ի (աշակերտ 10) merge-ից հետո ջնջիր `backend/ventum.sqlite3`, արա `migrate`, ստեղծիր email-ով superuser, բացիր health և ադմին։

**Ավարտված է, երբ** ադմինում երևում են email-ով user, Textile և Baby կատեգորիաներ ու ապրանքներ `am` / `en` / `ru`, բաժանորդ և գլխավոր սլոթ, իսկ health-ը և Swagger-ը պատասխանում են։

```bash
cd backend
del ventum.sqlite3
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Linux/macOS-ում `del`-ի փոխարեն՝ `rm -f ventum.sqlite3`։

Ուրիշների կատալոգը, user-ը, հայտերը, սլոթը, որոնումը, seed-ը և թեստերը չգրել։
