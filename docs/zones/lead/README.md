# 1 — Lead

**Номер ученика:** 1. Тот же номер в [TASK.md](../../../TASK.md) и в разделе «1 — Lead» файла [task-wave2.md](../../../task-wave2.md).  
**Ветка:** `feat/lead`  
**Задание:** [task-wave2.md](../../../task-wave2.md), раздел «1 — Lead».  
**Агент:** [docs/agents/01-lead.md](../../agents/01-lead.md). Отдай агенту файл целиком.

Wave 1 закрыта: все десять PR уже в `dev`. Чужие фичи волны 2 не писать. PR принимать только по очереди ниже. **Срок волны 2:** до конца января.

## Доска merge — Wave 2

Колонка `#` — номер ученика, не шаг очереди. Колонка «После кого» — кто уже должен лежать в `dev`, прежде чем мержить эту строку.

| # | Имя | Ветка | Зона | После кого | PR | Статус |
|---|-----|--------|------|------------|----|--------|
| 1 | Lead | `feat/lead` | lead | — | — | ведёт очередь волны 2 |
| 2 | Suro | `feat/suro-api` | api | Lead | — | не начато |
| 3 | Artush | `feat/artush-i18n` | i18n | Suro | — | не начато |
| 4 | Hayk | `feat/hayk-gateway` | gateway | Vach | — | не начато |
| 5 | Mariam | `feat/mariam-header` | header | Daniel | — | не начато |
| 6 | Daniel | `feat/daniel-footer` | footer | Hayk | — | не начато |
| 7 | Karen | `feat/karen-textile` | textile | Mariam | — | не начато |
| 8 | Svet | `feat/svet-baby` | baby | Karen | — | не начато |
| 9 | Vach | `feat/vach-catalog` | catalog | Artush | — | не начато |
| 10 | Ashot | `feat/ashot-ui` | ui | Svet | — | не начато |

Очередь именами: **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**.

Колонка «Статус»:

- `не начато` — ветка волны 2 ещё не в ревью
- `ждёт PR` — работа есть, открытого PR в `dev` нет
- `в ревью` — PR открыт, ворота ниже не пройдены
- `в dev` — смержено, и имя из «После кого» уже было в `dev`

Мержить только по этой очереди. Если «После кого» ещё не `в dev`, PR не принимать. Конфликт чинить вместе с владельцем файла. Чужую зону не переписывать. Номер PR не ставить, пока merge не случился.

## Ворота merge

Один PR = одна зона. Base — `dev`. Текст ворот — «Lead не мержит, пока» из раздела ученика в [task-wave2.md](../../../task-wave2.md).

- **Suro.** Staff видит шесть групп чисел, и они сходятся со списками админки. Гость на `/api/admin/analytics/` чисел не видит. `POST /api/auth/token/` с email суперпользователя возвращает `access` и `refresh`. `GET /api/auth/me/` без токена даёт 401. Swagger открывается и больше не описан как «Health only». Health по-прежнему `{"status":"ok"}`. `migrate` на чистом SQLite проходит. В diff нет моделей каталога, заявок и `HomeBlock`.
- **Artush.** Три кода по-прежнему импортируются из `languages.py`. Неизвестный язык не становится `en` молча. `i18n.changeLanguage('ru')` не падает. Health отвечает `{"status":"ok"}`.
- **Vach.** Опубликованный товар Textile виден в списке `store=textile` и не виден в `store=baby`. Черновик отсутствует и в списке, и по sku (404). Товар без `ru` остаётся в выдаче, имя берётся из `en`. `?language=de` даёт 400. Пустой `q` не уменьшает `count`. `models.py` в diff нет.
- **Hayk.** Слот `hero` отдаётся на `am`, `en` и `ru`. `?language=de` даёт 400. Главная показывает текст слота и оба магазина. Модели контента в diff не изменены.
- **Daniel.** Первая подписка даёт 201 и строку в админке. Вторая с тем же email даёт 400 и не создаёт вторую строку. Опт без текста даёт 400. Формы в Footer вызывают эти пути.
- **Mariam.** Товар находится по sku и по имени. Пустой ввод не сужает список на API. В diff нет `models.py`. Account и Cart выключены.
- **Karen.** После `seed_textile` витрина показывает товар Textile и не показывает товар Baby. Черновик с `is_published=False` на витрину не попадает.
- **Svet.** Витрина Baby показывает свой товар и не затирает страницу Textile.
- **Ashot.** `python manage.py test` зелёный целиком. Страница 404 ведёт на `/`. В diff нет полей моделей и `index.css`.

