# Git — как работать в этом репозитории

**RU** · **EN** · **HY**

Ученики работают **только в своей ветке**. В `main` не пушат и не мержат. Максимум, куда можно влить работу — `dev`.

Задание и зоны — в [task-wave2.md](task-wave2.md). Короткий список — в [TASK.md](TASK.md). Архив волны 1 — в [task-advanced.md](task-advanced.md). Срок волны 2: до конца января.

Сейчас каждый пишет только свою зону Wave 2: Suro (2) — аналитика админки, JWT и размер страницы, Artush (3) — выбор перевода и словарь `ru`, Hayk (4) — блоки главной и страница `/`, Mariam (5) — поиск в шапке, Daniel (6) — формы заявок, Karen (7) и Svet (8) — витрины магазинов, Vach (9) — читающее API каталога, Ashot (10) — тесты API и страница 404. Номер ученика один и тот же в [TASK.md](TASK.md) и в заголовках [task-wave2.md](task-wave2.md).

## Ветки

| Ветка | Кто трогает | Зачем |
|--------|-------------|--------|
| `main` | никто из учеников | стабильная версия |
| `dev` | Lead после ревью PR | сборка команды |
| `feat/<имя>-<зона>` | только ты | твоя работа. Назначены: `feat/lead`, `feat/suro-api`, `feat/artush-i18n`, `feat/hayk-gateway`, `feat/mariam-header`, `feat/daniel-footer`, `feat/karen-textile`, `feat/svet-baby`, `feat/vach-catalog`, `feat/ashot-ui` |

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

Wave 2 is in [task-wave2.md](task-wave2.md). The short list is [TASK.md](TASK.md). Wave 1 archive: [task-advanced.md](task-advanced.md). Finish by the end of January. This wave is the public API and the storefront. Student numbers match in both files. Vach is 9 on `feat/vach-catalog`. Ashot is 10 on `feat/ashot-ui`. Hand your agent the matching file in `docs/agents/`.

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

Wave 2-ը՝ [task-wave2.md](task-wave2.md)։ Կարճ ցանկը՝ [TASK.md](TASK.md)։ Wave 1-ի արխիվը՝ [task-advanced.md](task-advanced.md)։ Ավարտել մինչև հունվարի վերջ։ Այս ալիքը հրապարակային API-ն ու խանութի էջերն են։ Աշակերտի համարը երկու ֆայլում նույնն է։ Vach-ը 9-ն է՝ `feat/vach-catalog`։ Ashot-ը 10-ն է՝ `feat/ashot-ui`։ Գործակալին տուր `docs/agents/`-ի իր ֆայլը։

```bash
git clone <repo-url>
cd ventum-project
git checkout dev
git pull origin dev
git checkout -b feat/artush-i18n
```

Pull request-ի **base-ը `dev`** է: Մեկ PR = մեկ գոտի: `dev` և `main` `--force` չենք անում:

Գոտիներ՝ `lead`, `api`, `i18n`, `gateway`, `header`, `footer`, `textile`, `baby`, `catalog`, `ui`:
