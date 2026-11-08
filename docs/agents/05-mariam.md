# Agent brief — Wave 1 — #5 Mariam

Отдай этот файл агенту целиком. Номер ученика — **5**. Он совпадает с [TASK.md](../../TASK.md) и с заголовком «5 — Mariam · header» в [task-advanced.md](../../task-advanced.md). В очереди имён Mariam стоит после Svet, почти в конце.

## Русский

### Кто ты

Ты делаешь зону ученика 5, Mariam, ветка `feat/mariam-header`, зона `header`. README не удалять: [frontend/src/components/Header/README.md](../../frontend/src/components/Header/README.md).

Старт от `dev`, ветка `feat/mariam-header`, один PR в `dev`. В `main` не пушить. Postgres не поднимать. Срок — конец декабря.

Ждать merge Vach (9), Karen (7) и Svet (8): без их моделей и данных поиск не на чем проверить. Очередь: **Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**.

### Карта репозитория

- Единственный файл работы: `backend/apps/catalog/search.py`. Его создаёшь ты. Vach его не создаёт.
- Модели `Category`, `Product` и переводы уже в `backend/apps/catalog/models.py`. Их не менять и не мигрировать заново.
- `frontend/src/components/Header/` (`Header.jsx`, `header.css`, `header.js`) не менять. Поиск в интерфейсе в Wave 1 не подключать.
- Языки имени товара: `am`, `en`, `ru`.

### Зона ответственности

Только функция поиска в `search.py`.

Нельзя: `models.py`, миграции, `admin.py`, `Header.jsx`, URL, вью.

### Шаги

1. Функция `search_products(queryset, query)`.
2. Пустой запрос или одни пробелы возвращают тот же queryset, без фильтра.
3. Иначе искать по sku и по переведённому имени (`am`, `en` или `ru`) без учёта регистра.
4. В docstring описать будущий контракт, не реализуя его: `GET /api/products/?q=&store=&language=`. Ни вью, ни path не добавлять.

### Definition of Done

Lead не мержит, пока на данных Karen и Svet функция находит товар по sku и по имени на каждом из трёх языков, пустой запрос ничего не отрезает, в diff нет правок `models.py`.

### Проверка

Из `backend/` в оболочке Django (`python manage.py shell`) вызвать `search_products` на товарах Textile и Baby: по sku, по имени `am`, по имени `en`, по имени `ru`, и с пустой строкой. Пустой запрос возвращает исходный queryset. `git diff` по `models.py` и по `frontend/src/components/Header/` пустой.

### Нельзя

Не менять схему каталога. Не добавлять маршрут. Не верстать шапку.

## English

You are student **5**, Mariam, branch `feat/mariam-header`, zone `header`. Do not delete [frontend/src/components/Header/README.md](../../frontend/src/components/Header/README.md).

Branch from `dev`. One PR into `dev`. Do not push `main`. No Postgres. Finish by the end of December.

Wait for Vach (9), Karen (7), and Svet (8). Your place in the name queue is after Svet: **Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**. Your student number stays 5.

**Own:** only `backend/apps/catalog/search.py`. You create this file. Vach does not.

**Do not own:** `models.py`, migrations, `admin.py`, `Header.jsx`, URLs, views.

**Steps**

1. `search_products(queryset, query)`.
2. An empty query or whitespace returns the same queryset, unfiltered.
3. Otherwise match sku and the translated name (`am`, `en`, or `ru`), case-insensitive.
4. Docstring only for the future contract `GET /api/products/?q=&store=&language=`. Do not add a view or a path.

**Done when** on Karen’s and Svet’s data the function finds a product by sku and by name in each of the three languages, an empty query drops nothing, and `models.py` is not in the diff.

Check from `python manage.py shell` against Textile and Baby products. `git diff` for `models.py` and `frontend/src/components/Header/` must be empty.

## Հայերեն

Դու աշակերտ **5**-ն ես, Mariam, ճյուղը՝ `feat/mariam-header`, գոտին՝ `header`։ Չջնջել [frontend/src/components/Header/README.md](../../frontend/src/components/Header/README.md)։

Ճյուղը `dev`-ից է։ Մեկ PR դեպի `dev`։ `main` չpush անել։ Postgres չբարձրացնել։ Ավարտել մինչև դեկտեմբերի վերջ։

Սպասիր Vach-ի (9), Karen-ի (7) և Svet-ի (8) merge-ին։ Անունների հերթում դու Svet-ից հետո ես՝ **Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**։ Համարը մնում է 5։

**Քոնն է՝** միայն `backend/apps/catalog/search.py`։ Ֆայլը ստեղծում ես դու։ Vach-ը այն չի ստեղծում։

**Քոնը չէ՝** `models.py`, միգրացիաներ, `admin.py`, `Header.jsx`, URL, view։

**Քայլեր**

1. `search_products(queryset, query)`։
2. Դատարկ հարցումը կամ միայն բացատները վերադարձնում են նույն queryset-ը, առանց ֆիլտրի։
3. Այլապես որոնում sku-ով և թարգմանված անունով (`am`, `en` կամ `ru`), առանց մեծատառի տարբերության։
4. Docstring-ում ապագա պայմանագիրը՝ `GET /api/products/?q=&store=&language=`։ View և path չավելացնել։

**Ավարտված է, երբ** Karen-ի և Svet-ի տվյալներով ֆունկցիան գտնում է ապրանքը sku-ով և անունով երեք լեզվով էլ, դատարկ հարցումը ոչինչ չի կտրում, և `models.py`-ն diff-ում չկա։

Ստուգիր `python manage.py shell`-ից։ `models.py`-ի և `frontend/src/components/Header/`-ի `git diff`-ը պետք է դատարկ լինի։
