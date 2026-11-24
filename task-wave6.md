# Ventum — Wave 6

Волна 5 закрыта: полные кадры главной, дизайн-системы, Textile и Baby уже в `dev`. Их не сносить. Волна 4 закрыта. Волна 3 остаётся контрактом покупки: корзина, заказ, Idram, письмо. Её не закрывать этой волной и API не ломать. Подробности: [task-wave3.md](task-wave3.md). Экран волны 5: [task-wave5.md](task-wave5.md).

Волна 6 — довести сайт до обоих файлов Figma, с CSS-анимацией и оболочкой, в которой `main` растёт по контенту. Каждый ученик доводит свою зону. Общую страницу одним человеком не собирать. Высоту Hug и подпись 1430 / 1512 на `main` не ставить.

Регистрация, Google, `/account` с кнопкой Google и первая перерисовка `/product/:sku` и `/cart` уже лежат в `dev` до старта этой волны. Их снова не поручать. django-allauth, подтверждение почты и гостевой заказ не добавлять.

Макеты файла 1 [Untitled](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=0-1):

- [Ventum · Gateway desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=178-46) — `178-46`
- [Ventum · Design system](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12117) — `6-12117`
- [Gateway · Mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12462) — `6-12462`
- [Ventum Textile · Desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12494) — `6-12494`
- Store navigation внутри Textile desktop — `6-12495` (шапка Mariam, не секция Textile)
- [Ventum Textile · Mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12776) — `6-12776`
- [Ventum Baby · Desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-13059) — `6-13059`
- [Ventum Baby · Mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-13319) — `6-13319`

Макеты файла 2 [Untitled](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=0-1), страница `0-1`. В файле ровно два верхних кадра, оба desktop. Отдельного mobile, account, receipt, textile-product и третьего брейкпоинта нет. Высоту Hug не хранить как фиксированную высоту страницы. Ширину 1512 в новый `@media` не превращать. Desktop проекта остаётся 1440. Mobile — ширина уже существующего mobile-кадра того магазина.

- [Ventum Baby product detail](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=8-511) — `8-511`
- [Ventum Baby checkout](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=3-1157) — `3-1157` (подпись **1512 × 1430 Hug**)

Текстовые слои `98-574` и `98-575` со ссылкой на файл 2 не верстать.

**Git:** [CONTRIBUTING.md](CONTRIBUTING.md). Короткий список: [TASK.md](TASK.md). Доска: [docs/zones/lead/README.md](docs/zones/lead/README.md).

Ветки прежние. Старт: `git checkout dev && git pull`, затем своя `feat/...`. Один PR, **base = `dev`**. В `main` не пушить. `--force` на `dev` и `main` не делать. Postgres не поднимать. Новых полей моделей нет. Нового способа оплаты нет. Второй axios не создавать. `.env`, секреты Google и Idram в git не класть.

Новую строку ученик сразу кладёт в `frontend/src/i18n/am.json`, `en.json` и `ru.json`. Армянский текст кадра — источник `am.json`. `en` и `ru` — перевод, не копия армянского. Запросы — через [frontend/src/api/client.js](frontend/src/api/client.js), именной `api`. У компонента три файла: `Name.jsx`, `name.css`, `name.js`.

Общие правила экрана:

- Слово Paid / Оплачено / Վճարված есть только при `status === 'paid'`. `?success=1` — возврат, не оплата.
- Кнопка Card и кнопка Cash обе шлют `POST /api/cart/items/` с `{ sku, qty: 1 }`. Cash не открывает Idram и не ставит заказ в `paid`.
- Размер, старая цена, скидка, остаток и цвет рисуются только если API уже их отдаёт. Поле модели и миграцию ради макета не добавлять. В `productExtras` цвета нет — строку цвета не показывать. Wishlist и share не подключать. Слой States на товаре статичный.
- Доставку кадра 3000 ֏ к сумме не прибавлять. Номер карты, срок и CVV остаются на Idram. Второго способа оплаты нет.
- Поиск не зовёт новый API. Поле пишет `?q=`. Категория пишет `?category=`.
- Ряд категорий в шапке и сетка витрины читают один `?category=`.

Высота `main`, только Ashot:

- В `App.jsx` одна оболочка вокруг Header, содержимого и Footer. Класс живёт в design, не как разрозненные правила на страницах.
- `main` растёт по контенту: `min-height: min-content`. Фиксированную высоту кадра на `main`, включая 1430 и 1512, не ставить.
- Оболочка не короче окна: `min-height: 100vh`, колонка. `main` получает `flex: 1 0 auto`, чтобы короткая страница не оставляла подвал посередине, а длинная удлиняла `main`, а не обрезала его.
- Ashot чужие страницы не переписывает. Остальные ученики снимают со своего `main` только уже стоящую фиксированную высоту и новую не добавляют.

Движение, общее для всех:

- Только CSS. Библиотеку анимации не добавлять.
- Длительности и easing пишет Ashot. Остальные берут его токены и не пишут свои секунды на каждой странице.
- Движение короткое: hover, press, смена фото, появление секции один раз, скелет, пока идёт запрос.
- Бесконечное движение разрешено только у скелета загрузки и останавливается, когда данные пришли или запрос упал.
- `prefers-reduced-motion: reduce` убирает сдвиг и масштаб и оставляет мгновенную смену или одну смену прозрачности.
- Движение не блокирует Card, Cash, отправку формы и переход на Idram.
- Статичный слой Figma без прототипа не становится скриптом.

Очередь merge — по зависимости, не по номеру ученика:

```
Lead → Ashot → Vach → Mariam → Suro → Karen → Svet → Daniel → Hayk → Artush
```

Ashot первый среди экранов: остальные берут его токены и оболочку. Vach кладёт карточку, состояния каталога и `/product/:sku` до витрин. Mariam кладёт навигацию до страниц. Artush последний: он собирает уже нужные подписи и проверяет три JSON.

| # | Имя | Ветка | Зона | Агент |
|---|-----|--------|------|--------|
| 1 | Lead | `feat/lead` | доска | [01-lead.md](docs/agents/01-lead.md) |
| 2 | Suro | `feat/suro-api` | середина `/` | [02-suro.md](docs/agents/02-suro.md) |
| 3 | Artush | `feat/artush-i18n` | три JSON | [03-artush.md](docs/agents/03-artush.md) |
| 4 | Hayk | `feat/hayk-gateway` | опт и `/cart` | [04-hayk.md](docs/agents/04-hayk.md) |
| 5 | Mariam | `feat/mariam-header` | навигация | [05-mariam.md](docs/agents/05-mariam.md) |
| 6 | Daniel | `feat/daniel-footer` | подвал и рассылка | [06-daniel.md](docs/agents/06-daniel.md) |
| 7 | Karen | `feat/karen-textile` | `/textile` | [07-karen.md](docs/agents/07-karen.md) |
| 8 | Svet | `feat/svet-baby` | `/baby` | [08-svet.md](docs/agents/08-svet.md) |
| 9 | Vach | `feat/vach-catalog` | карточка, каталог, `/product/:sku` | [09-vach.md](docs/agents/09-vach.md) |
| 10 | Ashot | `feat/ashot-ui` | оболочка, токены движения, `/design` | [10-ashot.md](docs/agents/10-ashot.md) |

Сайт: `http://127.0.0.1:3000/`.

---

## 1 — Lead

**Папка:** [docs/zones/lead/README.md](docs/zones/lead/README.md). **Ветка:** `feat/lead`. **Агент:** [docs/agents/01-lead.md](docs/agents/01-lead.md).

Экраны не рисовать. PR принимать по очереди имён этой волны. Если «После кого» ещё не в `dev`, строку не мержить. Чужую зону не переписывать. Статус «в dev» ставить только после зелёных ворот этого ученика. Волну 5 этой доской не открывать заново. Контракт волны 3 этой очередью не задерживать.

**Lead не открывает волну 6, пока:** PR регистрации и экранов покупки (форма и Google на `/account`, перерисовка `/product/:sku` и `/cart`) лежит в `dev`.

**Lead не закрывает волну 6, пока:** девять зон очереди лежат в `dev`, три JSON открываются как JSON, `/`, `/textile`, `/baby`, `/product/:sku`, `/cart` и `/account` открываются, `main` короткой страницы доходит до низа окна, `main` длинной страницы не обрезан, `python manage.py test` зелёный целиком, diff не содержит Postgres и нового способа оплаты.

## 10 — Ashot · оболочка, движение и дизайн-система

**Папка:** `frontend/src/design/`. **Ветка:** `feat/ashot-ui`. Ждать Lead. **Кадр:** [Ventum · Design system](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12117) — `6-12117`.

Первым среди экранов. Остальные берут токены и оболочку отсюда. Маршрут `/design`. В `App.jsx` разрешены: оболочка вокруг Header, содержимого и Footer; один lazy-import и маршрут `/design`, если их ещё нет; подключение `shell.css` и `motion.css`. Остальной `App.jsx` не переписывать. Живую карточку, живую рассылку и живую корзину не собирать: на `/design` они статичные образцы.

Оболочка:

- Новый файл `frontend/src/design/shell.css`, подключается один раз из `App.jsx`. В `design.css` класс не класть: тот файл грузится только с ленивым `/design`.
- Класс `ds-shell` — колонка с `min-height: 100vh`.
- `.ds-shell > main` получает `flex: 1 0 auto` и `min-height: min-content`.
- Пока маршрут грузится, вместо страницы показывается `<main>`, а не `<p>`, чтобы подвал не прыгал.
- Из [frontend/src/index.css](frontend/src/index.css) убрать правила `#root` и `#root > main`. Другие правки `index.css` — только замена своих секунд на токены в общих `vt-*`. Чужие страницы не переписывать.

Движение:

- В [frontend/src/design/tokens.css](frontend/src/design/tokens.css) добавить длительности, кривые, сдвиг и масштаб. Под `prefers-reduced-motion: reduce` сдвиг становится 0, масштаб 1.
- Новый файл `frontend/src/design/motion.css` с классами `ds-reveal` (появление секции один раз) и `ds-skeleton` (мерцание скелета).
- Существующий `ds-spin` — движение загрузки: крутится только пока идёт запрос.

Магазин для шапки и подвала:

- Хук `useShop()` и `data-shop` на оболочке. `/textile` и `/baby` задают магазин.
- `/product/:sku` и `/cart` держат последний магазин этой вкладки. Без него магазина нет.

Сверстать `/design` по узлам кадра:

- Design system cover `6-12118`.
- Component library `6-12124`: Paired palettes `6-12125`, Shared Armenian-first hierarchy `6-12168`, Rhythm, shape & elevation `6-12184`, Store switch, search & category controls `6-12222`, Purchase actions, sizes & product states `6-12255`, The complete product-card anatomy `6-12330`, Interaction states `65-4`.
- 08 / FORM `65-1209` и 09 / FEEDBACK `65-1321` — образцы состояний.
- System footer `6-12424`.

Токены движения стоят в таблицах токенов, не в новой секции кадра. Кнопка, бейдж, размер и поле читают переменные. Чужие `pages/Gateway`, `Textile`, `Baby`, `ProductDetails`, `Cart`, `Header`, `Footer`, `ProductCard` не править.

**Движение:** токены и классы выше. Живые страницы их подключат после merge.

**Проверка:** `/design` на 1440; короткая страница (`/404` или `/account` без сессии) — `main` доходит до низа окна; длинная (`/design` или `/textile`) — `main` не обрезан; `prefers-reduced-motion: reduce` убирает сдвиг и масштаб на образцах; клавиатура и focus-visible на образцах кнопок.

**Нельзя:** `apps/orders`, `apps/cart`, модели, `mail.py`, живой `POST /api/cart/items/`, живой `POST /api/leads/newsletter/`, живой checkout, правки чужих страниц.

**Lead не мержит, пока:** оболочка стоит в `App.jsx`, `shell.css` и `motion.css` подключены, `/design` показывает обе палитры и шесть состояний кнопки, токены движения есть в `tokens.css`, а diff не содержит страниц Gateway, Textile, Baby, ProductDetails, Cart, Header, Footer и ProductCard.

## 9 — Vach · карточка, каталог и `/product/:sku`

**Папка:** `frontend/src/components/ProductCard/`, `frontend/src/components/CatalogState/`, `frontend/src/pages/ProductDetails/`. **Ветка:** `feat/vach-catalog`. Ждать Ashot. **Кадры:** анатомия и `09 / FEEDBACK` внутри [Design system](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12117); [Ventum Baby product detail](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=8-511) — слой Product content `8-528`.

