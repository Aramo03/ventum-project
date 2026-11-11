# Agent brief — Wave 2 — #10 Ashot

Отдай этот файл агенту целиком. Номер ученика — **10**. Он совпадает с [TASK.md](../../TASK.md) и с заголовком «10 — Ashot · ui» в [task-wave2.md](../../task-wave2.md).

Wave 1 закрыта: тесты моделей уже в `dev` и должны остаться зелёными. Тогда страницу 404 не делали. Теперь делаешь её и покрываешь API волны 2. Папка зоны по-прежнему называется NotFound.

## Русский

### Кто ты

Ты делаешь зону ученика 10, Ashot, ветка `feat/ashot-ui`, зона `ui`. README не удалять: [frontend/src/pages/NotFound/README.md](../../frontend/src/pages/NotFound/README.md).

Старт: `git checkout dev && git pull`, затем `feat/ashot-ui` со свежим `dev`. Один PR, base = `dev`. В `main` не пушить. `--force` не делать. Postgres не поднимать. Срок — конец января.

Ждать API предыдущих. В очереди ты последний: **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**. Тесты создают свои строки и не зависят от `seed_textile` и `seed_baby`.

### Карта репозитория

- Страница — [frontend/src/pages/NotFound/](../../frontend/src/pages/NotFound/): `NotFound.jsx`, `notFound.css`, `notFound.js`. Маршрут `*` в `App.jsx` уже ведёт сюда. Его не переписывать.
- `frontend/src/index.css` не трогать.
- Тесты — `tests.py` или пакет `tests/` рядом с приложением в `backend/`. Запуск: `python manage.py test`. Клиент — `rest_framework.test.APIClient`. Живой `runserver`, сеть и Postgres не нужны.
- Контракт путей — в [task-wave2.md](../../task-wave2.md). Каталог: `/api/catalog/`. Вход: `/api/auth/me/`. Заявки: `/api/leads/`. Блоки: `/api/content/home-blocks/`.

### Зона ответственности

Можно: новые тесты API и три файла NotFound. Новые строки 404 — в `am.json`, `en.json` и `ru.json`.

Нельзя: поля моделей, `admin.py`, миграции, правка чужого вью ради зелёного теста, `index.css`.

### Шаги

1. Страница 404: заголовок, короткий текст, ссылка на `/`. Не копировать витрину магазина.
2. Список товаров отдаёт только опубликованные.
3. `store=textile` не содержит товар baby.
4. `language=ru` берёт русское имя. Товар, у которого есть только `en`, остаётся в списке, и имя берётся из `en`.
5. `language=de` даёт 400.
6. `q` находит sku. Пустой `q` не уменьшает набор опубликованных.
7. Второй `POST /api/leads/newsletter/` с тем же email даёт 400, в базе одна строка.
8. `POST /api/leads/wholesale/` без `text` даёт 400.
9. `GET /api/auth/me/` без токена даёт 401.
10. `GET /api/content/home-blocks/?language=en` отдаёт `title`.
11. `python manage.py test` из `backend/` зелёный целиком, включая тесты волны 1.

### Definition of Done

Lead не мержит, пока весь прогон зелёный, неизвестный путь на сайте показывает 404 со ссылкой на главную, diff не содержит полей моделей и `index.css`, тесты не ходят в сеть и не требуют Postgres.

### Проверка

```bash
cd backend
python manage.py test
```

Затем `cd frontend && npm run dev` и открыть путь, которого нет в роутере. Ссылка ведёт на `/`.

### Нельзя

Не удалять тесты моделей волны 1. Не менять сериализатор, если упал тест: это баг владельца API, его чинит автор зоны. Не стилить 404 через `index.css`.

## English

You are student **10**, Ashot, branch `feat/ashot-ui`, zone `ui`. Do not delete the NotFound README.

Wave 1 model tests stay green. This wave you build the 404 page and cover the Wave 2 API. The zone folder is still NotFound.

Pull `dev` into `feat/ashot-ui`. One PR, base `dev`. No force-push. No Postgres. Finish by the end of January. You are last: **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**. Tests create their own rows. They do not need the seed commands.

**Own:** new API tests under `backend/` and `NotFound.jsx`, `notFound.css`, `notFound.js`. New 404 strings go into all three JSON files.

**Do not own:** model fields, `admin.py`, migrations, other people’s views, `index.css`.

**Steps**

