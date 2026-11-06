# catalog — имя пока пустое

**Ветка:** `feat/<имя>-catalog`, когда учитель впишет имя.  
**Задание B1:** [task-advanced.md](../../../task-advanced.md) — «catalog · имя пока пустое».

Пакет создаёт Suro. Ты заполняешь модели после его merge и после класса перевода Artush.

- `Category`: `store` = `textile` или `baby`, slug, переводы имени `am` / `en` / `ru`
- `Product`: цена `Decimal` в AMD, sku, публикация, переводы имени и описания
- `ProductImage`: файл, alt, порядок
- админка Unfold, фильтр по `store`

Файл `search.py` не создавай. Его пишет **Mariam** (`header`) после твоего merge.

**Lead не мержит, пока:** в `/api/admin/` сохраняются категория и товар с тремя переводами, `migrate` чистый, `search.py` нет.

## English

Catalog owner is not named yet. After Suro and Artush merge, add Category, Product, and images. Leave `search.py` for Mariam.

## Հայերեն

Catalog-ի անունը դեռ դատարկ է։ Suro-ի և Artush-ի merge-ից հետո ավելացրու Category, Product, նկարներ։ `search.py`-ն Mariam-ինն է։
