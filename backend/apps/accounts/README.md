# api — Suro

**Ветка:** `feat/suro-api`  
**Задание:** [task-advanced.md](../../../task-advanced.md) — «Suro · api».

Сделай пользователя и пустые пакеты. README не удаляй.

- `accounts.User`: email — логин, имя есть, `AUTH_USER_MODEL` до первой миграции
- пустые `catalog`, `leads`, `content`: `apps.py`, `__init__.py`, пустой `models.py`, пустой `urls.py`
- пропиши их в `INSTALLED_APPS` и `include` в `config/urls.py`
- `makemigrations` только для `accounts`
- `GET /api/health/` не меняй

Модели товара, заявок и слотов сюда не пиши.

**Lead не мержит, пока:** суперпользователь создаётся с email, Swagger открывается, в каталоге нет модели товара, `migrate` на чистом SQLite проходит, health отвечает `{"status":"ok"}`.

## English

Suro, `feat/suro-api`. Email login plus empty `catalog`, `leads`, and `content` packages. Do not fill their models. Do not delete this README.

## Հայերեն

Suro, `feat/suro-api`։ Մուտք email-ով և դատարկ `catalog`, `leads`, `content`։ Դրանց մոդելները չլրացնել։ README-ն չջնջել։
