# Ventum — учебный каркас

Магазин [Ventum](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12495): вход с выбором магазина, витрина Textile и витрина Baby. Ученики собирают проект в команде. В этом коммите только каркас: страницы пустые, моделей товаров нет.

**RU / EN / HY** — читай гайды на том языке, который удобен. Код и имена API — на английском.

## С чего начать

1. [CONTRIBUTING.md](CONTRIBUTING.md) — git: `main` не трогать, работа в своей ветке, PR только в `dev`
2. [TASK.md](TASK.md) — зоны десяти учеников
3. Макет: [Figma Untitled](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12495)

## Стек

| Слой | Технологии |
|------|------------|
| Frontend | React 19, Vite, Tailwind, i18next, react-router-dom, react-hook-form, Redux Toolkit, axios |
| Backend | Django 5, DRF, SimpleJWT, drf-spectacular (Swagger), Unfold, Pillow, PostgreSQL |
| Infra | Docker Compose, GitHub Actions |

## Быстрый старт

```bash
# backend
cd backend
python -m venv venv
venv\Scripts\activate          # Linux/macOS: source venv/bin/activate
pip install -r requirements.txt
copy .env.example .env         # Linux/macOS: cp .env.example .env
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

Или Docker: скопируйте `.env.example` в `.env`, задайте `SECRET_KEY` и `POSTGRES_PASSWORD`, затем `docker compose up --build`.

## Что уже готово

- Django без бизнес-моделей: админка, Swagger, `GET /api/health/`
- React: `/`, `/textile`, `/baby`, 404
- Header и Footer — заготовки с текстами из макета. Языки: `am` / `en`
- Вёрстки по Figma ещё нет. Её делают ученики в своих зонах

## Правила

- Маршруты: `/` Gateway, `/textile`, `/baby`
- Три файла на компонент: `Name.jsx`, `name.css`, `name.js`
- PR: своя ветка → `dev`. В `main` не пушить

## English

Ventum shop skeleton for a class of ten. The Figma file has a gateway plus Textile and Baby storefronts. This commit has empty pages and no product models.

Start with [CONTRIBUTING.md](CONTRIBUTING.md) and [TASK.md](TASK.md). Do not push to `main`. Open pull requests into `dev` only. Languages in the UI are Armenian (`am`) and English (`en`).

## Հայերեն

Ventum խանութի ուսումնական կարկաս՝ տասը աշակերտի համար: Figma-ում կա մուտք և երկու վիտրինա՝ Textile և Baby: Այս commit-ում էջերը դատարկ են, ապրանքի մոդելներ չկան:

Սկսիր [CONTRIBUTING.md](CONTRIBUTING.md)-ից և [TASK.md](TASK.md)-ից: `main` չենք push անում: PR-ը միայն `dev`: Լեզուները՝ հայերեն (`am`) և անգլերեն (`en`):