## После PR ученика 10 (Ashot)

Этот список не отмечать, пока ученик 10 не в `dev`. Wave 2 этим коммитом не закрывается.

```bash
cd backend
python manage.py test
python manage.py runserver
```

Открыть `http://127.0.0.1:8000/api/health/`, Swagger, `http://127.0.0.1:8000/api/admin/analytics/` под staff, затем сайт: `/`, `/textile`, `/baby` и несуществующий путь.

- [ ] `/api/health/` отвечает `{"status":"ok"}`
- [ ] Swagger показывает пути контракта
- [ ] `/api/admin/analytics/` открывается только staff и показывает живые числа
- [ ] `/`, `/textile` и `/baby` читают API
- [ ] несуществующий путь открывается
- [ ] повторная подписка не создаёт вторую строку
- [ ] `python manage.py test` зелёный целиком
- [ ] в diff волны нет корзины, заказов и Postgres

## English

Student **1**, branch `feat/lead`. The `#` column is the student number and matches [TASK.md](../../../TASK.md) and the headings in [task-wave2.md](../../../task-wave2.md). “After” is the person who must already be in `dev`. Give your agent [01-lead.md](../../agents/01-lead.md) in full.

Wave 1 is closed. Do not write Wave 2 features yourself. **Finish Wave 2 by the end of January.**

| # | Name | Branch | Zone | After | PR | Status |
|---|------|--------|------|-------|----|--------|
| 1 | Lead | `feat/lead` | lead | — | — | runs the Wave 2 queue |
| 2 | Suro | `feat/suro-api` | api | Lead | — | not started |
| 3 | Artush | `feat/artush-i18n` | i18n | Suro | — | not started |
| 4 | Hayk | `feat/hayk-gateway` | gateway | Vach | — | not started |
| 5 | Mariam | `feat/mariam-header` | header | Daniel | — | not started |
| 6 | Daniel | `feat/daniel-footer` | footer | Hayk | — | not started |
| 7 | Karen | `feat/karen-textile` | textile | Mariam | — | not started |
| 8 | Svet | `feat/svet-baby` | baby | Karen | — | not started |
| 9 | Vach | `feat/vach-catalog` | catalog | Artush | — | not started |
| 10 | Ashot | `feat/ashot-ui` | ui | Svet | — | not started |

Queue: **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**.

Status column:

- `not started` — the Wave 2 branch is not in review yet
- `waiting for PR` — the work exists, and there is no open PR into `dev`
- `in review` — the PR is open, and the gate below is not passed
- `in dev` — merged, and the name in “After” was already in `dev`

Merge only in this order. If “After” is not yet `in dev`, do not merge. Fix a conflict with the file owner. Do not rewrite their zone. Do not write a PR number before the merge.

### Merge gates

One pull request is one zone. Base is `dev`. Each gate is the “Lead does not merge until” line in that student’s section of [task-wave2.md](../../../task-wave2.md).