Карточка не знает, Textile это или Baby. Страница передаёт бренд. Импорт клиента именной. Классы кнопки и токены движения — из дизайн-системы Ashot. Карточка и CatalogState доводятся до слоёв волны 5 и получают движение.

Анатомия карточки, оба бренда: фото, Discount pill, Stock status, имя, спецификация, Size selection, Price comparison, Visa и Mastercard, Card и Cash. Шесть состояний у обеих кнопок. Loading не шлёт второй POST. 401 показывает текст входа на карточке. Размер, скидка и старая цена — только если каталог их уже отдал. Картинка и название ведут на `/product/<sku>`.

`CatalogState` из `09 / FEEDBACK` `65-1321`: Empty, Loading (скелет с `ds-skeleton`), Error с «Կրկին փորձել». `Textile.jsx` и `Baby.jsx` не править.

Страница `/product/:sku` по слою Product content `8-528`, для textile и baby. `data-brand` из `product.store`. Данные — `GET /api/catalog/products/<sku>/` через именной `api`.

Строить из API, сверху вниз, внутри Product content `8-528`:

- Breadcrumbs `8-529`. Назад и «home» ведут на `/textile` или `/baby` по `product.store`.
- Product overview `8-535` → Gallery / Product media `8-536`: фото по `images` и `order`. Счётчик «1 / 3» только при двух и более фото. Одно фото — без ряда миниатюр. Нет фото — спокойный placeholder с именем магазина.
- Product introduction: категория, название, строка «SKU: …», краткое описание.
- Price and availability: цена через `formatProductPrice`. Старая цена, скидка и остаток — только через `productExtras`.
- Size selection — только если `productExtras` уже находит размеры.
- Card и Cash на месте одной кнопки Add to cart `8-597`. Оба шлют `{ sku, qty: 1 }`. Cash не открывает Idram.
- About the product `8-621` → About Product `8-626` — это `description`.
- Общий текст кадра в i18n: заголовок описания `8-622`, Product philosophy, Textile maker `8-643`. Purchase reassurance `8-618` — только у товаров baby.

Не строить:

- Collection label, Gallery note `8-552`, Zoom `8-541`.
- Copy SKU `8-559`, Color selection `8-589`, Wishlist и Share `8-602`.
- Delivery / Product shipping information `8-609` вместе с 3,000 ֏.
- Materials `8-630`, Care `8-636`, email поддержки `8-648`.
- Слой States / Static previews only `12-44` — статичный. Toast `12-25` только задаёт вид уже существующей строки «добавлено», без таймера и без скрипта wishlist/share.

Навигацию `8-512` и Footer `8-653` не копировать внутрь страницы: их рисуют Mariam и Daniel.

**Движение:** hover и press на карточке; плавная смена фото; появление строки «добавлено»; скелет товара; ошибка с повтором. Токены Ashot. `prefers-reduced-motion: reduce` убирает сдвиг и масштаб.

**Проверка:** `/product/:sku` на 1440 и на ширине mobile-кадра своего магазина; клавиатура и focus-visible на Card, Cash и миниатюрах; пустое фото, загрузка, отсутствие товара и ошибка сети — разные тексты; `prefers-reduced-motion`.

**Нельзя:** модели каталога, миграции, `pages/Textile`, `pages/Baby`, `components/Header`, `components/Footer`, checkout, цвет, wishlist, share, доставка 3000.

**Lead не мержит, пока:** карточка живёт в `components/ProductCard/`, CatalogState показывает пусто, скелет и ошибку с повтором, `/product/:sku` показывает галерею, Card и Cash, About из `description`, 401 даёт ссылку на `/account` со `state.from` этого sku, а diff не содержит Header, Footer, Textile и Baby.

## 5 — Mariam · навигация

**Папка:** `frontend/src/components/Header/`. **Ветка:** `feat/mariam-header`. Ждать Vach.

Шапка одна на все кадры. Страницы витрин, середину главной, товар, корзину и подвал не верстать. Счётчик и ссылки `/account` и `/cart` остаются. `?success=1` по-прежнему не называется оплатой. Магазин берётся из `useShop()` Ashot. Без магазина — вид главной.

Четыре вида:

- Gateway desktop Navigation `178-47` и Gateway masthead `6-12463`: имя платформы, обещание, язык `am` / `en` / `ru`.
- Store navigation Textile desktop `6-12495` (1440 × 244), Textile mobile `6-12777`, Baby desktop `6-13060`, Baby mobile `6-13320`: переключатель магазинов, строка доставки, Account, Cart с `count`, поиск `?q=`, ряд категорий `?category=`, пункт опта ведёт к блоку опта на странице.
- Product Navigation `8-512` на `/product/:sku`: Brand `8-513` (обещание кадра «Փոքր հարմարավետություններ։ Պատրաստված սիրով։» через i18n и `useShop`), Shop navigation `8-517` — «Բոլոր ապրանքները» ведёт на страницу магазина, категории из уже существующего списка («Ծածկոցներ» не зашивать), «Մեր պատմությունը» ведёт на `/<store>#brand-story`, справа Shopping tools `8-521` — поиск, аккаунт, сумка с `count`.
- Checkout Navigation `3-1158` на `/cart`: Brand; Customer support `3-1163` — «Շարունակել գնումները» ведёт в последний магазин или на `/`. Help `3-1165` не строить.

На узкой ширине шапка компактная. Полный ряд категорий не растягивает страницу.

**Движение:** индикатор переключателя магазина, открытие меню, смена счётчика. Токены Ashot.

**Проверка:** 1440 и ширина mobile-кадра; `/product/:sku` и `/cart` показывают свои виды шапки; клавиатура; `prefers-reduced-motion`; с токеном виден `count`; `?success=1` не называется оплатой.

**Нельзя:** `pages/Gateway`, `pages/Textile`, `pages/Baby`, `pages/ProductDetails`, `pages/Cart`, `components/Footer`, `index.css`, checkout, Help `3-1165`.

**Lead не мержит, пока:** на 1440 видны платформа, язык, переключатель, поиск и ряд категорий, на `/product/:sku` и `/cart` свои виды шапки, на ширине mobile-кадра шапка компактная, а `?success=1` не называется оплатой.

## 2 — Suro · главная

**Папка:** `frontend/src/pages/Gateway/`. **Ветка:** `feat/suro-api`. Ждать Mariam. **Кадры:** Brand gateway `178-48` на [Gateway desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=178-46); Stacked brand gateway `181-89` на [Gateway · Mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12462).

Середина страницы. Navigation и Footer в страницу не копировать.

Desktop: Ventum Textile gateway и Ventum Baby gateway — eyebrow, promise, signature, wordmark, designation, headline, description, Explore Home / Explore Baby, lifestyle. Explore Home → `/textile`. Explore Baby → `/baby`.

Mobile: те же два входа столбиком. Masthead и Gateway footer не копировать.

`GET /api/content/home-blocks/` по-прежнему ищет блок `hero`. Если запрос падает, оба входа всё равно на экране. Палитры — из токенов Ashot.

С `main` снять `flex: 1` и `min-height: 640px`, если они стоят на `.gateway-page`. Если кадру нужна высокая панель, высота ставится на панель, не на `main`. Свои `600ms` и `cubic-bezier` заменить токенами Ashot. Секции появляются через `ds-reveal`.

**Движение:** появление секций один раз; hover панелей на токенах. `prefers-reduced-motion: reduce` убирает сдвиг сетки.

**Проверка:** `/` на 1440 и на ширине Gateway mobile; оба входа при упавшем home-blocks; клавиатура; `prefers-reduced-motion`; `main` без фиксированной высоты.

**Нельзя:** `pages/Textile`, `pages/Baby`, `components/Header`, `components/Footer`, фиксированная высота на `main`, `apps/cart`, `apps/orders`.

**Lead не мержит, пока:** на `/` при 1440 видны оба рассказа и обе ссылки, на ширине Gateway mobile входы столбиком, при упавшем home-blocks выбор магазина не пропадает, а `main` не несёт фиксированную высоту кадра.

## 7 — Karen · textile

**Папка:** `frontend/src/pages/Textile/`. **Ветка:** `feat/karen-textile`. Ждать Suro. **Кадры:** [Textile desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12494) и [Textile mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12776).

Каталог фильтрует `store === textile`. Товар — карточкой Vach. Пусто, скелет и ошибка — `CatalogState`. Товара Baby нет. Шапка `6-12495` / `6-12777` — Mariam. Опт — Hayk. Подвал — Daniel.

Секции desktop, сверху вниз: Seasonal editorial `6-12530`, Shopping assurances `6-12540`, Shop by category `6-12550`, Brand story and care `6-12737`, Shoppable product collection `6-12585`.

Секции mobile: Seasonal editorial `6-12814`, Shopping assurances `6-12824`, Shop by category `6-12834`, Shoppable product collection `6-12868`, Brand story and care `6-13020`. На mobile коллекция стоит раньше Brand story: порядок через CSS, разметку не дублировать.

Секция Brand story получает `id="brand-story"`. Catalog controls читают `?q=` и `?category=` и фильтруют уже загруженный список. Новый API не добавлять. С `main` снять только уже стоящую фиксированную высоту, новую не добавлять.

**Движение:** editorial photo, плитки категорий, смена состояния каталога. Токены Ashot. Секции через `ds-reveal`.

**Проверка:** `/textile` на 1440 и на ширине Textile mobile; пять секций; Card в корзину; CatalogState при пусто / загрузка / ошибка; клавиатура; `prefers-reduced-motion`.

**Нельзя:** `pages/Baby`, модели, `index.css`, `components/Footer`, `components/Header`, сборка опта и подвала, фиксированная высота на `main`.

**Lead не мержит, пока:** на `/textile` есть все пять секций, кнопка в корзину, нет карточки Baby, при пустом ответе, загрузке и ошибке виден CatalogState, а `id="brand-story"` стоит на Brand story.

## 8 — Svet · baby

**Папка:** `frontend/src/pages/Baby/`. **Ветка:** `feat/svet-baby`. Ждать Karen. **Кадры:** [Baby desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-13059) и [Baby mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-13319).

Те же правила плотности, что у Textile, но слои Baby и палитра Baby. Фильтр `store === baby`. Карточка Vach. CatalogState с текстами Baby. Товара Textile нет. Diff файлов Textile пустой.

Секции desktop: Seasonal editorial `6-13087`, Shopping assurances `6-13098`, Shop by category `6-13108`, Shoppable product collection `6-13128`, Brand story and care `6-13280`, Parent care guide `6-13287`.

Секции mobile: `6-13351`, `6-13362`, `6-13372`, `6-13391`, `6-13543`, Parent care guide `6-13550`.

Parent care guide — отдельная секция, не абзац внутри Brand story. Brand story получает `id="brand-story"`. Опт и подвал не этой страницы. С `main` снять только уже стоящую фиксированную высоту.

**Движение:** как у Karen, на палитре Baby. Токены Ashot.

**Проверка:** `/baby` на 1440 и на ширине Baby mobile; секции включая Parent care guide; кнопка в корзину; нет карточки Textile; diff Textile пустой; клавиатура; `prefers-reduced-motion`.

**Нельзя:** файлы Textile, модели, `index.css`, фиксированная высота на `main`.

**Lead не мержит, пока:** на `/baby` видны секции кадра включая Parent care guide, есть кнопка в корзину, нет карточки Textile, `id="brand-story"` стоит, diff Textile пустой.

## 6 — Daniel · подвал и рассылка

**Папка:** `frontend/src/components/Footer/`. **Ветка:** `feat/daniel-footer`. Ждать Svet. **Кадры:** Footer `178-49`, Gateway footer `6-12490`, Store footer `6-12751` / `6-13034` / `6-13294` / `6-13557`, состояния `08 / FORM` `65-1209`, компактные подвалы Product Footer `8-653` и Checkout Footer `3-1393`.

Один подвал, виды по маршруту и `useShop()`.

Главная: Contact information (desktop), Copyright и Contact (mobile).

Магазин Textile и Baby: Footer information, Footer divider, Legal and payment. Марки Visa и Mastercard — рисунок, не новый способ оплаты.

Компактный подвал на `/product/:sku` и `/cart` по `8-653` и `3-1393`: строка копирайта с именем магазина из `useShop()`; без магазина — «Ventum». Фраза «Հոգածություն ամեն թելում» — с армянской точкой «։» (один ключ). Policies `8-655` / `3-1395` не строить: таких страниц нет.

Рассылка бьёт в уже существующий `POST /api/leads/newsletter/`. Шесть состояний поля, оба бренда: default, focus-visible, invalid, success, disabled, loading. Переходы — на токенах Ashot. Invalid не отправляет запрос. Loading не шлёт второй POST.

