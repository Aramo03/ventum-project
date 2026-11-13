# 7 — Karen · textile — ошибки и разбор

> Журнал Wave 1. В Wave 2 этот разбор не переписывать. Текущее задание — [task-wave2.md](../../../task-wave2.md).
> Wave 1 journal. Do not rewrite it for Wave 2.
> Wave 1-ի մատյան։ Wave 2-ի համար չվերաշարադրել։

**Ветка:** `feat/karen-textile`  
**Агент:** [docs/agents/07-karen.md](../../agents/07-karen.md)

Журнал того, что было в коммите `6c5f79a`, и что из этого лишний код. Модели и админку Vach этот коммит не менял. `frontend/src/pages/Textile/` в diff нет.

---

## Русский

### Ошибка 1: нет проверки store до `update_or_create`

**Симптом:** если slug или sku уже занят Baby, строка молча становится `store=textile`. `CommandError` нет.

**Причина:** `defaults={"store": "textile"}` и `defaults={"category": ...}` пишутся сразу. Проверки магазина до записи не было.

**Исправление:** сначала `filter` по slug и sku. Если магазин не `textile` — `CommandError` и выход без `update`.

### Ошибка 2: картинка пишется на каждый запуск

**Симптом:** в БД одна `ProductImage`, в media появляются `textile-product.jpg`, затем `textile-product_xxxx.jpg`.

**Причина:** `image.image.save(...)` вызывался всегда. Storage не затирает занятое имя.

**Исправление:** сохранять файл только если `ProductImage.image` ещё пустое.

### Лишний код (убран)

| Код | Почему лишний |
|-----|----------------|
| `_published_defaults()` | Угадывал `is_published`, `published` или пустой dict. У Vach поле одно: `Product.is_published`. Пустой dict оставил бы товар неопубликованным. |
| `_require_catalog_models()` | Ловил `ImportError`, потому что ветка отведена до моделей Vach. На `dev` модели есть — прямой импорт. |

### Что не «лишний код»

| Элемент | Зачем |
|---------|--------|
| `update_or_create` по slug, sku, языку, `order=0` | второй запуск не плодит slug и не падает |
| `LANGUAGE_CODES` из `apps.core.languages` | `am`, `en`, `ru` без своего списка |
| `description` в переводе товара | у `ProductTranslation.description` нет default |
| `Decimal("24900.00")` и `is_published=True` | цена AMD и опубликованный товар |
| slug `textile-fabrics`, `textile-home` | не пересекаются с `baby-*` Svet |
| `seed_assets/textile-product.jpg` | картинка из репозитория, не URL |
| пустые `management/__init__.py` | пакет команды Django |
| `transaction.atomic` | сбой не оставляет половину сида |

### Чего не делали

- поля `Category` / `Product` и `admin.py` (зона Vach)
- `frontend/src/pages/Textile/`
- удаление или перезапись строк Baby
- копия `seed_baby` в эту ветку

### Чеклист

Прогон на чистой SQLite поверх `origin/dev` (модели Vach). Baby-строки создаёт уже лежащий в `dev` `seed_baby`, в коммит Karen он не входит:

- [x] `migrate`
- [x] `seed_baby` → `seed_textile` → `seed_textile`: категории textile = 2, товар textile = 1, slug не двоятся
- [x] строки Baby те же после обоих запусков `seed_textile`
- [x] второй запуск не создаёт второй файл картинки
- [x] slug со `store=baby` команда не переписывает
- [x] `frontend/src/pages/Textile/` не в diff

---

## English

### Mistakes in `6c5f79a`

There was no store check before `update_or_create`, so a Baby slug or sku would be rewritten to Textile. `image.save` ran on every seed and created extra media files.

### Extra code removed

`_published_defaults()` guessed `is_published` / `published`. `_require_catalog_models()` only existed because this branch started before Vach. Import the catalog models directly and set `is_published=True`.

### Keep

Idempotent `update_or_create`, `LANGUAGE_CODES`, product descriptions, `Decimal` AMD price, `textile-*` slugs, repo image, `transaction.atomic`.

