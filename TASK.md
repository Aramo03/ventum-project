# Ventum — задание B1

**Подробно:** [task-advanced.md](task-advanced.md)  
**Git:** [CONTRIBUTING.md](CONTRIBUTING.md)  
**Доска Lead:** [docs/zones/lead/README.md](docs/zones/lead/README.md)

Макеты настоящего магазина (в этом задании по ним не верстаем):

- [Ventum — кадр магазина](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12495)
- [Ventum — второй файл макета](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=0-1)

Сейчас только модели и админка на SQLite. **Срок: до конца декабря.** Имена catalog и ui ещё пустые.

Lead каркас уже проверил и мержит PR по порядку. В своей папке лежит README.

| # | Имя | Ветка | Зона |
|---|-----|--------|------|
| 1 | Lead | `feat/lead` | Доска merge. После последнего PR: пустой sqlite, `migrate`, `/api/health/`, `/api/admin/` |
| 2 | Suro | `feat/suro-api` | Приложения и пользователь с логином-email |
| 3 | Artush | `feat/artush-i18n` | Коды `am`, `en`, `ru` и базовый класс перевода |
| 4 | Hayk | `feat/hayk-gateway` | `HomeBlock` и переводы title/text на трёх языках |
| 5 | Mariam | `feat/mariam-header` | `search.py`: поиск по имени и sku, без URL |
| 6 | Daniel | `feat/daniel-footer` | `NewsletterSubscriber` и `WholesaleInquiry` |
| 7 | Karen | `feat/karen-textile` | Команда или фикстура `seed_textile` |
| 8 | Svet | `feat/svet-baby` | Команда или фикстура `seed_baby` |
| 9 |  | `feat/<имя>-catalog` | Category, Product, картинки, цена AMD, переводы am/en/ru, админка |
| 10 |  | `feat/<имя>-ui` | Тесты моделей на SQLite |

Порядок merge: **Lead → Suro → Artush → catalog → Daniel → Hayk → Karen → Svet → Mariam → ui**.

Один PR = одна зона. В `main` не пушить. Postgres не поднимать. Админка: `http://127.0.0.1:8000/api/admin/`. Health: `http://127.0.0.1:8000/api/health/`.

## English

**Detail:** [task-advanced.md](task-advanced.md). **Git:** [CONTRIBUTING.md](CONTRIBUTING.md). **Lead board:** [docs/zones/lead/README.md](docs/zones/lead/README.md).

Shop designs (do not implement the layout in this assignment):

- [Ventum shop frame](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12495)
- [Second Ventum design file](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=0-1)

Models and admin on SQLite only. **Finish by the end of December.** Catalog and ui names are still blank. Lead already checked the skeleton and merges in order. Your folder has a README.

| # | Name | Branch | Zone |
|---|------|--------|------|
| 1 | Lead | `feat/lead` | Merge board. After the last PR: empty sqlite, `migrate`, `/api/health/`, `/api/admin/` |
| 2 | Suro | `feat/suro-api` | Apps and a user who logs in with email |
| 3 | Artush | `feat/artush-i18n` | Codes `am`, `en`, `ru` and the shared translation base |
| 4 | Hayk | `feat/hayk-gateway` | `HomeBlock` with title/text in three languages |
| 5 | Mariam | `feat/mariam-header` | `search.py`: name and sku, no URL yet |
| 6 | Daniel | `feat/daniel-footer` | `NewsletterSubscriber` and `WholesaleInquiry` |
| 7 | Karen | `feat/karen-textile` | `seed_textile` command or fixture |
| 8 | Svet | `feat/svet-baby` | `seed_baby` command or fixture |
| 9 |  | `feat/<name>-catalog` | Category, Product, images, AMD price, am/en/ru translations, admin |
| 10 |  | `feat/<name>-ui` | Model tests on SQLite |

Merge order: **Lead → Suro → Artush → catalog → Daniel → Hayk → Karen → Svet → Mariam → ui**.

One pull request is one zone. Do not push `main`. Do not start Postgres. Admin is `/api/admin/`. Health is `/api/health/`.

## Հայերեն

**Մանրամասն՝** [task-advanced.md](task-advanced.md)։ **Git՝** [CONTRIBUTING.md](CONTRIBUTING.md)։ **Lead-ի տախտակը՝** [docs/zones/lead/README.md](docs/zones/lead/README.md)։

Իրական խանութի մակետներ (այս առաջադրանքում չենք հավաքում).

- [Ventum խանութ](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12495)
- [Ventum երկրորդ ֆայլ](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=0-1)

Միայն մոդելներ և ադմին, SQLite։ **Ավարտել մինչև դեկտեմբերի վերջ։** catalog-ի և ui-ի անունները դեռ դատարկ են։ Lead-ը կարկասն արդեն ստուգել է և PR-ները merge է անում կարգով։ Քո պանակում README կա։

| # | Անուն | Ճյուղ | Գոտի |
|---|------|--------|------|
| 1 | Lead | `feat/lead` | Merge-ի տախտակ։ Վերջին PR-ից հետո՝ դատարկ sqlite, `migrate`, `/api/health/`, `/api/admin/` |
| 2 | Suro | `feat/suro-api` | Հավելվածներ և մուտք email-ով |
| 3 | Artush | `feat/artush-i18n` | `am`, `en`, `ru` կոդերը և թարգմանության ընդհանուր դասը |
| 4 | Hayk | `feat/hayk-gateway` | `HomeBlock` և title/text երեք լեզվով |
| 5 | Mariam | `feat/mariam-header` | `search.py`՝ անուն և sku, դեռ առանց URL |
| 6 | Daniel | `feat/daniel-footer` | `NewsletterSubscriber` և `WholesaleInquiry` |
| 7 | Karen | `feat/karen-textile` | `seed_textile` հրաման կամ ֆիքստուրա |
| 8 | Svet | `feat/svet-baby` | `seed_baby` հրաման կամ ֆիքստուրա |
| 9 |  | `feat/<անուն>-catalog` | Category, Product, նկարներ, AMD գին, am/en/ru, ադմին |
| 10 |  | `feat/<անուն>-ui` | Մոդելների թեստեր SQLite-ով |

Merge-ի կարգը՝ **Lead → Suro → Artush → catalog → Daniel → Hayk → Karen → Svet → Mariam → ui**։

Մեկ PR = մեկ գոտի։ `main` չենք push անում։ Postgres չենք բարձրացնում։ Ադմինը՝ `/api/admin/`։ Health-ը՝ `/api/health/`։
