# Agent brief — Wave 2 — #8 Svet

Отдай этот файл агенту целиком. Номер ученика — **8**. Он совпадает с [TASK.md](../../TASK.md) и с заголовком «8 — Svet · baby» в [task-wave2.md](../../task-wave2.md).

Wave 1 закрыта: команда `seed_baby` уже кладёт категории и товар `store=baby` и не стирает Textile. Сид и поля моделей не менять. Страницу `/baby` собираешь сейчас, тем же способом, что Karen собирает `/textile`.

## Русский

### Кто ты

Ты делаешь зону ученика 8, Svet, ветка `feat/svet-baby`, зона `baby`. README не удалять: [frontend/src/pages/Baby/README.md](../../frontend/src/pages/Baby/README.md).

Старт: `git checkout dev && git pull`, затем `feat/svet-baby` со свежим `dev`. Один PR, base = `dev`. В `main` не пушить. `--force` не делать. Postgres не поднимать. Срок — конец января.

Ждать Vach (9) и в очереди встать после Karen: **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**. Файлы Textile не править, даже если хочется вынести общую карточку. Общий компонент в этой волне не заводить: у каждого магазина своя папка.

### Карта репозитория

- Страница — [frontend/src/pages/Baby/](../../frontend/src/pages/Baby/): `Baby.jsx`, `baby.css`, `baby.js`.
- HTTP — [frontend/src/api/client.js](../../frontend/src/api/client.js). Он сам добавляет `language`.
- Контракт элемента тот же, что у Textile: `sku`, `store`, `price`, `name`, `category`, `image`.
- Макет: [второй файл](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=0-1) и [кадр магазина](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12495).

### Зона ответственности

Можно: три файла страницы Baby и новые ключи в трёх JSON.

Нельзя: `seed_baby`, модели, API каталога, `frontend/src/pages/Textile/`, корзина.

### Шаги

1. `GET /api/catalog/categories/?store=baby` и `GET /api/catalog/products/?store=baby`.
2. Категории, опубликованные товары, имя, цена AMD, картинка. `image: null` — пустое место без битой иконки.
3. Загрузка, пустой список, ошибка сети. Строки — в `am.json`, `en.json` и `ru.json`.
4. Не копировать страницу Karen в свою папку чужим импортом из `pages/Textile`.

### Definition of Done

Lead не мержит, пока: после `seed_baby` на `/baby` виден товар Baby и не виден товар Textile; страница `/textile` в diff не изменена; сид не переписан; пустая выдача и ошибка сети показывают сообщение.

### Проверка

```bash
cd backend
python manage.py seed_baby
python manage.py runserver
```

Открыть `/baby` и убедиться, что `/textile` выглядит как до твоего PR.

### Нельзя

Не удалять данные Karen. Не менять `store` у её товаров. Не собирать корзину.

## English

You are student **8**, Svet, branch `feat/svet-baby`, zone `baby`. Do not delete the Baby README.

Wave 1 `seed_baby` is in `dev` and does not delete Textile. Do not change the seed or the model fields. Build `/baby` the same way Karen builds `/textile`, in your own folder.

Pull `dev` into `feat/svet-baby`. One PR, base `dev`. No force-push. No Postgres. Finish by the end of January. You follow Karen: **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**. Do not extract a shared card component in this wave.

**Own:** `Baby.jsx`, `baby.css`, `baby.js`, and new keys in all three JSON files.

**Do not own:** `seed_baby`, models, the catalog API, `frontend/src/pages/Textile/`, cart.

**Steps**

1. `GET /api/catalog/categories/?store=baby` and `GET /api/catalog/products/?store=baby` through `frontend/src/api/client.js`.
2. Categories, published products, name, AMD price, image. `image: null` is an empty place, not a broken icon.
3. Loading, empty, and network-error states, with strings in all three JSON files.
4. Do not import Karen’s page into yours.

**Done when** after `seed_baby` the Baby product is on `/baby`, the Textile product is not, `/textile` is unchanged in the diff, the seed is untouched, and empty and error states show a message.

```bash
cd backend
python manage.py seed_baby
python manage.py runserver
```

Do not delete Karen’s data. Do not build a cart.

## Հայերեն

Դու աշակերտ **8**-ն ես, Svet, ճյուղը՝ `feat/svet-baby`, գոտին՝ `baby`։ Baby-ի README-ն չջնջել։

Wave 1-ի `seed_baby`-ն արդեն `dev`-ում է և Textile-ը չի ջնջում։ Seed-ը և մոդելի դաշտերը չփոխել։ `/baby` էջը հավաքիր այնպես, ինչպես Karen-ը հավաքում է `/textile`-ը, բայց քո պանակում։

Թարմ `dev`-ը ձուլիր `feat/svet-baby`-ի մեջ։ Մեկ PR, base-ը `dev`։ `--force` չանել։ Postgres չբարձրացնել։ Ավարտել մինչև հունվարի վերջ։ Դու Karen-ից հետո ես. **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**։ Այս ալիքում ընդհանուր քարտի կոմպոնենտ մի հանիր։

**Քոնն է՝** `Baby.jsx`, `baby.css`, `baby.js` և նոր բանալիները երեք JSON-ում։

**Քոնը չէ՝** `seed_baby`-ն, մոդելները, կատալոգի API-ն, `frontend/src/pages/Textile/`-ը, զամբյուղը։

**Քայլեր**

1. `GET /api/catalog/categories/?store=baby` և `GET /api/catalog/products/?store=baby`՝ `frontend/src/api/client.js`-ով։
2. Կատեգորիաներ, հրապարակված ապրանքներ, անուն, AMD գին, նկար։ `image: null`-ը դատարկ տեղ է, ոչ թե կոտրված պատկերակ։
3. Բեռնում, դատարկ ցանկ, ցանցի սխալ՝ տողերով երեք JSON-ում։
4. Karen-ի էջը քո էջի մեջ մի ներմուծիր։

**Ավարտված է, երբ** `seed_baby`-ից հետո Baby ապրանքը `/baby`-ում է, Textile ապրանքը այնտեղ չէ, `/textile`-ը diff-ում չի փոխվել, seed-ը չի դիպչվել, իսկ դատարկն ու սխալը հաղորդագրություն ունեն։

```bash
cd backend
python manage.py seed_baby
python manage.py runserver
```

Karen-ի տվյալները չջնջել։ Զամբյուղ չհավաքել։
