# Agent brief — Wave 2 — #9 Vach

Отдай этот файл агенту целиком. Номер ученика — **9**. Он совпадает с [TASK.md](../../TASK.md) и с заголовком «9 — Vach · catalog» в [task-wave2.md](../../task-wave2.md).

Wave 1 закрыта: `Category`, `Product`, `ProductImage` и админка уже в `dev`. Поля не менять. `search.py` принадлежит Mariam: из списка одна строка его вызывает, файл целиком не переписывать. Публичного списка в волне 1 не было. Канон пути — `/api/catalog/`, не `/api/products/`.

## Русский

### Кто ты

Ты делаешь зону ученика 9, Vach, ветка `feat/vach-catalog`, зона `catalog`. README не удалять: [backend/apps/catalog/README.md](../../backend/apps/catalog/README.md).

Старт: `git checkout dev && git pull`, затем `feat/vach-catalog` со свежим `dev`. Один PR, base = `dev`. В `main` не пушить. `--force` не делать. Postgres не поднимать. Срок — конец января.

Ждать Artush (3): `parse_language` и `pick_translation` в `apps.core.translations`. Ждать Suro (2): `PAGE_SIZE = 12`. В очереди ты сразу после Artush: **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**. Номер 9 — номер ученика, не шаг очереди. В `INSTALLED_APPS` каталог второй раз не регистрировать.

### Карта репозитория

- Два магазина — один каталог. Их делит `Category.store`: `textile` или `baby`.
- Цена — `Decimal` в AMD. Наружу она уходит строкой с двумя знаками.
- Публичный список и карточка — только `is_published=True`.
- Картинки упорядочены полем `order`. В списке нужна первая. В карточке — все.
- `backend/apps/catalog/urls.py` пустой и уже подключён как `api/catalog/`.
- `search_products(queryset, query)` уже умеет пустой запрос и поиск по sku и переведённому имени.

### Зона ответственности

Можно: `serializers.py`, `views.py`, заполнить `urls.py`.

Нельзя: `models.py`, миграции, переписывание `search.py`, страницы React, модели заявок и слотов, второй префикс `/api/products/`.

### Шаги

1. `GET /api/catalog/categories/?store=&language=` — страница DRF (`count`, `next`, `previous`, `results`). Элемент: `slug`, `store`, `name`, `parent` (slug родителя или `null`). Плоский список. Размер страницы не хардкодить: его берёт глобальный `PAGE_SIZE`.
2. `GET /api/catalog/products/?store=&language=&q=` — та же страница. Элемент: `sku`, `store`, `price`, `name`, `category` (`slug`, `name`), `image`. `image` — абсолютный URL первой картинки или `null`. `store` в ответе берётся из категории.
3. `GET /api/catalog/products/<sku>/?language=` — карточка. Добавляет `description` и `images`: `{url, alt, order}`. Неопубликованный или неизвестный sku — **404**.
4. `language` только через `parse_language`. `ValueError` — ответ **400**. Имя, описание и имя категории — через `pick_translation`. Нет `ru` — товар остаётся, текст из `en`, иначе из любой существующей строки.
5. `store` можно не передавать: тогда оба магазина. Значение кроме `textile` и `baby` — **400**.
6. После фильтра магазина и `is_published=True` одна строка: `search_products(queryset, request.query_params.get("q", ""))`. Пустой `q` не уменьшает `count`.
7. У вью указать сериализатор, чтобы Swagger показал пути. Тег — `catalog`.

### Definition of Done

Lead не мержит, пока: опубликованный товар Textile есть в `store=textile` и отсутствует в `store=baby`; черновик отсутствует в списке и по sku даёт 404; товар без перевода `ru` остаётся в выдаче с английским именем; `?language=de` даёт 400; пустой `q` не уменьшает `count`; `models.py` и тело `search.py` в diff нет.

### Проверка

```bash
cd backend
python manage.py seed_textile
python manage.py seed_baby
python manage.py runserver
```

Открыть `/api/catalog/products/?store=textile&language=en`, тот же список с `store=baby`, карточку sku, `?language=de` и `?q=` из пробелов. В Swagger три GET видны в группе catalog.

### Нельзя

Не менять поля моделей ради формы ответа. Не фильтровать товар из выдачи только потому, что нет одного языка. Не писать поиск заново в сериализаторе.

## English

You are student **9**, Vach, branch `feat/vach-catalog`, zone `catalog`. Do not delete [backend/apps/catalog/README.md](../../backend/apps/catalog/README.md).

Wave 1 models and admin are in `dev`. Do not change fields. Do not rewrite `search.py`. Call it once from the list. The public prefix is `/api/catalog/`, not `/api/products/`.

Pull `dev` into `feat/vach-catalog`. One PR, base `dev`. No force-push. No Postgres. Finish by the end of January. Wait for Artush (3) and Suro’s `PAGE_SIZE`. You are immediately after Artush in the queue: **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**. Do not register the app again.

**Own:** `serializers.py`, `views.py`, and the empty `urls.py`.

**Do not own:** `models.py`, migrations, a rewrite of `search.py`, React pages, lead and home-block models.

