# 9 — Vach · catalog — ошибки и разбор

**Ветка:** `feat/vach-catalog`  
**Агент:** [docs/agents/09-vach.md](../../agents/09-vach.md)

---

## Русский

### Ошибка 1: два приложения вместо поля `store`

**Симптом:** отдельные модели Textile и Baby.

**Исправление:** один каталог; `store` ровно `textile` или `baby` (`CheckConstraint`).

### Ошибка 2: копия списка `am` / `en` / `ru`

**Симптом:** свой `LANGUAGE_CHOICES` в `catalog`.

**Исправление:** наследники `BaseTranslation` из `apps.core.models`; языки не копировать.

### Ошибка 3: `search.py` в PR Vach

**Исправление:** поиск пишет Mariam (5). Файла `search.py` быть не должно.

### Ошибка 4: повторная запись `apps.catalog` в `INSTALLED_APPS`

**Исправление:** приложение уже зарегистрировал Suro (2).

### Ошибка 5: сиды Textile / Baby в зоне catalog

**Исправление:** `seed_textile` — Karen (7), `seed_baby` — Svet (8). Vach пишет схему, не данные.

### Ошибка 6: цена `float` или строка

**Исправление:** `DecimalField` в AMD (`verbose_name="Price (AMD)"`).

### Ошибка 7: нет unique «родитель + язык»

**Симптом:** два перевода на один язык.

**Исправление:** `UniqueConstraint` на `(category, language)` и `(product, language)`.

### Ошибка 8: фильтр `store` только у категории

**Симптом:** в списке товаров нельзя отделить магазины.

**Исправление:** `ProductStoreFilter` по `category__store` — **не** лишний код.

### Что не «лишний код»

| Элемент | Зачем |
|---------|--------|
| `CheckConstraint` на `store` | DoD: только textile/baby |
| `MinValueValidator` | цена AMD не отрицательная |
| Unfold инлайны `min_num=3` | три языка в админке |
| `ProductStoreFilter` | фильтр `store` у товаров |

### Чего не делали

- `frontend/`
- `accounts`, `leads`, `HomeBlock`, `languages.py`
- `search.py`, сиды Karen/Svet

### Чеклист

- [ ] `del ventum.sqlite3`, `migrate`
- [ ] Категория с `name` на `am`/`en`/`ru` в `/api/admin/`
- [ ] Товар: Decimal AMD, sku, публикация, 3 имени, 3 описания, картинка
- [ ] Фильтр `store` отделяет textile и baby
- [ ] Нет `search.py`

---

## English

One catalog with `store`. Inherit `BaseTranslation`. Do not add `search.py`, seeds, or a second `INSTALLED_APPS` entry. Price is `Decimal` AMD. Unique `(parent, language)`. Product list filter uses `category__store`.

---

## Հայերեն

Մեկ կատալոգ `store`-ով։ `BaseTranslation` Artush-ից։ `search.py`, seed-եր և երկրորդ `INSTALLED_APPS` չեն Vach-ինը։ Գինը `Decimal` AMD է։ Եզակի `(parent, language)`։