Форма опта в подвале, которая уже бьёт в `POST /api/leads/wholesale/`, остаётся рабочей. Модели заказа и `mail.py` не трогать.

**Движение:** короткие переходы между шестью состояниями поля. `prefers-reduced-motion: reduce` — мгновенная смена или одна прозрачность.

**Проверка:** подвал на `/`, `/textile`, `/baby`, `/product/:sku`, `/cart`; invalid без запроса и success после ответа; клавиатура; `prefers-reduced-motion`.

**Нельзя:** `apps/orders`, шапка, витрины, Policies-страницы, `index.css`.

**Lead не мержит, пока:** подвал виден на `/`, `/textile`, `/baby`, `/product/:sku` и `/cart`, у рассылки есть invalid без запроса и success после ответа, а diff не содержит моделей заказа.

## 4 — Hayk · опт и `/cart`

**Папка:** `frontend/src/components/Wholesale/`, `frontend/src/pages/Cart/`. **Ветка:** `feat/hayk-gateway`. Ждать Daniel. **Кадры:** Wholesale partnership `6-12744` / `6-13027`; [Ventum Baby checkout](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=3-1157) — Checkout content `3-1168`.

Опт: один компонент между коллекцией и подвалом в `Textile.jsx` и `Baby.jsx`. Остальные строки этих файлов не переписывать. Заявка — существующий `POST /api/leads/wholesale/` с `name`, `phone`, `email`, `text`. Новый endpoint не заводить. Пустая отправка не уходит. Успех не называется оплатой.

Страница `/cart` по Checkout content `3-1168`. Поведение остаётся корзиной Wave 3. Навигацию `3-1158` и Footer `3-1393` не копировать.

Строить:

- Breadcrumb `3-1169`: «Գլխավոր» → `/`, «Զամբյուղ» — текущая страница, «Ձևակերպում» — текущий шаг.
- Из Page introduction `3-1175` / Heading `3-1176` — только заголовок. Описание, которое обещает форму, не показывать.
- Progress `3-1179` статичный: активен шаг 2, ссылок нет.
- Checkout columns `3-1190`:
  - слева Product / Checkout item preview `3-1191`: миниатюра отдельным `GET /api/catalog/products/<sku>/` (поле `image` или первый `images[].url` через `mediaUrl`); ошибка оставляет placeholder; текст Textile maker;
  - в середине строки корзины на месте Form / Customer checkout `3-1236`: название, sku, магазин, цена, сумма строки, количество через старый `updateCartItem`, минус неактивен на 1, удаление отдельно;
  - справа Summary / Order sidebar `3-1336`: «Ձեր պատվերը», число товаров из `count`, Subtotal и Grand total — это `total` корзины, кнопка оплаты вызывает старые `checkout` и `submitPaymentForm`, рядом Visa и Mastercard.

Не строить:

- Contact / Customer details, Delivery / Method and address, Payment / Method selection внутри `3-1236`.
- «Оплата при доставке» и поля банковской карты.
- Delivery charge `3-1359`, Savings note `3-1362`, галочку условий `3-1373`.
- Строку «21,000 ֏ վճարվում է առաքման ժամանակ».
- Чипы цвета и размера, свойства товара `3-1221`, сердечко.
- Поле картинки в cart API.

Четыре состояния остаются: не вошёл, загрузка, пусто, строки. Пустая корзина на checkout показывает старую ошибку. С `main` снять только уже стоящую фиксированную высоту. Высоту Hug 1430 на страницу не ставить. Ширину 1512 в новый `@media` не превращать. Mobile — ширина Baby mobile.

**Движение:** смена количества, появление ошибки, скелет загрузки строк. Токены Ashot. Движение не блокирует переход на Idram.

**Проверка:** `/cart` на 1440 и на ширине Baby mobile; опт на `/textile` и `/baby`; четыре состояния; минус неактивен на 1; итог без 3000; клавиатура; `prefers-reduced-motion`.

**Нельзя:** `apps/orders/checkout.py`, `idram.py`, модели, шапка, подвал, форма контактов/доставки/карты, delivery fee, второй способ оплаты.

**Lead не мержит, пока:** блок опта виден на `/textile` и `/baby`, `/cart` показывает три колонки из API без формы кадра и без 3000 в итоге, оплата бьёт в старый checkout, а diff checkout backend и `/account` пустой.

## 3 — Artush · подписи

**Папка:** `frontend/src/i18n/`. **Ветка:** `feat/artush-i18n`. Ждать Hayk.

Собрать подписи волны, которые уже нужны страницам, в трёх файлах: `am.json`, `en.json`, `ru.json`. Чужие `jsx` и `css` не верстать.

`am.json` берёт армянский текст кадра дословно. В нём есть, среди прочего:

- «Փոքր հարմարավետություններ։ Պատրաստված սիրով։»
- «Բոլոր ապրանքները»
- «Մեր պատմությունը»
- «Շարունակել գնումները»
- «Հոգածություն ամեն թելում։» — один ключ с «։» (в checkout-кадре встречается «:»; в JSON только «։»)
- «Ձեր պատվերը»
- «Ավելացնել զամբյուղ»
- «Ապրանքի նկարագրություն»
- ключи множественного числа для числа товаров; в `ru` четыре формы: one, few, many, other

В `en.json` и `ru.json` те же ключи — перевод. Повтор ключа и сломанная скобка — повод не открывать PR. Перед PR каждый файл открывается через `json.loads`.

Ключ, который страница уже читает, не переименовывать молча.

**Проверка:** три файла — валидный JSON; перечисленные армянские фразы лежат в `am.json`; те же ключи есть на `en` и `ru`.

**Нельзя:** страницы Gateway, Textile, Baby, Cart, Account, ProductDetails, Header, Footer, Design, ProductCard.

**Lead не мержит, пока:** три файла — валидный JSON, перечисленные армянские фразы лежат в `am.json` с единой «։», и те же ключи есть на `en` и `ru`.

---

## English

Wave 5 is closed. The full Gateway, design-system, Textile, and Baby frames stay in `dev`. Do not tear them down. Wave 4 is closed. Wave 3 stays the purchase contract: cart, order, Idram, and the shop email. This wave does not close it and does not break that API. Detail: [task-wave3.md](task-wave3.md). Wave 5 screen: [task-wave5.md](task-wave5.md).

Wave 6 brings the site up to both Figma files, with CSS motion and a shell whose `main` grows with its content. Each student finishes one zone. One person does not assemble the whole site. Do not put a Hug height or the labels 1430 / 1512 on `main`.

Registration, Google, `/account` with the Google button, and the first restyle of `/product/:sku` and `/cart` are already in `dev` before this wave starts. Do not assign them again. Do not add django-allauth, email confirmation, or a guest order.

Frames in file 1 [Untitled](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=0-1):

- [Ventum · Gateway desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=178-46) — `178-46`
- [Ventum · Design system](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12117) — `6-12117`
- [Gateway · Mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12462) — `6-12462`
- [Ventum Textile · Desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12494) — `6-12494`
- Store navigation inside Textile desktop — `6-12495` (Mariam’s header, not a Textile section)
- [Ventum Textile · Mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12776) — `6-12776`
- [Ventum Baby · Desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-13059) — `6-13059`
- [Ventum Baby · Mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-13319) — `6-13319`

Frames in file 2 [Untitled](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=0-1), page `0-1`. The file has exactly two top-level frames, both desktop. There is no separate mobile, account, receipt, textile-product, or third breakpoint. Do not store a Hug height as a fixed page height. Do not turn the width 1512 into a new `@media` rule. Project desktop stays 1440. Mobile is the width of that store’s existing mobile frame.

- [Ventum Baby product detail](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=8-511) — `8-511`
- [Ventum Baby checkout](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=3-1157) — `3-1157` (label **1512 × 1430 Hug**)

Do not build the text layers `98-574` and `98-575` that link to file 2.

**Git:** [CONTRIBUTING.md](CONTRIBUTING.md). Short list: [TASK.md](TASK.md). Board: [docs/zones/lead/README.md](docs/zones/lead/README.md).

Branches stay. Start with `git checkout dev && git pull`, then your own `feat/...`. One pull request, **base = `dev`**. Do not push `main`. No `--force` on `dev` or `main`. Do not start Postgres. No new model fields. No new payment method. No second axios. Do not commit `.env` or Google or Idram secrets.

A new string goes into `am.json`, `en.json`, and `ru.json` at once. Armenian copy on the frame is the source for `am.json`. `en` and `ru` are translations. Requests go through [frontend/src/api/client.js](frontend/src/api/client.js), the named `api` export. A component still has `Name.jsx`, `name.css`, and `name.js`.

Shared screen rules:

- Paid / Оплачено / Վճարված appears only when `status === 'paid'`. `?success=1` is a return, not payment.
- Card and Cash both post `{ sku, qty: 1 }` to `POST /api/cart/items/`. Cash does not open Idram and does not mark an order `paid`.
- Size, old price, discount, stock, and color render only when the API already sends them. Do not add model fields or migrations for the mock. `productExtras` has no color, so do not show a color row. Do not wire wishlist or share. The States layer on the product is static.
- Do not add the frame’s 3000 delivery fee to the total. Card number, expiry, and CVV stay on Idram. There is no second payment method.
- Search does not call a new API. The field writes `?q=`. A category writes `?category=`.
- The header category row and the shop grid read the same `?category=`.

Main height, Ashot only:

- In `App.jsx`, one shell around Header, the content, and Footer. The class lives in design, not as scattered rules on pages.
- `main` grows with its content: `min-height: min-content`. Do not set a frame height on `main`, including 1430 and 1512.
- The shell is at least one viewport: `min-height: 100vh`, as a column. `main` gets `flex: 1 0 auto`, so a short page does not leave the footer in the middle and a long page lengthens `main` instead of clipping it.
- Ashot does not rewrite other people’s pages. The other students remove only a fixed height from their own `main`, if one is already there, and do not add a new one.

Motion, shared by everyone:

- CSS only. Do not add an animation library.
- Ashot writes duration and easing tokens. Everyone else uses them and does not write private seconds on each page.
- Motion is short: hover, press, photo change, a section appearing once, and the skeleton while a request runs.
- Infinite motion is allowed only on the loading skeleton, and it stops when data arrives or the request fails.
- `prefers-reduced-motion: reduce` removes shift and scale and leaves an instant change or one opacity change.
- Motion does not block Card, Cash, form submit, or the redirect to Idram.
- A static Figma layer with no prototype does not become a script.

Merge queue, by dependency: **Lead → Ashot → Vach → Mariam → Suro → Karen → Svet → Daniel → Hayk → Artush**.

Ashot goes first among the screens so the others can use his tokens and shell. Vach lands the card, catalog states, and `/product/:sku` before the shops. Mariam lands navigation before the pages. Artush is last: he collects the keys and proves the three JSON files parse.

| # | Name | Branch | Zone | Agent |
|---|------|--------|------|--------|
| 1 | Lead | `feat/lead` | board | [01-lead.md](docs/agents/01-lead.md) |
| 2 | Suro | `feat/suro-api` | middle of `/` | [02-suro.md](docs/agents/02-suro.md) |
| 3 | Artush | `feat/artush-i18n` | three JSON | [03-artush.md](docs/agents/03-artush.md) |
| 4 | Hayk | `feat/hayk-gateway` | wholesale and `/cart` | [04-hayk.md](docs/agents/04-hayk.md) |
| 5 | Mariam | `feat/mariam-header` | navigation | [05-mariam.md](docs/agents/05-mariam.md) |
| 6 | Daniel | `feat/daniel-footer` | footer and newsletter | [06-daniel.md](docs/agents/06-daniel.md) |
| 7 | Karen | `feat/karen-textile` | `/textile` | [07-karen.md](docs/agents/07-karen.md) |
| 8 | Svet | `feat/svet-baby` | `/baby` | [08-svet.md](docs/agents/08-svet.md) |
| 9 | Vach | `feat/vach-catalog` | card, catalog, `/product/:sku` | [09-vach.md](docs/agents/09-vach.md) |
| 10 | Ashot | `feat/ashot-ui` | shell, motion tokens, `/design` | [10-ashot.md](docs/agents/10-ashot.md) |

Site: `http://127.0.0.1:3000/`.

### 1 — Lead

Board only. Do not draw screens. Merge by the name queue. If “After” is not in `dev`, do not merge that row. Do not rewrite another zone. Mark «in dev» only after that student’s gates are green. Do not reopen Wave 5. Do not hold a Wave 6 screen for the Wave 3 contract.