- **Suro.** Staff sees six groups of numbers, and they match the admin lists. A guest on `/api/admin/analytics/` sees no numbers. `POST /api/auth/token/` with the superuser email returns `access` and `refresh`. `GET /api/auth/me/` without a token is 401. Swagger opens and is no longer described as “Health only”. Health is still `{"status":"ok"}`. `migrate` passes on a clean SQLite file. The diff has no catalog, lead, or `HomeBlock` models.
- **Artush.** The three codes still come from `languages.py`. An unknown language does not become `en` silently. `i18n.changeLanguage('ru')` does not throw. Health is `{"status":"ok"}`.
- **Vach.** A published Textile product is in `store=textile` and absent from `store=baby`. A draft is missing from the list and by sku (404). A product with no `ru` stays in the list, and the name comes from `en`. `?language=de` is 400. A blank `q` does not lower `count`. `models.py` is not in the diff.
- **Hayk.** Slot `hero` is served in `am`, `en`, and `ru`. `?language=de` is 400. The home page shows the slot text and both stores. Content models are unchanged in the diff.
- **Daniel.** The first subscription is 201 and a row in admin. The same email again is 400 and does not insert a second row. Wholesale without text is 400. The Footer forms call these paths.
- **Mariam.** A product is found by sku and by name. An empty query does not narrow the API list. `models.py` is not in the diff. Account and Cart stay disabled.
- **Karen.** After `seed_textile`, the storefront shows the Textile product and does not show the Baby product. A draft with `is_published=False` is absent.
- **Svet.** The Baby storefront shows its own product and does not overwrite the Textile page.
- **Ashot.** `python manage.py test` is green end to end. The 404 page links to `/`. The diff has no model fields and no `index.css`.

### After student 10 (Ashot)

Leave every box empty until student 10 is in `dev`. This commit does not close Wave 2.

- [ ] `/api/health/` returns `{"status":"ok"}`
- [ ] Swagger lists the contract paths
- [ ] `/api/admin/analytics/` opens for staff only and shows live numbers
- [ ] `/`, `/textile`, and `/baby` read the API
- [ ] an unknown path opens
- [ ] a duplicate subscription does not insert a second row
- [ ] `python manage.py test` is green end to end
- [ ] the wave diff has no cart, orders, or Postgres

## Հայերեն

Աշակերտ **1**, ճյուղը՝ `feat/lead`։ `#` սյունը աշակերտի համարն է և համընկնում է [TASK.md](../../../TASK.md)-ի ու [task-wave2.md](../../../task-wave2.md)-ի վերնագրերի հետ։ «Ումից հետո» նշանակում է՝ ով արդեն պետք է լինի `dev`-ում։ Գործակալին տուր ամբողջ [01-lead.md](../../agents/01-lead.md) ֆայլը։

Wave 1-ը փակ է։ Wave 2-ի ֆիչերն ինքդ չգրել։ **Wave 2-ն ավարտել մինչև հունվարի վերջ։**

| # | Անուն | Ճյուղ | Գոտի | Ումից հետո | PR | Կարգավիճակ |
|---|------|--------|------|------------|----|------------|
| 1 | Lead | `feat/lead` | lead | — | — | վարում է Wave 2-ի հերթը |
| 2 | Suro | `feat/suro-api` | api | Lead | — | չի սկսվել |
| 3 | Artush | `feat/artush-i18n` | i18n | Suro | — | չի սկսվել |
| 4 | Hayk | `feat/hayk-gateway` | gateway | Vach | — | չի սկսվել |
| 5 | Mariam | `feat/mariam-header` | header | Daniel | — | չի սկսվել |
| 6 | Daniel | `feat/daniel-footer` | footer | Hayk | — | չի սկսվել |
| 7 | Karen | `feat/karen-textile` | textile | Mariam | — | չի սկսվել |
| 8 | Svet | `feat/svet-baby` | baby | Karen | — | չի սկսվել |
| 9 | Vach | `feat/vach-catalog` | catalog | Artush | — | չի սկսվել |
| 10 | Ashot | `feat/ashot-ui` | ui | Svet | — | չի սկսվել |

Հերթը՝ **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**։

«Կարգավիճակ» սյունը.

- `չի սկսվել` — Wave 2-ի ճյուղը դեռ վերանայման մեջ չէ
- `սպասում է PR` — աշխատանք կա, բաց PR դեպի `dev` չկա
- `վերանայման մեջ` — PR-ը բաց է, ներքևի դուռը չի անցել
- `dev-ում` — merge է արված, և «Ումից հետո» անունն արդեն `dev`-ում էր

Merge արա միայն այս հերթով։ Եթե «Ումից հետո» դեռ `dev-ում` չէ, PR-ը չընդունել։ Կոնֆլիկտը լուծիր ֆայլի տիրոջ հետ։ Նրա գոտին չվերաշարադրել։ PR-ի համարը մի գրի, քանի դեռ merge չի եղել։