1. A 404 page with a heading, a short text, and a link to `/`. The `*` route in `App.jsx` already points here. Do not rebuild the store on this page.
2. The product list returns published rows only.
3. `store=textile` does not contain a baby product.
4. `language=ru` uses the Russian name. A product that only has `en` stays in the list with the English name.
5. `language=de` is 400.
6. `q` finds a sku. A blank `q` does not shrink the published set.
7. A second `POST /api/leads/newsletter/` with the same email is 400 and leaves one row.
8. `POST /api/leads/wholesale/` without `text` is 400.
9. `GET /api/auth/me/` without a token is 401.
10. `GET /api/content/home-blocks/?language=en` returns a `title`.
11. `python manage.py test` from `backend/` is green for the whole suite, including Wave 1 tests.

Use `rest_framework.test.APIClient`. No network, no Postgres, no running server.

**Done when** the whole run is green, an unknown site path shows a 404 that links home, and the diff has no model fields and no `index.css`.

```bash
cd backend
python manage.py test
```

Do not delete Wave 1 model tests. If a test fails because the API is wrong, the zone owner fixes the view. Do not edit their serializer to force green. Do not style the 404 through `index.css`.

## Հայերեն

Դու աշակերտ **10**-ն ես, Ashot, ճյուղը՝ `feat/ashot-ui`, գոտին՝ `ui`։ NotFound-ի README-ն չջնջել։

Wave 1-ի մոդելների թեստերը մնում են կանաչ։ Այս ալիքում սարքում ես 404 էջը և ծածկում Wave 2-ի API-ն։ Գոտու պանակը դեռ NotFound է։

Թարմ `dev`-ը ձուլիր `feat/ashot-ui`-ի մեջ։ Մեկ PR, base-ը `dev`։ `--force` չանել։ Postgres չբարձրացնել։ Ավարտել մինչև հունվարի վերջ։ Դու վերջինն ես. **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**։ Թեստերն իրենց տողերն են ստեղծում։ Seed հրամաններ պետք չեն։

**Քոնն է՝** նոր API թեստեր `backend/`-ում և `NotFound.jsx`, `notFound.css`, `notFound.js`։ 404-ի նոր տողերը՝ երեք JSON-ում։

**Քոնը չէ՝** մոդելների դաշտերը, `admin.py`-ն, միգրացիաները, ուրիշների վью-ները, `index.css`-ը։

**Քայլեր**

1. 404 էջ՝ վերնագիր, կարճ տեքստ, հղում դեպի `/`։ `App.jsx`-ի `*` երթուղին արդեն այստեղ է տանում։ Խանութը այս էջում նորից մի հավաքիր։
2. Ապրանքների ցանկը վերադարձնում է միայն հրապարակված տողեր։
3. `store=textile`-ը baby ապրանք չի պարունակում։
4. `language=ru`-ն վերցնում է ռուսերեն անունը։ Միայն `en` ունեցող ապրանքը մնում է ցանկում անգլերեն անունով։
5. `language=de`-ն 400 է։
6. `q`-ն գտնում է sku։ Դատարկ `q`-ն հրապարակված հավաքածուն չի փոքրացնում։
7. Նույն email-ով երկրորդ `POST /api/leads/newsletter/`-ը 400 է և թողնում է մեկ տող։
8. `POST /api/leads/wholesale/` առանց `text` 400 է։
9. `GET /api/auth/me/` առանց թոքենի 401 է։
10. `GET /api/content/home-blocks/?language=en` վերադարձնում է `title`։
11. `backend/`-ից `python manage.py test`-ը ամբողջովին կանաչ է, ներառյալ Wave 1-ի թեստերը։

Գործածիր `rest_framework.test.APIClient`։ Առանց ցանցի, առանց Postgres-ի, առանց աշխատող սերվերի։

**Ավարտված է, երբ** ամբողջ թեստաշարը կանաչ է, կայքի անհայտ ուղին ցույց է տալիս 404՝ դեպի գլխավոր հղումով, իսկ diff-ում չկան մոդելների դաշտեր և `index.css`։

```bash
cd backend
python manage.py test
```

Wave 1-ի մոդելների թեստերը չջնջել։ Եթե թեստը ընկնում է սխալ API-ի պատճառով, վью-ն ուղղում է գոտու տերը։ Նրա սերիալիզատորը կանաչի համար չփոխել։ 404-ը `index.css`-ով չձևավորել։