**Lead does not open Wave 6 until:** the registration and purchase-screen pull request (form and Google on `/account`, restyle of `/product/:sku` and `/cart`) is in `dev`.

**Lead does not close Wave 6 until:** the nine zones are in `dev`, the three JSON files parse, `/`, `/textile`, `/baby`, `/product/:sku`, `/cart`, and `/account` open, a short page’s `main` reaches the bottom of the window, a long page’s `main` is not clipped, `python manage.py test` is green, and the diff has no Postgres and no new payment method.

### 10 — Ashot · shell, motion, and design system

**Folder:** `frontend/src/design/`. **Branch:** `feat/ashot-ui`. Wait for Lead. **Frame:** [Ventum · Design system](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12117) — `6-12117`.

First among the screens. The others take tokens and the shell from here. Route `/design`. In `App.jsx` you may add: the shell around Header, content, and Footer; one lazy import and the `/design` route if missing; imports of `shell.css` and `motion.css`. Do not rewrite the rest of `App.jsx`. Do not build the live card, live newsletter, or live cart: on `/design` they stay static samples.

Shell:

- New file `frontend/src/design/shell.css`, imported once from `App.jsx`. Do not put the class in `design.css`: that file loads only with the lazy `/design` page.
- Class `ds-shell` is a column with `min-height: 100vh`.
- `.ds-shell > main` gets `flex: 1 0 auto` and `min-height: min-content`.
- While a route loads, show `<main>`, not `<p>`, so the footer does not jump.
- Remove the `#root` and `#root > main` rules from [frontend/src/index.css](frontend/src/index.css). Other `index.css` edits are only swapping private seconds for tokens on shared `vt-*` rules. Do not rewrite other people’s pages.

Motion:

- Add durations, curves, shift, and scale in [frontend/src/design/tokens.css](frontend/src/design/tokens.css). Under `prefers-reduced-motion: reduce`, shift becomes 0 and scale becomes 1.
- New file `frontend/src/design/motion.css` with `ds-reveal` (section appears once) and `ds-skeleton` (skeleton pulse).
- Existing `ds-spin` is loading motion: it spins only while a request runs.

Shop for header and footer:

- Hook `useShop()` and `data-shop` on the shell. `/textile` and `/baby` set the shop.
- `/product/:sku` and `/cart` keep the last shop for this tab. Without one, there is no shop.

Finish `/design` to the frame nodes:

- Design system cover `6-12118`.
- Component library `6-12124`: Paired palettes `6-12125`, Shared Armenian-first hierarchy `6-12168`, Rhythm, shape & elevation `6-12184`, Store switch, search & category controls `6-12222`, Purchase actions, sizes & product states `6-12255`, The complete product-card anatomy `6-12330`, Interaction states `65-4`.
- 08 / FORM `65-1209` and 09 / FEEDBACK `65-1321` as state samples.
- System footer `6-12424`.

Motion tokens live in the token tables, not in a new frame section. Buttons, badges, sizes, and fields read the variables. Do not edit foreign `pages/Gateway`, `Textile`, `Baby`, `ProductDetails`, `Cart`, `Header`, `Footer`, or `ProductCard`.

**Motion:** the tokens and classes above. Live pages adopt them after merge.

**Check:** `/design` at 1440; a short page (`/404` or signed-out `/account`) has `main` reaching the bottom of the window; a long page (`/design` or `/textile`) does not clip `main`; `prefers-reduced-motion: reduce` removes shift and scale on samples; keyboard and focus-visible on button samples.

**Do not:** `apps/orders`, `apps/cart`, models, `mail.py`, live `POST /api/cart/items/`, live `POST /api/leads/newsletter/`, live checkout, edits to foreign pages.

**Lead does not merge until:** the shell is in `App.jsx`, `shell.css` and `motion.css` are imported, `/design` shows both palettes and the six button states, motion tokens exist in `tokens.css`, and the diff has no Gateway, Textile, Baby, ProductDetails, Cart, Header, Footer, or ProductCard pages.

### 9 — Vach · card, catalog, and `/product/:sku`

**Folder:** `frontend/src/components/ProductCard/`, `frontend/src/components/CatalogState/`, `frontend/src/pages/ProductDetails/`. **Branch:** `feat/vach-catalog`. Wait for Ashot. **Frames:** anatomy and `09 / FEEDBACK` inside [Design system](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12117); [Ventum Baby product detail](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=8-511) — Product content `8-528`.

The card does not know Textile from Baby. The page passes the brand. Import the named `api`. Button classes and motion tokens come from Ashot. Finish the card and CatalogState to the Wave 5 layers and add motion.

Card anatomy, both brands: photo, Discount pill, Stock status, name, specification, Size selection, Price comparison, Visa and Mastercard, Card and Cash. Six states on both buttons. Loading does not send a second POST. A 401 shows the sign-in text on the card. Size, discount, and old price only when the catalog already returned them. Image and name link to `/product/<sku>`.

`CatalogState` from `09 / FEEDBACK` `65-1321`: Empty, Loading (skeleton with `ds-skeleton`), Error with «Կրկին փորձել». Do not edit `Textile.jsx` or `Baby.jsx`.

Page `/product/:sku` from Product content `8-528`, for textile and baby. `data-brand` from `product.store`. Data from `GET /api/catalog/products/<sku>/` through the named `api`.

Build from the API, top to bottom, inside Product content `8-528`:

- Breadcrumbs `8-529`. Back and home go to `/textile` or `/baby` from `product.store`.
- Product overview `8-535` → Gallery / Product media `8-536`: photos from `images` by `order`. The «1 / 3» counter only when there are two or more photos. One photo means no thumbnail row. No photo means a calm placeholder with the store name.
- Product introduction: category, title, «SKU: …», short summary.
- Price and availability: price via `formatProductPrice`. Old price, discount, and stock only through `productExtras`.
- Size selection only when `productExtras` already finds sizes.
- Card and Cash in place of the single Add to cart control `8-597`. Both post `{ sku, qty: 1 }`. Cash does not open Idram.
- About the product `8-621` → About Product `8-626` is `description`.
- Shared frame copy in i18n: description heading `8-622`, Product philosophy, Textile maker `8-643`. Purchase reassurance `8-618` only for baby products.

Do not build:

- Collection label, Gallery note `8-552`, Zoom `8-541`.
- Copy SKU `8-559`, Color selection `8-589`, Wishlist and Share `8-602`.
- Delivery / Product shipping information `8-609` with 3,000 AMD.
- Materials `8-630`, Care `8-636`, support email `8-648`.
- States / Static previews only `12-44` stays static. Toast `12-25` only styles the existing «added» line, with no timer and no wishlist/share script.

Do not copy Navigation `8-512` or Footer `8-653` into the page: Mariam and Daniel own them.

**Motion:** hover and press on the card; smooth photo change; the «added» line appearing; product skeleton; error with retry. Ashot’s tokens. `prefers-reduced-motion: reduce` removes shift and scale.

**Check:** `/product/:sku` at 1440 and at that store’s mobile-frame width; keyboard and focus-visible on Card, Cash, and thumbnails; empty photo, loading, missing product, and network error are different strings; `prefers-reduced-motion`.

**Do not:** catalog models, migrations, `pages/Textile`, `pages/Baby`, `components/Header`, `components/Footer`, checkout, color, wishlist, share, delivery 3000.

**Lead does not merge until:** the card lives in `components/ProductCard/`, CatalogState shows empty, skeleton, and error with retry, `/product/:sku` shows the gallery, Card and Cash, About from `description`, a 401 links to `/account` with `state.from` for that sku, and the diff has no Header, Footer, Textile, or Baby.

### 5 — Mariam · navigation

**Folder:** `frontend/src/components/Header/`. **Branch:** `feat/mariam-header`. Wait for Vach.

One header for every frame. Do not build the shop pages, the middle of home, the product page, the cart, or the footer. Cart count and the `/account` and `/cart` links stay. `?success=1` is still not called payment. The shop comes from Ashot’s `useShop()`. Without a shop, use the home look.

Four looks:

- Gateway desktop Navigation `178-47` and Gateway masthead `6-12463`: platform name, promise, language `am` / `en` / `ru`.
- Store navigation Textile desktop `6-12495` (1440 × 244), Textile mobile `6-12777`, Baby desktop `6-13060`, Baby mobile `6-13320`: store switch, delivery line, Account, Cart with `count`, search `?q=`, category row `?category=`, wholesale item scrolls to the wholesale block.
- Product Navigation `8-512` on `/product/:sku`: Brand `8-513` (frame promise «Փոքր հարմարավետություններ։ Պատրաստված սիրով։» via i18n and `useShop`), Shop navigation `8-517` — «Բոլոր ապրանքները» goes to the store page, categories from the existing list (do not hard-code «Ծածկոցներ»), «Մեր պատմությունը» goes to `/<store>#brand-story`, Shopping tools `8-521` on the right — search, account, bag with `count`.
- Checkout Navigation `3-1158` on `/cart`: Brand; Customer support `3-1163` — «Շարունակել գնումները» goes to the last shop or `/`. Do not build Help `3-1165`.

On the narrow width the header is compact. The full category row does not stretch the page.

**Motion:** store-switch indicator, menu open, count change. Ashot’s tokens.

**Check:** 1440 and the mobile-frame width; `/product/:sku` and `/cart` show their header looks; keyboard; `prefers-reduced-motion`; with a token, `count` is visible; `?success=1` is not called payment.

**Do not:** `pages/Gateway`, `pages/Textile`, `pages/Baby`, `pages/ProductDetails`, `pages/Cart`, `components/Footer`, `index.css`, checkout, Help `3-1165`.

**Lead does not merge until:** at 1440 the platform, language, switch, search, and category row are visible, `/product/:sku` and `/cart` have their header looks, the mobile-frame width is compact, and `?success=1` is not called payment.

### 2 — Suro · home

**Folder:** `frontend/src/pages/Gateway/`. **Branch:** `feat/suro-api`. Wait for Mariam. **Frames:** Brand gateway `178-48` on [Gateway desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=178-46); Stacked brand gateway `181-89` on [Gateway · Mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12462).

Middle of the page. Do not copy Navigation or Footer into the page.

Desktop: Ventum Textile gateway and Ventum Baby gateway — eyebrow, promise, signature, wordmark, designation, headline, description, Explore Home / Explore Baby, lifestyle. Explore Home → `/textile`. Explore Baby → `/baby`.

Mobile: the same two doors stacked. Do not copy masthead or Gateway footer.

`GET /api/content/home-blocks/` still looks for the `hero` block. If the request fails, both doors stay on screen. Palettes come from Ashot’s tokens.

Remove `flex: 1` and `min-height: 640px` from `.gateway-page` if they sit on `main`. If a panel needs height, put it on the panel, not on `main`. Replace private `600ms` and `cubic-bezier` with Ashot’s tokens. Sections appear through `ds-reveal`.

**Motion:** sections appear once; panel hover on tokens. `prefers-reduced-motion: reduce` removes the grid shift.

**Check:** `/` at 1440 and at Gateway mobile width; both doors when home-blocks fails; keyboard; `prefers-reduced-motion`; `main` has no fixed frame height.

**Do not:** `pages/Textile`, `pages/Baby`, `components/Header`, `components/Footer`, a fixed height on `main`, `apps/cart`, `apps/orders`.

**Lead does not merge until:** at 1440 both stories and both links are on `/`, at Gateway mobile width the doors stack, a failed home-blocks still leaves the shop choice, and `main` does not carry a fixed frame height.

### 7 — Karen · textile

**Folder:** `frontend/src/pages/Textile/`. **Branch:** `feat/karen-textile`. Wait for Suro. **Frames:** [Textile desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12494) and [Textile mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12776).

The catalog still filters `store === textile`. Products use Vach’s card. Empty, skeleton, and error use `CatalogState`. No Baby product. Header `6-12495` / `6-12777` is Mariam. Wholesale is Hayk. Footer is Daniel.

Desktop sections, top to bottom: Seasonal editorial `6-12530`, Shopping assurances `6-12540`, Shop by category `6-12550`, Brand story and care `6-12737`, Shoppable product collection `6-12585`.

Mobile sections: Seasonal editorial `6-12814`, Shopping assurances `6-12824`, Shop by category `6-12834`, Shoppable product collection `6-12868`, Brand story and care `6-13020`. On mobile the collection sits before Brand story: reorder with CSS, do not duplicate markup.

Brand story gets `id="brand-story"`. Catalog controls read `?q=` and `?category=` and filter the list already loaded. Do not add a new API. Remove only an existing fixed height from `main`; do not add a new one.

