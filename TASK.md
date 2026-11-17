# Ventum — Wave 3

**Подробно:** [task-wave3.md](task-wave3.md)  
**Git:** [CONTRIBUTING.md](CONTRIBUTING.md)  
**Доска Lead:** [docs/zones/lead/README.md](docs/zones/lead/README.md)  
**Архив волны 2:** [task-wave2.md](task-wave2.md)  
**Архив волны 1:** [task-advanced.md](task-advanced.md)

Номер в таблице — номер ученика. Тот же номер стоит в заголовке его раздела в [task-wave3.md](task-wave3.md) и в файле, который он отдаёт агенту: `docs/agents/`.

Wave 1 и Wave 2 закрыты. Сейчас корзина, заказ, оплата Idram и письмо магазину. База — SQLite. **Срок: до конца января 2027.** Postgres не входит.

Оплата: [docs/idram.md](docs/idram.md). Письмо: [docs/order-email.md](docs/order-email.md).

| # | Имя | Ветка | Зона | Агент |
|---|-----|--------|------|--------|
| 1 | Lead | `feat/lead` | Доска merge волны 3. После Ashot: тесты, health, Swagger, `/`, `/textile`, `/baby`, `/cart`, `/account`, `/checkout/success` | [01-lead.md](docs/agents/01-lead.md) |
| 2 | Suro | `feat/suro-api` | Пустые приложения `cart` и `orders`, env Idram и `ORDER_NOTIFY_EMAIL` | [02-suro.md](docs/agents/02-suro.md) |
| 3 | Artush | `feat/artush-i18n` | `idram_language`: `am`/`en`/`ru` → `AM`/`EN`/`RU` | [03-artush.md](docs/agents/03-artush.md) |
| 4 | Hayk | `feat/hayk-gateway` | `POST /api/checkout/`, callback Idram, страница `/account` | [04-hayk.md](docs/agents/04-hayk.md) |
| 5 | Mariam | `feat/mariam-header` | Ссылки Account и Cart, страница `/cart` | [05-mariam.md](docs/agents/05-mariam.md) |
| 6 | Daniel | `feat/daniel-footer` | Модели заказа, `GET` заказа, `send_order_paid_email` | [06-daniel.md](docs/agents/06-daniel.md) |
| 7 | Karen | `feat/karen-textile` | Кнопка «в корзину» на `/textile` | [07-karen.md](docs/agents/07-karen.md) |
| 8 | Svet | `feat/svet-baby` | Кнопка «в корзину» на `/baby` | [08-svet.md](docs/agents/08-svet.md) |
| 9 | Vach | `feat/vach-catalog` | API корзины | [09-vach.md](docs/agents/09-vach.md) |
| 10 | Ashot | `feat/ashot-ui` | Страницы успеха и неуспеха, тесты оплаты | [10-ashot.md](docs/agents/10-ashot.md) |

Очередь merge: **Lead → Suro → Artush → Vach → Karen → Svet → Daniel → Hayk → Mariam → Ashot**.

Один PR = одна зона. В `main` не пушить. Каталог снаружи — `/api/catalog/`. Корзина — `/api/cart/`. Заказ — `/api/orders/<bill_no>/`. Оплата — `POST /api/checkout/` и `POST /api/payments/idram/result/`.

## English

**Detail:** [task-wave3.md](task-wave3.md). **Git:** [CONTRIBUTING.md](CONTRIBUTING.md). **Lead board:** [docs/zones/lead/README.md](docs/zones/lead/README.md). **Wave 2 archive:** [task-wave2.md](task-wave2.md). **Wave 1 archive:** [task-advanced.md](task-advanced.md).

The number in the table is the student number. The same number is the heading in [task-wave3.md](task-wave3.md) and the file in `docs/agents/`.

Wave 1 and Wave 2 are closed. This wave is the cart, the order, Idram, and the shop email, on SQLite. **Finish by the end of January 2027.** Postgres is out.

