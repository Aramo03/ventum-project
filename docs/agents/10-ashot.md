# Agent brief — Wave 1 — #10 Ashot

Отдай этот файл агенту целиком. Номер ученика — **10**. Он совпадает с [TASK.md](../../TASK.md), с заголовком «10 — Ashot · ui» в [task-advanced.md](../../task-advanced.md) и с [frontend/src/pages/NotFound/README.md](../../frontend/src/pages/NotFound/README.md).

## Русский

### Кто ты

Ты делаешь зону ученика 10, Ashot, ветка `feat/ashot-ui`, зона `ui`.

Папка зоны лежит рядом со страницей 404. Саму страницу 404 не делать. Твоя работа — тесты уже смерженных моделей.

Старт: `git checkout dev && git pull`, затем `git checkout -b feat/ashot-ui`. Один pull request, **base = `dev`**. В `main` не пушить. `--force` не делать. Postgres не поднимать. README не удалять. Срок — конец декабря.

Ждать, пока в `dev` есть пользователь Suro (2), переводы Artush (3), каталог Vach (9), заявки Daniel (6) и слот Hayk (4). Ты последний в очереди имён, после Mariam:

**Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**

Номер 10 — твой номер ученика. Сиды Karen и Svet к тестам не обязательны: тесты создают свои записи.

### Карта репозитория

- Тесты живут в `backend/`, рядом с приложениями: `tests.py` или пакет `tests/`.
- Запуск только `python manage.py test` из каталога `backend/`. Это Django test runner и его SQLite, не отдельный Postgres и не pytest-сеть.
- Не ходить в сеть, не вызывать внешний API, не требовать уже запущенный `runserver`.
- Админка для людей: `/api/admin/`. Health: `/api/health/`. Их вью не менять, если тест может создать записи через ORM.
- `frontend/src/pages/NotFound/` — `NotFound.jsx`, `notFound.css`, `notFound.js`. Не менять.
- `frontend/src/index.css` не менять.
- Поля моделей, `admin.py` и миграции не менять. Если тест падает из-за поля, остановись и опиши это владельцу зоны. Не чини схему чужим PR.

### Зона ответственности

Поведение моделей Wave 1:

- пользователь с логином-email;
- категория с тремя переводами;
- товар Textile и товар Baby;
- товар без перевода `ru` всё равно сохраняется;
- `NewsletterSubscriber` с уникальным email.

### Шаги

1. Тест создаёт пользователя. Логин — email. Email уникален. `USERNAME_FIELD` у модели — `email`.
2. Тест создаёт категорию и переводы `name` на `am`, `en` и `ru`.
3. Тест создаёт опубликованный товар в категории `store=textile` и отдельный опубликованный товар в категории `store=baby`. У обоих цена `Decimal` в AMD и свой sku.
4. Тест сохраняет товар, у которого нет перевода `ru`. Запись не отвергается. Так работает правило Artush: нет языка — объект не исчезает.
5. Тест сохраняет `NewsletterSubscriber`. Вторая запись с тем же email не сохраняется.
6. `python manage.py test` из `backend/` зелёный целиком, включая уже существующие тесты, не только новый файл.

### Definition of Done

Lead не мержит, пока:

- `python manage.py test` из `backend/` завершается зелёным целиком;
- тестам не нужны сеть и Postgres;
- diff не меняет `frontend/src/pages/NotFound/`, `frontend/src/index.css` и поля в `models.py`.

### Проверка

```bash
cd backend
python manage.py test
```

Затем:

```bash
git diff -- frontend/src/pages/NotFound frontend/src/index.css
```

Этот diff пустой. Отдельно просмотреть `git diff` и убедиться, что поля моделей не менялись.

### Нельзя

Не собирать страницу 404. Не верстать магазин. Не править сиды, поиск и админку ради зелёного теста. Не подменять SQLite на Postgres в настройках.

## English

You are student **10**, Ashot, branch `feat/ashot-ui`, zone `ui`.

The zone folder sits next to the 404 page. Do not build that page. You write tests for models that are already merged.

Start with `git checkout dev && git pull`, then `git checkout -b feat/ashot-ui`. One pull request, base `dev`. Do not push `main`. No force-push. No Postgres. Do not delete the README. Finish by the end of December.

Wait until `dev` has Suro’s user (2), Artush’s translations (3), Vach’s catalog (9), Daniel’s leads (6), and Hayk’s home slot (4). You are last, after Mariam:

**Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**

Number 10 is your student number. Karen’s and Svet’s seeds are optional. Tests create their own rows.

