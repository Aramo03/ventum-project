# Ventum — учебный каркас

Магазин [Ventum](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12495): вход с выбором магазина, витрина Textile и витрина Baby. Ученики собирают проект в команде. В этом коммите только каркас: страницы пустые, моделей товаров нет.

**RU / EN / HY** — читай гайды на том языке, который удобен. Код и имена API — на английском.

## С чего начать

1. [CONTRIBUTING.md](CONTRIBUTING.md) — git: `main` не трогать, работа в своей ветке, PR только в `dev`. День задания, следующий день — merge
2. [task-advanced.md](task-advanced.md) — Wave 1: зоны и что сдавать. Срок — до конца декабря. Номер ученика там совпадает с [TASK.md](TASK.md). Файл для агента — в `docs/agents/`
3. [TASK.md](TASK.md) — короткий список зон
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
- Header и Footer — заготовки. В интерфейсе сейчас `am` и `en`. Тексты товаров в этом задании — `am` / `en` / `ru`
- Макеты магазина: [кадр](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12495) и [второй файл](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=0-1). В текущем задании по ним не верстаем

## Правила

- Маршруты: `/` Gateway, `/textile`, `/baby`
- Три файла на компонент: `Name.jsx`, `name.css`, `name.js`
- PR: своя ветка → `dev`. В `main` не пушить

## English

Ventum shop skeleton. **SQLite** by default. Wave 1: [task-advanced.md](task-advanced.md). Short list: [TASK.md](TASK.md). Student numbers match in both. Agent briefs: `docs/agents/`. Finish by the end of December. PRs into `dev` only. Product text languages: `am` / `en` / `ru`.

## Հայերեն

Ուսումնական կարկաս՝ **SQLite**-ով։ Wave 1՝ [task-advanced.md](task-advanced.md)։ Կարճ ցանկը՝ [TASK.md](TASK.md)։ Աշակերտի համարը նույնն է։ Գործակալի ֆայլերը՝ `docs/agents/`։ Ավարտել մինչև դեկտեմբերի վերջ։ PR-ը միայն `dev`։ Ապրանքի լեզուները՝ `am` / `en` / `ru`։