Payment: [docs/idram.md](docs/idram.md). Email: [docs/order-email.md](docs/order-email.md).

| # | Name | Branch | Zone | Agent |
|---|------|--------|------|--------|
| 1 | Lead | `feat/lead` | Wave 3 merge board. After Ashot: tests, health, Swagger, `/`, `/textile`, `/baby`, `/cart`, `/account`, `/checkout/success` | [01-lead.md](docs/agents/01-lead.md) |
| 2 | Suro | `feat/suro-api` | Empty `cart` and `orders` apps, Idram env and `ORDER_NOTIFY_EMAIL` | [02-suro.md](docs/agents/02-suro.md) |
| 3 | Artush | `feat/artush-i18n` | `idram_language`: `am`/`en`/`ru` → `AM`/`EN`/`RU` | [03-artush.md](docs/agents/03-artush.md) |
| 4 | Hayk | `feat/hayk-gateway` | `POST /api/checkout/`, Idram callback, `/account` | [04-hayk.md](docs/agents/04-hayk.md) |
| 5 | Mariam | `feat/mariam-header` | Account and Cart links, `/cart` | [05-mariam.md](docs/agents/05-mariam.md) |
| 6 | Daniel | `feat/daniel-footer` | Order models, order GET, `send_order_paid_email` | [06-daniel.md](docs/agents/06-daniel.md) |
| 7 | Karen | `feat/karen-textile` | Add to cart on `/textile` | [07-karen.md](docs/agents/07-karen.md) |
| 8 | Svet | `feat/svet-baby` | Add to cart on `/baby` | [08-svet.md](docs/agents/08-svet.md) |
| 9 | Vach | `feat/vach-catalog` | Cart API | [09-vach.md](docs/agents/09-vach.md) |
| 10 | Ashot | `feat/ashot-ui` | Success and fail pages, payment tests | [10-ashot.md](docs/agents/10-ashot.md) |

Merge queue: **Lead → Suro → Artush → Vach → Karen → Svet → Daniel → Hayk → Mariam → Ashot**.

One pull request is one zone. Do not push `main`. Catalog is `/api/catalog/`. Cart is `/api/cart/`. An order is `/api/orders/<bill_no>/`. Payment is `POST /api/checkout/` and `POST /api/payments/idram/result/`.

## Հայերեն

**Մանրամասն՝** [task-wave3.md](task-wave3.md)։ **Git՝** [CONTRIBUTING.md](CONTRIBUTING.md)։ **Lead-ի տախտակը՝** [docs/zones/lead/README.md](docs/zones/lead/README.md)։ **Wave 2-ի արխիվ՝** [task-wave2.md](task-wave2.md)։ **Wave 1-ի արխիվ՝** [task-advanced.md](task-advanced.md)։

Աղյուսակի համարը աշակերտի համարն է։ Նույն համարը [task-wave3.md](task-wave3.md)-ի վերնագիրն է և `docs/agents/` ֆայլը։

Wave 1-ը և Wave 2-ը փակ են։ Հիմա զամբյուղ, պատվեր, Idram և նամակ խանութին, SQLite։ **Ավարտել մինչև 2027-ի հունվարի վերջ։** Postgres-ը դուրս է։

Վճարում՝ [docs/idram.md](docs/idram.md)։ Նամակ՝ [docs/order-email.md](docs/order-email.md)։

