# Ventum — текущая волна B1

**Программа целиком:** [task-advanced.md](task-advanced.md)  
**Git:** [CONTRIBUTING.md](CONTRIBUTING.md)  
**Доска Lead:** [docs/zones/lead/README.md](docs/zones/lead/README.md)  
**Макет:** [Figma Untitled](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12495)

Открыта только **B1** (модели и админка, SQLite). API корзины, Idram и вёрстку Figma не делать — это следующие волны.

**Aram (lead)** день задания закрыл: каркас на SQLite проверен, он мержит PR по порядку. Пять имён ещё не назначены — клетка пустая, ветка `feat/<имя>-<зона>`.

День 1 — эта таблица и PR. День 2 — merge в `dev`, затем волна B2. Шаги и чеклист «не мержить, пока» — в [task-advanced.md](task-advanced.md), раздел B1. В своей папке лежит короткий README.

| # | Имя | Ветка | Зона B1 |
|---|-----|--------|---------|
| 1 | Aram | `feat/aram-lead` | Доска merge. Каркас уже проверен. После последнего PR: пустой sqlite, `migrate`, `/api/health/`, `/api/admin/` |
| 2 | Suro | `feat/suro-api` | Приложения `accounts`, `catalog`, `cart`, `orders`, `leads`, `content`; пользователь с логином-email |
| 3 | Artush | `feat/artush-i18n` | Коды `am`, `en`, `ru` и базовый класс перевода |
| 4 | Hayk | `feat/hayk-gateway` | `HomeBlock` и переводы title/text на трёх языках |
| 5 | Mariam | `feat/mariam-header` | `search.py`: поиск по имени и sku, без URL |
| 6 |  | `feat/<имя>-footer` | `NewsletterSubscriber` и `WholesaleInquiry` |
| 7 |  | `feat/<имя>-textile` | Команда или фикстура `seed_textile` |
| 8 |  | `feat/<имя>-baby` | Команда или фикстура `seed_baby` |
| 9 |  | `feat/<имя>-catalog` | Category, Product, картинки, цена AMD, переводы am/en/ru, админка |
| 10 |  | `feat/<имя>-ui` | Тесты моделей на SQLite |

Порядок merge: **Aram → Suro → Artush → catalog → footer → Hayk → textile → baby → Mariam → ui**.

Правила: один PR = одна зона; в `main` не пушить; Postgres не поднимать; ключи Idram не коммитить. Админка в этом проекте: `http://127.0.0.1:8000/api/admin/`. Health: `http://127.0.0.1:8000/api/health/`.

## English

**Full program:** [task-advanced.md](task-advanced.md). **Git:** [CONTRIBUTING.md](CONTRIBUTING.md). **Lead board:** [docs/zones/lead/README.md](docs/zones/lead/README.md).

Only **B1** is open (models and admin, SQLite). Do not build the cart API, Idram, or the Figma layout yet.

**Aram (lead)** finished his task day: the SQLite skeleton is checked, and he merges pull requests in order. Five names are still blank. Branch for those rows: `feat/<name>-<zone>`.

Day 1 is this table and a pull request. Day 2 is the merge into `dev`, then wave B2. Steps and the “do not merge until” list are in [task-advanced.md](task-advanced.md), section B1. Your folder has a short README.

| # | Name | Branch | Zone B1 |
|---|------|--------|---------|
| 1 | Aram | `feat/aram-lead` | Merge board. Skeleton already checked. After the last PR: empty sqlite, `migrate`, `/api/health/`, `/api/admin/` |
| 2 | Suro | `feat/suro-api` | Apps `accounts`, `catalog`, `cart`, `orders`, `leads`, `content`; user logs in with email |
| 3 | Artush | `feat/artush-i18n` | Codes `am`, `en`, `ru` and the shared translation base |
| 4 | Hayk | `feat/hayk-gateway` | `HomeBlock` with title/text in three languages |
| 5 | Mariam | `feat/mariam-header` | `search.py`: name and sku, no URL yet |
| 6 |  | `feat/<name>-footer` | `NewsletterSubscriber` and `WholesaleInquiry` |
| 7 |  | `feat/<name>-textile` | `seed_textile` command or fixture |
| 8 |  | `feat/<name>-baby` | `seed_baby` command or fixture |
| 9 |  | `feat/<name>-catalog` | Category, Product, images, AMD price, am/en/ru translations, admin |
| 10 |  | `feat/<name>-ui` | Model tests on SQLite |

Merge order: **Aram → Suro → Artush → catalog → footer → Hayk → textile → baby → Mariam → ui**.

One pull request is one zone. Do not push `main`. Do not start Postgres. Do not commit Idram secrets. Admin is `/api/admin/`. Health is `/api/health/`.

## Հայերեն

**Ամբողջ ծրագիրը՝** [task-advanced.md](task-advanced.md)։ **Git՝** [CONTRIBUTING.md](CONTRIBUTING.md)։ **Lead-ի տախտակը՝** [docs/zones/lead/README.md](docs/zones/lead/README.md)։

Բաց է միայն **B1**-ը (մոդելներ և ադմին, SQLite)։ Զամբյուղի API, Idram և Figma դասավորություն դեռ չենք անում։

**Aram (lead)** իր առաջադրանքի օրը փակել է. SQLite կարկասը ստուգված է, PR-ները merge է անում կարգով։ Հինգ անուն դեռ դատարկ է։ Այդ տողերի ճյուղը՝ `feat/<անուն>-<գոտի>`։

Օր 1-ը այս աղյուսակն է և PR։ Օր 2-ը merge է `dev`-ի մեջ, հետո B2։ Քայլերը՝ [task-advanced.md](task-advanced.md), B1։ Քո պանակում կարճ README կա։

| # | Անուն | Ճյուղ | Գոտի B1 |
|---|------|--------|---------|
| 1 | Aram | `feat/aram-lead` | Merge-ի տախտակ։ Կարկասն արդեն ստուգված է։ Վերջին PR-ից հետո՝ դատարկ sqlite, `migrate`, `/api/health/`, `/api/admin/` |
| 2 | Suro | `feat/suro-api` | `accounts`, `catalog`, `cart`, `orders`, `leads`, `content`; մուտք email-ով |
| 3 | Artush | `feat/artush-i18n` | `am`, `en`, `ru` կոդերը և թարգմանության ընդհանուր դասը |
| 4 | Hayk | `feat/hayk-gateway` | `HomeBlock` և title/text երեք լեզվով |
| 5 | Mariam | `feat/mariam-header` | `search.py`՝ անուն և sku, դեռ առանց URL |
| 6 |  | `feat/<անուն>-footer` | `NewsletterSubscriber` և `WholesaleInquiry` |
| 7 |  | `feat/<անուն>-textile` | `seed_textile` հրաման կամ ֆիքստուրա |
| 8 |  | `feat/<անուն>-baby` | `seed_baby` հրաման կամ ֆիքստուրա |
| 9 |  | `feat/<անուն>-catalog` | Category, Product, նկարներ, AMD գին, am/en/ru, ադմին |
| 10 |  | `feat/<անուն>-ui` | Մոդելների թեստեր SQLite-ով |

Merge-ի կարգը՝ **Aram → Suro → Artush → catalog → footer → Hayk → textile → baby → Mariam → ui**։

Մեկ PR = մեկ գոտի։ `main` չենք push անում։ Postgres չենք բարձրացնում։ Idram-ի գաղտնիքները չենք commit անում։ Ադմինը՝ `/api/admin/`։ Health-ը՝ `/api/health/`։
