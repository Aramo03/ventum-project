# Ventum — Wave 4

Волна 3 остаётся контрактом покупки: корзина, заказ, Idram, письмо. Её не закрывать этой волной и API не ломать. Подробности: [task-wave3.md](task-wave3.md).

Волна 4 — фронтенд по макету. Каждый ученик верстает один большой кусок. Общую страницу одним человеком не собирать.

Макеты:

- [кадр магазина](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12495)
- [второй файл](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=0-1)

**Git:** [CONTRIBUTING.md](CONTRIBUTING.md). Короткий список: [TASK.md](TASK.md). Доска: [docs/zones/lead/README.md](docs/zones/lead/README.md).

Ветки прежние. Старт: `git checkout dev && git pull`, затем своя `feat/...`. Один PR, **base = `dev`**. В `main` не пушить. `--force` на `dev` и `main` не делать. Postgres не поднимать.

Новую строку ученик сразу кладёт в `frontend/src/i18n/am.json`, `en.json` и `ru.json`. Второй axios не создавать. Запросы — через [frontend/src/api/client.js](frontend/src/api/client.js), именной `api`. У компонента три файла: `Name.jsx`, `name.css`, `name.js`.

Очередь merge:

```
Lead → Suro → Vach → Karen → Svet → Daniel → Hayk → Mariam → Artush → Ashot
```

Artush после страниц: он собирает уже нужные подписи и проверяет, что три JSON открываются. Ashot последний: возврат и 404 смотрят на готовую оболочку.

| # | Имя | Ветка | Зона | Агент |
|---|-----|--------|------|--------|
| 1 | Lead | `feat/lead` | доска | [01-lead.md](docs/agents/01-lead.md) |
| 2 | Suro | `feat/suro-api` | `/` | [02-suro.md](docs/agents/02-suro.md) |
| 3 | Artush | `feat/artush-i18n` | три JSON | [03-artush.md](docs/agents/03-artush.md) |
| 4 | Hayk | `feat/hayk-gateway` | `/account` | [04-hayk.md](docs/agents/04-hayk.md) |
| 5 | Mariam | `feat/mariam-header` | шапка и `/cart` | [05-mariam.md](docs/agents/05-mariam.md) |
| 6 | Daniel | `feat/daniel-footer` | подвал | [06-daniel.md](docs/agents/06-daniel.md) |
| 7 | Karen | `feat/karen-textile` | `/textile` | [07-karen.md](docs/agents/07-karen.md) |
| 8 | Svet | `feat/svet-baby` | `/baby` | [08-svet.md](docs/agents/08-svet.md) |
| 9 | Vach | `feat/vach-catalog` | карточка товара | [09-vach.md](docs/agents/09-vach.md) |
| 10 | Ashot | `feat/ashot-ui` | возврат и 404 | [10-ashot.md](docs/agents/10-ashot.md) |

Сайт: `http://127.0.0.1:3000/`. Слово оплаты на экране есть только при `status === 'paid'`. `?success=1` само по себе оплату не показывает.

---

## 1 — Lead

**Папка:** [docs/zones/lead/README.md](docs/zones/lead/README.md). **Ветка:** `feat/lead`. **Агент:** [docs/agents/01-lead.md](docs/agents/01-lead.md).

Экраны не рисовать. PR принимать по очереди имён этой волны. Если «После кого» ещё не в `dev`, строку не мержить. Чужую зону не переписывать. Статус «в dev» ставить только после зелёных ворот этого ученика.

**Lead не закрывает волну 4, пока:** десять экранов очереди лежат в `dev`, три JSON открываются как JSON, `/checkout/success` без `status=paid` не пишет «оплачено».

## 2 — Suro · главная

**Папка:** `frontend/src/pages/Gateway/`. **Ветка:** `feat/suro-api`.

Сверстать `/` по кадру: крупный герой, текст, выбор Textile и Baby. Ссылки ведут на `/textile` и `/baby`. Если запрос приветствия падает, выбор магазина всё равно на экране. Backend корзины и заказа не трогать.

**Нельзя:** `pages/Textile`, `pages/Baby`, `components/Header`, `components/Footer`, `index.css`.

