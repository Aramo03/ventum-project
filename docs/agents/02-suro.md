# Agent brief — Wave 3 — #2 Suro

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
