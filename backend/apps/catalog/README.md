# 9 — catalog — Vach

**Номер ученика:** 9. Тот же номер в [TASK.md](../../../TASK.md) и в разделе «9 — Vach · catalog» файла [task-wave2.md](../../../task-wave2.md).  
**Ветка:** `feat/vach-catalog`  
**Агент:** [docs/agents/09-vach.md](../../../docs/agents/09-vach.md). Отдай агенту файл целиком.

Модели волны 1 уже в `dev`. Поля не менять. README не удалять. Приложение второй раз не регистрировать. `search.py` не переписывать: список один раз вызывает `search_products`.

## Сделать

- `GET /api/catalog/categories/?store=&language=`
- `GET /api/catalog/products/?store=&language=&q=`
- `GET /api/catalog/products/<sku>/?language=`
- только опубликованные товары; черновик по sku — 404
- язык через функции Artush; неизвестный язык — 400
- страница берёт `PAGE_SIZE` Suro

Префикс `/api/products/` не добавлять.

## Definition of Done

Lead не мержит, пока товар Textile виден только в своём магазине, товар без `ru` остаётся в списке с английским именем, пустой `q` не режет `count`, а `models.py` в diff нет.

## English

Student **9**, Vach, `feat/vach-catalog`. Models stay. Publish the three catalog GETs under `/api/catalog/`. Call `search_products` once. Give your agent [09-vach.md](../../../docs/agents/09-vach.md) in full.

**Done when** a published Textile product is hidden from `store=baby`, a missing `ru` name falls back to `en`, and `models.py` is untouched.

## Հայերեն

Աշակերտ **9**, Vach, `feat/vach-catalog`։ Մոդելները մնում են։ Բացիր կատալոգի երեք GET-ը `/api/catalog/` տակ։ `search_products`-ը կանչիր մեկ անգամ։ Գործակալին տուր ամբողջ [09-vach.md](../../../docs/agents/09-vach.md)։

**Ավարտված է, երբ** հրապարակված Textile ապրանքը `store=baby`-ում չի երևում, բացակա `ru` անունը գալիս է `en`-ից, և `models.py`-ն չի դիպչվել։
