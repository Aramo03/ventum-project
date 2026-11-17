# 1 — Lead

**Номер ученика:** 1. Тот же номер в [TASK.md](../../../TASK.md) и в разделе «1 — Lead» файла [task-wave3.md](../../../task-wave3.md).  
**Ветка:** `feat/lead`  
**Задание:** [task-wave3.md](../../../task-wave3.md), раздел «1 — Lead».  
**Агент:** [docs/agents/01-lead.md](../../agents/01-lead.md). Отдай агенту файл целиком.

Wave 1 и Wave 2 закрыты. Чужие фичи волны 3 не писать. PR принимать только по очереди ниже. **Срок волны 3:** до конца января 2027. Postgres не поднимать.

## Доска merge — Wave 3

Колонка `#` — номер ученика, не шаг очереди. Колонка «После кого» — кто уже должен лежать в `dev`, прежде чем мержить эту строку.

| # | Имя | Ветка | Зона | После кого | PR | Статус |
|---|-----|--------|------|------------|----|--------|
| 1 | Lead | `feat/lead` | lead | — | — | в ревью |
| 2 | Suro | `feat/suro-api` | api | Lead | — | не начато |
| 3 | Artush | `feat/artush-i18n` | i18n | Suro | — | не начато |
| 4 | Hayk | `feat/hayk-gateway` | payments | Daniel | — | не начато |
| 5 | Mariam | `feat/mariam-header` | cart-page | Hayk | — | не начато |
| 6 | Daniel | `feat/daniel-footer` | orders | Svet | — | не начато |
| 7 | Karen | `feat/karen-textile` | textile | Vach | — | не начато |
| 8 | Svet | `feat/svet-baby` | baby | Karen | — | не начато |
| 9 | Vach | `feat/vach-catalog` | cart | Artush | — | не начато |
| 10 | Ashot | `feat/ashot-ui` | ui | Mariam | — | не начато |

Очередь именами: **Lead → Suro → Artush → Vach → Karen → Svet → Daniel → Hayk → Mariam → Ashot**.

Колонка «Статус»:

- `не начато` — ветка волны 3 ещё не в ревью
- `ждёт PR` — работа есть, открытого PR в `dev` нет
- `в ревью` — PR открыт, ворота ниже не пройдены
- `в dev` — смержено, и имя из «После кого» уже было в `dev`

Мержить только по этой очереди. Если «После кого» ещё не `в dev`, PR не принимать. Конфликт чинить вместе с владельцем файла. Чужую зону не переписывать. Номер PR не ставить, пока merge не случился.

## Ворота merge

Один PR = одна зона. Base — `dev`. Текст ворот — «Lead не мержит, пока» из раздела ученика в [task-wave3.md](../../../task-wave3.md).

- **Suro.** `cart` и `orders` стоят в `INSTALLED_APPS`. `migrate` на чистом SQLite проходит. В `settings` читаются `IDRAM_REC_ACCOUNT`, `IDRAM_SECRET_KEY`, `IDRAM_PAYMENT_URL`, `IDRAM_LANGUAGE`, `ORDER_NOTIFY_EMAIL`. В diff нет моделей и платёжных вью.
- **Artush.** `idram_language('am'|'en'|'ru')` даёт `AM` / `EN` / `RU`. `de` не становится `EN` молча. Health отвечает `{"status":"ok"}`.
- **Vach.** Без токена `GET /api/cart/` даёт 401. Неизвестный или снятый sku — 404. Повторный POST того же sku увеличивает количество, а не плодит строку. `qty` 0 удаляет строку. Цена — строка с двумя знаками. `models.py` каталога в diff нет.
- **Karen.** На `/textile` кнопка кладёт товар Textile в корзину и не рисует товар Baby.
- **Svet.** На `/baby` кнопка кладёт товар Baby и не меняет страницу Textile.
- **Daniel.** Заказ создаётся со статусом `pending` и уникальным `bill_no`. Чужой пользователь по этому номеру получает 404. `send_order_paid_email` не меняет статус. Пустой `ORDER_NOTIFY_EMAIL` не роняет вызов. В diff нет вью Idram и нет правок Footer.
- **Hayk.** Пустая корзина на `POST /api/checkout/` даёт 400. Непустая создаёт `pending`, очищает корзину и не ставит `paid`. Precheck с верной суммой отвечает `OK` и не меняет статус. Верный checksum ставит `paid` и шлёт одно письмо. Повтор того же POST снова `OK` и без второго письма. Плохой checksum оставляет `pending`. `/account` логинит через уже существующий `POST /api/auth/token/` и `setAuthToken`.
- **Mariam.** Account ведёт на `/account`, Cart — на `/cart`. С токеном в шапке виден `count`. Страница корзины показывает строки. `?success=1` на экране не написано как «оплачено».
- **Ashot.** `/checkout/success` и `/checkout/fail` читают `GET /api/orders/<bill_no>/`. Слово «оплачено» есть только при `status=paid`. `python manage.py test` зелёный целиком. В diff нет полей чужих моделей и нет `index.css`.

