# Agent brief — Wave 3 — #2 Suro

**Волна 5.** Середина `/`, кадры Gateway desktop `178-46` и Gateway mobile `6-12462`. Папка `frontend/src/pages/Gateway/`. Ветка `feat/suro-api`, после Mariam. Оба рассказа и обе ссылки. Header и Footer в страницу не копировать. Раздел «2 — Suro · главная» в [task-wave5.md](../../task-wave5.md). Текст ниже не стирать.

**Wave 5.** The middle of `/`, Gateway desktop `178-46` and Gateway mobile `6-12462`. Folder `frontend/src/pages/Gateway/`. Branch `feat/suro-api`, after Mariam. Both stories and both links. Do not copy Header or Footer into the page. Section “2 — Suro · home” in [task-wave5.md](../../task-wave5.md). The text below stays.

**Wave 5.** `/`-ի մեջտեղը, Gateway desktop `178-46` և Gateway mobile `6-12462`։ Պանակ `frontend/src/pages/Gateway/`։ Ճյուղ `feat/suro-api`, Mariam-ից հետո։ Երկու պատմություն և երկու հղում։ Header-ը և Footer-ը էջի մեջ չպատճենել։ Բաժինը՝ [task-wave5.md](../../task-wave5.md), «2 — Suro · главная»։ Ներքևի տեքստը մնում է։

**Волна 4.** Текущий PR — ветка `feat/suro-api`, base `dev`, после Lead и до Vach. Папка `frontend/src/pages/Gateway/`: герой и выбор магазина. Новые строки `gateway` сразу в `am.json`, `en.json` и `ru.json`. В этот PR не входят `App.jsx`, Textile, Baby, Header, Footer, `index.css`, `apps/cart`, `apps/orders`, `config/urls.py` и `settings.py`. Строка «Нельзя: React» ниже остаётся в контракте волны 3 и в этот PR не входит. Текст ниже не стирать. Экран — [task-wave4.md](../../task-wave4.md), раздел «2 — Suro · главная».

**Wave 4.** Current pull request: branch `feat/suro-api`, base `dev`, after Lead and before Vach. Folder `frontend/src/pages/Gateway/`: hero and store choice. New `gateway` strings go into `am.json`, `en.json`, and `ru.json` at once. This pull request leaves out `App.jsx`, Textile, Baby, Header, Footer, `index.css`, `apps/cart`, `apps/orders`, `config/urls.py`, and `settings.py`. The “do not add React” line below stays in the Wave 3 contract and stays out of this pull request. The text below stays. Screen: [task-wave4.md](../../task-wave4.md), section “2 — Suro · home”.

**Wave 4.** Ընթացիկ PR-ը՝ ճյուղ `feat/suro-api`, base `dev`, Lead-ից հետո և Vach-ից առաջ։ Պանակ `frontend/src/pages/Gateway/`՝ վերնագիր և խանութի ընտրություն։ `gateway` նոր տողերը միանգամից `am.json`, `en.json` և `ru.json`։ Այս PR-ում չեն մտնում `App.jsx`, Textile, Baby, Header, Footer, `index.css`, `apps/cart`, `apps/orders`, `config/urls.py` և `settings.py`։ Ներքևի «React չավելացնել» տողը մնում է Wave 3-ի պայմանագրում և այս PR-ում չի մտնում։ Ներքևի տեքստը մնում է։ Էկրանը՝ [task-wave4.md](../../task-wave4.md), «2 — Suro · գլխավոր»։

Отдай этот файл агенту целиком. Номер ученика — **2**. Он совпадает с [TASK.md](../../TASK.md) и с заголовком «2 — Suro · api» в [task-wave3.md](../../task-wave3.md).

Wave 2 закрыта: аналитика, JWT и `PAGE_SIZE` 12 уже есть. Заново это не делать.

## Русский

### Кто ты

Ты делаешь зону ученика 2, Suro, ветка `feat/suro-api`, зона `api`. Срок — конец января 2027.

Один PR, base = `dev`. В `main` не пушить. `--force` не делать. Postgres не поднимать.

В очереди ты первый среди кода: **Lead → Suro → Artush → Vach → Karen → Svet → Daniel → Hayk → Mariam → Ashot**.

### Карта репозитория

- `backend/apps/cart/` и `backend/apps/orders/` сейчас только README.
- Настройки Idram и `ORDER_NOTIFY_EMAIL` уже лежат в [backend/.env.example](../../backend/.env.example). Настоящий секрет туда не писать.
- `config/urls.py` и `INSTALLED_APPS` — твоя точка включения.

### Зона ответственности

Можно: `apps.py`, `__init__.py`, пустые `urls.py`, у orders ещё пустой `payment_urls.py`, две строки в `INSTALLED_APPS`, три `include`, чтение пяти настроек в `settings.py`.

Нельзя: модели, миграции, вью оплаты, React, переписывать JWT и аналитику.

### Шаги

1. Сделать оба пакета устанавливаемыми, без моделей.
2. Подключить `api/cart/` → `apps.cart.urls`, `api/orders/` → `apps.orders.urls`, `api/` → `apps.orders.payment_urls`. На старте `urlpatterns = []`.
3. Settings читает `IDRAM_REC_ACCOUNT`, `IDRAM_SECRET_KEY`, `IDRAM_PAYMENT_URL` (по умолчанию `https://web.idram.am/payment.aspx`), `IDRAM_LANGUAGE` (по умолчанию `RU`), `ORDER_NOTIFY_EMAIL`. Пустой секрет допустим.

### Definition of Done

`python manage.py migrate` на чистом SQLite проходит. Пять настроек читаются из env. В diff нет моделей и платёжных вью.

### Нельзя

Хардкодить `IDRAM_SECRET_KEY`. Класть настоящий ключ в git.

## English

You are student **2**, Suro, branch `feat/suro-api`. Install empty `cart` and `orders` apps, add the three URL includes, and read the five Idram and mail settings from env. Do not add models, payment views, or React. Do not rebuild JWT or analytics.

**Done when** `migrate` passes on a clean SQLite file and the diff has no models.

Do not hardcode `IDRAM_SECRET_KEY` or commit a real key.

## Հայերեն

Դու աշակերտ **2**-ն ես, Suro, ճյուղը՝ `feat/suro-api`։ Դատարկ `cart` և `orders` հավելվածներ, երեք URL include, հինգ կարգավորում env-ից։ Մոդել, վճարման վյու և React չավելացնել։ JWT-ն և անալիտիկան չվերաշարադրել։

**Ավարտված է, երբ** `migrate`-ը մաքուր SQLite-ով անցնում է և diff-ում մոդել չկա։

`IDRAM_SECRET_KEY`-ը կոդում չգրել և իրական բանալի git չդնել։