### Out of scope

Model fields, catalog admin, the Textile page, Svet’s Baby rows, copying `seed_baby` into this branch.

### Checklist

- [x] `migrate` on a clean SQLite file from `dev`
- [x] `seed_baby`, then `seed_textile` twice: 2 textile categories, 1 textile product, no new slugs
- [x] Baby rows unchanged
- [x] second run does not add another image file
- [x] a slug with `store=baby` is not rewritten
- [x] no diff under `frontend/src/pages/Textile/`

---

## Հայերեն

### Սխալներ `6c5f79a`-ում

Store-ի ստուգում `update_or_create`-ից առաջ չկար. Baby-ի slug-ը կամ sku-ն լուռ կդառնար Textile. `image.save`-ը ամեն անգամ նոր ֆայլ էր թողնում media-ում։

### Հանած ավելորդ կոդ

`_published_defaults()`-ը գուշակում էր `is_published` / `published`. `_require_catalog_models()`-ը պետք էր, որովհետև ճյուղը Vach-ից առաջ էր։ Մոդելները ուղիղ import, `is_published=True`։

### Պահել

`update_or_create`, `LANGUAGE_CODES`, ապրանքի description, AMD `Decimal`, `textile-*` slug, նկարը repo-ից, `transaction.atomic`։

### Չփոխել

Մոդելների դաշտերը, ադմինը, Textile էջը, Svet-ի Baby տողերը։ `seed_baby`-ն այս ճյուղ չպատճենել։

### Ստուգացանկ

- [x] մաքուր SQLite, `migrate` `dev`-ից
- [x] `seed_baby`, հետո `seed_textile` երկու անգամ. 2 կատեգորիա, 1 ապրանք, նոր slug չկա
- [x] Baby-ի տողերը նույնն են
- [x] երկրորդ անգամը նոր նկարի ֆայլ չի ստեղծում
- [x] `store=baby` slug-ը չի վերագրվում
- [x] `frontend/src/pages/Textile/` diff-ում չկա

# Wave 2