## После PR ученика 10 (Ashot)

Этот список не отмечать, пока ученик 10 не в `dev`. Wave 3 этим коммитом не закрывается.

- [ ] `/api/health/` отвечает `{"status":"ok"}`
- [ ] Swagger показывает корзину, checkout, callback Idram и заказ
- [ ] `/`, `/textile` и `/baby` по-прежнему читают API
- [ ] `/cart`, `/account` и `/checkout/success` открываются
- [ ] повторный callback Idram не шлёт второе письмо
- [ ] `python manage.py test` зелёный целиком
- [ ] Postgres в diff волны нет

## English

Student **1**, branch `feat/lead`. The `#` column is the student number and matches [TASK.md](../../../TASK.md) and the headings in [task-wave3.md](../../../task-wave3.md). “After” is the person who must already be in `dev`. Give your agent [01-lead.md](../../agents/01-lead.md) in full.

Wave 1 and Wave 2 are closed. Do not write Wave 3 features yourself. **Finish Wave 3 by the end of January 2027.** Do not start Postgres.

| # | Name | Branch | Zone | After | PR | Status |
|---|------|--------|------|-------|----|--------|
| 1 | Lead | `feat/lead` | lead | — | — | in review |
| 2 | Suro | `feat/suro-api` | api | Lead | — | not started |
| 3 | Artush | `feat/artush-i18n` | i18n | Suro | — | not started |
| 4 | Hayk | `feat/hayk-gateway` | payments | Daniel | — | not started |
| 5 | Mariam | `feat/mariam-header` | cart-page | Hayk | — | not started |
| 6 | Daniel | `feat/daniel-footer` | orders | Svet | — | not started |
| 7 | Karen | `feat/karen-textile` | textile | Vach | — | not started |
| 8 | Svet | `feat/svet-baby` | baby | Karen | — | not started |
| 9 | Vach | `feat/vach-catalog` | cart | Artush | — | not started |
| 10 | Ashot | `feat/ashot-ui` | ui | Mariam | — | not started |

Queue: **Lead → Suro → Artush → Vach → Karen → Svet → Daniel → Hayk → Mariam → Ashot**.

Merge only in this order. If “After” is not yet `in dev`, do not merge. Do not write a PR number before the merge.

### Merge gates

One pull request is one zone. Base is `dev`. Each gate is the “Lead does not merge until” line in that student’s section of [task-wave3.md](../../../task-wave3.md).

- **Suro.** `cart` and `orders` are installed. `migrate` passes on a clean SQLite file. Settings read the Idram keys and `ORDER_NOTIFY_EMAIL`. The diff has no models and no payment views.
- **Artush.** `idram_language` maps `am`/`en`/`ru` to `AM`/`EN`/`RU`. `de` does not become `EN`. Health is `{"status":"ok"}`.
- **Vach.** `GET /api/cart/` without a token is 401. An unknown or unpublished sku is 404. A second POST of the same sku increases quantity. `qty` 0 deletes the line. Price is a two-decimal string. Catalog `models.py` is not in the diff.
- **Karen.** `/textile` adds a Textile product and does not show a Baby product.
- **Svet.** `/baby` adds a Baby product and does not change the Textile page.
- **Daniel.** An order starts `pending` with a unique `bill_no`. Another user gets 404 for that number. `send_order_paid_email` does not change status. An empty `ORDER_NOTIFY_EMAIL` does not raise. No Idram view and no Footer edits.
- **Hayk.** An empty cart is 400 on checkout. A filled cart becomes `pending`, the cart is cleared, and the order is not `paid`. A matching precheck is `OK` and does not change status. A valid checksum sets `paid` and sends one email. The same POST again is `OK` with no second email. A bad checksum leaves `pending`. `/account` logs in through the existing token endpoint and `setAuthToken`.
- **Mariam.** Account links to `/account`, Cart links to `/cart`, and the header shows `count` when a token exists. `?success=1` is not rendered as paid.
- **Ashot.** Success and fail pages read the order GET. The paid word appears only when `status` is `paid`. `python manage.py test` is green. No foreign model fields and no `index.css` in the diff.

