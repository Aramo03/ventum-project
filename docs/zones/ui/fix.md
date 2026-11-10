# 10 — Ashot · ui — ошибки и разбор

**Ветка:** `feat/ashot-ui`  
**Агент:** [docs/agents/10-ashot.md](../../agents/10-ashot.md)

---

## Русский

### Ошибка 1: ветка без каталога Vach

**Симптом:** `ImportError` / нет `Category`, `Product`.

**Причина:** `feat/ashot-ui` собрали от Svet, до merge `feat/vach-catalog`.

**Исправление:** база — актуальный `origin/dev` (после Vach), затем тесты.

### Ошибка 2: правка NotFound / `index.css`

**Исправление:** страница 404 и глобальные стили вне зоны. Diff по ним должен быть пустым.

### Ошибка 3: правка `models.py` ради зелёного теста

**Исправление:** если поле не совпадает — остановиться и написать владельцу зоны. Схему в PR Ashot не чинить.

### Ошибка 4: pytest, Postgres, сеть, `runserver`

**Исправление:** только `cd backend` → `python manage.py test`. База — SQLite тест-раннера Django.

### Ошибка 5: дубль email без `transaction.atomic`

**Симптом:** после `IntegrityError` падает весь `TestCase`.

**Исправление:** `with transaction.atomic():` вокруг второй записи.

### Ошибка 6: зависимость от сидов Karen / Svet

**Исправление:** тесты сами создают категории и товары. Сиды не обязательны.

### Что не «лишний код»

| Элемент | Зачем |
|---------|--------|
| `accounts/tests.py` | email login, unique email |
| `catalog/tests.py` | три языка, textile/baby, товар без `ru` |
| `leads/tests.py` | дубль `NewsletterSubscriber` |
| `is_published=True` | поле Vach после merge |

### Чего не делали

- `frontend/src/pages/NotFound/`
- `frontend/src/index.css`
- поля моделей, `admin.py`, миграции
- сиды и `search.py`

### Чеклист

- [ ] `python manage.py test` из `backend/` зелёный целиком
- [ ] `git diff -- frontend/src/pages/NotFound frontend/src/index.css` пустой
- [ ] поля моделей не в diff

---

## English

Rebuild `feat/ashot-ui` on current `dev` after Vach. Do not edit NotFound, `index.css`, or model fields. Run `python manage.py test` only. Tests create their own rows. Wrap duplicate-email writes in `transaction.atomic()`.

---

## Հայերեն

Ճյուղը `origin/dev`-ից է՝ Vach-ից հետո։ NotFound, `index.css` և մոդելների դաշտերը չփոխել։ Միայն `python manage.py test`։ Թեստերն իրենց տողերն են ստեղծում։
