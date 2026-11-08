# Ventum — Wave 1

**Подробно:** [task-advanced.md](task-advanced.md)  
**Git:** [CONTRIBUTING.md](CONTRIBUTING.md)  
**Доска Lead:** [docs/zones/lead/README.md](docs/zones/lead/README.md)

Номер в таблице — номер ученика. Тот же номер стоит в заголовке его раздела в [task-advanced.md](task-advanced.md) и в имени файла, который он отдаёт агенту: `docs/agents/`.

Макеты настоящего магазина (в этом задании по ним не верстаем):

- [Ventum — кадр магазина](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12495)
- [Ventum — второй файл макета](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=0-1)

Сейчас только модели и админка на SQLite. **Срок: до конца декабря.**

Lead каркас уже проверил и мержит PR по очереди. В своей папке лежит README. Файл из колонки «Агент» отдаётся своему агенту целиком: там зона, шаги и Definition of Done на трёх языках.

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

The number in the table is the student number. The same number is the heading in [task-advanced.md](task-advanced.md) and the file in `docs/agents/` that you give to your agent.

Shop designs (do not implement the layout in this assignment):

- [Ventum shop frame](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12495)
- [Second Ventum design file](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=0-1)

Models and admin on SQLite only. **Finish by the end of December.** Lead already checked the skeleton and merges in queue order. Your folder has a README. Give your agent the whole file from the Agent column.

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

Աղյուսակի համարը աշակերտի համարն է։ Նույն համարը [task-advanced.md](task-advanced.md)-ի վերնագիրն է և `docs/agents/` ֆայլի անունը, որը տալիս ես գործակալին։

Իրական խանութի մակետներ (այս առաջադրանքում չենք հավաքում).

- [Ventum խանութ](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12495)
- [Ventum երկրորդ ֆայլ](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=0-1)

Միայն մոդելներ և ադմին, SQLite։ **Ավարտել մինչև դեկտեմբերի վերջ։** Lead-ը կարկասն արդեն ստուգել է և PR-ները merge է անում հերթով։ Քո պանակում README կա։ Գործակալին տուր «Գործակալ» սյունակի ամբողջ ֆայլը։

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
