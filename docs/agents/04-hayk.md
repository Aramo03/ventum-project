# Agent brief — Wave 2 — #4 Hayk

Отдай этот файл агенту целиком. Номер ученика — **4**. Он совпадает с [TASK.md](../../TASK.md) и с заголовком «4 — Hayk · gateway» в [task-wave2.md](../../task-wave2.md).

Wave 1 закрыта: модель `HomeBlock` и переводы `title` / `text` уже в `dev`. Поля модели не менять. Страницу `/` в той волне не верстали — теперь верстаешь.

## Русский

### Кто ты

Ты делаешь зону ученика 4, Hayk, ветка `feat/hayk-gateway`, зона `gateway`. README не удалять: [backend/apps/content/README.md](../../backend/apps/content/README.md), [frontend/src/pages/Gateway/README.md](../../frontend/src/pages/Gateway/README.md).

Старт: `git checkout dev && git pull`, затем `feat/hayk-gateway` со свежим `dev`. Один PR, base = `dev`. В `main` не пушить. `--force` не делать. Postgres не поднимать. Срок — конец января.

Ждать merge Artush (3): функции `parse_language` и `pick_translation` лежат в `apps.core.translations`. В очереди ты после Vach: **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**. Номер 4 — номер ученика, не шаг очереди.

### Карта репозитория

- `HomeBlock.slot` — `hero` или `stores`. Порядок — поле `order`.
- `backend/apps/content/urls.py` сейчас пустой и уже подключён как `api/content/`.
- Страница `/` — [frontend/src/pages/Gateway/](../../frontend/src/pages/Gateway/). Ссылки на магазины уже есть в `gateway.js` как `STORE_LINKS`.
- Запросы — через [frontend/src/api/client.js](../../frontend/src/api/client.js). На GET он сам добавляет `language`. Второй axios не создавать.
- Макеты: [кадр магазина](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12495), [второй файл](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=0-1).

### Зона ответственности

Можно: `content/serializers.py`, `content/views.py`, заполнить `content/urls.py`, файлы `Gateway.jsx`, `gateway.css`, `gateway.js`, новые ключи сразу в `am.json`, `en.json` и `ru.json`.

Нельзя: поля `HomeBlock`, страницы Textile и Baby, модели каталога, свой список языков.

### Шаги

1. `GET /api/content/home-blocks/?language=` возвращает JSON-массив, без пагинации. Элемент: `slot`, `order`, `title`, `text`. Сортировка как у модели: `order`, затем `id`.
2. Язык читать только через `parse_language`. `ValueError` превращать в **400**. Текст брать через `pick_translation`. Нет перевода — блок всё равно в массиве.
3. Страница `/` по макету: слот `hero` показывает `title` и `text`, выбор магазина ведёт на `/textile` и `/baby`. Маршруты в `App.jsx` не менять.
4. Если запрос упал, выбор магазина всё равно на экране. Новые строки интерфейса — в трёх JSON.

### Definition of Done

Lead не мержит, пока: `hero` отдаётся на `am`, `en` и `ru`; `?language=de` даёт 400; отсутствующий язык не выкидывает блок; главная показывает текст слота и оба магазина; при ошибке сети ссылки на магазины видны; поля `HomeBlock` в diff нет.

### Проверка

```bash
cd backend
python manage.py runserver
```

`GET /api/content/home-blocks/?language=ru` и `?language=de`. Сайт: `cd frontend && npm run dev`, открыть `/`.

### Нельзя

Не менять модели контента и каталога. Не собирать `/textile` и `/baby`. Не хардкодить `am` / `en` / `ru` вторым списком.

## English

You are student **4**, Hayk, branch `feat/hayk-gateway`, zone `gateway`. Do not delete the content or Gateway READMEs.

Wave 1 `HomeBlock` is in `dev`. Do not change its fields. This wave you do build `/`.