**Steps**

1. `GET /api/catalog/categories/?store=&language=` is a DRF page. Item: `slug`, `store`, `name`, `parent` slug or `null`. Flat list. Do not hardcode the page size.
2. `GET /api/catalog/products/?store=&language=&q=` is a DRF page. Item: `sku`, `store`, `price`, `name`, `category` (`slug`, `name`), `image` as an absolute URL or `null`. `store` comes from the category. Published rows only.
3. `GET /api/catalog/products/<sku>/?language=` adds `description` and `images` (`url`, `alt`, `order`). Unknown or unpublished sku is **404**.
4. Language goes through `parse_language`. `ValueError` becomes **400**. Names and descriptions go through `pick_translation`. A missing `ru` keeps the product and uses `en`.
5. Omit `store` to return both stores. Any other store value is **400**.
6. After the store and published filters, one line calls `search_products(queryset, request.query_params.get("q", ""))`.
7. Set the serializer on the view so Swagger lists the paths under the `catalog` tag.

**Done when** a published Textile product appears for `store=textile` and not for `store=baby`, a draft is missing from the list and is 404 by sku, a product with no `ru` stays with the English name, `?language=de` is 400, a blank `q` does not lower `count`, and `models.py` and the body of `search.py` are untouched.

```bash
cd backend
python manage.py seed_textile
python manage.py seed_baby
python manage.py runserver
```

Do not drop a product only because one language is missing. Do not reimplement search inside the serializer.

## Հայերեն

Դու աշակերտ **9**-ն ես, Vach, ճյուղը՝ `feat/vach-catalog`, գոտին՝ `catalog`։ Չջնջել [backend/apps/catalog/README.md](../../backend/apps/catalog/README.md)։

Wave 1-ի մոդելներն ու ադմինն արդեն `dev`-ում են։ Դաշտերը չփոխել։ `search.py`-ն չվերաշարադրել։ Ցանկից այն կանչիր մեկ անգամ։ Հրապարակային նախդիրը `/api/catalog/` է, ոչ թե `/api/products/`։

Թարմ `dev`-ը ձուլիր `feat/vach-catalog`-ի մեջ։ Մեկ PR, base-ը `dev`։ `--force` չանել։ Postgres չբարձրացնել։ Ավարտել մինչև հունվարի վերջ։ Սպասիր Artush-ին (3) և Suro-ի `PAGE_SIZE`-ին։ Հերթում Artush-ից անմիջապես հետո ես. **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**։ Հավելվածը երկրորդ անգամ չգրանցել։

**Քոնն է՝** `serializers.py`, `views.py` և դատարկ `urls.py`։

**Քոնը չէ՝** `models.py`-ն, միգրացիաները, `search.py`-ի վերաշարադրումը, React էջերը, հայտերի և սլոթի մոդելները։

**Քայլեր**

1. `GET /api/catalog/categories/?store=&language=` DRF էջ է։ Տարրը՝ `slug`, `store`, `name`, `parent` slug կամ `null`։ Հարթ ցանկ։ Էջի չափը կոդի մեջ մի գրիր։
2. `GET /api/catalog/products/?store=&language=&q=` DRF էջ է։ Տարրը՝ `sku`, `store`, `price`, `name`, `category` (`slug`, `name`), `image` որպես բացարձակ URL կամ `null`։ `store`-ը գալիս է կատեգորիայից։ Միայն հրապարակված տողեր։
3. `GET /api/catalog/products/<sku>/?language=` ավելացնում է `description` և `images` (`url`, `alt`, `order`)։ Անհայտ կամ չհրապարակված sku-ն **404** է։
4. Լեզուն անցնում է `parse_language`-ով։ `ValueError`-ն դառնում է **400**։ Անուններն ու նկարագրությունը անցնում են `pick_translation`-ով։ Բացակա `ru`-ն ապրանքը թողնում է և վերցնում `en`։
5. Առանց `store`-ի գալիս են երկու խանութը։ Ուրիշ արժեքը՝ **400**։
6. Խանութի և published ֆիլտրից հետո մեկ տող կանչում է `search_products(queryset, request.query_params.get("q", ""))`։
7. Վью-ի վրա դիր սերիալիզատորը, որպեսզի Swagger-ը ցույց տա ուղիները `catalog` թեգի տակ։

**Ավարտված է, երբ** հրապարակված Textile ապրանքը երևում է `store=textile`-ում և չի երևում `store=baby`-ում, սևագիրը ցանկում չկա և sku-ով 404 է, առանց `ru` ապրանքը մնում է անգլերեն անունով, `?language=de`-ն 400 է, դատարկ `q`-ն `count`-ը չի փոքրացնում, իսկ `models.py`-ն և `search.py`-ի մարմինը չեն դիպչվել։

```bash
cd backend
python manage.py seed_textile
python manage.py seed_baby
python manage.py runserver
```

Ապրանքը մի հանիր միայն այն պատճառով, որ մեկ լեզու չկա։ Որոնումը սերիալիզատորի մեջ նորից մի գրիր։