**Motion:** editorial photo, category tiles, catalog-state change. Ashot’s tokens. Sections through `ds-reveal`.

**Check:** `/textile` at 1440 and Textile mobile width; five sections; Card into the cart; CatalogState for empty / loading / error; keyboard; `prefers-reduced-motion`.

**Do not:** `pages/Baby`, models, `index.css`, `components/Footer`, `components/Header`, building wholesale or the footer, a fixed height on `main`.

**Lead does not merge until:** `/textile` has all five sections, an add-to-cart button, no Baby card, CatalogState for empty, loading, and error, and `id="brand-story"` on Brand story.

### 8 — Svet · baby

**Folder:** `frontend/src/pages/Baby/`. **Branch:** `feat/svet-baby`. Wait for Karen. **Frames:** [Baby desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-13059) and [Baby mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-13319).

Same density rules as Textile, but Baby layers and the Baby palette. Filter `store === baby`. Vach’s card. CatalogState with Baby copy. No Textile product. The Textile diff is empty.

Desktop sections: Seasonal editorial `6-13087`, Shopping assurances `6-13098`, Shop by category `6-13108`, Shoppable product collection `6-13128`, Brand story and care `6-13280`, Parent care guide `6-13287`.

Mobile sections: `6-13351`, `6-13362`, `6-13372`, `6-13391`, `6-13543`, Parent care guide `6-13550`.

Parent care guide is its own section, not a paragraph inside Brand story. Brand story gets `id="brand-story"`. Wholesale and footer are not this page. Remove only an existing fixed height from `main`.

**Motion:** same as Karen, on the Baby palette. Ashot’s tokens.

**Check:** `/baby` at 1440 and Baby mobile width; sections including Parent care guide; add-to-cart; no Textile card; empty Textile diff; keyboard; `prefers-reduced-motion`.

**Do not:** Textile files, models, `index.css`, a fixed height on `main`.

**Lead does not merge until:** `/baby` shows the frame sections including Parent care guide, has add-to-cart, has no Textile card, has `id="brand-story"`, and the Textile diff is empty.

### 6 — Daniel · footer and newsletter

**Folder:** `frontend/src/components/Footer/`. **Branch:** `feat/daniel-footer`. Wait for Svet. **Frames:** Footer `178-49`, Gateway footer `6-12490`, Store footer `6-12751` / `6-13034` / `6-13294` / `6-13557`, `08 / FORM` states `65-1209`, compact footers Product Footer `8-653` and Checkout Footer `3-1393`.

One footer, looks by route and `useShop()`.

Home: Contact information (desktop), Copyright and Contact (mobile).

Textile and Baby shops: Footer information, Footer divider, Legal and payment. Visa and Mastercard marks are pictures, not a new payment method.

Compact footer on `/product/:sku` and `/cart` from `8-653` and `3-1393`: copyright line with the shop name from `useShop()`; without a shop — «Ventum». The phrase «Հոգածություն ամեն թելում» uses the Armenian stop «։» (one key). Do not build Policies `8-655` / `3-1395`: those pages do not exist.

The newsletter still posts to the old `POST /api/leads/newsletter/`. Six field states, both brands: default, focus-visible, invalid, success, disabled, loading. Transitions use Ashot’s tokens. Invalid does not send. Loading does not send a second POST.

The wholesale form in the footer that already posts to `POST /api/leads/wholesale/` stays working. Do not touch order models or `mail.py`.

**Motion:** short transitions among the six field states. `prefers-reduced-motion: reduce` — instant change or one opacity change.

**Check:** footer on `/`, `/textile`, `/baby`, `/product/:sku`, `/cart`; invalid without a request and success after the response; keyboard; `prefers-reduced-motion`.

**Do not:** `apps/orders`, header, shops, Policies pages, `index.css`.

**Lead does not merge until:** the footer shows on `/`, `/textile`, `/baby`, `/product/:sku`, and `/cart`, the newsletter has invalid without a request and success after the response, and the diff has no order models.

### 4 — Hayk · wholesale and `/cart`

**Folder:** `frontend/src/components/Wholesale/`, `frontend/src/pages/Cart/`. **Branch:** `feat/hayk-gateway`. Wait for Daniel. **Frames:** Wholesale partnership `6-12744` / `6-13027`; [Ventum Baby checkout](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=3-1157) — Checkout content `3-1168`.

Wholesale: one component between the collection and the footer in `Textile.jsx` and `Baby.jsx`. Do not rewrite the other lines of those files. The request stays the existing `POST /api/leads/wholesale/` with `name`, `phone`, `email`, `text`. Do not add a new endpoint. An empty submit does not leave. Success is not called payment.

Page `/cart` from Checkout content `3-1168`. Behaviour stays the Wave 3 cart. Do not copy Navigation `3-1158` or Footer `3-1393`.

Build:

- Breadcrumb `3-1169`: «Գլխավոր» → `/`, «Զամբյուղ» — current page, «Ձևակերպում» — current step.
- From Page introduction `3-1175` / Heading `3-1176` — the title only. Do not show the description that promises a form.
- Progress `3-1179` is static: step 2 is active, no links.
- Checkout columns `3-1190`:
  - left, Product / Checkout item preview `3-1191`: thumbnail from a separate `GET /api/catalog/products/<sku>/` (`image` or first `images[].url` via `mediaUrl`); failure leaves the placeholder; Textile maker copy;
  - middle, cart lines in place of Form / Customer checkout `3-1236`: name, sku, store, price, line total, quantity via the old `updateCartItem`, minus inactive at 1, remove separate;
  - right, Summary / Order sidebar `3-1336`: «Ձեր պատվերը», item count from `count`, Subtotal and Grand total are the cart `total`, payment calls the old `checkout` and `submitPaymentForm`, Visa and Mastercard beside it.

Do not build:

- Contact / Customer details, Delivery / Method and address, Payment / Method selection inside `3-1236`.
- Pay on delivery and bank-card fields.
- Delivery charge `3-1359`, Savings note `3-1362`, terms checkbox `3-1373`.
- The line «21,000 ֏ վճարվում է առաքման ժամանակ».
- Color and size chips, product qualities `3-1221`, the heart.
- An image field on the cart API.

The four cart states stay: signed out, loading, empty, lines. An empty cart on checkout shows the old error. Remove only an existing fixed height from `main`. Do not put Hug height 1430 on the page. Do not turn 1512 into a new `@media`. Mobile is Baby mobile width.

**Motion:** quantity change, error appear, line-loading skeleton. Ashot’s tokens. Motion does not block the Idram redirect.

**Check:** `/cart` at 1440 and Baby mobile width; wholesale on `/textile` and `/baby`; four states; minus inactive at 1; total without 3000; keyboard; `prefers-reduced-motion`.

**Do not:** `apps/orders/checkout.py`, `idram.py`, models, header, footer, contact/delivery/card form, delivery fee, a second payment method.

**Lead does not merge until:** wholesale shows on `/textile` and `/baby`, `/cart` shows the three columns from the API without the frame form and without 3000 in the total, payment hits the old checkout, and the checkout-backend and `/account` diffs are empty.

### 3 — Artush · copy

**Folder:** `frontend/src/i18n/`. **Branch:** `feat/artush-i18n`. Wait for Hayk.

Gather the wave’s visible strings the pages already need into `am.json`, `en.json`, and `ru.json`. Do not build foreign `jsx` or `css`.

`am.json` takes Armenian frame text verbatim. It includes, among others:

- «Փոքր հարմարավետություններ։ Պատրաստված սիրով։»
- «Բոլոր ապրանքները»
- «Մեր պատմությունը»
- «Շարունակել գնումները»
- «Հոգածություն ամեն թելում։» — one key with «։» (the checkout frame also shows «:»; JSON keeps only «։»)
- «Ձեր պատվերը»
- «Ավելացնել զամբյուղ»
- «Ապրանքի նկարագրություն»
- plural keys for the item count; in `ru` four forms: one, few, many, other

In `en.json` and `ru.json` the same keys are translations. A duplicate key or a broken brace is a reason not to open the PR. Before the PR, each file opens through `json.loads`.

Do not silently rename a key a page already reads.

**Check:** three valid JSON files; the listed Armenian phrases sit in `am.json`; the same keys exist in `en` and `ru`.

**Do not:** Gateway, Textile, Baby, Cart, Account, ProductDetails, Header, Footer, Design, ProductCard pages.

**Lead does not merge until:** the three files are valid JSON, the listed Armenian phrases sit in `am.json` with a single «։», and the same keys exist in `en` and `ru`.

---

## Հայերեն

Wave 5-ը փակ է։ Գլխավորի, դիզայն-համակարգի, Textile-ի և Baby-ի լրիվ կադրերը մնում են `dev`-ում։ Մի քանդիր։ Wave 4-ը փակ է։ Wave 3-ը մնում է գնման պայմանագիր՝ զամբյուղ, պատվեր, Idram, խանութի նամակ։ Այս ալիքը այն չի փակում և API-ն չի կոտրում։ Մանրամասն՝ [task-wave3.md](task-wave3.md)։ Wave 5-ի էկրանը՝ [task-wave5.md](task-wave5.md)։

Wave 6-ը կայքը հասցնում է երկու Figma ֆայլերին՝ CSS շարժումով և պատյանով, որտեղ `main`-ը աճում է ըստ բովանդակության։ Ամեն աշակերտ ավարտում է մեկ գոտի։ Մեկ մարդ ամբողջ կայքը չի հավաքում։ Hug բարձրությունը և 1430 / 1512 մակագրությունները `main`-ի վրա մի դրիր։

Գրանցումը, Google-ը, `/account`-ը Google կոճակով և `/product/:sku`-ի ու `/cart`-ի առաջին վերանկարումը արդեն `dev`-ում են մինչև այս ալիքի սկիզբը։ Նորից մի հանձնարարիր։ django-allauth, փոստի հաստատում և հյուրի պատվեր մի ավելացրու։

Ֆայլ 1-ի կադրերը՝ [Untitled](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=0-1).

- [Ventum · Gateway desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=178-46) — `178-46`
- [Ventum · Design system](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12117) — `6-12117`
- [Gateway · Mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12462) — `6-12462`
- [Ventum Textile · Desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12494) — `6-12494`
- Store navigation Textile desktop-ի ներսում — `6-12495` (Mariam-ի գլխամաս, ոչ թե Textile սեկցիա)
- [Ventum Textile · Mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12776) — `6-12776`
- [Ventum Baby · Desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-13059) — `6-13059`
- [Ventum Baby · Mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-13319) — `6-13319`

Ֆայլ 2-ի կադրերը՝ [Untitled](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=0-1), էջ `0-1`։ Ֆայլում կա հենց երկու վերին կադր, երկուսն էլ desktop։ Առանձին mobile, account, receipt, textile-product կամ երրորդ breakpoint չկա։ Hug բարձրությունը մի պահիր որպես էջի ֆիքսված բարձրություն։ 1512 լայնքը նոր `@media` մի դարձրու։ Նախագծի desktop-ը մնում է 1440։ Mobile-ը այդ խանութի արդեն եղած mobile կադրի լայնքն է։

- [Ventum Baby product detail](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=8-511) — `8-511`
- [Ventum Baby checkout](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=3-1157) — `3-1157` (մակագրություն **1512 × 1430 Hug**)

`98-574` և `98-575` տեքստային շերտերը, որոնք տանում են ֆայլ 2, մի հավաքիր։

**Git՝** [CONTRIBUTING.md](CONTRIBUTING.md)։ Կարճ ցանկ՝ [TASK.md](TASK.md)։ Տախտակ՝ [docs/zones/lead/README.md](docs/zones/lead/README.md)։

Ճյուղերը նույնն են։ Սկիզբ՝ `git checkout dev && git pull`, ապա սեփական `feat/...`։ Մեկ PR, **base = `dev`**։ `main` մի push արա։ `dev`-ին և `main`-ին `--force` մի արա։ Postgres մի բարձրացրու։ Նոր մոդելի դաշտ չկա։ Նոր վճարման եղանակ չկա։ Երկրորդ axios մի ստեղծիր։ `.env`-ը, Google-ի և Idram-ի գաղտնիքները git մի դիր։

Նոր տողը միանգամից `am.json`, `en.json` և `ru.json`։ Կադրի հայերենը `am.json`-ի աղբյուրն է։ `en`-ը և `ru`-ն թարգմանություն են։ Հարցումները՝ [frontend/src/api/client.js](frontend/src/api/client.js)-ի անվանական `api`-ով։ Բաղադրիչը դեռ երեք ֆայլ է՝ `Name.jsx`, `name.css`, `name.js`։

