# Ventum — учебный каркас

Магазин [Ventum](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12495): вход с выбором магазина, витрина Textile и витрина Baby. Ученики собирают проект в команде. Волна 1 закрыта: модели и админка. Волна 2 закрыта: публичное API, витрины и формы подвала. Текущее задание — волна 3, корзина, заказ, Idram и письмо магазину.

**RU / EN / HY** — читай гайды на том языке, который удобен. Код и имена API — на английском.

## С чего начать

1. [CONTRIBUTING.md](CONTRIBUTING.md) — git: `main` не трогать, работа в своей ветке, PR только в `dev`. День задания, следующий день — merge
2. [task-wave3.md](task-wave3.md) — текущее задание, Wave 3: корзина, заказ, Idram и письмо. Срок — до конца января 2027. Номер ученика совпадает с [TASK.md](TASK.md). Файл для агента — в `docs/agents/`
3. [TASK.md](TASK.md) — короткий список зон волны 3. Архив волны 2 — [task-wave2.md](task-wave2.md). Архив волны 1 — [task-advanced.md](task-advanced.md)
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

- Django: админка Unfold, Swagger, `GET /api/health/`, пользователь с логином-email, каталог, заявки, слоты главной, сиды Textile и Baby, публичные списки, JWT, аналитика staff на `/api/admin/analytics/`
- React: `/`, `/textile`, `/baby`, 404, поиск в шапке, формы подвала. Языки интерфейса и товаров — `am` / `en` / `ru`
- Корзина, заказ, Idram и письмо магазину — волна 3. Кнопки Account и Cart в шапке пока выключены. Пакеты `cart` и `orders` пустые
- Макеты магазина: [кадр](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12495) и [второй файл](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=0-1)

## Правила

- Маршруты: `/` Gateway, `/textile`, `/baby`
- Три файла на компонент: `Name.jsx`, `name.css`, `name.js`
- PR: своя ветка → `dev`. В `main` не пушить

## English

Ventum shop. **SQLite** by default. Wave 1 and Wave 2 are closed. Current work is Wave 3: [task-wave3.md](task-wave3.md). Short list: [TASK.md](TASK.md). Wave 2 archive: [task-wave2.md](task-wave2.md). Wave 1 archive: [task-advanced.md](task-advanced.md). Agent briefs: `docs/agents/`. Finish by the end of January 2027. PRs into `dev` only. Product text languages: `am` / `en` / `ru`.

## Հայերեն

Խանութ՝ **SQLite**-ով։ Wave 1-ը և Wave 2-ը փակ են։ Ընթացիկ աշխատանքը Wave 3-ն է՝ [task-wave3.md](task-wave3.md)։ Կարճ ցանկը՝ [TASK.md](TASK.md)։ Wave 2-ի արխիվը՝ [task-wave2.md](task-wave2.md)։ Wave 1-ի արխիվը՝ [task-advanced.md](task-advanced.md)։ Գործակալի ֆայլերը՝ `docs/agents/`։ Ավարտել մինչև 2027-ի հունվարի վերջ։ PR-ը միայն `dev`։ Ապրանքի լեզուները՝ `am` / `en` / `ru`։
