# api — Suro

**Ветка:** `feat/suro-api`  
**Задание B1:** [task-advanced.md](../../../task-advanced.md) — раздел «Suro · api».

В этой волне ты заводишь приложения и модель пользователя. Корзину, заказ и Idram не делай.

Сделай пакеты (рядом с этим README, файл не удаляй):

- `accounts` — `User`, email = логин, `AUTH_USER_MODEL` до первой миграции
- пустые `catalog`, `cart`, `orders`, `leads`, `content`: `apps.py`, `__init__.py`, пустой `models.py`, пустой `urls.py`
- пропиши их в `INSTALLED_APPS` и `include` в `config/urls.py`
- `makemigrations` только для `accounts`
- `GET /api/health/` не ломай

**Lead не мержит, пока:** суперпользователь создаётся с email, Swagger открывается, в каталоге нет модели товара, `migrate` на чистом SQLite проходит.

## English

Suro, branch `feat/suro-api`. B1 is the user model and empty app packages only. Do not add cart, orders, or Idram. Do not delete this README.

## Հայերեն

Suro, ճյուղ `feat/suro-api`։ B1-ում միայն user-մոդել և դատարկ փաթեթներ։ Զամբյուղ, պատվեր և Idram չկա։ Այս README-ն չջնջել։