| # | Անուն | Ճյուղ | Գոտի | Գործակալ |
|---|------|--------|------|-----------|
| 1 | Lead | `feat/lead` | Wave 3-ի merge-ի տախտակ։ Ashot-ից հետո՝ թեստեր, health, Swagger, `/`, `/textile`, `/baby`, `/cart`, `/account`, `/checkout/success` | [01-lead.md](docs/agents/01-lead.md) |
| 2 | Suro | `feat/suro-api` | Դատարկ `cart` և `orders`, Idram env և `ORDER_NOTIFY_EMAIL` | [02-suro.md](docs/agents/02-suro.md) |
| 3 | Artush | `feat/artush-i18n` | `idram_language`՝ `am`/`en`/`ru` → `AM`/`EN`/`RU` | [03-artush.md](docs/agents/03-artush.md) |
| 4 | Hayk | `feat/hayk-gateway` | `POST /api/checkout/`, Idram callback, `/account` | [04-hayk.md](docs/agents/04-hayk.md) |
| 5 | Mariam | `feat/mariam-header` | Account և Cart հղումներ, `/cart` | [05-mariam.md](docs/agents/05-mariam.md) |
| 6 | Daniel | `feat/daniel-footer` | Պատվերի մոդելներ, GET, `send_order_paid_email` | [06-daniel.md](docs/agents/06-daniel.md) |
| 7 | Karen | `feat/karen-textile` | «Զամբյուղ» կոճակ `/textile`-ում | [07-karen.md](docs/agents/07-karen.md) |
| 8 | Svet | `feat/svet-baby` | «Զամբյուղ» կոճակ `/baby`-ում | [08-svet.md](docs/agents/08-svet.md) |
| 9 | Vach | `feat/vach-catalog` | Զամբյուղի API | [09-vach.md](docs/agents/09-vach.md) |
| 10 | Ashot | `feat/ashot-ui` | Հաջողության և ձախողման էջեր, վճարման թեստեր | [10-ashot.md](docs/agents/10-ashot.md) |

Merge-ի հերթը՝ **Lead → Suro → Artush → Vach → Karen → Svet → Daniel → Hayk → Mariam → Ashot**։

Մեկ PR = մեկ գոտի։ `main` չենք push անում։ Կատալոգը՝ `/api/catalog/`։ Զամբյուղը՝ `/api/cart/`։ Պատվերը՝ `/api/orders/<bill_no>/`։ Վճարումը՝ `POST /api/checkout/` և `POST /api/payments/idram/result/`։

---

# Архив — Wave 2 (закрыта)

Не выполнять. Публичное API и витрина уже в этом дереве. Подробности: [task-wave2.md](task-wave2.md).

**Do not start this wave.** The public API and the storefront are already in this tree. Detail: [task-wave2.md](task-wave2.md).

**Այս ալիքը չսկսել։** Հրապարակային API-ն և խանութի էջերն արդեն այս ծառում են։ Մանրամասն՝ [task-wave2.md](task-wave2.md)։

Номера PR в эту таблицу не переносятся: в доске волны их не было, и выдумывать их нельзя. Статус — закрыта в этом дереве.

| # | Имя | Ветка | Зона | PR | Статус |
|---|-----|--------|------|----|--------|
| 1 | Lead | `feat/lead` | Доска merge волны 2 | — | закрыта в этом дереве |
| 2 | Suro | `feat/suro-api` | Аналитика, JWT, `PAGE_SIZE` 12 | — | закрыта в этом дереве |
| 3 | Artush | `feat/artush-i18n` | `parse_language`, `pick_translation`, словарь `ru` | — | закрыта в этом дереве |
| 4 | Hayk | `feat/hayk-gateway` | `GET /api/content/home-blocks/` и `/` | — | закрыта в этом дереве |
| 5 | Mariam | `feat/mariam-header` | Поиск в шапке и кнопка `ru` | — | закрыта в этом дереве |
| 6 | Daniel | `feat/daniel-footer` | POST подписки и опта, формы в Footer | — | закрыта в этом дереве |
| 7 | Karen | `feat/karen-textile` | Страница `/textile` | — | закрыта в этом дереве |
| 8 | Svet | `feat/svet-baby` | Страница `/baby` | — | закрыта в этом дереве |
| 9 | Vach | `feat/vach-catalog` | Читающее API каталога | — | закрыта в этом дереве |
| 10 | Ashot | `feat/ashot-ui` | Тесты API и страница 404 | — | закрыта в этом дереве |

Очередь той волны: **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**.

## English

Wave 2 is closed. Do not start it. PR numbers are not listed: the Wave 2 board never had them, and they are not invented here. Status: closed in this tree.

