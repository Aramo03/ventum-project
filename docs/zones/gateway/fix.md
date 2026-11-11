# 4 — Hayk · gateway — ошибки и разбор

> Журнал Wave 1. В Wave 2 этот разбор не переписывать. Текущее задание — [task-wave2.md](../../../task-wave2.md).
> Wave 1 journal. Do not rewrite it for Wave 2.
> Wave 1-ի մատյան։ Wave 2-ի համար չվերաշարադրել։

**Ветка:** `feat/hayk-gateway`  
**Агент:** [docs/agents/04-hayk.md](../../agents/04-hayk.md)

---

## Русский

### Ошибка 1: ветка от старого `dev` без Suro / Artush

**Симптом:** нет `BaseTranslation`, `migrate content` падает на импортах.

**Исправление:** `git checkout -B feat/hayk-gateway origin/dev`, затем заново модели и миграции.

### Ошибка 2: админка в `apps.py` вместо `admin.py`

**Симптом:** в `admin.py` пусто, Unfold-инлайны лежат в `apps.py`, приложение не регистрирует модели.

**Исправление:** весь код админки только в [`backend/apps/content/admin.py`](../../../backend/apps/content/admin.py). `apps.py` остаётся `AppConfig`, как у Suro.

### Ошибка 3: мусорные файлы и комментарии агента

**Лишнее:** `tests.py` / `views.py` с заготовками Django, строки вида «Cursor Agent don't check this code».

**Исправление:** не добавлять в PR; зона — только `models.py`, `admin.py`, `migrations/`.

### Ошибка 4: дублирование языков

**Симптом:** свой список `am/en/ru` в `content`.

**Исправление:** наследник `BaseTranslation` из `apps.core.models`; коды языка — поле из Artush.

### Ошибка 5: нет миграции `content`

**Симптом:** модели в коде, таблиц нет.

**Исправление:** `python manage.py makemigrations content` и `migrate`.

### Что не «лишний код»

| Элемент | Зачем |
|---------|--------|
| `HomeBlockTranslation(BaseTranslation)` | DoD: переводы title/text |
| `UniqueConstraint(home_block, language)` | пара «слот + язык» уникальна |
| Unfold `TabularInline`, `min_num=3`, `max_num=3` | три языка в админке |
| `SlotChoices` hero/stores | ключи из макета |

### Чего не делали

- `frontend/src/pages/Gateway/`
- `apps/catalog/models.py`
- повторная регистрация в `INSTALLED_APPS`

### Чеклист

- [ ] Ветка от `dev` с Artush
- [ ] `migrate` проходит
- [ ] В админке `hero` + 3 перевода
- [ ] Health `{"status":"ok"}`

---

## English

### Common mistakes

Stale branch without Suro/Artush; admin code in `apps.py`; stub `tests.py`/`views.py`; copied language lists; missing `content` migrations.

### Keep

`HomeBlock`, `HomeBlockTranslation`, Unfold inline with three languages, unique `(home_block, language)`.

### Out of scope

Gateway React page, catalog models, extra app registration.

---

## Հայերեն

### Հիմնական սխալներ

Հին `dev`, ադմինը `apps.py`-ում, ավելորդ `tests`/`views`, լեզուների կրկնօրինակում, բացակայող միգրացիա։

### Պահել

`HomeBlock`, թարգմանություններ Artush-ի դասով, inline երեք լեզվով։

### Չփոխել

Gateway էջը և կատալոգի մոդելները։
