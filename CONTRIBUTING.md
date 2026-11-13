# Git — как работать в этом репозитории

**RU** · **EN** · **HY**

Ученики работают **только в своей ветке**. В `main` не пушат и не мержат. Максимум, куда можно влить работу — `dev`.

Задание и зоны — в [task-wave3.md](task-wave3.md). Короткий список — в [TASK.md](TASK.md). Архив волны 2 — в [task-wave2.md](task-wave2.md). Архив волны 1 — в [task-advanced.md](task-advanced.md). Срок волны 3: до конца января 2027.

Сейчас каждый пишет только свою зону Wave 3: Suro (2) — пустые приложения `cart` и `orders` и настройки Idram, Artush (3) — `idram_language`, Hayk (4) — checkout, callback и `/account`, Mariam (5) — ссылки шапки и страница `/cart`, Daniel (6) — модели заказа и письмо, Karen (7) и Svet (8) — кнопка «в корзину» на своей витрине, Vach (9) — API корзины, Ashot (10) — страницы возврата и тесты оплаты. Номер ученика один и тот же в [TASK.md](TASK.md) и в заголовках [task-wave3.md](task-wave3.md). Ветки не переименовывать.

## Ветки

| Ветка | Кто трогает | Зачем |
|--------|-------------|--------|
| `main` | никто из учеников | стабильная версия |
| `dev` | Lead после ревью PR | сборка команды |
| `feat/<имя>-<зона>` | только ты | твоя работа. Назначены: `feat/lead`, `feat/suro-api`, `feat/artush-i18n`, `feat/hayk-gateway`, `feat/mariam-header`, `feat/daniel-footer`, `feat/karen-textile`, `feat/svet-baby`, `feat/vach-catalog`, `feat/ashot-ui` |

Зоны волны 3: `lead`, `api`, `i18n`, `payments`, `cart-page`, `orders`, `textile`, `baby`, `cart`, `ui`. Имена веток прежние: `feat/hayk-gateway`, `feat/mariam-header`, `feat/daniel-footer`, `feat/vach-catalog`.

## Старт

```bash
git clone <url-репозитория>
cd ventum-project

git checkout dev
git pull origin dev

git checkout -b feat/suro-api
```

Проверка: `git branch` — звёздочка на `feat/имя-зона`, не на `main`.

## Каждый день

```bash
git status
git add .
git commit -m "feat(textile): add hero placeholder"
git push -u origin HEAD
```

Потом на GitHub: **Create Pull Request**

- **base:** `dev`
- **compare:** твоя `feat/...`
- **не** base `main`

Один PR = одна зона. В `dev` и `main` не делать `--force`.

## English

Work only on your own branch. Do not push or merge into `main`. The only branch that receives pull requests is `dev`.

Wave 3 is in [task-wave3.md](task-wave3.md). The short list is [TASK.md](TASK.md). Wave 2 archive: [task-wave2.md](task-wave2.md). Wave 1 archive: [task-advanced.md](task-advanced.md). Finish by the end of January 2027. This wave is the cart, the order, Idram, and the shop email. Student numbers match in both files. Branch names stay: Vach is 9 on `feat/vach-catalog`, Hayk is 4 on `feat/hayk-gateway`, Daniel is 6 on `feat/daniel-footer`. Hand your agent the matching file in `docs/agents/`.

```bash
git clone <repo-url>
cd ventum-project
git checkout dev
git pull origin dev
git checkout -b feat/suro-api
```

Open the pull request with **base `dev`**. One pull request is one zone. Do not force-push `dev` or `main`.

Wave 3 zones: `lead`, `api`, `i18n`, `payments`, `cart-page`, `orders`, `textile`, `baby`, `cart`, `ui`. Branch names stay the same.

## Հայերեն

Աշխատում ենք միայն մեր ճյուղում: `main` չենք push անում և չենք merge անում: PR-ը միայն `dev` է:

Wave 3-ը՝ [task-wave3.md](task-wave3.md)։ Կարճ ցանկը՝ [TASK.md](TASK.md)։ Wave 2-ի արխիվը՝ [task-wave2.md](task-wave2.md)։ Wave 1-ի արխիվը՝ [task-advanced.md](task-advanced.md)։ Ավարտել մինչև 2027-ի հունվարի վերջ։ Այս ալիքը զամբյուղն է, պատվերը, Idram-ը և նամակը։ Աշակերտի համարը երկու ֆայլում նույնն է։ Ճյուղերի անունները մնում են. Vach-ը 9-ն է՝ `feat/vach-catalog`, Hayk-ը 4-ն է՝ `feat/hayk-gateway`, Daniel-ը 6-ն է՝ `feat/daniel-footer`։ Գործակալին տուր `docs/agents/`-ի իր ֆայլը։

```bash
git clone <repo-url>
cd ventum-project
git checkout dev
git pull origin dev
git checkout -b feat/artush-i18n
```

Pull request-ի **base-ը `dev`** է: Մեկ PR = մեկ գոտի: `dev` և `main` `--force` չենք անում:

Wave 3-ի գոտիներ՝ `lead`, `api`, `i18n`, `payments`, `cart-page`, `orders`, `textile`, `baby`, `cart`, `ui`։ Ճյուղերի անունները նույնն են։