| # | Name | Branch | Zone | PR | Status |
|---|------|--------|------|----|--------|
| 1 | Lead | `feat/lead` | Wave 2 merge board | — | closed in this tree |
| 2 | Suro | `feat/suro-api` | Analytics, JWT, page size 12 | — | closed in this tree |
| 3 | Artush | `feat/artush-i18n` | `parse_language`, `pick_translation`, `ru` catalog | — | closed in this tree |
| 4 | Hayk | `feat/hayk-gateway` | Home blocks and `/` | — | closed in this tree |
| 5 | Mariam | `feat/mariam-header` | Header search and the `ru` button | — | closed in this tree |
| 6 | Daniel | `feat/daniel-footer` | Newsletter and wholesale POSTs, Footer forms | — | closed in this tree |
| 7 | Karen | `feat/karen-textile` | `/textile` | — | closed in this tree |
| 8 | Svet | `feat/svet-baby` | `/baby` | — | closed in this tree |
| 9 | Vach | `feat/vach-catalog` | Catalog read API | — | closed in this tree |
| 10 | Ashot | `feat/ashot-ui` | API tests and the 404 page | — | closed in this tree |

That queue was **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**.

## Հայերեն

Wave 2-ը փակ է։ Չսկսել։ PR-ի համարները չեն գրվում. Wave 2-ի տախտակին չկային, և այստեղ չեն հորինվում։ Կարգավիճակը՝ փակ է այս ծառում։

| # | Անուն | Ճյուղ | Գոտի | PR | Կարգավիճակ |
|---|------|--------|------|----|------------|
| 1 | Lead | `feat/lead` | Wave 2-ի merge-ի տախտակ | — | փակ է այս ծառում |
| 2 | Suro | `feat/suro-api` | Անալիտիկա, JWT, էջի չափ 12 | — | փակ է այս ծառում |
| 3 | Artush | `feat/artush-i18n` | `parse_language`, `pick_translation`, `ru` | — | փակ է այս ծառում |
| 4 | Hayk | `feat/hayk-gateway` | Home block-եր և `/` | — | փակ է այս ծառում |
| 5 | Mariam | `feat/mariam-header` | Որոնում և `ru` կոճակ | — | փակ է այս ծառում |
| 6 | Daniel | `feat/daniel-footer` | POST-եր և Footer-ի ձևեր | — | փակ է այս ծառում |
| 7 | Karen | `feat/karen-textile` | `/textile` | — | փակ է այս ծառում |
| 8 | Svet | `feat/svet-baby` | `/baby` | — | փակ է այս ծառում |
| 9 | Vach | `feat/vach-catalog` | Կատալոգի կարդացող API | — | փակ է այս ծառում |
| 10 | Ashot | `feat/ashot-ui` | API թեստեր և 404 | — | փակ է այս ծառում |

Այդ հերթը՝ **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**։

---

# Архив — Wave 1 (закрыта)

Не выполнять. Модели и админка уже в `dev`. Подробности: [task-advanced.md](task-advanced.md).

**Do not start this wave.** Models and admin are already in `dev`. Detail: [task-advanced.md](task-advanced.md).

**Այս ալիքը չսկսել։** Մոդելներն ու ադմինն արդեն `dev`-ում են։ Մանրամասն՝ [task-advanced.md](task-advanced.md)։

**Подробно:** [task-advanced.md](task-advanced.md)  
**Git:** [CONTRIBUTING.md](CONTRIBUTING.md)  
**Доска Lead:** [docs/zones/lead/README.md](docs/zones/lead/README.md)

Таблица ниже — история волны 1. Агенту её не отдавать: файлы в `docs/agents/` теперь описывают волну 3. Текст волны 2 лежит в [task-wave2.md](task-wave2.md).

Макеты, на которые опиралась волна 1:

- [Ventum — кадр магазина](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12495)
- [Ventum — второй файл макета](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=0-1)

