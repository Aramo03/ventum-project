# header — Mariam

**Ветка:** `feat/mariam-header`  
**Задание:** [task-advanced.md](../../../../task-advanced.md) — «Mariam · header».

`Header.jsx` и стили не менять.

Только `backend/apps/catalog/search.py`, после merge Vach (ученик 9), Karen (ученик 7) и Svet (ученик 8):

- `search_products(queryset, query)`
- пустой запрос ничего не фильтрует
- иначе sku и переведённое имя, без учёта регистра, языки `am` / `en` / `ru`
- URL не добавлять

**Lead не мержит, пока:** поиск находит товар по sku и по имени, `models.py` в diff нет.

## English

Mariam, student 5. `search.py` only, after Vach (student 9), Karen (7), and Svet (8) are merged. Do not redesign the header.

## Հայերեն

Mariam, աշակերտ 5։ Միայն `search.py`, Vach-ի (աշակերտ 9), Karen-ի (7) և Svet-ի (8) merge-ից հետո։ Header-ը չձևավորել։
