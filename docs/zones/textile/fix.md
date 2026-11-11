# 7 — Karen · textile — ошибки и разбор

> Журнал Wave 1. В Wave 2 этот разбор не переписывать. Текущее задание — [task-wave2.md](../../../task-wave2.md).
> Wave 1 journal. Do not rewrite it for Wave 2.
> Wave 1-ի մատյան։ Wave 2-ի համար չվերաշարադրել։

**Ветка:** `feat/karen-textile`  
**Агент:** [docs/agents/07-karen.md](../../agents/07-karen.md)

Журнал того, что было в коммите `6c5f79a`, и что из этого лишний код. Модели и админку Vach этот коммит не менял. `frontend/src/pages/Textile/` в diff нет.

---

## Русский

### Ошибка 1: нет проверки store до `update_or_create`

**Симптом:** если slug или sku уже занят Baby, строка молча становится `store=textile`. `CommandError` нет.

**Причина:** `defaults={"store": "textile"}` и `defaults={"category": ...}` пишутся сразу. Проверки магазина до записи не было.

**Исправление:** сначала `filter` по slug и sku. Если магазин не `textile` — `CommandError` и выход без `update`.

### Ошибка 2: картинка пишется на каждый запуск

**Симптом:** в БД одна `ProductImage`, в media появляются `textile-product.jpg`, затем `textile-product_xxxx.jpg`.

**Причина:** `image.image.save(...)` вызывался всегда. Storage не затирает занятое имя.

**Исправление:** сохранять файл только если `ProductImage.image` ещё пустое.

### Лишний код (убран)

| Код | Почему лишний |
|-----|----------------|
| `_published_defaults()` | Угадывал `is_published`, `published` или пустой dict. У Vach поле одно: `Product.is_published`. Пустой dict оставил бы товар неопубликованным. |
| `_require_catalog_models()` | Ловил `ImportError`, потому что ветка отведена до моделей Vach. На `dev` модели есть — прямой импорт. |

### Что не «лишний код»

| Элемент | Зачем |
|---------|--------|
| `update_or_create` по slug, sku, языку, `order=0` | второй запуск не плодит slug и не падает |
| `LANGUAGE_CODES` из `apps.core.languages` | `am`, `en`, `ru` без своего списка |
| `description` в переводе товара | у `ProductTranslation.description` нет default |
| `Decimal("24900.00")` и `is_published=True` | цена AMD и опубликованный товар |
| slug `textile-fabrics`, `textile-home` | не пересекаются с `baby-*` Svet |
| `seed_assets/textile-product.jpg` | картинка из репозитория, не URL |
| пустые `management/__init__.py` | пакет команды Django |
| `transaction.atomic` | сбой не оставляет половину сида |

### Чего не делали

- поля `Category` / `Product` и `admin.py` (зона Vach)
- `frontend/src/pages/Textile/`
- удаление или перезапись строк Baby
- копия `seed_baby` в эту ветку

### Чеклист

Прогон на чистой SQLite поверх `origin/dev` (модели Vach). Baby-строки создаёт уже лежащий в `dev` `seed_baby`, в коммит Karen он не входит:

- [x] `migrate`
- [x] `seed_baby` → `seed_textile` → `seed_textile`: категории textile = 2, товар textile = 1, slug не двоятся
- [x] строки Baby те же после обоих запусков `seed_textile`
- [x] второй запуск не создаёт второй файл картинки
- [x] slug со `store=baby` команда не переписывает
- [x] `frontend/src/pages/Textile/` не в diff

---

## English

### Mistakes in `6c5f79a`

There was no store check before `update_or_create`, so a Baby slug or sku would be rewritten to Textile. `image.save` ran on every seed and created extra media files.

### Extra code removed

`_published_defaults()` guessed `is_published` / `published`. `_require_catalog_models()` only existed because this branch started before Vach. Import the catalog models directly and set `is_published=True`.

### Keep

Idempotent `update_or_create`, `LANGUAGE_CODES`, product descriptions, `Decimal` AMD price, `textile-*` slugs, repo image, `transaction.atomic`.

### Out of scope

Model fields, catalog admin, the Textile page, Svet’s Baby rows, copying `seed_baby` into this branch.

### Checklist

- [x] `migrate` on a clean SQLite file from `dev`
- [x] `seed_baby`, then `seed_textile` twice: 2 textile categories, 1 textile product, no new slugs
- [x] Baby rows unchanged
- [x] second run does not add another image file
- [x] a slug with `store=baby` is not rewritten
- [x] no diff under `frontend/src/pages/Textile/`

---

## Հայերեն

### Սխալներ `6c5f79a`-ում

Store-ի ստուգում `update_or_create`-ից առաջ չկար. Baby-ի slug-ը կամ sku-ն լուռ կդառնար Textile. `image.save`-ը ամեն անգամ նոր ֆայլ էր թողնում media-ում։

### Հանած ավելորդ կոդ

`_published_defaults()`-ը գուշակում էր `is_published` / `published`. `_require_catalog_models()`-ը պետք էր, որովհետև ճյուղը Vach-ից առաջ էր։ Մոդելները ուղիղ import, `is_published=True`։

### Պահել

`update_or_create`, `LANGUAGE_CODES`, ապրանքի description, AMD `Decimal`, `textile-*` slug, նկարը repo-ից, `transaction.atomic`։

### Չփոխել

Մոդելների դաշտերը, ադմինը, Textile էջը, Svet-ի Baby տողերը։ `seed_baby`-ն այս ճյուղ չպատճենել։

### Ստուգացանկ

- [x] մաքուր SQLite, `migrate` `dev`-ից
- [x] `seed_baby`, հետո `seed_textile` երկու անգամ. 2 կատեգորիա, 1 ապրանք, նոր slug չկա
- [x] Baby-ի տողերը նույնն են
- [x] երկրորդ անգամը նոր նկարի ֆայլ չի ստեղծում
- [x] `store=baby` slug-ը չի վերագրվում
- [x] `frontend/src/pages/Textile/` diff-ում չկա
