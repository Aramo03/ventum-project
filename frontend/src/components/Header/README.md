# header — Mariam

**Ветка:** `feat/mariam-header`  
**Задание B1:** [task-advanced.md](../../../../task-advanced.md) — «Mariam · header».

`Header.jsx` и стили в B1 не менять. Шапка по Figma — волна F1, вход и бейдж корзины — F5.

Сейчас только файл `backend/apps/catalog/search.py` (после merge catalog):

- `search_products(queryset, query)`
- пустой запрос ничего не фильтрует
- иначе sku и переведённое имя, без учёта регистра, языки `am` / `en` / `ru`
- URL не добавлять

**Lead не мержит, пока:** поиск находит товар по sku и по имени, `models.py` в diff нет.

## English

Mariam. B1 is `search.py` only, after the catalog models are merged. Do not redesign the header yet.

## Հայերեն

Mariam։ B1-ում միայն `search.py`, catalog-ի merge-ից հետո։ Header-ի դիզայնը դեռ չանել։
