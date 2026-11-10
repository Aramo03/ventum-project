# 8 — Svet · baby — ошибки и разбор

**Ветка:** `feat/svet-baby`  
**Агент:** [docs/agents/08-svet.md](../../agents/08-svet.md)

---

## Русский

### Ошибка 1: `catalog/models.py` и `admin.py` в ветке Svet

**Симптом:** diff меняет схему каталога.

**Причина:** модели и админка — зона **Vach (9)**.

**Исправление:** в PR Svet только `seed_baby`, `seed_assets/`, `fix.md` (+ пустой `management` при необходимости).

### Ошибка 2: удаление или перезапись Textile

**Симптом:** `Category.objects.filter(...).delete()` или смена `store` у чужих slug.

**Исправление:** только `store=baby`, slug с префиксом `baby-`; `update_or_create`; при конфликте slug/sku с другим store — `CommandError`.

### Ошибка 3: slug как у Karen

**Симптом:** `IntegrityError` или коллизия с `textile-fabrics`.

**Исправление:** slug глобально уникален (`baby-bedding`, `baby-care`).

### Ошибка 4: нет `ProductImage` / картинка по URL

**Исправление:** [`backend/apps/catalog/seed_assets/baby-product.jpg`](../../../backend/apps/catalog/seed_assets/baby-product.jpg).

### Ошибка 5: только `get_or_create` без обновления переводов

**Симптом:** второй запуск не обновляет текст; риск расхождений.

**Исправление:** `update_or_create` как в `seed_textile` (Karen).

### Ошибка 6: дублирование списка `am/en/ru`

**Исправление:** `LANGUAGE_CODES` из `apps.core.languages`.

### Ошибка 7: seed до merge Vach

**Симптом:** `CommandError: Catalog models are missing`.

**Исправление:** после Vach в `dev` — `migrate`, затем `seed_baby` (и Karen `seed_textile` для обоих фильтров store).

### Чего не делали

- `frontend/src/pages/Baby/`
- правка полей `Category` / `Product`

### Чеклист (после Vach + Karen)

- [ ] `seed_textile` → `seed_baby` → `seed_baby` без дубликатов slug
- [ ] Админ: фильтр `textile` и `baby` непустые
- [ ] Textile данные на месте

---

## English

Svet branch must not include Vach model files. Use idempotent `seed_baby`, distinct `baby-*` slugs, image in `seed_assets/`. Do not delete Textile rows. Full test after Vach and Karen are in `dev`.

---

## Հայերեն

Svet-ի PR-ում Vach-ի մոդելներ չեն լինում։ `seed_baby`, `baby-*` slug, նկար repo-ից։ Textile-ը չջնջել։ Լիական թեստ Vach + Karen merge-ից հետո։