Ընդհանուր կանոններ.

- Paid / Оплачено / Վճարված բառը կա միայն `status === 'paid'`-ի դեպքում։ `?success=1`-ը վերադարձ է, ոչ թե վճարում։
- Card-ը և Cash-ը երկուսն էլ POST են անում `/api/cart/items/`՝ `{ sku, qty: 1 }`։ Cash-ը Idram չի բացում և պատվերը `paid` չի դնում։
- Չափը, հին գինը, զեղչը, մնացորդը և գույնը նկարվում են միայն եթե API-ն արդեն տալիս է դրանք։ Մակետի համար model դաշտ և migration մի ավելացրու։ `productExtras`-ում գույն չկա՝ գույնի տող մի ցույց տուր։ Wishlist-ը և share-ը մի միացրու։ Ապրանքի States շերտը ստատիկ է։
- Կադրի 3000 առաքումը գումարին մի ավելացրու։ Քարտի համարը, ժամկետը և CVV-ն մնում են Idram-ում։ Երկրորդ վճարման եղանակ չկա։
- Որոնումը նոր API չի կանչում։ Դաշտը գրում է `?q=`։ Բաժինը գրում է `?category=`։
- Գլխամասի կատեգորիաների շարքը և վիտրինայի ցանցը կարդում են նույն `?category=`-ը։

`main`-ի բարձրությունը՝ միայն Ashot.

- `App.jsx`-ում մեկ պատյան Header-ի, բովանդակության և Footer-ի շուրջ։ Դասը design-ում է, ոչ թե էջերում ցրված կանոններ։
- `main`-ը աճում է ըստ բովանդակության՝ `min-height: min-content`։ Կադրի ֆիքսված բարձրություն, այդ թվում 1430 և 1512, `main`-ի վրա մի դրիր։
- Պատյանը պատուհանից կարճ չէ՝ `min-height: 100vh`, սյուն։ `main`-ը ստանում է `flex: 1 0 auto`, որպեսզի կարճ էջը ստորոտը մեջտեղում չթողնի, իսկ երկար էջը `main`-ը երկարացնի, ոչ թե կտրի։
- Ashot-ը ուրիշների էջերը չի վերաշարադրում։ Մյուս աշակերտներն իրենց `main`-ից հանում են միայն արդեն եղած ֆիքսված բարձրությունը և նորը չեն դնում։

Շարժումը բոլորի համար.

- Միայն CSS։ Անիմացիայի գրադարան մի ավելացրու։
- Տևողության և easing token-ները գրում է Ashot-ը։ Մյուսները դրանք են վերցնում և յուրաքանչյուր էջում սեփական վայրկյաններ չեն գրում։
- Շարժումը կարճ է՝ hover, press, նկարի փոփոխություն, սեկցիայի մեկ անգամ երևալ, կմախք քանի դեռ հարցում կա։
- Անվերջ շարժում թույլատրվում է միայն բեռնման կմախքին և կանգնում է, երբ տվյալները գալիս են կամ հարցումը ձախողվում է։
- `prefers-reduced-motion: reduce`-ը հանում է տեղաշարժն ու մասշտաբը և թողնում է ակնթարթային փոփոխություն կամ մեկ թափանցիկության փոփոխություն։
- Շարժումը չի փակում Card-ը, Cash-ը, ձևի ուղարկումը և Idram անցումը։
- Առանց նախատիպի ստատիկ Figma շերտը սցենար չի դառնում։

Merge-ի հերթը կախվածությամբ՝ **Lead → Ashot → Vach → Mariam → Suro → Karen → Svet → Daniel → Hayk → Artush**։

Ashot-ը էկրաններից առաջինն է, որ մյուսները վերցնեն նրա token-ներն ու պատյանը։ Vach-ը դնում է քարտը, կատալոգի վիճակները և `/product/:sku`-ն մինչև վիտրինաները։ Mariam-ը դնում է նավիգացիան մինչև էջերը։ Artush-ը վերջինն է՝ հավաքում է բանալիները և ստուգում է երեք JSON-ը։

| # | Անուն | Ճյուղ | Գոտի | Գործակալ |
|---|------|--------|------|-----------|
| 1 | Lead | `feat/lead` | տախտակ | [01-lead.md](docs/agents/01-lead.md) |
| 2 | Suro | `feat/suro-api` | `/`-ի մեջտեղ | [02-suro.md](docs/agents/02-suro.md) |
| 3 | Artush | `feat/artush-i18n` | երեք JSON | [03-artush.md](docs/agents/03-artush.md) |
| 4 | Hayk | `feat/hayk-gateway` | մեծածախ և `/cart` | [04-hayk.md](docs/agents/04-hayk.md) |
| 5 | Mariam | `feat/mariam-header` | նավիգացիա | [05-mariam.md](docs/agents/05-mariam.md) |
| 6 | Daniel | `feat/daniel-footer` | ստորոտ և բաժանորդագրություն | [06-daniel.md](docs/agents/06-daniel.md) |
| 7 | Karen | `feat/karen-textile` | `/textile` | [07-karen.md](docs/agents/07-karen.md) |
| 8 | Svet | `feat/svet-baby` | `/baby` | [08-svet.md](docs/agents/08-svet.md) |
| 9 | Vach | `feat/vach-catalog` | քարտ, կատալոգ, `/product/:sku` | [09-vach.md](docs/agents/09-vach.md) |
| 10 | Ashot | `feat/ashot-ui` | պատյան, շարժման token-ներ, `/design` | [10-ashot.md](docs/agents/10-ashot.md) |

Կայք՝ `http://127.0.0.1:3000/`։

### 1 — Lead

Միայն տախտակ։ Էկրաններ մի նկարիր։ Merge արա անունների հերթով։ Եթե «Հետո ո՞ւմից» դեռ `dev`-ում չէ, տողը մի միավորիր։ Ուրիշի գոտին մի վերաշարադրիր։ «в dev» դրիր միայն այդ աշակերտի դռներից հետո։ Wave 5-ը այս տախտակով նորից մի բացիր։ Wave 3-ի պայմանագիրը այս հերթով մի պահիր։

**Lead-ը Wave 6-ը չի բացում, քանի դեռ.** գրանցման և գնման էկրանների PR-ը (ձև և Google `/account`-ում, `/product/:sku`-ի և `/cart`-ի վերանկարում) `dev`-ում է։

**Lead-ը Wave 6-ը չի փակում, քանի դեռ.** ինը գոտիները `dev`-ում են, երեք JSON-ը վավեր են, `/`, `/textile`, `/baby`, `/product/:sku`, `/cart` և `/account` բացվում են, կարճ էջի `main`-ը հասնում է պատուհանի ներքևը, երկար էջի `main`-ը չի կտրվում, `python manage.py test`-ը կանաչ է, diff-ում Postgres և նոր վճարման եղանակ չկա։

### 10 — Ashot · պատյան, շարժում և դիզայն-համակարգ

**Պանակ.** `frontend/src/design/`։ **Ճյուղ.** `feat/ashot-ui`։ Սպասիր Lead-ին։ **Կադր.** [Ventum · Design system](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12117) — `6-12117`։

Էկրաններից առաջինը։ Մյուսները վերցնում են token-ներն ու պատյանը այստեղից։ Երթուղի `/design`։ `App.jsx`-ում թույլատրվում է՝ պատյան Header-ի, բովանդակության և Footer-ի շուրջ, մեկ lazy-import և `/design` երթուղի եթե չկան, `shell.css`-ի և `motion.css`-ի միացում։ Մնացած `App.jsx`-ը մի վերաշարադրիր։ Կենդանի քարտը, կենդանի բաժանորդագրությունը և կենդանի զամբյուղը մի հավաքիր՝ `/design`-ում դրանք ստատիկ նմուշներ են։

Պատյան.

- Նոր ֆայլ `frontend/src/design/shell.css`, մեկ անգամ `App.jsx`-ից։ Դասը `design.css`-ում մի դրիր՝ այդ ֆայլը բեռնվում է միայն ծույլ `/design`-ով։
- `ds-shell` դասը սյուն է՝ `min-height: 100vh`։
- `.ds-shell > main`-ը ստանում է `flex: 1 0 auto` և `min-height: min-content`։
- Երթուղու բեռնման ժամանակ ցույց տուր `<main>`, ոչ թե `<p>`, որ ստորոտը չթռչի։
- [frontend/src/index.css](frontend/src/index.css)-ից հանիր `#root` և `#root > main` կանոնները։ Այլ `index.css` փոփոխություններ՝ միայն ընդհանուր `vt-*`-ի վայրկյանները token-ներով փոխարինել։ Ուրիշների էջերը մի վերաշարադրիր։

Շարժում.

- [frontend/src/design/tokens.css](frontend/src/design/tokens.css)-ում ավելացրու տևողություններ, կորեր, տեղաշարժ և մասշտաբ։ `prefers-reduced-motion: reduce`-ի տակ տեղաշարժը դառնում է 0, մասշտաբը՝ 1։
- Նոր ֆայլ `frontend/src/design/motion.css`՝ `ds-reveal` (սեկցիան երևում է մեկ անգամ) և `ds-skeleton` (կմախքի թարթում)։
- Եղած `ds-spin`-ը բեռնման շարժում է՝ պտտվում է միայն քանի դեռ հարցում կա։

Խանութ գլխամասի և ստորոտի համար.

- `useShop()` hook և `data-shop` պատյանի վրա։ `/textile`-ը և `/baby`-ն դնում են խանութը։
- `/product/:sku`-ն և `/cart`-ը պահում են այս ներդիրի վերջին խանութը։ Առանց դրա խանութ չկա։

`/design`-ը հասցրու կադրի հանգույցներին.

- Design system cover `6-12118`։
- Component library `6-12124`՝ Paired palettes `6-12125`, Shared Armenian-first hierarchy `6-12168`, Rhythm, shape & elevation `6-12184`, Store switch, search & category controls `6-12222`, Purchase actions, sizes & product states `6-12255`, The complete product-card anatomy `6-12330`, Interaction states `65-4`։
- 08 / FORM `65-1209` և 09 / FEEDBACK `65-1321`՝ վիճակների նմուշներ։
- System footer `6-12424`։

Շարժման token-ները կանգնում են token աղյուսակներում, ոչ թե կադրի նոր սեկցիայում։ Կոճակը, բեյջը, չափը և դաշտը կարդում են փոփոխականները։ Օտար `pages/Gateway`, `Textile`, `Baby`, `ProductDetails`, `Cart`, `Header`, `Footer`, `ProductCard` մի խմբագրիր։

**Շարժում.** վերը նշված token-ներն ու դասերը։ Կենդանի էջերը կմիացնեն merge-ից հետո։

**Ստուգում.** `/design` 1440-ում, կարճ էջի (`/404` կամ դուրս եկած `/account`) `main`-ը հասնում է պատուհանի ներքևը, երկար էջի (`/design` կամ `/textile`) `main`-ը չի կտրվում, `prefers-reduced-motion: reduce`-ը հանում է տեղաշարժն ու մասշտաբը նմուշների վրա, ստեղնաշար և focus-visible կոճակների նմուշներին։

**Չի կարելի.** `apps/orders`, `apps/cart`, մոդելներ, `mail.py`, կենդանի `POST /api/cart/items/`, կենդանի `POST /api/leads/newsletter/`, կենդանի checkout, օտար էջերի խմբագրում։

**Lead-ը չի merge անում, քանի դեռ.** պատյանը կանգնած է `App.jsx`-ում, `shell.css`-ը և `motion.css`-ը միացված են, `/design`-ը ցույց է տալիս երկու պալիտրան և կոճակի վեց վիճակը, շարժման token-ները կան `tokens.css`-ում, իսկ diff-ում Gateway, Textile, Baby, ProductDetails, Cart, Header, Footer և ProductCard էջեր չկան։

### 9 — Vach · քարտ, կատալոգ և `/product/:sku`

**Պանակ.** `frontend/src/components/ProductCard/`, `frontend/src/components/CatalogState/`, `frontend/src/pages/ProductDetails/`։ **Ճյուղ.** `feat/vach-catalog`։ Սպասիր Ashot-ին։ **Կադրեր.** անատոմիա և `09 / FEEDBACK` [Design system](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12117)-ի ներսում, [Ventum Baby product detail](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=8-511) — Product content `8-528`։

