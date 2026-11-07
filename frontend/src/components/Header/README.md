# header — Mariam

**Ветка:** `feat/mariam-header`  
**Задание:** [task-advanced.md](../../../../task-advanced.md) — «Mariam · header».

`Header.jsx` и стили не менять.

Только `backend/apps/catalog/search.py`, после merge catalog, Karen и Svet:

- `search_products(queryset, query)`
- пустой запрос ничего не фильтрует
- иначе sku и переведённое имя, без учёта регистра, языки `am` / `en` / `ru`
- URL не добавлять

**Lead не мержит, пока:** поиск находит товар по sku и по имени, `models.py` в diff нет.

## English

Mariam. `search.py` only, after catalog, Karen, and Svet are merged. Do not redesign the header.

## Հայերեն

Mariam։ Միայն `search.py`, catalog-ի, Karen-ի և Svet-ի merge-ից հետո։ Header-ը չձևավորել։
