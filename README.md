# Ventum — учебный каркас

Магазин [Ventum](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12495): вход с выбором магазина, витрина Textile и витрина Baby. Ученики собирают проект в команде. В этом коммите только каркас: страницы пустые, моделей товаров нет.

**RU / EN / HY** — читай гайды на том языке, который удобен. Код и имена API — на английском.

## С чего начать

1. [CONTRIBUTING.md](CONTRIBUTING.md) — git: `main` не трогать, работа в своей ветке, PR только в `dev`. День задания, следующий день — merge
2. [task-advanced.md](task-advanced.md) — зоны на весь проект (имена пустые). Сейчас открыта волна B1
3. [TASK.md](TASK.md) — таблица только текущей волны
4. Макет: [Figma Untitled](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12495)

## Стек

| Слой | Технологии |
|------|------------|
| Frontend | React 19, Vite, Tailwind, i18next, react-router-dom, react-hook-form, Redux Toolkit, axios |
| Backend | Django 5, DRF, SimpleJWT, drf-spectacular (Swagger), Unfold, Pillow, **SQLite** (PostgreSQL — в конце проекта) |
| Infra | GitHub Actions (CI на SQLite). Docker + PostgreSQL — см. [docs/postgresql.md](docs/postgresql.md) |

## Быстрый старт

PostgreSQL **не нужен**. База — файл `backend/ventum.sqlite3` (создаётся после `migrate`).

```bash
# backend
cd backend
python -m venv venv
venv\Scripts\activate          # Linux/macOS: source venv/bin/activate
pip install -r requirements.txt
copy .env.example .env         # опционально; без .env тоже SQLite по умолчанию
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver

# frontend (другое окно)
cd frontend
npm install
npm run dev
```

Swagger: `http://127.0.0.1:8000/api/schema/swagger-ui/`  
Health: `http://127.0.0.1:8000/api/health/`  
Сайт: `http://127.0.0.1:3000/`

Файл `ventum.sqlite3` в git не попадает. В конце проекта переход на PostgreSQL — [docs/postgresql.md](docs/postgresql.md).

## Что уже готово

- Django без бизнес-моделей: админка, Swagger, `GET /api/health/`
- React: `/`, `/textile`, `/baby`, 404
- Header и Footer — заготовки с текстами из макета. Сейчас в коде `am` и `en`. Файл `ru.json` и третий язык интерфейса — волна F1. Контент товаров с B1 сразу на `am` / `en` / `ru`
- Оплата Idram и письмо магазину — волны B3 и F5–F6, не в каркасе. Описание: [docs/idram.md](docs/idram.md), [docs/order-email.md](docs/order-email.md)
- Вёрстки по Figma ещё нет. Её делают ученики в волнах F1–F6

## Правила

- Маршруты: `/` Gateway, `/textile`, `/baby`
- Три файла на компонент: `Name.jsx`, `name.css`, `name.js`
- PR: своя ветка → `dev`. В `main` не пушить

## English

Ventum shop skeleton for a class of ten. **SQLite** by default — no PostgreSQL setup. Copy `backend/.env.example` to `.env` if you want; otherwise defaults apply. PostgreSQL and the VPS are wave D1: [docs/postgresql.md](docs/postgresql.md). Full zone map: [task-advanced.md](task-advanced.md). Current wave: [TASK.md](TASK.md). PRs into `dev` only. UI languages end as `am` / `en` / `ru` (`ru.json` in F1).

## Հայերեն

Ուսումնական կարկաս՝ **SQLite**-ով, PostgreSQL-ի տեղադրում պետք չէ։ VPS-ը և PostgreSQL-ը D1 ալիքն են՝ [docs/postgresql.md](docs/postgresql.md)։ Գոտիների քարտեզը՝ [task-advanced.md](task-advanced.md)։ Ընթացիկ ալիքը՝ [TASK.md](TASK.md)։ PR-ը միայն `dev`։ Լեզուները վերջում՝ `am` / `en` / `ru` (`ru.json`-ը F1-ում)։
