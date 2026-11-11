# Ventum — Wave 2

**Подробно:** [task-wave2.md](task-wave2.md)  
**Git:** [CONTRIBUTING.md](CONTRIBUTING.md)  
**Доска Lead:** [docs/zones/lead/README.md](docs/zones/lead/README.md)  
**Архив волны 1:** [task-advanced.md](task-advanced.md)

Номер в таблице — номер ученика. Тот же номер стоит в заголовке его раздела в [task-wave2.md](task-wave2.md) и в файле, который он отдаёт агенту: `docs/agents/`.

Wave 1 закрыта и лежит в `dev`. Сейчас публичное API и витрина на SQLite. **Срок: до конца января.** Postgres, корзина, заказы, Idram и письмо об оплате не входят.

Макеты:

- [Ventum — кадр магазина](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12495)
- [Ventum — второй файл макета](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=0-1)

| # | Имя | Ветка | Зона | Агент |
|---|-----|--------|------|--------|
| 1 | Lead | `feat/lead` | Доска merge волны 2. После Ashot: тесты, health, Swagger, аналитика staff, `/`, `/textile`, `/baby` | [01-lead.md](docs/agents/01-lead.md) |
| 2 | Suro | `feat/suro-api` | Аналитика `/api/admin/analytics/`, JWT, `PAGE_SIZE` 12 | [02-suro.md](docs/agents/02-suro.md) |
| 3 | Artush | `feat/artush-i18n` | `parse_language`, `pick_translation`, словарь `ru` | [03-artush.md](docs/agents/03-artush.md) |
| 4 | Hayk | `feat/hayk-gateway` | `GET /api/content/home-blocks/` и страница `/` | [04-hayk.md](docs/agents/04-hayk.md) |
| 5 | Mariam | `feat/mariam-header` | Поиск в шапке и кнопка `ru` | [05-mariam.md](docs/agents/05-mariam.md) |
| 6 | Daniel | `feat/daniel-footer` | POST подписки и опта, формы в Footer | [06-daniel.md](docs/agents/06-daniel.md) |
| 7 | Karen | `feat/karen-textile` | Страница `/textile` из API | [07-karen.md](docs/agents/07-karen.md) |
| 8 | Svet | `feat/svet-baby` | Страница `/baby` из API | [08-svet.md](docs/agents/08-svet.md) |
| 9 | Vach | `feat/vach-catalog` | Читающее API категорий и товаров | [09-vach.md](docs/agents/09-vach.md) |
| 10 | Ashot | `feat/ashot-ui` | Тесты API и страница 404 | [10-ashot.md](docs/agents/10-ashot.md) |

Очередь merge: **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**.

Один PR = одна зона. В `main` не пушить. Каталог снаружи — `/api/catalog/`, не `/api/products/`. Админка: `http://127.0.0.1:8000/api/admin/`. Аналитика: `http://127.0.0.1:8000/api/admin/analytics/`. Health: `http://127.0.0.1:8000/api/health/`.

## English

**Detail:** [task-wave2.md](task-wave2.md). **Git:** [CONTRIBUTING.md](CONTRIBUTING.md). **Lead board:** [docs/zones/lead/README.md](docs/zones/lead/README.md). **Wave 1 archive:** [task-advanced.md](task-advanced.md).

The number in the table is the student number. The same number is the heading in [task-wave2.md](task-wave2.md) and the file in `docs/agents/`.

Wave 1 is closed and already in `dev`. This wave is the public API and the storefront on SQLite. **Finish by the end of January.** Postgres, cart, orders, Idram, and the payment email are out.

| # | Name | Branch | Zone | Agent |
|---|------|--------|------|--------|
| 1 | Lead | `feat/lead` | Wave 2 merge board. After Ashot: tests, health, Swagger, staff analytics, `/`, `/textile`, `/baby` | [01-lead.md](docs/agents/01-lead.md) |
| 2 | Suro | `feat/suro-api` | `/api/admin/analytics/`, JWT, page size 12 | [02-suro.md](docs/agents/02-suro.md) |
| 3 | Artush | `feat/artush-i18n` | `parse_language`, `pick_translation`, `ru` catalog | [03-artush.md](docs/agents/03-artush.md) |
| 4 | Hayk | `feat/hayk-gateway` | `GET /api/content/home-blocks/` and `/` | [04-hayk.md](docs/agents/04-hayk.md) |
| 5 | Mariam | `feat/mariam-header` | Header search and the `ru` button | [05-mariam.md](docs/agents/05-mariam.md) |
| 6 | Daniel | `feat/daniel-footer` | Newsletter and wholesale POSTs, Footer forms | [06-daniel.md](docs/agents/06-daniel.md) |
| 7 | Karen | `feat/karen-textile` | `/textile` from the API | [07-karen.md](docs/agents/07-karen.md) |
| 8 | Svet | `feat/svet-baby` | `/baby` from the API | [08-svet.md](docs/agents/08-svet.md) |
| 9 | Vach | `feat/vach-catalog` | Read API for categories and products | [09-vach.md](docs/agents/09-vach.md) |
| 10 | Ashot | `feat/ashot-ui` | API tests and the 404 page | [10-ashot.md](docs/agents/10-ashot.md) |