**Lead не мержит, пока:** на `/` видны герой и две карточки магазина, обе ведут в свою витрину.

## 9 — Vach · карточка товара

**Папка:** `frontend/src/components/ProductCard/`. **Ветка:** `feat/vach-catalog`. Ждать Suro.

Общая карточка по кадру: фото, имя, цена, кнопка. Карточка не знает, Textile это или Baby: магазин задаёт страница. Импорт клиента именной: `import { api } from '../../api/client'`. Кнопка шлёт `POST /api/cart/items/` с `{ sku, qty: 1 }`. Ответ 401 показывает текст входа на самой карточке и не уводит на `/account`.

**Нельзя:** править `Textile.jsx` и `Baby.jsx`. Модели каталога не менять.

**Lead не мержит, пока:** карточка живёт в `components/ProductCard/` и не импортирует `api` как default.

## 7 — Karen · textile

**Папка:** `frontend/src/pages/Textile/`. **Ветка:** `feat/karen-textile`. Ждать Vach.

Сверстать `/textile` по кадру: категории, сетка, пустой список, ошибка сети. Товар рисовать карточкой Vach. На странице нет товара Baby. Каталог по-прежнему фильтрует `store === textile`.

**Нельзя:** `pages/Baby`, модели, `index.css`.

**Lead не мержит, пока:** на `/textile` есть кнопка в корзину и нет карточки Baby.

## 8 — Svet · baby

**Папка:** `frontend/src/pages/Baby/`. **Ветка:** `feat/svet-baby`. Ждать Karen.

Сверстать `/baby` по кадру той же плотности, что Textile. Та же карточка Vach. На странице нет товара Textile.

**Нельзя:** файлы Textile и модели.

**Lead не мержит, пока:** на `/baby` есть кнопка в корзину и страница Textile не изменилась в diff.

## 6 — Daniel · подвал

**Папка:** `frontend/src/components/Footer/`. **Ветка:** `feat/daniel-footer`. Ждать Svet.

Сверстать подвал по кадру: колонки, рассылка, заявка опта. Формы по-прежнему бьют в уже существующие POST. Модели заказа и `mail.py` не трогать.

**Нельзя:** `apps/orders`, шапка, витрины.

**Lead не мержит, пока:** подвал на кадре виден на странице, а diff не содержит моделей заказа.

## 4 — Hayk · кабинет

**Папка:** `frontend/src/pages/Account/`. **Ветка:** `feat/hayk-gateway`. Ждать Daniel.

Сверстать `/account` по кадру: форма входа, состояние загрузки, ошибка входа, экран уже вошедшего, выход. Вход по-прежнему через `POST /api/auth/token/` и `setAuthToken`. Checkout и callback не переписывать.

**Нельзя:** `apps/orders/checkout.py`, `idram.py`, главная.

**Lead не мержит, пока:** гость видит форму, неверный пароль показывает ошибку на странице, верный вход показывает сессию.

## 5 — Mariam · шапка и корзина

**Папка:** `frontend/src/components/Header/` и `frontend/src/pages/Cart/`. **Ветка:** `feat/mariam-header`. Ждать Hayk.

Сверстать шапку и `/cart` по кадру: меню, языки, счётчик, строки корзины, количество, пустая корзина. Ссылка Account ведёт на `/account`, Cart — на `/cart`. Сейчас `t('account')` попадает в объект. Подпись должна быть строковым ключом, например `t('account.login')` или отдельный ключ-строка, и тогда на экране виден текст, а не сообщение i18next.

`?success=1` пишет, что возврат получен и оплата ещё не подтверждена. Слов «Paid» / «Оплачено» / «Վճարված» на этом адресе нет.

**Нельзя:** страницы возврата Ashot, `index.css`.

**Lead не мержит, пока:** с токеном в шапке виден `count`, корзина показывает строки, `?success=1` не называется оплатой.

## 3 — Artush · подписи

**Папка:** `frontend/src/i18n/`. **Ветка:** `feat/artush-i18n`. Ждать Mariam.

Собрать подписи кадра, которые уже нужны страницам, в трёх файлах: `am.json`, `en.json`, `ru.json`. Чужие `jsx` и `css` не верстать. Перед PR каждый из трёх файлов открывается через `json.loads`. Повтор ключа и сломанная скобка — повод не открывать PR.