### After student 10 (Ashot)

Leave every box empty until student 10 is in `dev`. This commit does not close Wave 3.

- [ ] `/api/health/` returns `{"status":"ok"}`
- [ ] Swagger lists cart, checkout, the Idram callback, and the order
- [ ] `/`, `/textile`, and `/baby` still read the API
- [ ] `/cart`, `/account`, and `/checkout/success` open
- [ ] a duplicate Idram callback does not send a second email
- [ ] `python manage.py test` is green end to end
- [ ] the wave diff has no Postgres

## Հայերեն

Աշակերտ **1**, ճյուղը՝ `feat/lead`։ `#` սյունը աշակերտի համարն է և համընկնում է [TASK.md](../../../TASK.md)-ի ու [task-wave3.md](../../../task-wave3.md)-ի վերնագրերի հետ։ «Ումից հետո» նշանակում է՝ ով արդեն պետք է լինի `dev`-ում։ Գործակալին տուր ամբողջ [01-lead.md](../../agents/01-lead.md) ֆայլը։

Wave 1-ը և Wave 2-ը փակ են։ Wave 3-ի ֆիչերն ինքդ չգրել։ **Wave 3-ն ավարտել մինչև 2027-ի հունվարի վերջ։** Postgres չբարձրացնել։

| # | Անուն | Ճյուղ | Գոտի | Ումից հետո | PR | Կարգավիճակ |
|---|------|--------|------|------------|----|------------|
| 1 | Lead | `feat/lead` | lead | — | — | գրախոսության մեջ |
| 2 | Suro | `feat/suro-api` | api | Lead | — | չի սկսվել |
| 3 | Artush | `feat/artush-i18n` | i18n | Suro | — | չի սկսվել |
| 4 | Hayk | `feat/hayk-gateway` | payments | Daniel | — | չի սկսվել |
| 5 | Mariam | `feat/mariam-header` | cart-page | Hayk | — | չի սկսվել |
| 6 | Daniel | `feat/daniel-footer` | orders | Svet | — | չի սկսվել |
| 7 | Karen | `feat/karen-textile` | textile | Vach | — | չի սկսվել |
| 8 | Svet | `feat/svet-baby` | baby | Karen | — | չի սկսվել |
| 9 | Vach | `feat/vach-catalog` | cart | Artush | — | չի սկսվել |
| 10 | Ashot | `feat/ashot-ui` | ui | Mariam | — | չի սկսվել |

Հերթը՝ **Lead → Suro → Artush → Vach → Karen → Svet → Daniel → Hayk → Mariam → Ashot**։

Merge արա միայն այս հերթով։ Եթե «Ումից հետո» դեռ `dev-ում` չէ, PR-ը չընդունել։ PR-ի համարը մի գրի, քանի դեռ merge չի եղել։

### Merge-ի դռներ

Մեկ PR = մեկ գոտի։ Base-ը `dev` է։ Դռան տեքստը՝ [task-wave3.md](../../../task-wave3.md)-ի այդ աշակերտի «Lead-ը չի merge անում, քանի դեռ» տողը։