Merge queue: **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**.

One pull request is one zone. Do not push `main`. The public catalog prefix is `/api/catalog/`. Admin is `/api/admin/`. Analytics is `/api/admin/analytics/`. Health is `/api/health/`.

## Հայերեն

**Մանրամասն՝** [task-wave2.md](task-wave2.md)։ **Git՝** [CONTRIBUTING.md](CONTRIBUTING.md)։ **Lead-ի տախտակը՝** [docs/zones/lead/README.md](docs/zones/lead/README.md)։ **Wave 1-ի արխիվ՝** [task-advanced.md](task-advanced.md)։

Աղյուսակի համարը աշակերտի համարն է։ Նույն համարը [task-wave2.md](task-wave2.md)-ի վերնագիրն է և `docs/agents/` ֆայլը, որը տալիս ես գործակալին։

Wave 1-ը փակ է և արդեն `dev`-ում է։ Հիմա հրապարակային API և խանութի էջեր, SQLite։ **Ավարտել մինչև հունվարի վերջ։** Postgres-ը, զամբյուղը, պատվերը, Idram-ը և վճարման նամակը դուրս են։

| # | Անուն | Ճյուղ | Գոտի | Գործակալ |
|---|------|--------|------|-----------|
| 1 | Lead | `feat/lead` | Wave 2-ի merge-ի տախտակ։ Ashot-ից հետո՝ թեստեր, health, Swagger, staff անալիտիկա, `/`, `/textile`, `/baby` | [01-lead.md](docs/agents/01-lead.md) |
| 2 | Suro | `feat/suro-api` | `/api/admin/analytics/`, JWT, էջի չափ 12 | [02-suro.md](docs/agents/02-suro.md) |
| 3 | Artush | `feat/artush-i18n` | `parse_language`, `pick_translation`, `ru` բառարան | [03-artush.md](docs/agents/03-artush.md) |
| 4 | Hayk | `feat/hayk-gateway` | `GET /api/content/home-blocks/` և `/` էջը | [04-hayk.md](docs/agents/04-hayk.md) |
| 5 | Mariam | `feat/mariam-header` | Որոնում վերնագրում և `ru` կոճակ | [05-mariam.md](docs/agents/05-mariam.md) |
| 6 | Daniel | `feat/daniel-footer` | Բաժանորդագրության և մեծածախի POST, Footer-ի ձևեր | [06-daniel.md](docs/agents/06-daniel.md) |
| 7 | Karen | `feat/karen-textile` | `/textile` էջը API-ից | [07-karen.md](docs/agents/07-karen.md) |
| 8 | Svet | `feat/svet-baby` | `/baby` էջը API-ից | [08-svet.md](docs/agents/08-svet.md) |
| 9 | Vach | `feat/vach-catalog` | Կատեգորիաների և ապրանքների կարդացող API | [09-vach.md](docs/agents/09-vach.md) |
| 10 | Ashot | `feat/ashot-ui` | API թեստեր և 404 էջ | [10-ashot.md](docs/agents/10-ashot.md) |

Merge-ի հերթը՝ **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**։

Մեկ PR = մեկ գոտի։ `main` չենք push անում։ Կատալոգը դրսից՝ `/api/catalog/`։ Ադմինը՝ `/api/admin/`։ Անալիտիկան՝ `/api/admin/analytics/`։ Health-ը՝ `/api/health/`։

---

# Архив — Wave 1 (закрыта)

Не выполнять. Модели и админка уже в `dev`. Подробности: [task-advanced.md](task-advanced.md).

**Do not start this wave.** Models and admin are already in `dev`. Detail: [task-advanced.md](task-advanced.md).

**Այս ալիքը չսկսել։** Մոդելներն ու ադմինն արդեն `dev`-ում են։ Մանրամասն՝ [task-advanced.md](task-advanced.md)։

**Подробно:** [task-advanced.md](task-advanced.md)  
**Git:** [CONTRIBUTING.md](CONTRIBUTING.md)  
**Доска Lead:** [docs/zones/lead/README.md](docs/zones/lead/README.md)

Таблица ниже — история волны 1. Агенту её не отдавать: файлы в `docs/agents/` теперь описывают волну 2.

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

The table below is Wave 1 history. Do not hand it to an agent. The files in `docs/agents/` now describe Wave 2.

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

Ներքևի աղյուսակը Wave 1-ի պատմությունն է։ Գործակալին այն չտալ. `docs/agents/` ֆայլերն արդեն նկարագրում են Wave 2-ը։

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