Тогдашняя работа — модели и админка на SQLite. Срок той волны был до конца декабря. Очередь ниже — история merge. Все строки уже в `dev`.

| # | Имя | Ветка | Зона | Агент |
|---|-----|--------|------|--------|
| 1 | Lead | `feat/lead` | Доска merge. После PR Ashot: пустой sqlite, `migrate`, `/api/health/`, `/api/admin/` | [01-lead.md](docs/agents/01-lead.md) |
| 2 | Suro | `feat/suro-api` | Приложения и пользователь с логином-email | [02-suro.md](docs/agents/02-suro.md) |
| 3 | Artush | `feat/artush-i18n` | Коды `am`, `en`, `ru` и базовый класс перевода | [03-artush.md](docs/agents/03-artush.md) |
| 4 | Hayk | `feat/hayk-gateway` | `HomeBlock` и переводы title/text на трёх языках | [04-hayk.md](docs/agents/04-hayk.md) |
| 5 | Mariam | `feat/mariam-header` | `search.py`: поиск по имени и sku, без URL | [05-mariam.md](docs/agents/05-mariam.md) |
| 6 | Daniel | `feat/daniel-footer` | `NewsletterSubscriber` и `WholesaleInquiry` | [06-daniel.md](docs/agents/06-daniel.md) |
| 7 | Karen | `feat/karen-textile` | Команда или фикстура `seed_textile` | [07-karen.md](docs/agents/07-karen.md) |
| 8 | Svet | `feat/svet-baby` | Команда или фикстура `seed_baby` | [08-svet.md](docs/agents/08-svet.md) |
| 9 | Vach | `feat/vach-catalog` | Category, Product, картинки, цена AMD, переводы am/en/ru, админка | [09-vach.md](docs/agents/09-vach.md) |
| 10 | Ashot | `feat/ashot-ui` | Тесты моделей на SQLite | [10-ashot.md](docs/agents/10-ashot.md) |

Очередь merge — это не второй номер. Имена идут так: **Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**.

Один PR = одна зона. В `main` не пушить. Postgres не поднимать. Админка: `http://127.0.0.1:8000/api/admin/`. Health: `http://127.0.0.1:8000/api/health/`.

## English

**Detail:** [task-advanced.md](task-advanced.md). **Git:** [CONTRIBUTING.md](CONTRIBUTING.md). **Lead board:** [docs/zones/lead/README.md](docs/zones/lead/README.md).

The table below is Wave 1 history. Do not hand it to an agent. The files in `docs/agents/` now describe Wave 3. The Wave 2 text lives in [task-wave2.md](task-wave2.md).

Designs that wave used:

- [Ventum shop frame](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12495)
- [Second Ventum design file](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=0-1)

Historical scope: models and admin on SQLite. That deadline was the end of December. The queue below is the merge history. Every row is already in `dev`.

| # | Name | Branch | Zone | Agent |
|---|------|--------|------|--------|
| 1 | Lead | `feat/lead` | Merge board. After Ashot’s PR: empty sqlite, `migrate`, `/api/health/`, `/api/admin/` | [01-lead.md](docs/agents/01-lead.md) |
| 2 | Suro | `feat/suro-api` | Apps and a user who logs in with email | [02-suro.md](docs/agents/02-suro.md) |
| 3 | Artush | `feat/artush-i18n` | Codes `am`, `en`, `ru` and the shared translation base | [03-artush.md](docs/agents/03-artush.md) |
| 4 | Hayk | `feat/hayk-gateway` | `HomeBlock` with title/text in three languages | [04-hayk.md](docs/agents/04-hayk.md) |
| 5 | Mariam | `feat/mariam-header` | `search.py`: name and sku, no URL yet | [05-mariam.md](docs/agents/05-mariam.md) |
| 6 | Daniel | `feat/daniel-footer` | `NewsletterSubscriber` and `WholesaleInquiry` | [06-daniel.md](docs/agents/06-daniel.md) |
| 7 | Karen | `feat/karen-textile` | `seed_textile` command or fixture | [07-karen.md](docs/agents/07-karen.md) |
| 8 | Svet | `feat/svet-baby` | `seed_baby` command or fixture | [08-svet.md](docs/agents/08-svet.md) |
| 9 | Vach | `feat/vach-catalog` | Category, Product, images, AMD price, am/en/ru translations, admin | [09-vach.md](docs/agents/09-vach.md) |
| 10 | Ashot | `feat/ashot-ui` | Model tests on SQLite | [10-ashot.md](docs/agents/10-ashot.md) |