**Нельзя:** страницы Gateway, Textile, Baby, Cart, Account, Footer.

**Lead не мержит, пока:** три файла — валидный JSON, и новые подписи есть на `am`, `en` и `ru`.

## 10 — Ashot · возврат и 404

**Папка:** `frontend/src/pages/Checkout/` и `frontend/src/pages/NotFound/`. **Ветка:** `feat/ashot-ui`. Ждать Artush.

Сверстать `/checkout/success`, `/checkout/fail` и `/404` по кадру. Слово оплаты ставится только если `GET /api/orders/<bill>/` вернул `status === 'paid'`. Без `bill` успех показывает нейтральный текст, неуспех — свой нейтральный текст. `success=1` это слово не добавляет.

**Нельзя:** `index.css`, поля чужих моделей.

**Lead не мержит, пока:** три адреса открываются, и без `status=paid` на экране нет «Paid», «Оплачено» и «Վճարված».

---

## English

Wave 3 stays the purchase contract: cart, order, Idram, and the shop email. This wave does not close it and does not break that API. Detail: [task-wave3.md](task-wave3.md).

Wave 4 is the Figma frontend. Each student builds one large piece. One person does not assemble the whole site.

Designs: [shop frame](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12495), [second file](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=0-1).

**Git:** [CONTRIBUTING.md](CONTRIBUTING.md). Short list: [TASK.md](TASK.md). Board: [docs/zones/lead/README.md](docs/zones/lead/README.md).

Branches stay. Start with `git checkout dev && git pull`, then your own `feat/...`. One pull request, **base = `dev`**. Do not push `main`. No `--force` on `dev` or `main`. Do not start Postgres.

A new string goes into `am.json`, `en.json`, and `ru.json` at once. No second axios. Requests go through [frontend/src/api/client.js](frontend/src/api/client.js), the named `api` export. A component still has `Name.jsx`, `name.css`, and `name.js`.

Merge queue: **Lead → Suro → Vach → Karen → Svet → Daniel → Hayk → Mariam → Artush → Ashot**.

Artush comes after the pages so he can collect the keys and prove the three JSON files parse. Ashot is last: the return pages and 404 sit on a finished shell.

The paid word appears only when `status === 'paid'`. `?success=1` alone does not show it.

### 1 — Lead

Board only. Do not draw screens. Merge by the name queue. If “After” is not in `dev`, do not merge that row. Do not rewrite another zone. Mark «in dev» only after that student’s gates are green.

**Do not close Wave 4 until:** the ten queued screens are in `dev`, the three JSON files parse, and `/checkout/success` does not say paid without `status=paid`.

### 2 — Suro · home

**Folder:** `frontend/src/pages/Gateway/`. **Branch:** `feat/suro-api`.

Build `/` from the frame: a large hero, the text, and the Textile / Baby choice. Links go to `/textile` and `/baby`. If the welcome request fails, the store choice still renders. Do not touch the cart or order backend.

**Do not edit:** Textile, Baby, Header, Footer, `index.css`.

**Lead does not merge until:** `/` shows the hero and two store cards, and each card opens its shop.

### 9 — Vach · product card

**Folder:** `frontend/src/components/ProductCard/`. **Branch:** `feat/vach-catalog`. After Suro.

Shared card from the frame: photo, name, price, button. The card does not know whether the shop is Textile or Baby. Import the client by name: `import { api } from '../../api/client'`. The button posts `{ sku, qty: 1 }` to `POST /api/cart/items/`. A 401 shows the sign-in text on the card and does not send the browser to `/account`.

**Do not edit:** `Textile.jsx`, `Baby.jsx`, catalog models.

**Lead does not merge until:** the card lives in `components/ProductCard/` and does not default-import `api`.

### 7 — Karen · textile

**Folder:** `frontend/src/pages/Textile/`. **Branch:** `feat/karen-textile`. After Vach.

Build `/textile` from the frame: categories, grid, empty list, network error. Draw each product with Vach’s card. No Baby product on this page. The catalog filter stays `store === textile`.