- **Suro.** `cart`-ը և `orders`-ը `INSTALLED_APPS`-ում են։ `migrate`-ը մաքուր SQLite-ով անցնում է։ Settings-ը կարդում է Idram-ի բանալիները և `ORDER_NOTIFY_EMAIL`-ը։ Diff-ում չկան մոդելներ և վճարման վյուեր։
- **Artush.** `idram_language`-ը `am`/`en`/`ru`-ն դարձնում է `AM`/`EN`/`RU`։ `de`-ն լուռ `EN` չի դառնում։ Health-ը `{"status":"ok"}` է։
- **Vach.** Առանց թոքենի `GET /api/cart/`-ը 401 է։ Անհայտ կամ չհրապարակված sku-ն 404 է։ Նույն sku-ի երկրորդ POST-ը քանակն է ավելացնում։ `qty` 0-ն ջնջում է տողը։ Գինը երկու նիշով տող է։ Կատալոգի `models.py`-ն diff-ում չկա։
- **Karen.** `/textile`-ը Textile ապրանք է դնում զամբյուղ և Baby չի ցույց տալիս։
- **Svet.** `/baby`-ը Baby ապրանք է դնում և Textile էջը չի փոխում։
- **Daniel.** Պատվերը սկսում է `pending`-ով և եզակի `bill_no`-ով։ Ուրիշ օգտատերը այդ համարով 404 է ստանում։ `send_order_paid_email`-ը կարգավիճակը չի փոխում։ Դատարկ `ORDER_NOTIFY_EMAIL`-ը կանչը չի գցում։ Idram-ի վյու և Footer-ի ուղղում չկա։
- **Hayk.** Դատարկ զամբյուղը checkout-ում 400 է։ Լիքը զամբյուղը դառնում է `pending`, զամբյուղը մաքրվում է, `paid` չի դրվում։ Ճիշտ precheck-ը `OK` է և կարգավիճակը չի փոխում։ Ճիշտ checksum-ը դնում է `paid` և ուղարկում է մեկ նամակ։ Նույն POST-ը կրկին `OK` է՝ առանց երկրորդ նամակի։ Վատ checksum-ը թողնում է `pending`։ `/account`-ը մտնում է արդեն եղած token endpoint-ով և `setAuthToken`-ով։
- **Mariam.** Account-ը տանում է `/account`, Cart-ը՝ `/cart`։ Թոքենով վերնագրում երևում է `count`։ `?success=1`-ը էկրանին «վճարված» չի գրվում։
- **Ashot.** Հաջողության և ձախողման էջերը կարդում են պատվերի GET-ը։ «Վճարված» բառը կա միայն `status=paid` դեպքում։ `python manage.py test`-ը կանաչ է։ Diff-ում չկան ուրիշի մոդելների դաշտեր և `index.css`։

### 10-րդ աշակերտից հետո (Ashot)

Բոլոր վանդակները թող դատարկ, քանի դեռ 10-րդ աշակերտը `dev`-ում չէ։ Այս կոմիտը Wave 3-ը չի փակում։

- [ ] `/api/health/`-ը վերադարձնում է `{"status":"ok"}`
- [ ] Swagger-ում երևում են զամբյուղը, checkout-ը, Idram callback-ը և պատվերը
- [ ] `/`, `/textile` և `/baby` առաջվա պես կարդում են API-ն
- [ ] `/cart`, `/account` և `/checkout/success` բացվում են
- [ ] Idram-ի կրկնակի callback-ը երկրորդ նամակ չի ուղարկում
- [ ] `python manage.py test`-ը ամբողջովին կանաչ է
- [ ] ալիքի diff-ում Postgres չկա

---

# Архив — доска Wave 2 (закрыта)

Не выполнять и не мержить заново. Публичное API и витрина уже в этом дереве. Подробности: [task-wave2.md](../../../task-wave2.md).

Номера PR сюда не переносятся: на рабочей доске волны их не было. Выдумывать номер нельзя. Колонка PR остаётся `—`.

| # | Имя | Ветка | Зона | После кого | PR | Статус |
|---|-----|--------|------|------------|----|--------|
| 1 | Lead | `feat/lead` | lead | — | — | закрыта в этом дереве |
| 2 | Suro | `feat/suro-api` | api | Lead | — | закрыта в этом дереве |
| 3 | Artush | `feat/artush-i18n` | i18n | Suro | — | закрыта в этом дереве |
| 4 | Hayk | `feat/hayk-gateway` | gateway | Vach | — | закрыта в этом дереве |
| 5 | Mariam | `feat/mariam-header` | header | Daniel | — | закрыта в этом дереве |
| 6 | Daniel | `feat/daniel-footer` | footer | Hayk | — | закрыта в этом дереве |
| 7 | Karen | `feat/karen-textile` | textile | Mariam | — | закрыта в этом дереве |
| 8 | Svet | `feat/svet-baby` | baby | Karen | — | закрыта в этом дереве |
| 9 | Vach | `feat/vach-catalog` | catalog | Artush | — | закрыта в этом дереве |
| 10 | Ashot | `feat/ashot-ui` | ui | Svet | — | закрыта в этом дереве |

Очередь волны 2: **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**.

Проверки закрытия. Галочка стоит только на том, что проверено в коммите, который закрыл волну. Остальное не отмечено: эти адреса в том коммите в браузере не открывались.