Put tests in `backend/` as `tests.py` or a `tests/` package beside the apps. Run `python manage.py test` from `backend/`. Use Django’s test SQLite. No network, no external API, no running `runserver`, no Postgres.

Do not edit `frontend/src/pages/NotFound/`, `frontend/src/index.css`, model fields, `admin.py`, or migrations. If a test fails because a field is wrong, stop and report the owning student. Do not fix their schema in your PR.

**Cover**

1. A user whose login is a unique email. `USERNAME_FIELD` is `email`.
2. A category with `name` in `am`, `en`, and `ru`.
3. A published product in a `textile` category and a separate published product in a `baby` category. Both have an AMD `Decimal` price and a sku.
4. A product with no `ru` translation still saves. A missing language does not reject the row.
5. A `NewsletterSubscriber` saves, and a second row with the same email does not.
6. `python manage.py test` from `backend/` is green for the whole suite.

**Done when** the whole test run is green, tests need no network and no Postgres, and the diff does not change NotFound, `index.css`, or model fields.

```bash
cd backend
python manage.py test
git diff -- frontend/src/pages/NotFound frontend/src/index.css
```

The diff is empty. Also confirm model fields are untouched.

Do not build the 404 page, restyle the shop, or edit seeds, search, and admin just to make a test green. Do not switch settings from SQLite to Postgres.

## Հայերեն

Դու աշակերտ **10**-ն ես, Ashot, ճյուղը՝ `feat/ashot-ui`, գոտին՝ `ui`։

Գոտու պանակը 404 էջի կողքին է։ Այդ էջը չսարքել։ Դու թեստեր ես գրում արդեն merge արված մոդելների համար։

Սկսիր `git checkout dev && git pull`, հետո `git checkout -b feat/ashot-ui`։ Մեկ PR, base-ը `dev`։ `main` չpush անել։ `--force` չանել։ Postgres չբարձրացնել։ README-ն չջնջել։ Ավարտել մինչև դեկտեմբերի վերջ։

Սպասիր, մինչև `dev`-ում լինեն Suro-ի user-ը (2), Artush-ի թարգմանությունները (3), Vach-ի կատալոգը (9), Daniel-ի հայտերը (6) և Hayk-ի սլոթը (4)։ Դու վերջինն ես, Mariam-ից հետո.

**Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**

10-ը քո աշակերտի համարն է։ Karen-ի և Svet-ի seed-ը պարտադիր չէ. թեստերն իրենց տողերն են ստեղծում։

Թեստերը դիր `backend/`-ում՝ `tests.py` կամ `tests/` փաթեթ։ Հրամանը `backend/`-ից՝ `python manage.py test`։ Բազան Django-ի թեստային SQLite-ն է։ Առանց ցանցի, առանց արտաքին API-ի, առանց `runserver`-ի, առանց Postgres-ի։

Չփոխել `frontend/src/pages/NotFound/`-ը, `frontend/src/index.css`-ը, մոդելների դաշտերը, `admin.py`-ն և միգրացիաները։ Եթե թեստը ընկնում է սխալ դաշտի պատճառով, կանգնիր և գրիր գոտու տիրոջը։ Նրա սխեման քո PR-ում մի ուղղիր։

**Ծածկել**

1. User, որի մուտքը եզակի email է։ `USERNAME_FIELD`-ը `email` է։
2. Կատեգորիա՝ `name`-ով `am`, `en`, `ru`։
3. Հրապարակված ապրանք `textile` կատեգորիայում և առանձին հրապարակված ապրանք `baby` կատեգորիայում։ Երկուսն էլ ունեն AMD `Decimal` գին և sku։
4. Առանց `ru` թարգմանության ապրանքը էլի պահվում է։ Մեկ լեզուն չի մերժում տողը։
5. `NewsletterSubscriber`-ը պահվում է, նույն email-ով երկրորդ տողը՝ ոչ։
6. `backend/`-ից `python manage.py test`-ը ամբողջությամբ կանաչ է։

**Ավարտված է, երբ** ամբողջ թեստը կանաչ է, ցանց և Postgres պետք չեն, և diff-ը չի փոխում NotFound-ը, `index.css`-ը և մոդելների դաշտերը։

```bash
cd backend
python manage.py test
git diff -- frontend/src/pages/NotFound frontend/src/index.css
```

Diff-ը դատարկ է։ Համոզվիր նաև, որ մոդելների դաշտերը չեն փոխվել։

404 էջը չհավաքել, խանութը չձևավորել, seed-ը, որոնումը և ադմինը մի փոխիր միայն թեստը կանաչ դարձնելու համար։ Կարգավորումներում SQLite-ը Postgres-ով մի փոխիր։
