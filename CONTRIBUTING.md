# Git — как работать в этом репозитории

**RU** · **EN** · **HY**

Ученики работают **только в своей ветке**. В `main` не пушат и не мержат. Максимум, куда можно влить работу — `dev`.

Текущее задание — [task-wave6.md](task-wave6.md): оба файла Figma, CSS-движение и оболочка, один кусок на ученика. Короткий список — в [TASK.md](TASK.md). Волна 5 закрыта: [task-wave5.md](task-wave5.md). Волна 4 закрыта: [task-wave4.md](task-wave4.md). Контракт покупки волны 3 — в [task-wave3.md](task-wave3.md), он не закрыт. Архив волны 2 — в [task-wave2.md](task-wave2.md). Архив волны 1 — в [task-advanced.md](task-advanced.md). Срок волны 3: до конца января 2027.

Очередь волны 6: **Lead → Ashot → Vach → Mariam → Suro → Karen → Svet → Daniel → Hayk → Artush**. Ashot (10) — оболочка, токены движения и `/design`, Vach (9) — карточка, каталог и `/product/:sku`, Mariam (5) — навигация, Suro (2) — середина `/`, Karen (7) — `/textile`, Svet (8) — `/baby`, Daniel (6) — подвал и рассылка, Hayk (4) — опт и `/cart`, Artush (3) — три JSON. Lead экраны не рисует. Номер ученика один и тот же в [TASK.md](TASK.md) и в заголовках [task-wave6.md](task-wave6.md). Ветки не переименовывать. В `main` не пушить. API волны 3 не ломать.

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

The current task is [task-wave6.md](task-wave6.md): both Figma files, CSS motion, and the shell, one piece per student. The short list is [TASK.md](TASK.md). Wave 5 is closed: [task-wave5.md](task-wave5.md). Wave 4 is closed: [task-wave4.md](task-wave4.md). The Wave 3 purchase contract is [task-wave3.md](task-wave3.md), and it is not closed. Wave 2 archive: [task-wave2.md](task-wave2.md). Wave 1 archive: [task-advanced.md](task-advanced.md). Finish the purchase contract by the end of January 2027. Queue: **Lead → Ashot → Vach → Mariam → Suro → Karen → Svet → Daniel → Hayk → Artush**. Lead does not draw screens. Student numbers match in both files. Branch names stay: Vach is 9 on `feat/vach-catalog`, Hayk is 4 on `feat/hayk-gateway`, Daniel is 6 on `feat/daniel-footer`. Hand your agent the matching file in `docs/agents/`. Do not push `main`. Do not break the Wave 3 API.

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

Ընթացիկ առաջադրանքը՝ [task-wave6.md](task-wave6.md)։ Երկու Figma ֆայլ, CSS շարժում և պատյան, մեկ կտոր ամեն աշակերտի։ Կարճ ցանկը՝ [TASK.md](TASK.md)։ Wave 5-ը փակ է՝ [task-wave5.md](task-wave5.md)։ Wave 4-ը փակ է՝ [task-wave4.md](task-wave4.md)։ Wave 3-ի գնման պայմանագիրը՝ [task-wave3.md](task-wave3.md), այն փակ չէ։ Wave 2-ի արխիվը՝ [task-wave2.md](task-wave2.md)։ Wave 1-ի արխիվը՝ [task-advanced.md](task-advanced.md)։ Գնման պայմանագիրը ավարտել մինչև 2027-ի հունվարի վերջ։ Հերթը՝ **Lead → Ashot → Vach → Mariam → Suro → Karen → Svet → Daniel → Hayk → Artush**։ Lead-ը էկրաններ չի նկարում։ Աշակերտի համարը երկու ֆայլում նույնն է։ Ճյուղերի անունները մնում են. Vach-ը 9-ն է՝ `feat/vach-catalog`, Hayk-ը 4-ն է՝ `feat/hayk-gateway`, Daniel-ը 6-ն է՝ `feat/daniel-footer`։ Գործակալին տուր `docs/agents/`-ի իր ֆայլը։ `main` չpush անել։ Wave 3-ի API-ն չկոտրել։

```bash
git clone <repo-url>
cd ventum-project
git checkout dev
git pull origin dev
git checkout -b feat/artush-i18n
```

Pull request-ի **base-ը `dev`** է: Մեկ PR = մեկ գոտի: `dev` և `main` `--force` չենք անում:

Wave 3-ի գոտիներ՝ `lead`, `api`, `i18n`, `payments`, `cart-page`, `orders`, `textile`, `baby`, `cart`, `ui`։ Ճյուղերի անունները նույնն են։
