# Ventum — текущая волна B1

**Программа целиком:** [task-advanced.md](task-advanced.md)  
**Git:** [CONTRIBUTING.md](CONTRIBUTING.md)  
**Макет:** [Figma Untitled](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12495)

Открыта только **B1** (модели и админка, SQLite). API корзины, Idram и вёрстку Figma не делать — это следующие волны. Имя в таблице пустое: его вписывает учитель, ветка `feat/<имя>-<зона>`.

День 1 — эта таблица и PR. День 2 — merge в `dev` по порядку ниже, затем волна B2.

| # | Имя | Ветка | Зона B1 |
|---|-----|--------|---------|
| 1 |  | `feat/<имя>-lead` | Порядок PR; после мержа пустой sqlite, `migrate`, `/api/health/`, `/admin/` |
| 2 |  | `feat/<имя>-api` | Приложения `accounts`, `catalog`, `cart`, `orders`, `leads`, `content`; пользователь с логином-email |
| 3 |  | `feat/<имя>-i18n` | Коды `am`, `en`, `ru` и базовый класс перевода |
| 4 |  | `feat/<имя>-gateway` | `HomeBlock` и переводы title/text на трёх языках |
| 5 |  | `feat/<имя>-header` | `search.py`: поиск по имени и sku, без URL |
| 6 |  | `feat/<имя>-footer` | `NewsletterSubscriber` и `WholesaleInquiry` |
| 7 |  | `feat/<имя>-textile` | Команда или фикстура `seed_textile` |
| 8 |  | `feat/<имя>-baby` | Команда или фикстура `seed_baby` |
| 9 |  | `feat/<имя>-catalog` | Category, Product, картинки, цена AMD, переводы am/en/ru, админка |
| 10 |  | `feat/<имя>-ui` | Тесты моделей на SQLite |

Порядок merge: **lead → api → i18n → catalog → footer → gateway → textile → baby → header → ui**.

Правила: один PR = одна зона; в `main` не пушить; Postgres не поднимать; ключи Idram не коммитить. Шаги и DoD — в [task-advanced.md](task-advanced.md), раздел B1.

## English

**Full program:** [task-advanced.md](task-advanced.md). **Git:** [CONTRIBUTING.md](CONTRIBUTING.md).

Only **B1** is open (models and admin, SQLite). Do not build the cart API, Idram, or the Figma layout yet. The name cell stays empty until the teacher fills it. Branch: `feat/<name>-<zone>`.

Day 1 is this table and a pull request. Day 2 is the merge into `dev`, then wave B2.

| # | Name | Branch | Zone B1 |
|---|------|--------|---------|
| 1 |  | `feat/<name>-lead` | PR order; after merge, empty sqlite, `migrate`, `/api/health/`, `/admin/` |
| 2 |  | `feat/<name>-api` | Apps `accounts`, `catalog`, `cart`, `orders`, `leads`, `content`; user logs in with email |
| 3 |  | `feat/<name>-i18n` | Codes `am`, `en`, `ru` and the shared translation base |
| 4 |  | `feat/<name>-gateway` | `HomeBlock` with title/text in three languages |
| 5 |  | `feat/<name>-header` | `search.py`: name and sku, no URL yet |
| 6 |  | `feat/<name>-footer` | `NewsletterSubscriber` and `WholesaleInquiry` |
| 7 |  | `feat/<name>-textile` | `seed_textile` command or fixture |
| 8 |  | `feat/<name>-baby` | `seed_baby` command or fixture |
| 9 |  | `feat/<name>-catalog` | Category, Product, images, AMD price, am/en/ru translations, admin |
| 10 |  | `feat/<name>-ui` | Model tests on SQLite |

Merge order: **lead → api → i18n → catalog → footer → gateway → textile → baby → header → ui**.

One pull request is one zone. Do not push `main`. Do not start Postgres. Do not commit Idram secrets. Steps: [task-advanced.md](task-advanced.md), section B1.

## Հայերեն

**Ամբողջ ծրագիրը՝** [task-advanced.md](task-advanced.md)։ **Git՝** [CONTRIBUTING.md](CONTRIBUTING.md)։

Բաց է միայն **B1**-ը (մոդելներ և ադմին, SQLite)։ Զամբյուղի API, Idram և Figma դասավորություն դեռ չենք անում։ Անունը դատարկ է, մինչև ուսուցիչը լրացնի։ Ճյուղը՝ `feat/<անուն>-<գոտի>`։

Օր 1-ը այս աղյուսակն է և PR։ Օր 2-ը merge է `dev`-ի մեջ, հետո B2 ալիքը։

| # | Անուն | Ճյուղ | Գոտի B1 |
|---|------|--------|---------|
| 1 |  | `feat/<անուն>-lead` | PR-ների կարգը; merge-ից հետո դատարկ sqlite, `migrate`, `/api/health/`, `/admin/` |
| 2 |  | `feat/<անուն>-api` | `accounts`, `catalog`, `cart`, `orders`, `leads`, `content`; մուտք email-ով |
| 3 |  | `feat/<անուն>-i18n` | `am`, `en`, `ru` կոդերը և թարգմանության ընդհանուր դասը |
| 4 |  | `feat/<անուն>-gateway` | `HomeBlock` և title/text երեք լեզվով |
| 5 |  | `feat/<անուն>-header` | `search.py`՝ անուն և sku, դեռ առանց URL |
| 6 |  | `feat/<անուն>-footer` | `NewsletterSubscriber` և `WholesaleInquiry` |
| 7 |  | `feat/<անուն>-textile` | `seed_textile` հրաման կամ ֆիքստուրա |
| 8 |  | `feat/<անուն>-baby` | `seed_baby` հրաման կամ ֆիքստուրա |
| 9 |  | `feat/<անուն>-catalog` | Category, Product, նկարներ, AMD գին, am/en/ru, ադմին |
| 10 |  | `feat/<անուն>-ui` | Մոդելների թեստեր SQLite-ով |

Merge-ի կարգը՝ **lead → api → i18n → catalog → footer → gateway → textile → baby → header → ui**։

Մեկ PR = մեկ գոտի։ `main` չենք push անում։ Postgres չենք բարձրացնում։ Idram-ի գաղտնիքները չենք commit անում։ Քայլերը՝ [task-advanced.md](task-advanced.md), B1 բաժին։