Журнал выше — волна 1. Ниже ошибки merge [#29](https://github.com/Aramo03/ventum-project/pull/29) `feat/karen-textile` в `dev` (`b5fe41a`). Текст волны 1 не менялся.

## Русский

### Ошибка 1: `am.json` не парсится

**Симптом:** `npm run build` останавливается на [frontend/src/i18n/am.json](../../../frontend/src/i18n/am.json), строка 54. Vite: invalid JSON at position 1423.

**Причина:** после объекта `textile` осталась строка `"loading"` без запятой. Объект `baby` из-за этого выпал из корня.

**Сделано:** строка `"loading"` удалена, после `textile` стоит запятая, `baby` снова сосед `textile`. Тексты блока `textile` те же.

### Ошибка 2: `en.json` не парсится, `textile` вложен в `common`

**Симптом:** [frontend/src/i18n/en.json](../../../frontend/src/i18n/en.json) ломается на той же строке 54.

**Причина:** объект `textile` оказался внутри `common`, а следом та же строка `"loading"` без запятой. Страница читает `textile.title`, а не `common.textile.title`.

**Сделано:** `common` снова только `loading`. `textile` поднят на верхний уровень с теми же строками: title, allCategories, loading, empty, error, currency. Перед `baby` стоит запятая.

### Ошибка 3: в `ru.json` нет ключей `textile`

**Симптом:** [frontend/src/i18n/ru.json](../../../frontend/src/i18n/ru.json) парсится, блока `textile` нет. На русском витрина показывает английский запасной текст из `t()`.

**Причина:** бриф просит новые строки в трёх JSON. В diff #29 есть только `am.json` и `en.json`.

**Сделано:** добавлен соседний блок `textile`: «Все», «Загрузка...», «Товары не найдены», «Ошибка сети. Не удалось загрузить данные.», валюта `AMD`.

### Ошибка 4: в `Textile.jsx` два компонента

**Симптом:** после починки JSON сборка всё равно падает: в одном модуле два `export default`.

**Причина:** стаб волны 1 (`stores.textile`, `pages.textileLead`) оставлен над новым компонентом, который зовёт `fetchTextileCatalog`.

**Сделано:** стаб удалён. Остался один компонент с ключами `textile.*`. [textile.js](../../../frontend/src/pages/Textile/textile.js) и стили не менялись.

### Ошибка 5: второй сид в папке с опечаткой

**Симптом:** в diff #29 есть [backend/apps/catalog/managment/commands/seed_textile.py](../../../backend/apps/catalog/managment/commands/seed_textile.py). Django команду оттуда не видит: пакет называется `management`.

**Причина:** бриф запрещает менять `seed_textile`. Файл лежит рядом с настоящим [management/commands/seed_textile.py](../../../backend/apps/catalog/management/commands/seed_textile.py) и задаёт другие slug.

**Сделано:** файл из `managment` удалён. Настоящая команда `seed_textile` не менялась.

### Ошибка 6: `textile.js` импортирует несуществующий default

**Симптом:** после правок JSON и `Textile.jsx` `npm run build` падает на [textile.js](../../../frontend/src/pages/Textile/textile.js): `"default" is not exported by "src/api/client.js"`.

**Причина:** строка `import api from '../../api/client'`. В [client.js](../../../frontend/src/api/client.js) клиент экспортируется как `export const api`. Так его берут Header, Gateway и Baby.

**Сделано:** импорт заменён на `import { api } from '../../api/client'`. Остальной файл не менялся.

## English

### Mistake 1: `am.json` does not parse

`npm run build` stops on [am.json](../../../frontend/src/i18n/am.json) line 54: invalid JSON at position 1423. After the `textile` object a `"loading"` line had no comma, so `baby` fell out of the root. That line is gone, the comma is back, and `baby` sits next to `textile`. The `textile` strings are unchanged.

### Mistake 2: `en.json` does not parse, and `textile` sat inside `common`

[en.json](../../../frontend/src/i18n/en.json) breaks at the same line 54. `textile` was nested in `common`, then the same bare `"loading"` line. The page reads `textile.title`, not `common.textile.title`. `common` is only `loading` again. `textile` is a top-level object with the same title, allCategories, loading, empty, error, and currency strings. A comma sits before `baby`.

### Mistake 3: `ru.json` has no `textile` keys

[ru.json](../../../frontend/src/i18n/ru.json) parses, but it has no `textile` block, so Russian falls back to the English string inside `t()`. The brief asks for the new strings in all three JSON files. PR #29 touched only `am.json` and `en.json`. A sibling `textile` block is now there: «Все», «Загрузка...», «Товары не найдены», «Ошибка сети. Не удалось загрузить данные.», currency `AMD`.

### Mistake 4: `Textile.jsx` contains two components

After the JSON parses, the build still fails: one module has two `export default` declarations. The Wave 1 stub (`stores.textile`, `pages.textileLead`) was left above the component that calls `fetchTextileCatalog`. The stub is removed. One component remains, using `textile.*`. [textile.js](../../../frontend/src/pages/Textile/textile.js) and the styles are unchanged.

### Mistake 5: a second seed in a misspelled folder

PR #29 added [managment/commands/seed_textile.py](../../../backend/apps/catalog/managment/commands/seed_textile.py). Django never loads it: the real package is `management`. The brief forbids a second seed. The file used different slugs from [management/commands/seed_textile.py](../../../backend/apps/catalog/management/commands/seed_textile.py). The stray file is deleted. The real `seed_textile` command is unchanged.

### Mistake 6: `textile.js` imports a default that does not exist

After the JSON and `Textile.jsx` fixes, `npm run build` fails on [textile.js](../../../frontend/src/pages/Textile/textile.js): `"default" is not exported by "src/api/client.js"`. The file used `import api from '../../api/client'`. [client.js](../../../frontend/src/api/client.js) exports `export const api`. Header, Gateway, and Baby import that named binding. The import is now `import { api } from '../../api/client'`. The rest of the file is unchanged.

## Հայերեն

### Սխալ 1. `am.json`-ը չի վերլուծվում

`npm run build`-ը կանգնում է [am.json](../../../frontend/src/i18n/am.json)-ի 54-րդ տողում. անվավեր JSON, դիրք 1423։ `textile` օբյեկտից հետո `"loading"` տողը ստորակետ չուներ, և `baby`-ն դուրս էր ընկել արմատից։ Այդ տողը հանված է, ստորակետը վերադարձված է, `baby`-ն նորից `textile`-ի կողքին է։ `textile` բլոկի տեքստերը նույնն են։

### Սխալ 2. `en.json`-ը չի վերլուծվում, `textile`-ը `common`-ի մեջ էր

[en.json](../../../frontend/src/i18n/en.json)-ը կոտրվում է նույն 54-րդ տողում։ `textile`-ը հայտնվել էր `common`-ի ներսում, հետո նույն `"loading"` տողն առանց ստորակետի։ Էջը կարդում է `textile.title`, ոչ թե `common.textile.title`։ `common`-ը նորից միայն `loading` է։ `textile`-ը վերին մակարդակում է՝ նույն title, allCategories, loading, empty, error, currency տողերով։ `baby`-ից առաջ ստորակետ կա։

### Սխալ 3. `ru.json`-ում `textile` բանալիներ չկան

[ru.json](../../../frontend/src/i18n/ru.json)-ը վերլուծվում է, բայց `textile` բլոկ չունի։ Ռուսերենում ցուցադրվում է `t()`-ի անգլերեն պահուստային տեքստը։ Բրիֆը նոր տողեր է ուզում երեք JSON-ում։ #29-ի diff-ում միայն `am.json` և `en.json` կան։ Ավելացված է հարևան `textile` բլոկ՝ «Все», «Загрузка...», «Товары не найдены», «Ошибка сети. Не удалось загрузить данные.», արժույթ `AMD`։

### Սխալ 4. `Textile.jsx`-ում երկու բաղադրիչ կա

JSON-ը ուղղելուց հետո հավաքումը դարձյալ ընկնում է. մեկ մոդուլում երկու `export default` կա։ Wave 1-ի նախապատրաստվածքը (`stores.textile`, `pages.textileLead`) մնացել էր `fetchTextileCatalog` կանչող բաղադրիչի վրա։ Նախապատրաստվածքը հանված է։ Մնացել է մեկ բաղադրիչ `textile.*` բանալիներով։ [textile.js](../../../frontend/src/pages/Textile/textile.js)-ը և ոճերը չեն փոխվել։

### Սխալ 5. երկրորդ սիդ՝ սխալ գրված պանակում

#29-ի diff-ում կա [managment/commands/seed_textile.py](../../../backend/apps/catalog/managment/commands/seed_textile.py)։ Django-ն այն չի տեսնում. փաթեթը `management` է։ Բրիֆն արգելում է երկրորդ սիդը։ Ֆայլի slug-երը տարբեր են [management/commands/seed_textile.py](../../../backend/apps/catalog/management/commands/seed_textile.py)-ից։ Ավելորդ ֆայլը ջնջված է։ Իսկական `seed_textile` հրամանը չի փոխվել։

### Սխալ 6. `textile.js`-ը ներմուծում է գոյություն չունեցող default

JSON-ը և `Textile.jsx`-ը ուղղելուց հետո `npm run build`-ը ընկնում է [textile.js](../../../frontend/src/pages/Textile/textile.js)-ի վրա. `"default" is not exported by "src/api/client.js"`։ Ֆայլում էր `import api from '../../api/client'`։ [client.js](../../../frontend/src/api/client.js)-ը արտահանում է `export const api`։ Header-ը, Gateway-ը և Baby-ն վերցնում են հենց այդ անունով կապը։ Իմպորտը դարձել է `import { api } from '../../api/client'`։ Ֆայլի մնացած մասը չի փոխվել։