Քարտը չգիտի Textile է, թե Baby։ Էջը փոխանցում է բրենդը։ `api`-ն ներմուծիր անունով։ Կոճակի դասերն ու շարժման token-ները՝ Ashot-ից։ Քարտը և CatalogState-ը հասցրու Wave 5-ի շերտերին և ավելացրու շարժում։

Քարտի անատոմիա, երկու բրենդ՝ լուսանկար, Discount pill, Stock status, անուն, բնութագիր, Size selection, Price comparison, Visa և Mastercard, Card և Cash։ Երկու կոճակի վեց վիճակ։ Loading-ը երկրորդ POST չի ուղարկում։ 401-ը մուտքի տեքստ է ցույց տալիս քարտի վրա։ Չափը, զեղչը և հին գինը՝ միայն եթե կատալոգն արդեն տվել է։ Պատկերն ու անունը տանում են `/product/<sku>`։

`CatalogState`՝ `09 / FEEDBACK` `65-1321`-ից՝ Empty, Loading (`ds-skeleton`), Error՝ «Կրկին փորձել»։ `Textile.jsx`-ը և `Baby.jsx`-ը մի խմբագրիր։

`/product/:sku` էջը՝ Product content `8-528` շերտից, textile և baby։ `data-brand`-ը՝ `product.store`-ից։ Տվյալները՝ `GET /api/catalog/products/<sku>/` անվանական `api`-ով։

Կառուցիր API-ից, վերևից ներքև, Product content `8-528`-ի ներսում.

- Breadcrumbs `8-529`։ Հետ և home՝ `/textile` կամ `/baby`՝ ըստ `product.store`-ի։
- Product overview `8-535` → Gallery / Product media `8-536`՝ լուսանկարներ `images`-ից ըստ `order`-ի։ «1 / 3» հաշվիչը միայն երկու և ավելի լուսանկարի դեպքում։ Մեկ լուսանկար՝ առանց մանրապատկերների շարքի։ Լուսանկար չկա՝ հանգիստ placeholder խանութի անունով։
- Product introduction՝ կատեգորիա, վերնագիր, «SKU: …», կարճ նկարագրություն։
- Price and availability՝ գինը `formatProductPrice`-ով։ Հին գինը, զեղչը և մնացորդը՝ միայն `productExtras`-ով։
- Size selection՝ միայն եթե `productExtras`-ն արդեն գտնում է չափերը։
- Card և Cash՝ Add to cart `8-597` մեկ կոճակի տեղում։ Երկուսն էլ POST են անում `{ sku, qty: 1 }`։ Cash-ը Idram չի բացում։
- About the product `8-621` → About Product `8-626`-ը `description`-ն է։
- Կադրի ընդհանուր տեքստը i18n-ում՝ նկարագրության վերնագիր `8-622`, Product philosophy, Textile maker `8-643`։ Purchase reassurance `8-618`՝ միայն baby ապրանքների համար։

Մի կառուցիր.

- Collection label, Gallery note `8-552`, Zoom `8-541`։
- Copy SKU `8-559`, Color selection `8-589`, Wishlist և Share `8-602`։
- Delivery / Product shipping information `8-609`՝ 3,000 ֏-ով։
- Materials `8-630`, Care `8-636`, աջակցության էլ. փոստ `8-648`։
- States / Static previews only `12-44`-ը մնում է ստատիկ։ Toast `12-25`-ը միայն ոճավորում է արդեն եղած «ավելացված» տողը՝ առանց ժամաչափի և առանց wishlist/share սցենարի։

Navigation `8-512`-ը և Footer `8-653`-ը էջի մեջ մի պատճենիր՝ դրանք Mariam-ի և Daniel-ի են։

**Շարժում.** hover և press քարտի վրա, լուսանկարի հարթ փոփոխություն, «ավելացված» տողի երևալ, ապրանքի կմախք, սխալ՝ կրկնելով։ Ashot-ի token-ներ։ `prefers-reduced-motion: reduce`-ը հանում է տեղաշարժն ու մասշտաբը։

**Ստուգում.** `/product/:sku` 1440-ում և այդ խանութի mobile կադրի լայնքում, ստեղնաշար և focus-visible Card-ի, Cash-ի և մանրապատկերների վրա, դատարկ լուսանկար, բեռնում, բացակա ապրանք և ցանցի սխալ՝ տարբեր տեքստեր, `prefers-reduced-motion`։

**Չի կարելի.** կատալոգի մոդելներ, միգրացիաներ, `pages/Textile`, `pages/Baby`, `components/Header`, `components/Footer`, checkout, գույն, wishlist, share, առաքում 3000։

**Lead-ը չի merge անում, քանի դեռ.** քարտը ապրում է `components/ProductCard/`-ում, CatalogState-ը ցույց է տալիս դատարկ, կմախք և սխալ՝ կրկնելով, `/product/:sku`-ն ցույց է տալիս պատկերասրահը, Card և Cash, About՝ `description`-ից, 401-ը տալիս է հղում `/account`՝ այդ sku-ի `state.from`-ով, իսկ diff-ում Header, Footer, Textile և Baby չկան։

### 5 — Mariam · նավիգացիա

**Պանակ.** `frontend/src/components/Header/`։ **Ճյուղ.** `feat/mariam-header`։ Սպասիր Vach-ին։

Մեկ գլխամաս բոլոր կադրերի համար։ Վիտրինաների էջերը, գլխավորի մեջտեղը, ապրանքը, զամբյուղը և ստորոտը մի հավաքիր։ Հաշվիչը և `/account` ու `/cart` հղումները մնում են։ `?success=1`-ը դեռ վճարում չի կոչվում։ Խանութը վերցվում է Ashot-ի `useShop()`-ից։ Առանց խանութի՝ գլխավորի տեսք։

Չորս տեսք.

- Gateway desktop Navigation `178-47` և Gateway masthead `6-12463`՝ հարթակի անուն, խոստում, լեզու `am` / `en` / `ru`։
- Store navigation Textile desktop `6-12495` (1440 × 244), Textile mobile `6-12777`, Baby desktop `6-13060`, Baby mobile `6-13320`՝ խանութի փոխարկիչ, առաքման տող, Account, Cart՝ `count`-ով, որոնում `?q=`, կատեգորիաների շարք `?category=`, մեծածախի կետը տանում է էջի մեծածախ բլոկին։
- Product Navigation `8-512` `/product/:sku`-ում՝ Brand `8-513` (կադրի խոստումը «Փոքր հարմարավետություններ։ Պատրաստված սիրով։»՝ i18n-ով և `useShop`-ով), Shop navigation `8-517`՝ «Բոլոր ապրանքները» տանում է խանութի էջ, կատեգորիաները՝ արդեն եղած ցանկից («Ծածկոցներ» մի կոշտացրու), «Մեր պատմությունը»՝ `/<store>#brand-story`, աջում Shopping tools `8-521`՝ որոնում, հաշիվ, պայուսակ՝ `count`-ով։
- Checkout Navigation `3-1158` `/cart`-ում՝ Brand, Customer support `3-1163`՝ «Շարունակել գնումները» տանում է վերջին խանութ կամ `/`։ Help `3-1165` մի կառուցիր։

Նեղ լայնքում գլխամասը կոմպակտ է։ Կատեգորիաների լրիվ շարքը էջը չի ձգում։

**Շարժում.** խանութի փոխարկիչի ցուցիչ, մենյուի բացում, հաշվիչի փոփոխություն։ Ashot-ի token-ներ։

**Ստուգում.** 1440 և mobile կադրի լայնք, `/product/:sku` և `/cart` ցույց են տալիս իրենց գլխամասի տեսքերը, ստեղնաշար, `prefers-reduced-motion`, token-ով երևում է `count`, `?success=1`-ը վճարում չի կոչվում։

**Չի կարելի.** `pages/Gateway`, `pages/Textile`, `pages/Baby`, `pages/ProductDetails`, `pages/Cart`, `components/Footer`, `index.css`, checkout, Help `3-1165`։

**Lead-ը չի merge անում, քանի դեռ.** 1440-ում երևում են հարթակը, լեզուն, փոխարկիչը, որոնումը և կատեգորիաների շարքը, `/product/:sku`-ում և `/cart`-ում կան իրենց գլխամասի տեսքերը, mobile կադրի լայնքում գլխամասը կոմպակտ է, և `?success=1`-ը վճարում չի կոչվում։

### 2 — Suro · գլխավոր

**Պանակ.** `frontend/src/pages/Gateway/`։ **Ճյուղ.** `feat/suro-api`։ Սպասիր Mariam-ին։ **Կադրեր.** Brand gateway `178-48` [Gateway desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=178-46)-ում, Stacked brand gateway `181-89` [Gateway · Mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12462)-ում։

Էջի մեջտեղը։ Navigation-ը և Footer-ը էջի մեջ մի պատճենիր։

Desktop՝ Ventum Textile gateway և Ventum Baby gateway՝ eyebrow, promise, signature, wordmark, designation, headline, description, Explore Home / Explore Baby, lifestyle։ Explore Home → `/textile`։ Explore Baby → `/baby`։

Mobile՝ նույն երկու մուտքերը սյունով։ Masthead-ը և Gateway footer-ը մի պատճենիր։

`GET /api/content/home-blocks/`-ը դեռ փնտրում է `hero` բլոկը։ Եթե հարցումը ընկնում է, երկու մուտքերն էլ մնում են էկրանին։ Պալիտրաները՝ Ashot-ի token-ներից։

`.gateway-page`-ից հանիր `flex: 1` և `min-height: 640px`, եթե դրանք կանգնած են `main`-ի վրա։ Եթե վահանակին բարձրություն է պետք, դրիր վահանակի վրա, ոչ թե `main`-ի։ Սեփական `600ms`-ը և `cubic-bezier`-ը փոխարինիր Ashot-ի token-ներով։ Սեկցիաները երևում են `ds-reveal`-ով։

**Շարժում.** սեկցիաները երևում են մեկ անգամ, վահանակների hover՝ token-ներով։ `prefers-reduced-motion: reduce`-ը հանում է ցանցի տեղաշարժը։

**Ստուգում.** `/` 1440-ում և Gateway mobile լայնքում, երկու մուտքերն ընկած home-blocks-ի դեպքում, ստեղնաշար, `prefers-reduced-motion`, `main`-ը ֆիքսված բարձրություն չունի։

**Չի կարելի.** `pages/Textile`, `pages/Baby`, `components/Header`, `components/Footer`, ֆիքսված բարձրություն `main`-ի վրա, `apps/cart`, `apps/orders`։

**Lead-ը չի merge անում, քանի դեռ.** `/`-ում 1440-ում երևում են երկու պատմությունները և երկու հղումները, Gateway mobile լայնքում մուտքերը սյունով են, ընկած home-blocks-ի դեպքում խանութի ընտրությունը չի անհետանում, և `main`-ը կադրի ֆիքսված բարձրություն չի կրում։

### 7 — Karen · textile

**Պանակ.** `frontend/src/pages/Textile/`։ **Ճյուղ.** `feat/karen-textile`։ Սպասիր Suro-ին։ **Կադրեր.** [Textile desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12494) և [Textile mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12776)։

Կատալոգը ֆիլտրում է `store === textile`։ Ապրանքը՝ Vach-ի քարտով։ Դատարկ, կմախք և սխալ՝ `CatalogState`։ Baby ապրանք չկա։ Գլխամաս `6-12495` / `6-12777`՝ Mariam։ Մեծածախ՝ Hayk։ Ստորոտ՝ Daniel։

Desktop սեկցիաներ, վերևից ներքև՝ Seasonal editorial `6-12530`, Shopping assurances `6-12540`, Shop by category `6-12550`, Brand story and care `6-12737`, Shoppable product collection `6-12585`։

Mobile սեկցիաներ՝ Seasonal editorial `6-12814`, Shopping assurances `6-12824`, Shop by category `6-12834`, Shoppable product collection `6-12868`, Brand story and care `6-13020`։ Mobile-ում հավաքածուն կանգնած է Brand story-ից առաջ՝ կարգը CSS-ով, markup մի կրկնիր։

Brand story-ն ստանում է `id="brand-story"`։ Catalog controls-ը կարդում է `?q=` և `?category=` և ֆիլտրում է արդեն բեռնված ցանկը։ Նոր API մի ավելացրու։ `main`-ից հանիր միայն արդեն եղած ֆիքսված բարձրությունը, նորը մի դրիր։

**Շարժում.** editorial լուսանկար, կատեգորիաների սալիկներ, կատալոգի վիճակի փոփոխություն։ Ashot-ի token-ներ։ Սեկցիաներ՝ `ds-reveal`-ով։