**Lead does not merge until:** `/textile` has an add-to-cart button and shows no Baby card.

### 8 — Svet · baby

**Folder:** `frontend/src/pages/Baby/`. **Branch:** `feat/svet-baby`. After Karen.

Build `/baby` from the frame at the same density as Textile. Use the same card. No Textile product on this page.

**Lead does not merge until:** `/baby` has an add-to-cart button and the Textile files are absent from the diff.

### 6 — Daniel · footer

**Folder:** `frontend/src/components/Footer/`. **Branch:** `feat/daniel-footer`. After Svet.

Build the footer from the frame: columns, newsletter, wholesale form. The forms still post to the existing endpoints. Do not touch order models or `mail.py`.

**Lead does not merge until:** the footer matches the frame and the diff has no order models.

### 4 — Hayk · account

**Folder:** `frontend/src/pages/Account/`. **Branch:** `feat/hayk-gateway`. After Daniel.

Build `/account` from the frame: sign-in form, loading, sign-in error, signed-in screen, sign-out. Sign-in still uses `POST /api/auth/token/` and `setAuthToken`. Do not rewrite checkout or the callback.

**Lead does not merge until:** a guest sees the form, a bad password shows an error on the page, and a good sign-in shows the session.

### 5 — Mariam · header and cart

**Folders:** `frontend/src/components/Header/` and `frontend/src/pages/Cart/`. **Branch:** `feat/mariam-header`. After Hayk.

Build the header and `/cart` from the frame: menu, languages, count, cart lines, quantity, empty cart. Account links to `/account`, Cart links to `/cart`. `t('account')` currently hits an object. The label needs a string key, so the screen shows text.

`?success=1` says the return arrived and payment is not confirmed yet. That screen does not say Paid, Оплачено, or Վճարված.

**Lead does not merge until:** a token shows `count` in the header, the cart lists lines, and `?success=1` is not called paid.

### 3 — Artush · copy

**Folder:** `frontend/src/i18n/`. **Branch:** `feat/artush-i18n`. After Mariam.

Put the frame labels the pages already need into `am.json`, `en.json`, and `ru.json`. Do not lay out other people’s `jsx` or `css`. Before the PR, `json.loads` accepts each file. A duplicate key or a broken brace means the PR stays closed.

**Lead does not merge until:** the three files are valid JSON and the new labels exist in `am`, `en`, and `ru`.

### 10 — Ashot · return and 404

**Folders:** `frontend/src/pages/Checkout/` and `frontend/src/pages/NotFound/`. **Branch:** `feat/ashot-ui`. After Artush.

Build `/checkout/success`, `/checkout/fail`, and `/404` from the frame. The paid word appears only when `GET /api/orders/<bill>/` returns `status === 'paid'`. With no `bill`, success uses the neutral line and fail uses its own neutral line. `success=1` does not add the paid word.

**Do not edit:** `index.css` or other people’s model fields.

**Lead does not merge until:** the three routes open, and without `status=paid` the screen has no Paid, Оплачено, or Վճարված.

---

## Հայերեն

Wave 3-ը մնում է գնման պայմանագիր. զամբյուղ, պատվեր, Idram, նամակ։ Այս ալիքը այն չի փակում և API-ն չի կոտրում։ Մանրամասն՝ [task-wave3.md](task-wave3.md)։

Wave 4-ը Figma-ի ֆրոնտենդն է։ Ամեն աշակերտ հավաքում է մեկ մեծ կտոր։ Ամբողջ կայքը մեկ մարդ չի հավաքում։

Մակետներ՝ [խանութ](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12495), [երկրորդ ֆայլ](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=0-1)։

**Git՝** [CONTRIBUTING.md](CONTRIBUTING.md)։ Կարճ ցանկ՝ [TASK.md](TASK.md)։ Տախտակ՝ [docs/zones/lead/README.md](docs/zones/lead/README.md)։

Ճյուղերը նույնն են։ Սկիզբ՝ `git checkout dev && git pull`, ապա սեփական `feat/...`։ Մեկ PR, **base = `dev`**։ `main` չենք push անում։ `--force` չկա `dev`-ի և `main`-ի վրա։ Postgres չբարձրացնել։

