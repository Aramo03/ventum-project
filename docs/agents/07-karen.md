# Agent brief — Wave 2 — #7 Karen

Отдай этот файл агенту целиком. Номер ученика — **7**. Он совпадает с [TASK.md](../../TASK.md) и с заголовком «7 — Karen · textile» в [task-wave2.md](../../task-wave2.md).

Wave 1 закрыта: команда `seed_textile` уже кладёт категории и товар `store=textile`. Сид и поля моделей не менять. Страницу `/textile` в той волне не собирали. Теперь собираешь её из API.

## Русский

### Кто ты

Ты делаешь зону ученика 7, Karen, ветка `feat/karen-textile`, зона `textile`. README не удалять: [frontend/src/pages/Textile/README.md](../../frontend/src/pages/Textile/README.md).

Старт: `git checkout dev && git pull`, затем `feat/karen-textile` со свежим `dev`. Один PR, base = `dev`. В `main` не пушить. `--force` не делать. Postgres не поднимать. Срок — конец января.

Ждать merge Vach (9): без `GET /api/catalog/products/?store=textile` витрину собирать не из чего. В очереди ты после Mariam: **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**.

### Карта репозитория

- Страница — [frontend/src/pages/Textile/](../../frontend/src/pages/Textile/): `Textile.jsx`, `textile.css`, `textile.js`.
- Данные читать через [frontend/src/api/client.js](../../frontend/src/api/client.js). Клиент сам добавляет `language` на GET.
- Список товаров пагинирован, размер страницы 12. В элементе есть `sku`, `store`, `price`, `name`, `category`, `image`. `image` — абсолютный URL или `null`.
- Цена на экране — строка с подписью AMD. Конвертации валют нет.
- Макет: [кадр магазина](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12495).

### Зона ответственности

Можно: три файла страницы Textile и новые ключи в `am.json`, `en.json`, `ru.json`.

Нельзя: `seed_textile`, `models.py`, вью и сериализаторы каталога, страница Baby, корзина.

### Шаги

1. Запросить `GET /api/catalog/categories/?store=textile` и `GET /api/catalog/products/?store=textile`.
2. Показать категории, опубликованные товары, имя, цену AMD и картинку. Если `image` равен `null`, место картинки остаётся пустым, без битой иконки.
3. Три состояния: загрузка, пустой список, ошибка сети. Текст этих состояний — в трёх JSON.
4. Черновик на витрину не попадает: это уже делает API. Свой фильтр `is_published` на фронте не выдумывать вторым источником правды, но и не рисовать товар другого магазина, если он внезапно пришёл.

### Definition of Done

Lead не мержит, пока: после `seed_textile` на `/textile` виден товар Textile и не виден товар Baby; пустая выдача и ошибка сети не оставляют белый экран без сообщения; сид и поля моделей в diff нет.

### Проверка

```bash
cd backend
python manage.py seed_textile
python manage.py runserver
```

Во втором окне `cd frontend && npm run dev`. Открыть `/textile`. Сменить язык в шапке, когда кнопка `ru` уже есть: имя должно прийти на языке запроса.

### Нельзя

Не править `seed_baby` и файлы Svet. Не добавлять товар руками в обход API. Не открывать корзину.

## English

You are student **7**, Karen, branch `feat/karen-textile`, zone `textile`. Do not delete the Textile README.

Wave 1 `seed_textile` is in `dev`. Do not change the seed or the model fields. This wave you build `/textile` from the API.

Pull `dev` into `feat/karen-textile`. One PR, base `dev`. No force-push. No Postgres. Finish by the end of January. Wait for Vach (9). Queue: **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**.

**Own:** `Textile.jsx`, `textile.css`, `textile.js`, and new keys in all three JSON files.

**Do not own:** `seed_textile`, `models.py`, catalog views, the Baby page, cart.

**Steps**

1. Request `GET /api/catalog/categories/?store=textile` and `GET /api/catalog/products/?store=textile` through `frontend/src/api/client.js`.
2. Show categories, published products, name, AMD price, and `image`. When `image` is `null`, leave a quiet empty place.
3. Loading, empty, and network-error states. Put those strings in all three JSON files.
4. Drafts stay off the page because the API already filters them. Do not render a product from the other store.

**Done when** after `seed_textile` the Textile product is visible and the Baby product is not, empty and error states show a message, and the seed and model fields are untouched.

```bash
cd backend
python manage.py seed_textile
python manage.py runserver
```

Do not edit Svet’s files. Do not open a cart.

## Հայերեն

Դու աշակերտ **7**-ն ես, Karen, ճյուղը՝ `feat/karen-textile`, գոտին՝ `textile`։ Textile-ի README-ն չջնջել։

Wave 1-ի `seed_textile`-ն արդեն `dev`-ում է։ Seed-ը և մոդելի դաշտերը չփոխել։ Այս ալիքում `/textile` էջը հավաքում ես API-ից։

Թարմ `dev`-ը ձուլիր `feat/karen-textile`-ի մեջ։ Մեկ PR, base-ը `dev`։ `--force` չանել։ Postgres չբարձրացնել։ Ավարտել մինչև հունվարի վերջ։ Սպասիր Vach-ին (9)։ Հերթը՝ **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**։

**Քոնն է՝** `Textile.jsx`, `textile.css`, `textile.js` և նոր բանալիները երեք JSON-ում։

**Քոնը չէ՝** `seed_textile`-ը, `models.py`-ն, կատալոգի վью-ները, Baby էջը, զամբյուղը։

**Քայլեր**

1. Խնդրիր `GET /api/catalog/categories/?store=textile` և `GET /api/catalog/products/?store=textile`՝ `frontend/src/api/client.js`-ով։
2. Ցույց տուր կատեգորիաներ, հրապարակված ապրանքներ, անուն, AMD գին և `image`։ Երբ `image`-ը `null` է, թող դատարկ տեղ առանց կոտրված պատկերակի։
3. Լինեն բեռնման, դատարկ ցանկի և ցանցի սխալի վիճակներ։ Այդ տողերը գրիր երեք JSON-ում։
4. Սևագրերը էջ չեն հասնում, որովհետև API-ն արդեն զտում է։ Ուրիշ խանութի ապրանք մի նկարիր։

**Ավարտված է, երբ** `seed_textile`-ից հետո երևում է Textile ապրանքը և չի երևում Baby ապրանքը, դատարկն ու սխալը հաղորդագրություն ունեն, իսկ seed-ը և մոդելի դաշտերը չեն դիպչվել։

```bash
cd backend
python manage.py seed_textile
python manage.py runserver
```

Svet-ի ֆայլերը չփոխել։ Զամբյուղ չբացել։