### Merge-ի դռներ

Մեկ PR = մեկ գոտի։ Base-ը `dev` է։ Դռան տեքստը՝ [task-wave2.md](../../../task-wave2.md)-ի այդ աշակերտի «Lead-ը չի merge անում, քանի դեռ» տողը։

- **Suro.** Staff-ը տեսնում է թվերի վեց խումբ, և դրանք համընկնում են ադմինի ցանկերի հետ։ Հյուրը `/api/admin/analytics/`-ում թվեր չի տեսնում։ `POST /api/auth/token/`-ը սուպերօգտատիրոջ email-ով վերադարձնում է `access` և `refresh`։ `GET /api/auth/me/`-ը առանց թոքենի 401 է։ Swagger-ը բացվում է և այլևս «Health only» չի նկարագրվում։ Health-ը մնում է `{"status":"ok"}`։ `migrate`-ը մաքուր SQLite-ով անցնում է։ Diff-ում չկան կատալոգի, հայտերի և `HomeBlock`-ի մոդելներ։
- **Artush.** Երեք կոդերը առաջվա պես գալիս են `languages.py`-ից։ Անհայտ լեզուն լուռ `en` չի դառնում։ `i18n.changeLanguage('ru')`-ն չի ընկնում։ Health-ը `{"status":"ok"}` է։
- **Vach.** Հրապարակված Textile ապրանքը կա `store=textile` ցանկում և չկա `store=baby`-ում։ Սևագիրը չկա ոչ ցանկում, ոչ sku-ով (404)։ Առանց `ru` ապրանքը մնում է ցանկում, անունը գալիս է `en`-ից։ `?language=de`-ն 400 է։ Դատարկ `q`-ն `count`-ը չի փոքրացնում։ `models.py`-ն diff-ում չկա։
- **Hayk.** `hero` սլոթը գալիս է `am`, `en` և `ru` լեզուներով։ `?language=de`-ն 400 է։ Գլխավոր էջը ցույց է տալիս սլոթի տեքստը և երկու խանութը։ Կոնտենտի մոդելները diff-ում չեն փոխվել։
- **Daniel.** Առաջին բաժանորդագրությունը 201 է և տող ադմինում։ Նույն email-ը կրկին 400 է և երկրորդ տող չի ստեղծում։ Մեծածախն առանց տեքստի 400 է։ Footer-ի ձևերը կանչում են այս ուղիները։
- **Mariam.** Ապրանքը գտնվում է sku-ով և անունով։ Դատարկ մուտքը API-ի ցանկը չի նեղացնում։ `models.py`-ն diff-ում չկա։ Account-ը և Cart-ը անջատված են։
- **Karen.** `seed_textile`-ից հետո խանութը ցույց է տալիս Textile-ի ապրանքը և չի ցույց տալիս Baby-ին։ `is_published=False` սևագիրը խանութում չկա։
- **Svet.** Baby-ի խանութը ցույց է տալիս իր ապրանքը և չի վրագրում Textile-ի էջը։
- **Ashot.** `python manage.py test`-ը ամբողջովին կանաչ է։ 404 էջը տանում է `/`։ Diff-ում չկան մոդելների դաշտեր և `index.css`։

### 10-րդ աշակերտից հետո (Ashot)

Բոլոր վանդակները թող դատարկ, քանի դեռ 10-րդ աշակերտը `dev`-ում չէ։ Այս կոմիտը Wave 2-ը չի փակում։

- [ ] `/api/health/`-ը վերադարձնում է `{"status":"ok"}`
- [ ] Swagger-ում երևում են պայմանագրի ուղիները
- [ ] `/api/admin/analytics/`-ը բացվում է միայն staff-ի համար և ցույց է տալիս կենդանի թվեր
- [ ] `/`, `/textile` և `/baby` կարդում են API-ն
- [ ] անհայտ ուղին բացվում է
- [ ] կրկնակի բաժանորդագրությունը երկրորդ տող չի ստեղծում
- [ ] `python manage.py test`-ը ամբողջովին կանաչ է
- [ ] ալիքի diff-ում չկան զամբյուղ, պատվեր և Postgres

