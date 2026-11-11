# Agent brief — Wave 2 — #1 Lead

Отдай этот файл агенту целиком. Номер ученика — **1**. Он совпадает с [TASK.md](../../TASK.md) и с заголовком «1 — Lead» в [task-wave2.md](../../task-wave2.md).

Wave 1 закрыта и уже в `dev`. Её модели, сиды и тесты не переписывать. Очередь этой волны — список имён, не второй номер.

## Русский

### Кто ты

Ты ведёшь ученика 1, Lead, ветка `feat/lead`. Wave 2 — публичное API и витрина Ventum на SQLite. Срок — конец января.

Один PR = одна зона. Base PR = `dev`. В `main` не пушить. `--force` на `dev` и `main` не делать. Postgres не поднимать. Корзину, заказы, Idram и письмо об оплате не принимать в эту волну. README доски не удалять: [docs/zones/lead/README.md](../zones/lead/README.md).

### Карта репозитория

- `backend/` — Django 5, DRF, Unfold, SimpleJWT. База — `backend/ventum.sqlite3`.
- Админка: `http://127.0.0.1:8000/api/admin/`. Аналитика Suro: `http://127.0.0.1:8000/api/admin/analytics/`.
- Health: `http://127.0.0.1:8000/api/health/` отвечает `{"status":"ok"}`.
- Swagger: `http://127.0.0.1:8000/api/schema/swagger-ui/`.
- Сайт: `http://127.0.0.1:3000/` — маршруты `/`, `/textile`, `/baby`.
- Контракт путей — в [task-wave2.md](../../task-wave2.md). Канон каталога — `/api/catalog/`, не `/api/products/`.

### Очередь

**Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**.

Suro первый среди кода: размер страницы и ручки входа. Artush — выбор перевода. Vach — список товаров. Страницы идут после API. Ashot последний.

### Зона ответственности

Порядок PR и сборка `dev`. Колонка статуса на доске волны 2. Конфликт чинить вместе с владельцем файла. Чужие вью, модели и вёрстку не переписывать.

### Шаги

1. Принимать PR в `dev` только в очереди имён выше.
2. Сверять PR с разделом ученика в [task-wave2.md](../../task-wave2.md) и с его файлом в `docs/agents/`.
3. После merge Ashot (ученик 10) прогнать тесты и открыть health, Swagger, аналитику под staff, `/`, `/textile`, `/baby` и несуществующий путь.

### Definition of Done

Wave 2 не закрыта, пока health отвечает `{"status":"ok"}`, Swagger показывает пути контракта, аналитика открывается только staff и показывает живые числа, три витрины читают API, повторная подписка не создаёт вторую строку, `python manage.py test` зелёный целиком, корзины, заказов и Postgres в diff нет.

### Проверка

```bash
cd backend
python manage.py test
python manage.py runserver
```

Сайт — во втором окне: `cd frontend && npm run dev`.

### Нельзя

Писать аналитику, JWT, сериализаторы, формы, страницы магазинов и тесты за других учеников.

## English

You are student **1**, Lead, branch `feat/lead`. Wave 2 is the Ventum public API and storefront on SQLite. Finish by the end of January. Wave 1 is already in `dev`. Do not rebuild it.

One pull request is one zone. Base is `dev`. Do not push `main`. Do not force-push. Do not start Postgres, cart, orders, Idram, or the payment email. Do not delete [docs/zones/lead/README.md](../zones/lead/README.md).

Admin `/api/admin/`. Analytics `/api/admin/analytics/`. Health `/api/health/` returns `{"status":"ok"}`. Swagger `/api/schema/swagger-ui/`. Site routes `/`, `/textile`, `/baby`. The catalog prefix is `/api/catalog/`.

Merge queue, by name: **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**.

You own the queue and the status column. Fix a conflict with the file owner. Do not rewrite their code.

After Ashot (student 10), run `python manage.py test` and open health, Swagger, staff analytics, the three store routes, and an unknown path.

**Done when** health is ok, Swagger lists the contract, analytics shows live counts for staff only, the three pages read the API, a duplicate subscription does not insert a second row, the whole test suite is green, and cart, orders, and Postgres are absent.

```bash
cd backend
python manage.py test
python manage.py runserver
```

Do not write analytics, JWT, serializers, forms, store pages, or tests for other students.

## Հայերեն

Դու աշակերտ **1**-ն ես, Lead, ճյուղը՝ `feat/lead`։ Wave 2-ը Ventum-ի հրապարակային API-ն ու խանութն են SQLite-ով։ Ավարտել մինչև հունվարի վերջ։ Wave 1-ն արդեն `dev`-ում է։ Այն նորից չսարքել։

Մեկ PR = մեկ գոտի։ Base-ը `dev` է։ `main` չpush անել։ `--force` չանել։ Postgres, զամբյուղ, պատվեր, Idram և վճարման նամակ չընդունել։ Չջնջել [docs/zones/lead/README.md](../zones/lead/README.md)։

Ադմին `/api/admin/`։ Անալիտիկա `/api/admin/analytics/`։ Health `/api/health/`-ը վերադարձնում է `{"status":"ok"}`։ Swagger `/api/schema/swagger-ui/`։ Կայքի երթուղիները՝ `/`, `/textile`, `/baby`։ Կատալոգի նախդիրը՝ `/api/catalog/`։

Հերթը անուններով՝ **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**։

Քոնն են հերթը և կարգավիճակի սյունը։ Կոնֆլիկտը լուծիր ֆայլի տիրոջ հետ։ Նրանց կոդը մի վերաշարադրիր։

Ashot-ից (աշակերտ 10) հետո աշխատացրու `python manage.py test` և բացիր health, Swagger, staff անալիտիկան, երեք էջը և անհայտ ուղին։

**Ավարտված է, երբ** health-ը կարգին է, Swagger-ում երևում է պայմանագիրը, անալիտիկան կենդանի թվեր է ցույց տալիս միայն staff-ին, երեք էջը կարդում են API-ն, կրկնակի բաժանորդագրությունը երկրորդ տող չի ստեղծում, թեստերն ամբողջովին կանաչ են, իսկ զամբյուղը, պատվերը և Postgres-ը չկան։

```bash
cd backend
python manage.py test
python manage.py runserver
```

Ուրիշների անալիտիկան, JWT-ն, սերիալիզատորները, ձևերը, խանութի էջերը և թեստերը չգրել։