**Ստուգում.** `/textile` 1440-ում և Textile mobile լայնքում, հինգ սեկցիա, Card զամբյուղում, CatalogState դատարկ / բեռնում / սխալ, ստեղնաշար, `prefers-reduced-motion`։

**Չի կարելի.** `pages/Baby`, մոդելներ, `index.css`, `components/Footer`, `components/Header`, մեծածախի և ստորոտի հավաքում, ֆիքսված բարձրություն `main`-ի վրա։

**Lead-ը չի merge անում, քանի դեռ.** `/textile`-ում կան բոլոր հինգ սեկցիաները, զամբյուղի կոճակ, Baby քարտ չկա, դատարկ, բեռնման և սխալի դեպքում երևում է CatalogState, և `id="brand-story"`-ը կանգնած է Brand story-ի վրա։

### 8 — Svet · baby

**Պանակ.** `frontend/src/pages/Baby/`։ **Ճյուղ.** `feat/svet-baby`։ Սպասիր Karen-ին։ **Կադրեր.** [Baby desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-13059) և [Baby mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-13319)։

Նույն խտության կանոնները, ինչ Textile-ում, բայց Baby շերտեր և Baby պալիտրա։ Ֆիլտր՝ `store === baby`։ Vach-ի քարտ։ CatalogState՝ Baby տեքստերով։ Textile ապրանք չկա։ Textile-ի diff-ը դատարկ է։

Desktop սեկցիաներ՝ Seasonal editorial `6-13087`, Shopping assurances `6-13098`, Shop by category `6-13108`, Shoppable product collection `6-13128`, Brand story and care `6-13280`, Parent care guide `6-13287`։

Mobile սեկցիաներ՝ `6-13351`, `6-13362`, `6-13372`, `6-13391`, `6-13543`, Parent care guide `6-13550`։

Parent care guide-ը առանձին սեկցիա է, ոչ թե պարբերություն Brand story-ի ներսում։ Brand story-ն ստանում է `id="brand-story"`։ Մեծածախը և ստորոտը այս էջը չեն։ `main`-ից հանիր միայն արդեն եղած ֆիքսված բարձրությունը։

**Շարժում.** ինչպես Karen-ինը, Baby պալիտրայով։ Ashot-ի token-ներ։

**Ստուգում.** `/baby` 1440-ում և Baby mobile լայնքում, սեկցիաներ՝ ներառյալ Parent care guide, զամբյուղի կոճակ, Textile քարտ չկա, Textile diff-ը դատարկ է, ստեղնաշար, `prefers-reduced-motion`։

**Չի կարելի.** Textile ֆայլեր, մոդելներ, `index.css`, ֆիքսված բարձրություն `main`-ի վրա։

**Lead-ը չի merge անում, քանի դեռ.** `/baby`-ում երևում են կադրի սեկցիաները՝ ներառյալ Parent care guide, կա զամբյուղի կոճակ, Textile քարտ չկա, `id="brand-story"`-ը կա, Textile diff-ը դատարկ է։

### 6 — Daniel · ստորոտ և բաժանորդագրություն

**Պանակ.** `frontend/src/components/Footer/`։ **Ճյուղ.** `feat/daniel-footer`։ Սպասիր Svet-ին։ **Կադրեր.** Footer `178-49`, Gateway footer `6-12490`, Store footer `6-12751` / `6-13034` / `6-13294` / `6-13557`, `08 / FORM` վիճակներ `65-1209`, կոմպակտ ստորոտներ Product Footer `8-653` և Checkout Footer `3-1393`։

Մեկ ստորոտ, տեսքեր՝ ըստ երթուղու և `useShop()`-ի։

Գլխավոր՝ Contact information (desktop), Copyright և Contact (mobile)։

Textile և Baby խանութներ՝ Footer information, Footer divider, Legal and payment։ Visa և Mastercard նշանները նկար են, ոչ թե նոր վճարման եղանակ։

Կոմպակտ ստորոտ `/product/:sku`-ում և `/cart`-ում՝ `8-653` և `3-1393`՝ copyright տող խանութի անունով `useShop()`-ից, առանց խանութի՝ «Ventum»։ «Հոգածություն ամեն թելում» արտահայտությունը՝ հայերեն վերջակետով «։» (մեկ բանալի)։ Policies `8-655` / `3-1395` մի կառուցիր՝ այդ էջերը չկան։

Բաժանորդագրությունը գնում է հին `POST /api/leads/newsletter/`։ Դաշտի վեց վիճակ, երկու բրենդ՝ default, focus-visible, invalid, success, disabled, loading։ Անցումները՝ Ashot-ի token-ներով։ Invalid-ը հարցում չի ուղարկում։ Loading-ը երկրորդ POST չի ուղարկում։

Ստորոտի մեծածախ ձևը, որ արդեն գնում է `POST /api/leads/wholesale/`, մնում է աշխատող։ Պատվերի մոդելները և `mail.py`-ն մի դիպչիր։

**Շարժում.** կարճ անցումներ վեց վիճակների միջև։ `prefers-reduced-motion: reduce`՝ ակնթարթային փոփոխություն կամ մեկ թափանցիկություն։

**Ստուգում.** ստորոտ `/`, `/textile`, `/baby`, `/product/:sku`, `/cart`, invalid առանց հարցման և success պատասխանից հետո, ստեղնաշար, `prefers-reduced-motion`։

**Չի կարելի.** `apps/orders`, գլխամաս, վիտրինաներ, Policies էջեր, `index.css`։

**Lead-ը չի merge անում, քանի դեռ.** ստորոտը երևում է `/`, `/textile`, `/baby`, `/product/:sku` և `/cart`-ում, բաժանորդագրությունն ունի invalid առանց հարցման և success պատասխանից հետո, իսկ diff-ում պատվերի մոդելներ չկան։

### 4 — Hayk · մեծածախ և `/cart`

**Պանակ.** `frontend/src/components/Wholesale/`, `frontend/src/pages/Cart/`։ **Ճյուղ.** `feat/hayk-gateway`։ Սպասիր Daniel-ին։ **Կադրեր.** Wholesale partnership `6-12744` / `6-13027`, [Ventum Baby checkout](https://www.figma.com/design/qHZfcqQumXuEPF8t3y62dF/Untitled?node-id=3-1157) — Checkout content `3-1168`։

Մեծածախ՝ մեկ բաղադրիչ հավաքածուի և ստորոտի միջև `Textile.jsx`-ում և `Baby.jsx`-ում։ Այդ ֆայլերի մյուս տողերը մի վերաշարադրիր։ Հարցումը մնում է եղած `POST /api/leads/wholesale/`՝ `name`, `phone`, `email`, `text`։ Նոր endpoint մի բացիր։ Դատարկ ուղարկումը չի գնում։ Հաջողությունը վճարում չի կոչվում։

`/cart` էջը՝ Checkout content `3-1168`-ից։ Վարքը մնում է Wave 3-ի զամբյուղ։ Navigation `3-1158`-ը և Footer `3-1393`-ը մի պատճենիր։

Կառուցիր.

- Breadcrumb `3-1169`՝ «Գլխավոր» → `/`, «Զամբյուղ»՝ ընթացիկ էջ, «Ձևակերպում»՝ ընթացիկ քայլ։
- Page introduction `3-1175` / Heading `3-1176`-ից՝ միայն վերնագիրը։ Ձև խոստացող նկարագրությունը մի ցույց տուր։
- Progress `3-1179`-ը ստատիկ է՝ ակտիվ է քայլ 2, հղումներ չկան։
- Checkout columns `3-1190`.
  - ձախ՝ Product / Checkout item preview `3-1191`՝ մանրապատկեր առանձին `GET /api/catalog/products/<sku>/`-ով (`image` կամ առաջին `images[].url`՝ `mediaUrl`-ով), սխալը թողնում է placeholder, Textile maker տեքստ,
  - մեջտեղ՝ զամբյուղի տողեր Form / Customer checkout `3-1236`-ի տեղում՝ անուն, sku, խանութ, գին, տողի գումար, քանակ՝ հին `updateCartItem`-ով, մինուսը 1-ի վրա անգործ է, ջնջելը առանձին,
  - աջ՝ Summary / Order sidebar `3-1336`՝ «Ձեր պատվերը», ապրանքների թիվը `count`-ից, Subtotal և Grand total՝ զամբյուղի `total`, վճարման կոճակը կանչում է հին `checkout` և `submitPaymentForm`, կողքին Visa և Mastercard։

Մի կառուցիր.

- Contact / Customer details, Delivery / Method and address, Payment / Method selection `3-1236`-ի ներսում։
- «Առաքման պահին վճարում» և բանկային քարտի դաշտեր։
- Delivery charge `3-1359`, Savings note `3-1362`, պայմանների նշիչ `3-1373`։
- «21,000 ֏ վճարվում է առաքման ժամանակ» տողը։
- Գույնի և չափի չիպեր, ապրանքի հատկություններ `3-1221`, սիրտ։
- Նկարի դաշտ cart API-ում։

Չորս վիճակները մնում են՝ դուրս եկած, բեռնում, դատարկ, տողեր։ Դատարկ զամբյուղը checkout-ում ցույց է տալիս հին սխալը։ `main`-ից հանիր միայն արդեն եղած ֆիքսված բարձրությունը։ Hug 1430 բարձրությունը էջի վրա մի դրիր։ 1512-ը նոր `@media` մի դարձրու։ Mobile՝ Baby mobile լայնք։

**Շարժում.** քանակի փոփոխություն, սխալի երևալ, տողերի բեռնման կմախք։ Ashot-ի token-ներ։ Շարժումը չի փակում Idram անցումը։

**Ստուգում.** `/cart` 1440-ում և Baby mobile լայնքում, մեծածախ `/textile`-ում և `/baby`-ում, չորս վիճակ, մինուսը 1-ի վրա անգործ, գումարը առանց 3000, ստեղնաշար, `prefers-reduced-motion`։

**Չի կարելի.** `apps/orders/checkout.py`, `idram.py`, մոդելներ, գլխամաս, ստորոտ, կոնտակտ/առաքում/քարտ ձև, առաքման վճար, երկրորդ վճարման եղանակ։

**Lead-ը չի merge անում, քանի դեռ.** մեծածախի բլոկը երևում է `/textile`-ում և `/baby`-ում, `/cart`-ը ցույց է տալիս երեք սյուներ API-ից առանց կադրի ձևի և առանց 3000-ի գումարում, վճարումը գնում է հին checkout, իսկ checkout backend-ի և `/account`-ի diff-ը դատարկ է։

### 3 — Artush · գրություններ

**Պանակ.** `frontend/src/i18n/`։ **Ճյուղ.** `feat/artush-i18n`։ Սպասիր Hayk-ին։

Հավաքիր ալիքի տեսանելի տողերը, որոնք էջերին արդեն պետք են, երեք ֆայլում՝ `am.json`, `en.json`, `ru.json`։ Օտար `jsx` և `css` մի հավաքիր։

`am.json`-ը վերցնում է կադրի հայերենը բառացի։ Դրանում կան, ի թիվս այլոց.

- «Փոքր հարմարավետություններ։ Պատրաստված սիրով։»
- «Բոլոր ապրանքները»
- «Մեր պատմությունը»
- «Շարունակել գնումները»
- «Հոգածություն ամեն թելում։» — մեկ բանալի «։»-ով (checkout կադրում հանդիպում է նաև «:», JSON-ում միայն «։»)
- «Ձեր պատվերը»
- «Ավելացնել զամբյուղ»
- «Ապրանքի նկարագրություն»
- ապրանքների թվի հոգնակի բանալիներ, `ru`-ում չորս ձև՝ one, few, many, other

`en.json`-ում և `ru.json`-ում նույն բանալիները թարգմանություն են։ Կրկնակի բանալին կամ կոտրված փակագիծը PR չբացելու պատճառ է։ PR-ից առաջ ամեն ֆայլ բացվում է `json.loads`-ով։

Էջի արդեն կարդացած բանալին լուռ մի վերանվանիր։

**Ստուգում.** երեք վավեր JSON, նշված հայերեն արտահայտությունները `am.json`-ում են, նույն բանալիները կան `en`-ում և `ru`-ում։

**Չի կարելի.** Gateway, Textile, Baby, Cart, Account, ProductDetails, Header, Footer, Design, ProductCard էջեր։

**Lead-ը չի merge անում, քանի դեռ.** երեք ֆայլը վավեր JSON է, նշված հայերեն արտահայտությունները `am.json`-ում են՝ մեկ «։»-ով, և նույն բանալիները կան `en`-ում և `ru`-ում։