- [ ] `/api/health/` отвечает `{"status":"ok"}`
- [ ] Swagger показывает пути контракта волны 2
- [ ] `/api/admin/analytics/` открывается только staff и показывает живые числа
- [x] `/`, `/textile` и `/baby` читают API
- [ ] несуществующий путь открывается
- [x] повторная подписка не создаёт вторую строку
- [x] `python manage.py test` зелёный целиком
- [x] в diff закрытия нет корзины, заказов и Postgres

## English

Wave 2 board, closed. Do not merge it again. PR numbers stay `—`: the working board never had them, and they are not invented here. Detail: [task-wave2.md](../../../task-wave2.md).

| # | Name | Branch | Zone | After | PR | Status |
|---|------|--------|------|-------|----|--------|
| 1 | Lead | `feat/lead` | lead | — | — | closed in this tree |
| 2 | Suro | `feat/suro-api` | api | Lead | — | closed in this tree |
| 3 | Artush | `feat/artush-i18n` | i18n | Suro | — | closed in this tree |
| 4 | Hayk | `feat/hayk-gateway` | gateway | Vach | — | closed in this tree |
| 5 | Mariam | `feat/mariam-header` | header | Daniel | — | closed in this tree |
| 6 | Daniel | `feat/daniel-footer` | footer | Hayk | — | closed in this tree |
| 7 | Karen | `feat/karen-textile` | textile | Mariam | — | closed in this tree |
| 8 | Svet | `feat/svet-baby` | baby | Karen | — | closed in this tree |
| 9 | Vach | `feat/vach-catalog` | catalog | Artush | — | closed in this tree |
| 10 | Ashot | `feat/ashot-ui` | ui | Svet | — | closed in this tree |

Wave 2 queue: **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**.

A box is checked only when that close commit actually ran the check.

- [ ] `/api/health/` returns `{"status":"ok"}`
- [ ] Swagger lists the Wave 2 contract paths
- [ ] `/api/admin/analytics/` opens for staff only and shows live numbers
- [x] `/`, `/textile`, and `/baby` read the API
- [ ] an unknown path opens
- [x] a duplicate subscription does not insert a second row
- [x] `python manage.py test` is green end to end
- [x] the close diff has no cart, orders, or Postgres

## Հայերեն

Wave 2-ի տախտակ, փակ է։ Նորից չmerge անել։ PR-ի համարները մնում են `—`. աշխատանքային տախտակին չկային և այստեղ չեն հորինվում։ Մանրամասն՝ [task-wave2.md](../../../task-wave2.md)։

| # | Անուն | Ճյուղ | Գոտի | Ումից հետո | PR | Կարգավիճակ |
|---|------|--------|------|------------|----|------------|
| 1 | Lead | `feat/lead` | lead | — | — | փակ է այս ծառում |
| 2 | Suro | `feat/suro-api` | api | Lead | — | փակ է այս ծառում |
| 3 | Artush | `feat/artush-i18n` | i18n | Suro | — | փակ է այս ծառում |
| 4 | Hayk | `feat/hayk-gateway` | gateway | Vach | — | փակ է այս ծառում |
| 5 | Mariam | `feat/mariam-header` | header | Daniel | — | փակ է այս ծառում |
| 6 | Daniel | `feat/daniel-footer` | footer | Hayk | — | փակ է այս ծառում |
| 7 | Karen | `feat/karen-textile` | textile | Mariam | — | փակ է այս ծառում |
| 8 | Svet | `feat/svet-baby` | baby | Karen | — | փակ է այս ծառում |
| 9 | Vach | `feat/vach-catalog` | catalog | Artush | — | փակ է այս ծառում |
| 10 | Ashot | `feat/ashot-ui` | ui | Svet | — | փակ է այս ծառում |

Wave 2-ի հերթը՝ **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**։

Վանդակը նշվում է միայն այն ժամանակ, երբ փակող կոմիտն իրոք ստուգել է այդ կետը։

- [ ] `/api/health/`-ը վերադարձնում է `{"status":"ok"}`
- [ ] Swagger-ում երևում են Wave 2-ի ուղիները
- [ ] `/api/admin/analytics/`-ը բացվում է միայն staff-ի համար
- [x] `/`, `/textile` և `/baby` կարդում են API-ն
- [ ] անհայտ ուղին բացվում է
- [x] կրկնակի բաժանորդագրությունը երկրորդ տող չի ստեղծում
- [x] `python manage.py test`-ը ամբողջովին կանաչ է
- [x] փակող diff-ում չկան զամբյուղ, պատվեր և Postgres

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