Pull `dev` into `feat/hayk-gateway`. One PR, base `dev`. No force-push. No Postgres. Finish by the end of January. Wait for Artush (3). Queue place is after Vach: **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**. Student number 4 is not the queue step.

**Own:** `content/serializers.py`, `content/views.py`, `content/urls.py`, `Gateway.jsx`, `gateway.css`, `gateway.js`, and new keys in all three JSON files.

**Do not own:** `HomeBlock` fields, Textile and Baby pages, catalog models, a second language list.

**Steps**

1. `GET /api/content/home-blocks/?language=` returns a JSON array, not a page. Fields: `slot`, `order`, `title`, `text`. Order by `order`, then `id`.
2. Read language only with `parse_language`. Turn `ValueError` into **400**. Pick text with `pick_translation`. A missing translation keeps the block in the array.
3. Build `/` from the Figma frames: hero title and text, store choice linking to `/textile` and `/baby`. Do not edit routes in `App.jsx`. Use `frontend/src/api/client.js`.
4. If the request fails, the store choice still renders.

**Done when** `hero` is served in `am`, `en`, and `ru`, `?language=de` is 400, the home page shows the slot and both stores, a failed request still shows the store links, and `HomeBlock` fields are unchanged.

```bash
cd backend
python manage.py runserver
```

Do not hardcode a second list of language codes.

## Հայերեն

Դու աշակերտ **4**-ն ես, Hayk, ճյուղը՝ `feat/hayk-gateway`, գոտին՝ `gateway`։ content-ի և Gateway-ի README-ները չջնջել։

Wave 1-ի `HomeBlock`-ն արդեն `dev`-ում է։ Դաշտերը չփոխել։ Այս ալիքում `/` էջը հավաքում ես դու։

Թարմ `dev`-ը ձուլիր `feat/hayk-gateway`-ի մեջ։ Մեկ PR, base-ը `dev`։ `--force` չանել։ Postgres չբարձրացնել։ Ավարտել մինչև հունվարի վերջ։ Սպասիր Artush-ին (3)։ Հերթում Vach-ից հետո ես. **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**։ Համար 4-ը հերթի քայլը չէ։

**Քոնն է՝** `content/serializers.py`, `content/views.py`, `content/urls.py`, `Gateway.jsx`, `gateway.css`, `gateway.js` և նոր բանալիները երեք JSON-ում։

**Քոնը չէ՝** `HomeBlock`-ի դաշտերը, Textile և Baby էջերը, կատալոգի մոդելները, լեզուների երկրորդ ցանկը։

**Քայլեր**

1. `GET /api/content/home-blocks/?language=` վերադարձնում է JSON զանգված, ոչ թե էջ։ Դաշտերը՝ `slot`, `order`, `title`, `text`։ Հերթը՝ `order`, ապա `id`։
2. Լեզուն կարդա միայն `parse_language`-ով։ `ValueError`-ն դարձրու **400**։ Տեքստը վերցրու `pick_translation`-ով։ Բացակա թարգմանությունը բլոկը զանգվածից չի հանում։
3. Հավաքիր `/` էջը մակետից՝ hero-ի title և text, խանութի ընտրություն դեպի `/textile` և `/baby`։ `App.jsx`-ի երթուղիները չփոխել։ Գործածիր `frontend/src/api/client.js`։
4. Եթե հարցումը ձախողվի, խանութի ընտրությունը էլի երևա։

**Ավարտված է, երբ** `hero`-ն գալիս է `am`, `en` և `ru` լեզվով, `?language=de`-ն 400 է, գլխավորը ցույց է տալիս սլոթը և երկու խանութը, ձախողված հարցումից հետո էլ հղումները երևում են, իսկ `HomeBlock`-ի դաշտերը չեն փոխվել։

```bash
cd backend
python manage.py runserver
```

Լեզուների երկրորդ ցանկ մի գրիր կոդի մեջ։
