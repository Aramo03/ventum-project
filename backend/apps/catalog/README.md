# 9 — catalog — Vach

**Номер ученика:** 9. Тот же номер в [TASK.md](../../../TASK.md) и в разделе «9 — Vach · catalog» файла [task-advanced.md](../../../task-advanced.md).  
**Ветка:** `feat/vach-catalog`  
**Агент:** [docs/agents/09-vach.md](../../../docs/agents/09-vach.md). Отдай агенту файл целиком.

Пакет создаёт Suro (ученик 2). Модели пиши после его merge и после класса перевода Artush (ученик 3). README не удаляй. В очередь merge ты встаёшь сразу после Artush.

## Зона ответственности

- `models.py` этого приложения
- `admin.py`
- миграции `catalog`

Два магазина макета — один каталог. Их делит поле `store`: `textile` или `baby`.

## Сделать

- `Category`: необязательный родитель, `store` = `textile` или `baby`, уникальный slug, перевод `name` на `am` / `en` / `ru` через класс Artush
- `Product`: категория, цена `Decimal` в AMD, уникальный sku, флаг публикации, переводы `name` и `description`
- `ProductImage`: файл (Pillow), alt, порядок
- админка Unfold: инлайн картинок и переводов, фильтр списка по `store`

## Нельзя

`search.py` не создавай. Его пишет Mariam (ученик 5). Страницы React, пользователя, заявки и `HomeBlock` не меняй. API-список товаров не добавляй. Postgres не поднимай.

## Definition of Done

Lead не мержит, пока одновременно верно всё:

- в `/api/admin/` сохраняется категория с `name` на `am`, `en`, `ru`;
- сохраняется товар: цена `Decimal` в AMD, sku, публикация, три перевода имени и описания, картинка с alt и порядком;
- фильтр `store` отделяет Textile от Baby;
- `python manage.py migrate` на удалённом `ventum.sqlite3` проходит;
- файла `search.py` нет;
- модели пользователя и слота главной не изменены.

## English

Student **9**, Vach, branch `feat/vach-catalog`. Same number in TASK.md and in task-advanced section «9 — Vach». Give your agent [09-vach.md](../../../docs/agents/09-vach.md) in full.

Wait for Suro (2) and Artush (3). You own `models.py`, `admin.py`, and catalog migrations. One catalog, `store` is `textile` or `baby`.

Build `Category` (optional parent, unique slug, `name` in `am` / `en` / `ru`), `Product` (`Decimal` AMD price, unique sku, published flag, translated name and description), and `ProductImage` (file, alt, order). Unfold admin: translation and image inlines, filter by `store`.

Do not create `search.py` (Mariam, student 5). Do not edit React, the user, leads, or `HomeBlock`.

**Done when** a category and a product with three translations save in `/api/admin/`, migrate passes on a fresh SQLite file, and `search.py` does not exist.

## Հայերեն

Աշակերտ **9**, Vach, ճյուղը՝ `feat/vach-catalog`։ Համարը նույնն է TASK.md-ում և task-advanced-ի «9 — Vach» բաժնում։ Գործակալին տուր ամբողջ [09-vach.md](../../../docs/agents/09-vach.md) ֆայլը։

Սպասիր Suro-ին (2) և Artush-ին (3)։ Քոնն են `models.py`-ն, `admin.py`-ն և catalog-ի միգրացիաները։ Մեկ կատալոգ, `store`-ը՝ `textile` կամ `baby`։

Սարքի `Category` (slug, `name` երեք լեզվով), `Product` (AMD `Decimal`, sku, հրապարակում, թարգմանված անուն և նկարագրություն) և `ProductImage` (ֆայլ, alt, հերթ)։ Unfold ադմին՝ inline-ներ և ֆիլտր `store`-ով։

`search.py` չստեղծել (Mariam, աշակերտ 5)։ React-ը, user-ը, հայտերը և `HomeBlock`-ը չփոխել։

**Ավարտված է, երբ** երեք թարգմանությամբ կատեգորիան և ապրանքը պահվում են `/api/admin/`-ում, migrate-ը անցնում է մաքուր SQLite-ով, և `search.py` չկա։
