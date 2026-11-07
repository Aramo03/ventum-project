# Git — как работать в этом репозитории

**RU** · **EN** · **HY**

Ученики работают **только в своей ветке**. В `main` не пушат и не мержат. Максимум, куда можно влить работу — `dev`.

Задание и зоны — в [task-advanced.md](task-advanced.md). Короткий список — в [TASK.md](TASK.md). Срок: до конца декабря.

Сейчас каждый пишет только свою зону этого задания: Suro — пользователь и пустые приложения, Artush — языки, catalog — товары, Daniel — заявки, Hayk — слоты главной, Karen и Svet — данные магазинов, Mariam — поиск. Страницы по макету в этом задании не собираем.

## Ветки

| Ветка | Кто трогает | Зачем |
|--------|-------------|--------|
| `main` | никто из учеников | стабильная версия |
| `dev` | Lead после ревью PR | сборка команды |
| `feat/<имя>-<зона>` | только ты | твоя работа. Назначены: `feat/lead`, `feat/suro-api`, `feat/artush-i18n`, `feat/hayk-gateway`, `feat/mariam-header`, `feat/daniel-footer`, `feat/karen-textile`, `feat/svet-baby` |

Зоны: `lead`, `api`, `i18n`, `gateway`, `header`, `footer`, `textile`, `baby`, `catalog`, `ui`.

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

The assignment is in [task-advanced.md](task-advanced.md). The short list is [TASK.md](TASK.md). Finish by the end of December. This assignment is models and admin, not the Figma layout.

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

Առաջադրանքը՝ [task-advanced.md](task-advanced.md)։ Կարճ ցանկը՝ [TASK.md](TASK.md)։ Ավարտել մինչև դեկտեմբերի վերջ։ Այս առաջադրանքը մոդելներ և ադմին է, ոչ թե մակետի էջեր։

```bash
git clone <repo-url>
cd ventum-project
git checkout dev
git pull origin dev
git checkout -b feat/artush-i18n
```

Pull request-ի **base-ը `dev`** է: Մեկ PR = մեկ գոտի: `dev` և `main` `--force` չենք անում:

Գոտիներ՝ `lead`, `api`, `i18n`, `gateway`, `header`, `footer`, `textile`, `baby`, `catalog`, `ui`:
