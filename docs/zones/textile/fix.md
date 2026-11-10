# 7 — Karen · textile — ошибки и разбор

**Ветка:** `feat/karen-textile`  
**Агент:** [docs/agents/07-karen.md](../../agents/07-karen.md)

---

## Русский

### Ошибка 1: `seed_textile` до merge Vach

**Симптом:** `CommandError: Catalog models are missing` или `ImportError` из `apps.catalog.models`.

**Причина:** Karen пишет **данные**, схему — Vach (9). На `dev` без Vach моделей команда не выполняется.

**Исправление:** после merge `feat/vach-catalog` в `dev` — `migrate`, затем `seed_textile` (можно дважды).

### Ошибка 2: ветка без актуального `dev`

**Симптом:** нет `leads`, `content`, падения migrate.

**Исправление:** `git checkout -B feat/karen-textile origin/dev`.

### Ошибка 3: `Category.objects.all().delete()` или сброс каталога

**Симптом:** пропадают записи `store=baby`.

**Исправление:** только `update_or_create` по slug / sku; **не** удалять чужие строки.

### Ошибка 4: дубликаты slug при повторном запуске

**Симптом:** `IntegrityError` на втором `seed_textile`.

**Исправление:** стабильные slug (`textile-fabrics`, `textile-home`) и sku (`TEXTILE-SAMPLE-001`).

### Ошибка 5: картинка по URL

**Симптом:** `ImageField` с http-ссылкой.

**Исправление:** файл в репозитории — [`backend/apps/catalog/seed_assets/textile-product.jpg`](../../../backend/apps/catalog/seed_assets/textile-product.jpg).

### Ошибка 6: правка `catalog/models.py` или Textile JSX

**Симптом:** diff в моделях или `frontend/src/pages/Textile/`.

**Исправление:** зона Karen — только `seed_textile` (и при необходимости fixture), не схема.

### Что не «лишний код»

| Элемент | Зачем |
|---------|--------|
| `management/commands/seed_textile.py` | DoD |
| `LANGUAGE_CODES` из `apps.core` | не копировать `am/en/ru` |
| `seed_assets/*.jpg` | картинка из репо |

### Чеклист (после Vach в `dev`)

- [ ] `del ventum.sqlite3`, `migrate`
- [ ] `seed_textile` × 2 без падений и дубликатов slug
- [ ] Админ: `store=textile` — 2 категории, 1 товар
- [ ] Baby не трогали

---

## English

Run `seed_textile` only after Vach catalog models exist. Use `update_or_create`, no global deletes, image from `seed_assets/`. Do not edit `models.py` or the Textile page.

---

## Հայերեն

Vach-ի merge-ից հետո միայն `seed_textile`։ Գլոբալ `delete` չանել։ Նկարը repo-ից։ `models.py` և Textile էջը չփոխել։