Նոր տողը միանգամից գնում է `am.json`, `en.json` և `ru.json`։ Երկրորդ axios չստեղծել։ Հարցումները՝ [frontend/src/api/client.js](frontend/src/api/client.js)-ի անվանական `api`-ով։ Կոմպոնենտը դեռ ունի `Name.jsx`, `name.css`, `name.js`։

Merge-ի հերթը՝ **Lead → Suro → Vach → Karen → Svet → Daniel → Hayk → Mariam → Artush → Ashot**։

Artush-ը էջերից հետո է. հավաքում է արդեն պետք եղած գրությունները և ստուգում, որ երեք JSON-ը բացվում են։ Ashot-ը վերջինն է. վերադարձն ու 404-ը նայում են պատրաստի պատյանին։

«Վճարված» բառը կա միայն `status === 'paid'` դեպքում։ `?success=1`-ը միայնակ այդ բառը չի դնում։

### 1 — Lead

Միայն տախտակ։ Էկրաններ չնկարել։ Merge անել այս ալիքի անունների հերթով։ Եթե «ումից հետո»-ն դեռ `dev`-ում չէ, տողը չմիավորել։ Ուրիշի գոտին չվերաշարադրել։ «dev-ում» դնել միայն այդ աշակերտի կանաչ դռներից հետո։

**Wave 4-ը չփակել, քանի դեռ** հերթի տասը էկրանը `dev`-ում են, երեք JSON-ը բացվում են որպես JSON, և `/checkout/success`-ը առանց `status=paid` «վճարված» չի գրում։

### 2 — Suro · գլխավոր

**Պանակ՝** `frontend/src/pages/Gateway/`։ **Ճյուղ՝** `feat/suro-api`։

Հավաքել `/`-ը կադրից. մեծ վերնագիր, տեքստ, Textile և Baby ընտրություն։ Հղումները տանում են `/textile` և `/baby`։ Եթե ողջույնի հարցումը ընկնում է, խանութի ընտրությունը էկրանին մնում է։ Զամբյուղի և պատվերի backend-ը չկպնել։

**Lead-ը չի merge անում, քանի դեռ** `/`-ում երևում են վերնագիրը և երկու խանութի քարտը, և յուրաքանչյուրը բացում է իր վիտրինան։

### 9 — Vach · ապրանքի քարտ

**Պանակ՝** `frontend/src/components/ProductCard/`։ **Ճյուղ՝** `feat/vach-catalog`։ Suro-ից հետո։

Ընդհանուր քարտ կադրից. նկար, անուն, գին, կոճակ։ Քարտը չգիտի՝ Textile է թե Baby։ Հաճախորդի ներմուծումը անվանական է. `import { api } from '../../api/client'`։ Կոճակը ուղարկում է `{ sku, qty: 1 }` դեպի `POST /api/cart/items/`։ 401-ը գրությունը ցույց է տալիս քարտի վրա և չի տանում `/account`։

**Lead-ը չի merge անում, քանի դեռ** քարտը `components/ProductCard/`-ում է և `api`-ն default չի ներմուծում։

### 7 — Karen · textile

**Պանակ՝** `frontend/src/pages/Textile/`։ **Ճյուղ՝** `feat/karen-textile`։ Vach-ից հետո։

Հավաքել `/textile`-ը կադրից. կատեգորիաներ, ցանց, դատարկ ցանկ, ցանցի սխալ։ Ապրանքը նկարել Vach-ի քարտով։ Էջում Baby ապրանք չկա։ Ֆիլտրը մնում է `store === textile`։

**Lead-ը չի merge անում, քանի դեռ** `/textile`-ում կա զամբյուղի կոճակ և չկա Baby քարտ։

### 8 — Svet · baby

**Պանակ՝** `frontend/src/pages/Baby/`։ **Ճյուղ՝** `feat/svet-baby`։ Karen-ից հետո։

Հավաքել `/baby`-ն նույն խտությամբ։ Նույն քարտը։ Էջում Textile ապրանք չկա։

**Lead-ը չի merge անում, քանի դեռ** `/baby`-ում կա զամբյուղի կոճակ, իսկ Textile-ի ֆայլերը diff-ում չկան։

