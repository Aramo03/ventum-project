# PostgreSQL — финал проекта

**RU** · **EN** · **HY**

Сейчас команда работает на **SQLite** (`backend/ventum.sqlite3`). PostgreSQL и Docker Compose подключают **в конце проекта** (production / deploy).

## Когда переключаться

- все волны закрыты на `dev`
- Lead готовит production
- нужен общий сервер БД, не файл на диске у каждого

## Шаги (backend локально)

1. Установите PostgreSQL и создайте базу `ventum_db`.
2. В `backend/.env` замените SQLite на:

```env
DB_ENGINE=django.db.backends.postgresql
DB_NAME=ventum_db
DB_USER=postgres
DB_PASSWORD=your-real-password
DB_HOST=127.0.0.1
DB_PORT=5432
```

3. `python manage.py migrate`
4. При необходимости перенесите данные из SQLite отдельным скриптом (не входит в каркас).

## Docker Compose

Корневой [docker-compose.yml](../docker-compose.yml) и [.env.example](../.env.example) рассчитаны на PostgreSQL. Перед `docker compose up`:

- `copy .env.example .env`
- задайте `SECRET_KEY`, `POSTGRES_PASSWORD`
- в CI при переходе на Postgres верните service `postgres` в [.github/workflows/ci.yml](../.github/workflows/ci.yml) (см. историю git).

## English

The team uses **SQLite** until the final phase. Then switch `backend/.env` to PostgreSQL, run migrations, and use Docker Compose for deploy. See steps above.

## Հայերեն

Հիմա աշխատում ենք **SQLite**-ով։ Վերջում՝ `backend/.env`-ում PostgreSQL, `migrate`, Docker Compose։ Քայլերը վերևում են։
