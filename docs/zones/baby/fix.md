# 8 — Svet · baby — ошибки и разбор

**Ветка:** `feat/svet-baby`  
**Агент:** [docs/agents/08-svet.md](../../agents/08-svet.md)

Журнал того, что было в коммите `930e0f1`, и что из этого лишний код. Модели и админку Vach этот коммит не менял. `frontend/src/pages/Baby/` в diff нет.

---

## Русский

### Ошибка 1: проверка store после `update_or_create`

**Симптом:** `CommandError` «not Baby» / «not overwriting» никогда не срабатывает. Если slug или sku уже занят Textile, строка переписывается на `store=baby`.

**Причина:** `defaults={"store": "baby"}` и `defaults={"category": ...}` записываются внутри `update_or_create`. Проверка `category.store` и `product.category.store` шла уже по новой строке.

**Исправление:** сначала `filter` по slug и sku. Если магазин не `baby` — `CommandError` и выход без `update`.

### Ошибка 2: картинка пишется на каждый запуск

**Симптом:** в БД одна `ProductImage`, в media появляются `baby-product.jpg`, затем `baby-product_xxxx.jpg`.

**Причина:** `image.image.save(...)` вызывался всегда. Storage не затирает занятое имя.

**Исправление:** сохранять файл только если `ProductImage.image` ещё пустое.

### Лишний код (убран)

| Код | Почему лишний |
|-----|----------------|
| `_published_defaults()` | Угадывал `is_published`, `published` или пустой dict. У Vach поле одно: `Product.is_published`. Пустой dict оставил бы товар неопубликованным. |
| `_require_catalog_models()` | Ловил `ImportError`, потому что на ветке Svet `models.py` ещё пустой (merge до Vach, PR #5 раньше PR #7). На `dev` модели есть — прямой импорт. |

### Что не «лишний код»

| Элемент | Зачем |
|---------|--------|
| `update_or_create` по slug, sku, языку, `order=0` | второй запуск не плодит slug |
| `LANGUAGE_CODES` из `apps.core.languages` | `am`, `en`, `ru` без своего списка |
| `description` в переводе товара | у `ProductTranslation.description` нет default |
| `Decimal("15000.00")` и `is_published=True` | цена AMD и опубликованный товар |
| slug `baby-bedding`, `baby-care` | не пересекаются с `textile-*` Karen |
| `seed_assets/baby-product.jpg` | картинка из репозитория, не URL |
| пустые `management/__init__.py` | пакет команды Django |
| `transaction.atomic` | сбой не оставляет половину сида |

### Чего не делали

- поля `Category` / `Product` и `admin.py` (зона Vach)
- `frontend/src/pages/Baby/`
- удаление или перезапись строк Textile
- копия `seed_textile` в эту ветку

### Чеклист

Прогон на чистой SQLite поверх `origin/dev` (модели Vach) и команды Karen, взятой только для проверки, не в коммит:

- [x] `migrate`
- [x] `seed_textile` → `seed_baby` → `seed_baby`: категории baby = 2, товар baby = 1, slug не двоятся
- [x] строки Textile те же после обоих запусков `seed_baby`
- [x] второй запуск не создаёт второй файл картинки
- [x] `frontend/src/pages/Baby/` не в diff

---

## English

### Mistakes in `930e0f1`

The store check ran after `update_or_create`, so a Textile slug or sku would be rewritten to Baby before `CommandError`. `image.save` ran on every seed and created extra media files.

### Extra code removed

`_published_defaults()` guessed `is_published` / `published`. `_require_catalog_models()` only existed because this branch was merged before Vach. Import the catalog models directly and set `is_published=True`.

### Keep

Idempotent `update_or_create`, `LANGUAGE_CODES`, product descriptions, `Decimal` AMD price, `baby-*` slugs, repo image, `transaction.atomic`.

### Out of scope

Model fields, catalog admin, the Baby page, Karen’s Textile rows, copying `seed_textile` into this branch.

### Checklist

- [x] `migrate` on a clean SQLite file from `dev`
- [x] `seed_textile`, then `seed_baby` twice: 2 baby categories, 1 baby product, no new slugs
- [x] Textile rows unchanged
- [x] second run does not add another image file
- [x] no diff under `frontend/src/pages/Baby/`

---

## Հայերեն

### Սխալներ `930e0f1`-ում

Store-ի ստուգումը `update_or_create`-ից հետո էր. Textile-ի slug-ը կամ sku-ն կվերագրվեր Baby-ի, հետո միայն `CommandError`. `image.save`-ը ամեն անգամ նոր ֆայլ էր թողնում media-ում։

### Հանած ավելորդ կոդ

`_published_defaults()`-ը գուշակում էր `is_published` / `published`. `_require_catalog_models()`-ը պետք էր, որովհետև ճյուղը merge էր եղել Vach-ից առաջ։ Մոդելները ուղիղ import, `is_published=True`։

### Պահել

`update_or_create`, `LANGUAGE_CODES`, ապրանքի description, AMD `Decimal`, `baby-*` slug, նկարը repo-ից, `transaction.atomic`։

### Չփոխել

Մոդելների դաշտերը, ադմինը, Baby էջը, Karen-ի Textile տողերը։ `seed_textile`-ը այս ճյուղ չպատճենել։

### Ստուգացանկ

- [x] մաքուր SQLite, `migrate` `dev`-ից
- [x] `seed_textile`, հետո `seed_baby` երկու անգամ. 2 կատեգորիա, 1 ապրանք, նոր slug չկա
- [x] Textile-ի տողերը նույնն են
- [x] երկրորդ անգամը նոր նկարի ֆայլ չի ստեղծում
- [x] `frontend/src/pages/Baby/` diff-ում չկա