---

# Архив — доска Wave 1 (закрыта)

Все строки этой таблицы уже в `dev`. Заново не мержить и не писать. Подробности: [task-advanced.md](../../../task-advanced.md).

| # | Имя | Ветка | Зона | После кого | PR | Статус |
|---|-----|--------|------|------------|----|--------|
| 1 | Lead | `feat/lead` | lead | — | — | каркас проверен, вёл очередь |
| 2 | Suro | `feat/suro-api` | api | Lead | #1 | в `dev` |
| 3 | Artush | `feat/artush-i18n` | i18n | Suro | #2 | в `dev` |
| 4 | Hayk | `feat/hayk-gateway` | gateway | Daniel | #3 | в `dev` |
| 5 | Mariam | `feat/mariam-header` | header | Svet | #11 | в `dev` |
| 6 | Daniel | `feat/daniel-footer` | footer | Vach | #4 | в `dev` |
| 7 | Karen | `feat/karen-textile` | textile | Hayk | #10 | в `dev` |
| 8 | Svet | `feat/svet-baby` | baby | Karen | #5, #9 | в `dev` |
| 9 | Vach | `feat/vach-catalog` | catalog | Artush | #7 | в `dev` |
| 10 | Ashot | `feat/ashot-ui` | ui | Mariam | #8 | в `dev` |

Очередь волны 1: **Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**.

## English

Wave 1 board, closed. Every row is already in `dev`. Do not merge it again.

| # | Name | Branch | Zone | After | PR | Status |
|---|------|--------|------|-------|----|--------|
| 1 | Lead | `feat/lead` | lead | — | — | skeleton checked, ran the queue |
| 2 | Suro | `feat/suro-api` | api | Lead | #1 | in `dev` |
| 3 | Artush | `feat/artush-i18n` | i18n | Suro | #2 | in `dev` |
| 4 | Hayk | `feat/hayk-gateway` | gateway | Daniel | #3 | in `dev` |
| 5 | Mariam | `feat/mariam-header` | header | Svet | #11 | in `dev` |
| 6 | Daniel | `feat/daniel-footer` | footer | Vach | #4 | in `dev` |
| 7 | Karen | `feat/karen-textile` | textile | Hayk | #10 | in `dev` |
| 8 | Svet | `feat/svet-baby` | baby | Karen | #5, #9 | in `dev` |
| 9 | Vach | `feat/vach-catalog` | catalog | Artush | #7 | in `dev` |
| 10 | Ashot | `feat/ashot-ui` | ui | Mariam | #8 | in `dev` |

Wave 1 queue: **Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**.

## Հայերեն

Wave 1-ի տախտակ, փակ է։ Բոլոր տողերն արդեն `dev`-ում են։ Նորից չmerge անել։

| # | Անուն | Ճյուղ | Գոտի | Ումից հետո | PR | Կարգավիճակ |
|---|------|--------|------|------------|----|------------|
| 1 | Lead | `feat/lead` | lead | — | — | կարկասը ստուգված է, վարել է հերթը |
| 2 | Suro | `feat/suro-api` | api | Lead | #1 | `dev`-ում |
| 3 | Artush | `feat/artush-i18n` | i18n | Suro | #2 | `dev`-ում |
| 4 | Hayk | `feat/hayk-gateway` | gateway | Daniel | #3 | `dev`-ում |
| 5 | Mariam | `feat/mariam-header` | header | Svet | #11 | `dev`-ում |
| 6 | Daniel | `feat/daniel-footer` | footer | Vach | #4 | `dev`-ում |
| 7 | Karen | `feat/karen-textile` | textile | Hayk | #10 | `dev`-ում |
| 8 | Svet | `feat/svet-baby` | baby | Karen | #5, #9 | `dev`-ում |
| 9 | Vach | `feat/vach-catalog` | catalog | Artush | #7 | `dev`-ում |
| 10 | Ashot | `feat/ashot-ui` | ui | Mariam | #8 | `dev`-ում |

Wave 1-ի հերթը՝ **Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**։
