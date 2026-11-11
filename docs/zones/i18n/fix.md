# 3 — Artush · i18n — ошибки и разбор

**Ветка:** `feat/artush-i18n`  
**Агент:** [docs/agents/03-artush.md](../../agents/03-artush.md)

---

## Русский

### Ошибка 1: ветка от старого `dev` без Suro

**Симптом:** в `feat/artush-i18n` нет `accounts`, `migrate` падает или PR не включает пользователя с email.

**Причина:** Artush начали от коммита до merge Suro.

**Исправление:**

```powershell
git fetch origin
git checkout -B feat/artush-i18n origin/dev
# заново добавить languages.py и models.py
git push -u origin feat/artush-i18n --force-with-lease
```

`--force-with-lease` только на **своей** feature-ветке, не на `dev` / `main`.

### Ошибка 2: ожидание миграции `core` с таблицами

**Симптом:** `makemigrations core` → «No changes detected».

**Причина:** `BaseTranslation` — **abstract**; Django не создаёт таблицу в `core`.

**Исправление:** DoD — `migrate` проходит на SQLite; отдельная миграция core **не обязательна**. Таблицы переводов появятся в `catalog` / `content` у Vach и Hayk.

### Ошибка 3: дублирование кодов `am`, `en`, `ru`

**Симптом:** в `catalog` или `content` свой список языков.

**Исправление:** импорт из одного модуля:

```python
from apps.core.languages import LANGUAGE_CODES, LANGUAGE_CHOICES, DEFAULT_LANGUAGE
```

### Ошибка 4: уникальность «родитель + язык» только в abstract

**Симптом:** дубликаты переводов в БД.

**Причина:** `BaseTranslation` не знает FK на родителя — его задаёт **наследник** (Vach, Hayk) + `UniqueConstraint` или `unique_together`.

### Что не «лишний код»

| Элемент | Зачем |
|---------|--------|
| `LANGUAGE_CODES`, `DEFAULT_LANGUAGE` | единый источник кодов и fallback `en` |
| `BaseTranslation` abstract | база для инлайнов переводов |
| Docstring с правилом fallback | контракт для API и поиска (Mariam) |

### Чего не делали (правильно)

- Изменения `views.py` health
- `frontend/src/i18n/`
- `Category`, `Product`, `HomeBlock`

### Чеклист

- [ ] Ветка от актуального `origin/dev`
- [ ] `from apps.core.languages import LANGUAGE_CODES` → `("am", "en", "ru")`
- [ ] `python manage.py check` и `migrate`
- [ ] `/api/health/` → `{"status":"ok"}`

---

## English

### Mistake 1: branch from pre-Suro `dev`

Rebase onto `origin/dev` and force-with-lease only `feat/artush-i18n`.

### Mistake 2: expecting core DB tables

Abstract `BaseTranslation` → no core migration required.

### Mistake 3: copying language lists

Import from `apps.core.languages` only.

### Mistake 4: uniqueness without child FK

Subclasses must add parent FK and unique `(parent, language)`.

### Out of scope

Health view, frontend JSON, product and home models.

---

## Հայերեն

### Սխալ 1. հին `dev` առանց Suro

Վերակառուցել ճյուղը `origin/dev`-ից։

### Սխալ 2. `core` աղյուսակի սպասում

Աբստրակտ մոդելը աղյուսակ չի ստեղծում։

### Սխալ 3. լեզուների կրկնօրինակում

Ներմուծել միայն `apps.core.languages`-ից։

### Սխալ 4. եզակիություն

Ժառանգը պետք է ավելացնի parent FK և եզակի `(parent, language)`։ 

### Չի պատկանում Artush-ին

Health view, frontend JSON, ապրանքի և սլոթի մոդելներ։