Merge queue, not a second student number: **Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**.

One pull request is one zone. Do not push `main`. Do not start Postgres. Admin is `/api/admin/`. Health is `/api/health/`.

## Հայերեն

**Մանրամասն՝** [task-advanced.md](task-advanced.md)։ **Git՝** [CONTRIBUTING.md](CONTRIBUTING.md)։ **Lead-ի տախտակը՝** [docs/zones/lead/README.md](docs/zones/lead/README.md)։

Ներքևի աղյուսակը Wave 1-ի պատմությունն է։ Գործակալին այն չտալ. `docs/agents/` ֆայլերն արդեն նկարագրում են Wave 3-ը։ Wave 2-ի տեքստը՝ [task-wave2.md](task-wave2.md)։

Այն մակետները, որոնց վրա հենվում էր ալիքը.

- [Ventum խանութ](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12495)
- [Ventum երկրորդ ֆայլ](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=0-1)

Այն ժամանակվա աշխատանքը մոդելներ և ադմին էր, SQLite։ Այդ ալիքի ժամկետը դեկտեմբերի վերջն էր։ Ներքևի հերթը merge-ի պատմությունն է։ Բոլոր տողերն արդեն `dev`-ում են։

| # | Անուն | Ճյուղ | Գոտի | Գործակալ |
|---|------|--------|------|-----------|
| 1 | Lead | `feat/lead` | Merge-ի տախտակ։ Ashot-ի PR-ից հետո՝ դատարկ sqlite, `migrate`, `/api/health/`, `/api/admin/` | [01-lead.md](docs/agents/01-lead.md) |
| 2 | Suro | `feat/suro-api` | Հավելվածներ և մուտք email-ով | [02-suro.md](docs/agents/02-suro.md) |
| 3 | Artush | `feat/artush-i18n` | `am`, `en`, `ru` կոդերը և թարգմանության ընդհանուր դասը | [03-artush.md](docs/agents/03-artush.md) |
| 4 | Hayk | `feat/hayk-gateway` | `HomeBlock` և title/text երեք լեզվով | [04-hayk.md](docs/agents/04-hayk.md) |
| 5 | Mariam | `feat/mariam-header` | `search.py`՝ անուն և sku, դեռ առանց URL | [05-mariam.md](docs/agents/05-mariam.md) |
| 6 | Daniel | `feat/daniel-footer` | `NewsletterSubscriber` և `WholesaleInquiry` | [06-daniel.md](docs/agents/06-daniel.md) |
| 7 | Karen | `feat/karen-textile` | `seed_textile` հրաման կամ ֆիքստուրա | [07-karen.md](docs/agents/07-karen.md) |
| 8 | Svet | `feat/svet-baby` | `seed_baby` հրաման կամ ֆիքստուրա | [08-svet.md](docs/agents/08-svet.md) |
| 9 | Vach | `feat/vach-catalog` | Category, Product, նկարներ, AMD գին, am/en/ru, ադմին | [09-vach.md](docs/agents/09-vach.md) |
| 10 | Ashot | `feat/ashot-ui` | Մոդելների թեստեր SQLite-ով | [10-ashot.md](docs/agents/10-ashot.md) |

Merge-ի հերթը երկրորդ համար չէ։ Անուններով՝ **Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**։

Մեկ PR = մեկ գոտի։ `main` չենք push անում։ Postgres չենք բարձրացնում։ Ադմինը՝ `/api/admin/`։ Health-ը՝ `/api/health/`։