### 6 — Daniel · ներքև

**Պանակ՝** `frontend/src/components/Footer/`։ **Ճյուղ՝** `feat/daniel-footer`։ Svet-ից հետո։

Հավաքել ներքևը կադրից. սյուներ, բաժանորդագրություն, մեծածախ հայտ։ Ձևերը դեռ գնում են արդեն եղած POST-երին։ Պատվերի մոդելները և `mail.py`-ը չկպնել։

**Lead-ը չի merge անում, քանի դեռ** ներքևը երևում է էջում, իսկ diff-ում պատվերի մոդել չկա։

### 4 — Hayk · հաշիվ

**Պանակ՝** `frontend/src/pages/Account/`։ **Ճյուղ՝** `feat/hayk-gateway`։ Daniel-ից հետո։

Հավաքել `/account`-ը կադրից. մուտքի ձև, բեռնում, մուտքի սխալ, արդեն մտած էկրան, ելք։ Մուտքը մնում է `POST /api/auth/token/` և `setAuthToken`։ Checkout-ը և callback-ը չվերաշարադրել։

**Lead-ը չի merge անում, քանի դեռ** հյուրը տեսնում է ձևը, սխալ գաղտնաբառը սխալ է ցույց տալիս էջում, իսկ ճիշտ մուտքը ցույց է տալիս սեսիան։

### 5 — Mariam · վերնագիր և զամբյուղ

**Պանակներ՝** `frontend/src/components/Header/` և `frontend/src/pages/Cart/`։ **Ճյուղ՝** `feat/mariam-header`։ Hayk-ից հետո։

Հավաքել վերնագիրը և `/cart`-ը կադրից. մենյու, լեզուներ, հաշվիչ, տողեր, քանակ, դատարկ զամբյուղ։ Account-ը տանում է `/account`, Cart-ը՝ `/cart`։ `t('account')`-ը հիմա ընկնում է օբյեկտի վրա։ Գրությունը պետք է լինի տողային բանալի։

`?success=1`-ը գրում է, որ վերադարձը եկել է և վճարումը դեռ հաստատված չէ։ Այդ հասցեում չկան Paid, «Оплачено», Վճարված։

**Lead-ը չի merge անում, քանի դեռ** թոքենով վերնագրում երևում է `count`, զամբյուղը ցույց է տալիս տողերը, և `?success=1`-ը վճարված չի կոչվում։

### 3 — Artush · գրություններ

**Պանակ՝** `frontend/src/i18n/`։ **Ճյուղ՝** `feat/artush-i18n`։ Mariam-ից հետո։

Կադրի այն գրությունները, որ էջերին արդեն պետք են, դնել `am.json`, `en.json` և `ru.json`։ Ուրիշի `jsx` և `css` չհավաքել։ PR-ից առաջ `json.loads`-ը ընդունում է ամեն ֆայլ։ Կրկնվող բանալին կամ կոտրված փակագիծը նշանակում է՝ PR-ը չբացել։

**Lead-ը չի merge անում, քանի դեռ** երեք ֆայլը վավեր JSON են, և նոր գրությունները կան `am`, `en` և `ru` լեզուներում։

### 10 — Ashot · վերադարձ և 404

**Պանակներ՝** `frontend/src/pages/Checkout/` և `frontend/src/pages/NotFound/`։ **Ճյուղ՝** `feat/ashot-ui`։ Artush-ից հետո։

Հավաքել `/checkout/success`, `/checkout/fail` և `/404` կադրից։ «Վճարված» բառը դրվում է միայն երբ `GET /api/orders/<bill>/` վերադարձնում է `status === 'paid'`։ Առանց `bill` հաջողությունը ցույց է տալիս չեզոք տող, ձախողումը՝ իր չեզոք տողը։ `success=1`-ը այդ բառը չի ավելացնում։

**Չկպնել** `index.css`-ին և ուրիշի մոդելների դաշտերին։

**Lead-ը չի merge անում, քանի դեռ** երեք հասցեն բացվում են, և առանց `status=paid` էկրանին չկան Paid, «Оплачено» և Վճարված։
