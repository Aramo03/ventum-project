# 5 — Mariam · header — ошибки и разбор

**Ветка:** `feat/mariam-header`  
**Агент:** [docs/agents/05-mariam.md](../../agents/05-mariam.md)

Журнал того, что было в коммите `d370b3c`, и что из этого лишний код. В diff против `dev` только `backend/apps/catalog/search.py`. Модели, миграции, URL и `frontend/src/components/Header/` не менялись.

---

## Русский

### Ошибка 1: поиск по `translations__language__code`

**Симптом:** запрос по имени падает с `FieldError`. Товар по `am` / `en` / `ru` не находится.

**Причина:** в `d370b3c` фильтр смотрел `translations__language__code`. У Artush поле `language` — `CharField` в `BaseTranslation`, связи `.code` нет.

**Исправление:** `translations__language__in`. Это уже сделано в `4cc8269`. Коды берутся из `LANGUAGE_CODES`, не из своего кортежа.

### Лишний код (убран)

| Код | Почему лишний |
|-----|----------------|
| `("am", "en", "ru")` в `search.py` | Свой список языков. Коды уже есть в `apps.core.languages.LANGUAGE_CODES`. |

### Что не «лишний код»

| Элемент | Зачем |
|---------|--------|
| `sku__icontains` и `translations__name__icontains` | поиск без учёта регистра по sku и имени |
| `distinct()` | один товар с двумя совпавшими переводами не двоится |
| ранний `return queryset` | пустая строка и одни пробелы ничего не отрезают |
| docstring `GET /api/products/?q=&store=&language=` | будущий контракт, без view и path |

### Чего не делали

- `models.py`, миграции, `admin.py`
- URL и вью каталога
- `frontend/src/components/Header/`
- сиды Karen и Svet

### Чеклист

Прогон на чистой SQLite поверх `origin/dev`. `seed_baby` и `seed_textile` уже лежат в `dev`, в коммит Mariam не входят.

- [x] `migrate`, `seed_baby`, `seed_textile`
- [x] `""` и `"   "` возвращают оба товара
- [x] sku `BABY-SAMPLE-001` и `TEXTILE-SAMPLE-001` находят свой товар
- [x] имя `am`, `en` и `ru` каждого товара находит его
- [x] чужая строка возвращает пустой queryset
- [x] `models.py` и `frontend/src/components/Header/` не в diff

---

## English

### Mistake in `d370b3c`

Name search used `translations__language__code`. Artush’s `language` is a `CharField`, so the lookup raises `FieldError`. `4cc8269` switched it to `translations__language__in`.

### Extra code removed

The tuple `("am", "en", "ru")` copied the language list. Use `LANGUAGE_CODES` from `apps.core.languages`.

### Keep

`icontains` on sku and translated name, `distinct()`, an early return for a blank query, and the docstring for `GET /api/products/?q=&store=&language=` with no view or path.

### Out of scope

Catalog models, migrations, admin, URLs, the Header component, and the Textile and Baby seeds.

### Checklist

- [x] `migrate`, `seed_baby`, `seed_textile` on a clean SQLite file from `dev`
- [x] `""` and `"   "` return both products
- [x] both sample SKUs find their product
- [x] each product name in `am`, `en`, and `ru` finds that product
- [x] an unknown string returns an empty queryset
- [x] no diff in `models.py` or `frontend/src/components/Header/`

---

## Հայերեն

### Սխալ `d370b3c`-ում

Անունով որոնումը օգտագործում էր `translations__language__code`։ Artush-ի `language`-ը `CharField` է, դրա համար `FieldError`։ `4cc8269`-ը դարձրել է `translations__language__in`։

### Հանած ավելորդ կոդ

`("am", "en", "ru")` կրկնում էր լեզուների ցանկը։ Օգտագործել `apps.core.languages.LANGUAGE_CODES`։

### Պահել

`icontains` sku-ի և անվան վրա, `distinct()`, դատարկ հարցման վաղ վերադարձ, docstring-ը `GET /api/products/?q=&store=&language=` առանց view-ի և path-ի։

### Չփոխել

Մոդելները, միգրացիաները, ադմինը, URL-ը, Header-ը, Textile և Baby սիդերը։

### Ստուգացանկ

- [x] մաքուր SQLite, `migrate`, `seed_baby`, `seed_textile`
- [x] `""` և `"   "` վերադարձնում են երկու ապրանքը
- [x] երկու sku-ն էլ գտնում են իրենց ապրանքը
- [x] `am`, `en`, `ru` անունը գտնում է իր ապրանքը
- [x] օտար տողը դատարկ queryset է վերադարձնում
- [x] `models.py` և `frontend/src/components/Header/` diff-ում չկան
