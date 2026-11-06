# Git — как работать в этом репозитории

**RU** · **EN** · **HY**

Ученики работают **только в своей ветке**. В `main` не пушат и не мержат. Максимум, куда можно влить работу — `dev`.

Зоны на весь проект и ритм «день задания → следующий день merge» — в [task-advanced.md](task-advanced.md). Сейчас открыта волна из [TASK.md](TASK.md).

`api` ведёт аккаунт, заказы, Idram и письмо магазину. `catalog` ведёт товары и корзину. `header` ведёт экраны входа и ссылку на историю заказов. Оплата картой — только на странице Idram, не в нашей форме.

## Ветки

| Ветка | Кто трогает | Зачем |
|--------|-------------|--------|
| `main` | никто из учеников | стабильная версия |
| `dev` | Lead после ревью PR | сборка команды |
| `feat/<имя>-<зона>` | только ты | твоя работа. Уже назначены: `feat/aram-lead`, `feat/suro-api`, `feat/artush-i18n`, `feat/hayk-gateway`, `feat/mariam-header` |

Зоны: `lead`, `api`, `i18n`, `gateway`, `header`, `footer`, `textile`, `baby`, `catalog`, `ui`.

## Старт

```bash
git clone <url-репозитория>
cd ventum-project

git checkout dev
git pull origin dev

git checkout -b feat/aram-lead
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

The full zone map and the rhythm (task day, next day merge) are in [task-advanced.md](task-advanced.md). The open wave is [TASK.md](TASK.md).

`api` owns accounts, orders, Idram, and the shop email. `catalog` owns products and the cart. `header` owns the login screens and the link to order history. Card details stay on Idram’s page.

```bash
git clone <repo-url>
cd ventum-project
git checkout dev
git pull origin dev
git checkout -b feat/suro-api
```

Open the pull request with **base `dev`**. One pull request is one zone. Do not force-push `dev` or `main`.

Zones: `lead`, `api`, `i18n`, `gateway`, `header`, `footer`, `textile`, `baby`, `catalog`, `ui`.

## Հայերեն

Աշխատում ենք միայն մեր ճյուղում: `main` չենք push անում և չենք merge անում: PR-ը միայն `dev` է:

Գոտիները և ռիթմը (առաջադրանքի օր, հաջորդ օրը merge)՝ [task-advanced.md](task-advanced.md)։ Բաց ալիքը՝ [TASK.md](TASK.md)։

`api`-ն վարում է հաշիվը, պատվերը, Idram-ը և խանութի նամակը։ `catalog`-ը՝ ապրանքը և զամբյուղը։ `header`-ը՝ մուտքի էկրանները և պատվերի պատմության հղումը։ Քարտի տվյալները միայն Idram-ի էջում են։

```bash
git clone <repo-url>
cd ventum-project
git checkout dev
git pull origin dev
git checkout -b feat/artush-i18n
```

Pull request-ի **base-ը `dev`** է: Մեկ PR = մեկ գոտի: `dev` և `main` `--force` չենք անում:

Գոտիներ՝ `lead`, `api`, `i18n`, `gateway`, `header`, `footer`, `textile`, `baby`, `catalog`, `ui`:
