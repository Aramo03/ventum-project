# Ventum — Wave 5

Волна 4 закрыта: тонкие экраны уже в `dev`. Их не сносить. Волна 3 остаётся контрактом покупки: корзина, заказ, Idram, письмо. Её не закрывать этой волной и API не ломать. Подробности: [task-wave3.md](task-wave3.md). Экран волны 4: [task-wave4.md](task-wave4.md).

Волна 5 — полный кадр. Каждый ученик доводит свою зону до слоёв кадра, на ширине desktop 1440 и на ширине кадра Mobile. Общую страницу одним человеком не собирать. Высоту не подгонять «на глаз»: открыть свой кадр и повторить его секции.

Макеты этой волны, файл [Untitled](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=0-1):

- [Ventum · Gateway desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=178-46) — `178-46`
- [Ventum · Design system](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12117) — `6-12117`
- [Gateway · Mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12462) — `6-12462`
- [Ventum Textile · Desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12494) — `6-12494`
- [Ventum Textile · Mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12776) — `6-12776`
- [Ventum Baby · Desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-13059) — `6-13059`
- [Ventum Baby · Mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-13319) — `6-13319`

Два текстовых слоя со ссылкой на файл `qHZfcqQumXuEPF8t3y62dF` не верстать. Третий брейкпоинт не выдумывать: desktop — 1440, mobile — ширина своего кадра Mobile.

**Git:** [CONTRIBUTING.md](CONTRIBUTING.md). Короткий список: [TASK.md](TASK.md). Доска: [docs/zones/lead/README.md](docs/zones/lead/README.md).

Ветки прежние. Старт: `git checkout dev && git pull`, затем своя `feat/...`. Один PR, **base = `dev`**. В `main` не пушить. `--force` на `dev` и `main` не делать. Postgres не поднимать. Новых полей моделей нет. Нового способа оплаты нет. Второй axios не создавать.

Новую строку ученик сразу кладёт в `frontend/src/i18n/am.json`, `en.json` и `ru.json`. Армянский текст кадра — источник `am.json`. `en` и `ru` — перевод, не копия армянского. Запросы — через [frontend/src/api/client.js](frontend/src/api/client.js), именной `api`. У компонента три файла: `Name.jsx`, `name.css`, `name.js`.

Общие правила экрана:

- Слово оплаты есть только при `status === 'paid'`. `?success=1` оплату не показывает.
- Кнопка Card и кнопка Cash обе шлют `POST /api/cart/items/` с `{ sku, qty: 1 }`. Cash не открывает Idram и не ставит заказ в `paid`.
- Размер, старая цена и скидка рисуются только если каталог их уже отдал. Поле модели ради кадра не добавлять.
- Поиск не зовёт новый API. Поле пишет `?q=`. Витрина фильтрует уже загруженный список.
- Ряд категорий в шапке и сетка витрины читают один `?category=`.
- Ответ 401 на карточке показывает текст входа на самой карточке и не уводит на `/account`.

Очередь merge — по зависимости, не по номеру ученика:

```
Lead → Ashot → Vach → Mariam → Suro → Karen → Svet → Daniel → Hayk → Artush
```

Ashot первый среди экранов: остальные берут его токены. Vach кладёт карточку и состояния каталога до витрин. Mariam кладёт навигацию до страниц. Artush последний: он собирает уже нужные подписи и проверяет три JSON.

| # | Имя | Ветка | Зона | Агент |
|---|-----|--------|------|--------|
| 1 | Lead | `feat/lead` | доска | [01-lead.md](docs/agents/01-lead.md) |
| 2 | Suro | `feat/suro-api` | середина `/` | [02-suro.md](docs/agents/02-suro.md) |
| 3 | Artush | `feat/artush-i18n` | три JSON | [03-artush.md](docs/agents/03-artush.md) |
| 4 | Hayk | `feat/hayk-gateway` | опт | [04-hayk.md](docs/agents/04-hayk.md) |
| 5 | Mariam | `feat/mariam-header` | навигация | [05-mariam.md](docs/agents/05-mariam.md) |
| 6 | Daniel | `feat/daniel-footer` | подвал и рассылка | [06-daniel.md](docs/agents/06-daniel.md) |
| 7 | Karen | `feat/karen-textile` | `/textile` | [07-karen.md](docs/agents/07-karen.md) |
| 8 | Svet | `feat/svet-baby` | `/baby` | [08-svet.md](docs/agents/08-svet.md) |
| 9 | Vach | `feat/vach-catalog` | карточка и состояния каталога | [09-vach.md](docs/agents/09-vach.md) |
| 10 | Ashot | `feat/ashot-ui` | `/design` и токены | [10-ashot.md](docs/agents/10-ashot.md) |

Сайт: `http://127.0.0.1:3000/`.

---

## 1 — Lead

**Папка:** [docs/zones/lead/README.md](docs/zones/lead/README.md). **Ветка:** `feat/lead`. **Агент:** [docs/agents/01-lead.md](docs/agents/01-lead.md).

Экраны не рисовать. PR принимать по очереди имён этой волны. Если «После кого» ещё не в `dev`, строку не мержить. Чужую зону не переписывать. Статус «в dev» ставить только после зелёных ворот этого ученика. Волну 4 этой доской не открывать заново. Контракт волны 3 этой очередью не задерживать.

**Lead не закрывает волну 5, пока:** девять зон очереди лежат в `dev`, три JSON открываются как JSON, `/`, `/textile` и `/baby` показывают свои секции на 1440 и на ширине своего mobile-кадра, `/design` открывается, diff не содержит Postgres и правок оплаты.

## 10 — Ashot · дизайн-система

**Папка:** `frontend/src/design/`. **Ветка:** `feat/ashot-ui`. **Кадр:** [Ventum · Design system](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12117).

Первым среди экранов. Остальные берут токены отсюда. Маршрут `/design`. В `App.jsx` разрешена одна строка маршрута и один lazy-import. Остальной `App.jsx` не переписывать. Живую карточку товара и живую форму рассылки не собирать: на `/design` они статичные образцы.

Сверстать кадр целиком:

- Design system cover: System masthead (System brand, Release label), System title, System description.
- Component library.
- Paired palettes & authentic identities: Textile palette specimen и Baby palette specimen. У каждого — identity, wordmark, brand principles, core palette. У цвета есть образец, роль и значение.
- Shared Armenian-first hierarchy: Display typography, армянский display и body, Type scale, пометка о языках `am` / `en` / `ru`.
- Rhythm, shape & elevation: Spacing scale с токеном, мерой и значением. Surface recipes: Textile surface и Baby surface. Пометка пропорции медиа.
- Store switch, search & category controls — как образцы, не как живая шапка. Textile и Baby: persistent store switch, product search, category control, primary action.
- Purchase actions, sizes & product states — классы, не боевая корзина. Шесть состояний кнопки: default, hover, pressed, focus-visible, disabled, loading. Отдельно Card и Cash, отдельно Textile и Baby. Size selection: selected и available. Stock and discount badges. Accepted card payments: Visa и Mastercard.
- The complete product-card anatomy и Interaction states — образец на `/design`. Боевую карточку пишет Vach и подключает эти классы.
- 08 / FORM и 09 / FEEDBACK на `/design` показать как образцы состояний. Живую рассылку пишет Daniel. Живые пусто / скелет / ошибка пишет Vach.
- System footer: System identifier, System edition. Это подвал страницы `/design`, не подвал магазина.

Токены — CSS-переменные двух палитр. Кнопка, бейдж, размер и поле читают эти переменные. Чужие `pages/Gateway`, `Textile`, `Baby`, `Header`, `Footer`, `ProductCard` не править. `index.css` можно только подключить файл токенов, без переписывания чужих правил.

**Нельзя:** `apps/orders`, `apps/cart`, модели, `mail.py`, живой `POST /api/cart/items/`, живой `POST /api/leads/newsletter/`.

**Lead не мержит, пока:** `/design` открывается, на нём видны обе палитры и шесть состояний кнопки, а diff не содержит страниц Gateway, Textile, Baby, Header, Footer и ProductCard.

## 9 — Vach · карточка и состояния каталога

**Папка:** `frontend/src/components/ProductCard/`. Состояния каталога — `frontend/src/components/CatalogState/`. **Ветка:** `feat/vach-catalog`. Ждать Ashot. **Кадр:** анатомия и `09 / FEEDBACK` внутри [Design system](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12117).

Карточка не знает, Textile это или Baby. Страница передаёт бренд. Импорт клиента именной: `import { api } from '../../api/client'`. Классы кнопки — из дизайн-системы Ashot.

Анатомия карточки, оба бренда:

- Product image and availability: фото, Discount pill, Stock status.
- Product information and purchase: имя, короткая спецификация, Size selection (selected и available), Price comparison (старая цена и цена продажи), Accepted card payments (Visa, Mastercard), две кнопки — Card и Cash.

Шесть состояний у обеих кнопок и у обоих брендов: default, hover, pressed, focus-visible, disabled, loading. Loading не шлёт второй POST, пока первый не закончился.

Card и Cash обе шлют `POST /api/cart/items/` с `{ sku, qty: 1 }`. Cash не открывает Idram. 401 показывает текст входа на карточке. Размер, скидка и старая цена есть на экране только если каталог их уже отдал. Нет поля — нет ряда. Подпись не выдумывать.

`CatalogState` для витрин, оба бренда, из `09 / FEEDBACK`:

- Empty. Textile: «Ոչ մի արդյունք չի գտնվել» и «Փորձեք փոխել որոնման բառը կամ բաժինը։». Baby: «Ոչ մի ապրանք չի գտնվել», «Փորձեք ընտրել մեկ այլ բաժին։», действие «Բոլոր բաժինները».
- Loading: скелет сетки. У скелета есть место фото, имени, спецификации, размеров, цены и двух кнопок.
- Error: «Բեռնումը ձախողվել է», «Ստուգեք ձեր ինտերնետ կապը և փորձեք կրկին», кнопка «Կրկին փորձել». Повтор вызывает тот же запрос, который передала страница.

`en` и `ru` — перевод этих фраз. `Textile.jsx` и `Baby.jsx` не править: страницы сами подключат компоненты после merge.

**Нельзя:** модели каталога, `pages/Textile`, `pages/Baby`, checkout.

**Lead не мержит, пока:** карточка живёт в `components/ProductCard/`, не импортирует `api` как default, у Card и Cash есть шесть состояний, и `CatalogState` показывает пусто, скелет и ошибку с повтором.

## 5 — Mariam · навигация

**Папка:** `frontend/src/components/Header/`. **Ветка:** `feat/mariam-header`. Ждать Vach.

Шапка одна на все кадры. Страницы витрин, середину главной и подвал не верстать. Страницу `/cart` не переписывать: счётчик и ссылка остаются. `?success=1` по-прежнему не называется оплатой.

Desktop, [Gateway desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=178-46), слой Navigation:

- Brand navigation: Platform name.
- Platform promise.
- Language preference: Language switcher. Языки `am`, `en`, `ru`. Незнакомый код не становится `en` молча.

Desktop, кадры Textile и Baby, слой Store navigation:

- Brand switch bar: Persistent store switch на `/textile` и `/baby`, Delivery message.
- Main header: Account ведёт на `/account`, Cart — на `/cart`. С токеном виден `count`.
- Full category navigation. Пункт пишет `?category=` текущей витрины. Пункт опта ведёт к блоку опта на странице, сам блок не рисовать.
- Product search пишет `?q=` и не вызывает новый API.

Mobile:

- [Gateway · Mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12462), Gateway masthead: Brand and language, Shared promise.
- Textile mobile, Compact navigation. Та же шапка на ширине кадра Baby mobile: переключатель магазина, язык, поиск, счётчик. Полный ряд категорий на узкой ширине не растягивает страницу: он помещается в кадр.

`t('account')` остаётся строковым ключом. На экране текст, не сообщение i18next.

**Нельзя:** `pages/Gateway`, `pages/Textile`, `pages/Baby`, `components/Footer`, `index.css`, checkout.

**Lead не мержит, пока:** на 1440 видны имя платформы, обещание, язык, переключатель магазинов, поиск и ряд категорий, на ширине mobile-кадра шапка компактная, с токеном виден `count`, а `?success=1` не называется оплатой.

## 2 — Suro · главная

**Папка:** `frontend/src/pages/Gateway/`. **Ветка:** `feat/suro-api`. Ждать Mariam. **Кадры:** [Gateway desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=178-46) и [Gateway · Mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12462).

Середина страницы. Navigation и Footer в страницу не копировать: их рисуют Mariam и Daniel.

Desktop, слой Brand gateway:

- Ventum Textile gateway.
- Brand introduction: Brand eyebrow, Brand promise.
- Centered brand story: Brand signature, Ventum wordmark, Brand designation, Hero headline, Brand description, Explore Home.
- Lifestyle and collections: Sunlit bedroom, Collections.
- Ventum Baby gateway: своя история, Explore Baby, Sunlit nursery.

Explore Home ведёт на `/textile`. Explore Baby ведёт на `/baby`.

Mobile, слой Stacked brand gateway: те же два входа, друг под другом. Masthead и Gateway footer не копировать.

`GET /api/content/home-blocks/` по-прежнему ищет блок `hero`. Если запрос падает, оба входа всё равно на экране. Палитра Textile и палитра Baby берутся из токенов Ashot.

**Нельзя:** `pages/Textile`, `pages/Baby`, `components/Header`, `components/Footer`, `index.css`, `apps/cart`, `apps/orders`.

**Lead не мержит, пока:** на `/` при ширине 1440 видны оба рассказа и обе ссылки, на ширине кадра Gateway mobile входы стоят столбиком, и при упавшем home-blocks выбор магазина не пропадает.

## 7 — Karen · textile

**Папка:** `frontend/src/pages/Textile/`. **Ветка:** `feat/karen-textile`. Ждать Suro. **Кадры:** [Textile desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12494) и [Textile mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12776).

Каталог по-прежнему фильтрует `store === textile`. Товар рисовать карточкой Vach. Пусто, скелет и ошибка — компонентами `CatalogState`. На странице нет товара Baby. Шапка и подвал — не эта страница.

Секции, сверху вниз, на 1440 и на ширине кадра Mobile. На mobile секции столбиком, без горизонтального скролла страницы:

- Seasonal editorial: Collection introduction, Editorial photography.
- Shopping assurances: Service promise.
- Shop by category: Section heading, Visual category grid. Плитка пишет тот же `?category=`, что и ряд в шапке.
- Brand story and care: Brand philosophy.
- Shoppable product collection: Collection heading, Catalog controls, Product catalog, Secondary action. Catalog controls читают `?q=` и `?category=` и фильтруют уже загруженный список. Новый API не добавлять. Secondary action не уводит на Baby и не рисует оплату.

Слой Wholesale partnership не собирать. Его поставит Hayk между коллекцией и подвалом. Пустой зазор под него не оставлять шириной в экран: место секции занимает следующий блок, пока опта нет.

**Нельзя:** `pages/Baby`, модели, `index.css`, `components/Footer`, `components/Header`.

**Lead не мержит, пока:** на `/textile` есть все пять секций выше, кнопка в корзину, нет карточки Baby, и при пустом ответе, при загрузке и при ошибке сети виден `CatalogState`.

## 8 — Svet · baby

**Папка:** `frontend/src/pages/Baby/`. **Ветка:** `feat/svet-baby`. Ждать Karen. **Кадры:** [Baby desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-13059) и [Baby mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-13319).

Те же правила плотности, что у Textile, но слои кадра Baby, не копия текстов Textile. Палитра Baby. Фильтр `store === baby`. Карточка Vach. `CatalogState` с текстами Baby. Товара Textile нет. Diff файлов Textile пустой.

Секции кадра, desktop и mobile:

- Seasonal editorial.
- Shopping assurances.
- Shop by category.
- Shoppable product collection: заголовок, контролы, сетка, вторичное действие. Контролы читают `?q=` и `?category=`.
- Brand story and care.
- Parent care guide. Это отдельная секция, не абзац внутри Brand story.

Опт на этих кадрах отдельным слоем не назван. Секцию опта не рисовать: её вставит Hayk между коллекцией и подвалом. Шапка и подвал не этой страницы.

**Нельзя:** файлы Textile, модели, `index.css`.

**Lead не мержит, пока:** на `/baby` видны секции кадра, включая Parent care guide, есть кнопка в корзину, нет карточки Textile, и diff Textile пустой.

## 6 — Daniel · подвал и рассылка

**Папка:** `frontend/src/components/Footer/`. **Ветка:** `feat/daniel-footer`. Ждать Svet. **Кадры:** подвал [Gateway desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=178-46), [Gateway · Mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12462), Store footer на Textile и Baby, состояния `08 / FORM` в [Design system](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12117).

Один подвал, два вида.

Главная:

- Desktop: Contact information.
- Mobile: Copyright, Contact.

Магазин, Textile и Baby, desktop и mobile:

- Footer information.
- Footer divider.
- Legal and payment. Марки Visa и Mastercard. Это рисунок, не новый способ оплаты.

Рассылка бьёт в уже существующий `POST /api/leads/newsletter/`. Состояния поля, оба бренда: default, focus-visible, invalid, success, disabled, loading.

- Default, placeholder: «Ձեր էլ. փոստը».
- Invalid не отправляет запрос. Текст: «Մուտքագրեք վավեր էլ. հասցե։».
- Success: «Բաժանորդագրությունն ավարտված է».
- Loading не шлёт второй POST.
- Disabled не шлёт POST.
- `en` и `ru` — перевод, не копия армянского.

Форма опта в подвале, которая уже бьёт в `POST /api/leads/wholesale/`, остаётся рабочей. Секцию Wholesale partnership со страницы витрины не переносить в подвал и не удалять её заготовку. Модели заказа и `mail.py` не трогать.

**Нельзя:** `apps/orders`, шапка, витрины, `index.css`.

**Lead не мержит, пока:** подвал виден на `/`, `/textile` и `/baby`, у рассылки есть invalid без запроса и success после ответа, а diff не содержит моделей заказа.

## 4 — Hayk · опт

**Папка:** `frontend/src/components/Wholesale/`. **Ветка:** `feat/hayk-gateway`. Ждать Daniel. **Кадр:** Wholesale partnership на [Textile desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12494) и [Textile mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12776). Слои: Supporting offer, Primary action.

Karen и Svet эту секцию не собирают и вливаются раньше. Поэтому вставку делает Hayk, и только её: один компонент между коллекцией и подвалом в `Textile.jsx` и в `Baby.jsx`. Остальные строки этих файлов не переписывать. На Baby своего слоя опта нет: тот же компонент, палитра Baby, то же место.

Desktop и mobile. Оба бренда. Заявка — существующий `POST /api/leads/wholesale/` с полями, которые API уже принимает: `name`, `phone`, `email`, `text`. Новый endpoint не заводить. Пустая отправка не уходит. Ответ с ошибкой показывает текст на блоке. Успех показывает текст успеха и не называет это оплатой.

Checkout, callback Idram, `/account` и `idram.py` не переписывать. Кнопка Cash к опту не относится.

**Нельзя:** `apps/orders/checkout.py`, `idram.py`, модели, шапка, подвал.

**Lead не мержит, пока:** блок опта виден на `/textile` и `/baby` на 1440 и на ширине mobile-кадра, заявка бьёт в старый `POST /api/leads/wholesale/`, а diff checkout и `/account` пустой.

## 3 — Artush · подписи

**Папка:** `frontend/src/i18n/`. **Ветка:** `feat/artush-i18n`. Ждать Hayk.

Собрать подписи волны, которые уже нужны страницам, в трёх файлах: `am.json`, `en.json`, `ru.json`. Чужие `jsx` и `css` не верстать.

`am.json` берёт армянский текст кадра. В нём есть, дословно:

- «Ձեր էլ. փոստը»
- «Մուտքագրեք վավեր էլ. հասցե։»
- «Բաժանորդագրությունն ավարտված է»
- «Ոչ մի արդյունք չի գտնվել»
- «Փորձեք փոխել որոնման բառը կամ բաժինը։»
- «Բեռնումը ձախողվել է»
- «Ստուգեք ձեր ինտերնետ կապը և փորձեք կրկին»
- «Կրկին փորձել»
- «Ոչ մի ապրանք չի գտնվել»
- «Փորձեք ընտրել մեկ այլ բաժին։»
- «Բոլոր բաժինները»

В `en.json` и `ru.json` те же ключи — перевод. Повтор ключа и сломанная скобка — повод не открывать PR. Перед PR каждый файл открывается через `json.loads`.

Ключи секций главной, Textile, Baby, шапки, подвала, опта и `/design` есть на трёх языках. Ключ, который страница уже читает, не переименовывать молча.

**Нельзя:** страницы Gateway, Textile, Baby, Cart, Account, Header, Footer, Design, ProductCard.

**Lead не мержит, пока:** три файла — валидный JSON, перечисленные армянские фразы лежат в `am.json`, и те же ключи есть на `en` и `ru`.

---

## English

Wave 4 is closed. The thin screens stay. Wave 3 stays the purchase contract: cart, order, Idram, and the shop email. This wave does not close it and does not break that API. Detail: [task-wave3.md](task-wave3.md). Wave 4 screen: [task-wave4.md](task-wave4.md).

Wave 5 is the full frame. Each student brings one zone up to the named layers, at desktop width 1440 and at the width of that zone’s Mobile frame. One person does not assemble the whole site. Do not guess the height. Open the frame and follow its sections.

Frames in [Untitled](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=0-1):

- [Ventum · Gateway desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=178-46) — `178-46`
- [Ventum · Design system](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12117) — `6-12117`
- [Gateway · Mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12462) — `6-12462`
- [Ventum Textile · Desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12494) — `6-12494`
- [Ventum Textile · Mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12776) — `6-12776`
- [Ventum Baby · Desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-13059) — `6-13059`
- [Ventum Baby · Mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-13319) — `6-13319`

Do not build the two text layers that link to file `qHZfcqQumXuEPF8t3y62dF`. Do not invent a third breakpoint. Desktop is 1440. Mobile is the width of the Mobile frame.

**Git:** [CONTRIBUTING.md](CONTRIBUTING.md). Short list: [TASK.md](TASK.md). Board: [docs/zones/lead/README.md](docs/zones/lead/README.md).

Branches stay. Start with `git checkout dev && git pull`, then your own `feat/...`. One pull request, **base = `dev`**. Do not push `main`. No `--force` on `dev` or `main`. Do not start Postgres. No new model fields. No new payment method. No second axios.

A new string goes into `am.json`, `en.json`, and `ru.json` at once. Armenian copy on the frame is the source for `am.json`. `en` and `ru` are translations. Requests go through [frontend/src/api/client.js](frontend/src/api/client.js), the named `api` export. A component still has `Name.jsx`, `name.css`, and `name.js`.

Shared screen rules:

- The paid word appears only when `status === 'paid'`. `?success=1` does not show it.
- Card and Cash both post `{ sku, qty: 1 }` to `POST /api/cart/items/`. Cash does not open Idram and does not mark an order `paid`.
- Size, the old price, and the discount render only when the catalog already returns them. Do not add a model field for the frame.
- Search does not call a new API. The field writes `?q=`. The shop filters the list it already loaded.
- The header category row and the shop grid read the same `?category=`.
- A 401 shows the sign-in text on the card and does not send the browser to `/account`.

Merge queue, by dependency: **Lead → Ashot → Vach → Mariam → Suro → Karen → Svet → Daniel → Hayk → Artush**.

Ashot goes first among the screens so the others can use his tokens. Vach lands the card and the catalog states before the shops. Mariam lands navigation before the pages. Artush is last: he collects the keys and proves the three JSON files parse.

### 1 — Lead

Board only. Do not draw screens. Merge by the name queue. If “After” is not in `dev`, do not merge that row. Do not rewrite another zone. Mark «in dev» only after that student’s gates are green. Do not reopen Wave 4. Do not hold a Wave 5 screen for the Wave 3 contract.

**Do not close Wave 5 until:** the nine queued zones are in `dev`, the three JSON files parse, `/`, `/textile`, and `/baby` show their sections at 1440 and at the Mobile frame width, `/design` opens, and the diff has no Postgres and no payment edits.

### 10 — Ashot · design system

**Folder:** `frontend/src/design/`. **Branch:** `feat/ashot-ui`. **Frame:** [Ventum · Design system](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12117).

First among the screens. The others take tokens from here. Route: `/design`. `App.jsx` may gain one route and one lazy import. Do not rewrite the rest of `App.jsx`. Do not build the live product card or the live newsletter form. On `/design` those are static specimens.

Build the whole frame:

- Design system cover: System masthead (System brand, Release label), System title, System description.
- Component library.
- Paired palettes and authentic identities: a Textile specimen and a Baby specimen. Each has identity, wordmark, principles, and a core palette. A color has a sample, a role, and a value.
- Shared Armenian-first hierarchy: display type, Armenian display and body, the type scale, and a note for `am` / `en` / `ru`.
- Rhythm, shape, and elevation: spacing tokens with measure and value, Textile and Baby surfaces, a media-proportion note.
- Store switch, search, and category controls as specimens, not as the live header. Textile and Baby: store switch, search, category, primary action.
- Purchase actions, sizes, and product states as classes, not as a live cart. Six button states: default, hover, pressed, focus-visible, disabled, loading. Card and Cash, Textile and Baby. Selected and available sizes. Stock and discount badges. Visa and Mastercard marks.
- Product-card anatomy and interaction states as specimens. Vach builds the live card and uses these classes.
- `08 / FORM` and `09 / FEEDBACK` as specimens. Daniel builds the live newsletter. Vach builds the live empty, skeleton, and error states.
- System footer: System identifier and System edition. That is the footer of `/design`, not the shop footer.

Tokens are CSS variables for both palettes. Buttons, badges, sizes, and fields read them. Do not edit Gateway, Textile, Baby, Header, Footer, or ProductCard. `index.css` may only import the token file.

**Do not edit:** order and cart apps, models, `mail.py`, a live add-to-cart call, a live newsletter call.

**Lead does not merge until:** `/design` opens, both palettes and the six button states are visible, and the diff does not contain Gateway, Textile, Baby, Header, Footer, or ProductCard.

### 9 — Vach · card and catalog states

**Folders:** `frontend/src/components/ProductCard/` and `frontend/src/components/CatalogState/`. **Branch:** `feat/vach-catalog`. After Ashot. **Frame:** the anatomy and `09 / FEEDBACK` inside the [design system](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12117).

The card does not know whether the shop is Textile or Baby. The page passes the brand. Import the client by name. Use Ashot’s button classes.

Anatomy, both brands:

- Photo, discount pill, stock status.
- Name, short specification, size selection (selected and available), old price and sale price, Visa and Mastercard, Card and Cash.

Six states on both buttons and both brands: default, hover, pressed, focus-visible, disabled, loading. Loading does not send a second POST while the first one is open.

Card and Cash both post `{ sku, qty: 1 }` to `POST /api/cart/items/`. Cash does not open Idram. A 401 stays on the card. Size, discount, and the old price appear only when the catalog already returns them.

`CatalogState`, both brands, from `09 / FEEDBACK`:

- Empty. Textile: «Ոչ մի արդյունք չի գտնվել» and «Փորձեք փոխել որոնման բառը կամ բաժինը։». Baby: «Ոչ մի ապրանք չի գտնվել», «Փորձեք ընտրել մեկ այլ բաժին։», action «Բոլոր բաժինները».
- Loading: a skeleton grid with room for photo, name, specification, sizes, price, and two buttons.
- Error: «Բեռնումը ձախողվել է», «Ստուգեք ձեր ինտերնետ կապը և փորձեք կրկին», button «Կրկին փորձել». Retry repeats the request the page passed in.

`en` and `ru` translate those lines. Do not edit `Textile.jsx` or `Baby.jsx`.

**Lead does not merge until:** the card lives in `components/ProductCard/`, does not default-import `api`, Card and Cash have six states, and `CatalogState` shows empty, skeleton, and error with retry.

### 5 — Mariam · navigation

**Folder:** `frontend/src/components/Header/`. **Branch:** `feat/mariam-header`. After Vach.

One header for every frame. Do not build the shop pages, the gateway middle, or the footer. Do not rewrite `/cart`. The count and the cart link stay. `?success=1` is still not paid.

Desktop gateway Navigation:

- Platform name, platform promise, language switcher for `am`, `en`, and `ru`. An unknown code does not become `en` silently.

Desktop store navigation on Textile and Baby:

- Persistent store switch to `/textile` and `/baby`, delivery message.
- Account goes to `/account`. Cart goes to `/cart`. A token shows `count`.
- Full category row. A category writes `?category=` on the current shop. The wholesale item points at the wholesale block. Do not draw that block.
- Product search writes `?q=` and does not call a new API.

Mobile:

- Gateway masthead: brand, language, shared promise.
- Compact navigation at the Textile and Baby mobile widths: store switch, language, search, count. The category row fits the frame. It does not force a horizontal page scroll.

`t('account')` stays a string key. The screen shows text, not an i18next message.

**Lead does not merge until:** at 1440 the header shows the platform name, the promise, the language, the store switch, search, and the category row; at the mobile width the header is compact; a token shows `count`; and `?success=1` is not called paid.

### 2 — Suro · home

**Folder:** `frontend/src/pages/Gateway/`. **Branch:** `feat/suro-api`. After Mariam. **Frames:** [Gateway desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=178-46) and [Gateway mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12462).

The middle of the page only. Do not copy Navigation or Footer into the page.

Desktop Brand gateway:

- Textile: eyebrow, promise, signature, wordmark, designation, hero headline, description, Explore Home, lifestyle and collections, sunlit bedroom.
- Baby: its own story, Explore Baby, sunlit nursery.

Explore Home goes to `/textile`. Explore Baby goes to `/baby`.

Mobile Stacked brand gateway: the same two entries, one under the other. Do not copy the masthead or the gateway footer.

`GET /api/content/home-blocks/` still looks for the `hero` slot. If the request fails, both entries still render. Use Ashot’s Textile and Baby tokens.

**Lead does not merge until:** `/` at 1440 shows both stories and both links, the mobile frame stacks the entries, and a failed home-blocks request does not remove the store choice.

### 7 — Karen · textile

**Folder:** `frontend/src/pages/Textile/`. **Branch:** `feat/karen-textile`. After Suro. **Frames:** [Textile desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12494) and [Textile mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12776).

The catalog filter stays `store === textile`. Draw products with Vach’s card. Empty, skeleton, and error use `CatalogState`. No Baby product. Header and footer are not this page.

Sections, top to bottom, at 1440 and at the mobile frame width. On mobile they stack, with no horizontal page scroll:

- Seasonal editorial: collection introduction, editorial photography.
- Shopping assurances: service promise.
- Shop by category: heading and visual grid. A tile writes the same `?category=` as the header.
- Brand story and care: brand philosophy.
- Shoppable product collection: heading, catalog controls, grid, secondary action. Controls read `?q=` and `?category=` and filter the loaded list. No new API. The secondary action does not open Baby and does not show payment.

Do not build Wholesale partnership. Hayk places it between the collection and the footer. Do not leave a screen-tall hole for it.

**Lead does not merge until:** `/textile` shows those five sections, has an add-to-cart button, shows no Baby card, and shows `CatalogState` for an empty list, a load, and a network error.

### 8 — Svet · baby

**Folder:** `frontend/src/pages/Baby/`. **Branch:** `feat/svet-baby`. After Karen. **Frames:** [Baby desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-13059) and [Baby mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-13319).

Same density as Textile, with Baby’s own layers and copy. Baby palette. Filter `store === baby`. Vach’s card. Baby `CatalogState` copy. No Textile product. The Textile diff is empty.

Sections, desktop and mobile:

- Seasonal editorial, shopping assurances, shop by category.
- Shoppable product collection: heading, controls, grid, secondary action. Controls read `?q=` and `?category=`.
- Brand story and care.
- Parent care guide, as its own section.

The Baby frames do not name a wholesale layer. Do not draw it. Hayk inserts it between the collection and the footer. Header and footer are not this page.

**Lead does not merge until:** `/baby` shows the frame sections, including Parent care guide, has an add-to-cart button, shows no Textile card, and the Textile diff is empty.

### 6 — Daniel · footer and newsletter

**Folder:** `frontend/src/components/Footer/`. **Branch:** `feat/daniel-footer`. After Svet.

One footer, two shapes.

Home: desktop Contact information; mobile Copyright and Contact.

Shop, Textile and Baby, both widths: Footer information, Footer divider, Legal and payment. Visa and Mastercard are marks, not a new payment method.

The newsletter still posts to `POST /api/leads/newsletter/`. Field states, both brands: default, focus-visible, invalid, success, disabled, loading.

- Default placeholder: «Ձեր էլ. փոստը».
- Invalid does not send. Text: «Մուտքագրեք վավեր էլ. հասցե։».
- Success: «Բաժանորդագրությունն ավարտված է».
- Loading does not send a second POST. Disabled does not send.
- `en` and `ru` are translations.

The footer wholesale form that already posts to `POST /api/leads/wholesale/` stays working. Do not move the page-level Wholesale partnership into the footer. Do not touch order models or `mail.py`.

**Lead does not merge until:** the footer is on `/`, `/textile`, and `/baby`, invalid does not send, success follows a response, and the diff has no order models.

### 4 — Hayk · wholesale

**Folder:** `frontend/src/components/Wholesale/`. **Branch:** `feat/hayk-gateway`. After Daniel. **Frame:** Wholesale partnership on [Textile desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12494) and [Textile mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12776). Layers: Supporting offer, Primary action.

Karen and Svet do not build this section, and they merge first. Hayk inserts it, and only that: one component between the collection and the footer in `Textile.jsx` and in `Baby.jsx`. Do not rewrite the other lines. Baby has no wholesale layer of its own. Use the same component, the Baby palette, and the same slot.

Both widths. Both brands. The request is the existing `POST /api/leads/wholesale/` with the fields the API already accepts: `name`, `phone`, `email`, `text`. No new endpoint. An empty submit does not send. An error shows text on the block. Success shows success text and does not call it payment.

Do not rewrite checkout, the Idram callback, `/account`, or `idram.py`. Cash is not this block.

**Lead does not merge until:** the block is visible on `/textile` and `/baby` at 1440 and at the mobile width, the request hits the old wholesale endpoint, and the checkout and `/account` diffs are empty.

### 3 — Artush · copy

**Folder:** `frontend/src/i18n/`. **Branch:** `feat/artush-i18n`. After Hayk.

Collect the Wave 5 strings the pages already need into `am.json`, `en.json`, and `ru.json`. Do not build other people’s `jsx` or `css`.

`am.json` keeps the frame’s Armenian, including:

- «Ձեր էլ. փոստը»
- «Մուտքագրեք վավեր էլ. հասցե։»
- «Բաժանորդագրությունն ավարտված է»
- «Ոչ մի արդյունք չի գտնվել»
- «Փորձեք փոխել որոնման բառը կամ բաժինը։»
- «Բեռնումը ձախողվել է»
- «Ստուգեք ձեր ինտերնետ կապը և փորձեք կրկին»
- «Կրկին փորձել»
- «Ոչ մի ապրանք չի գտնվել»
- «Փորձեք ընտրել մեկ այլ բաժին։»
- «Բոլոր բաժինները»

The same keys in `en.json` and `ru.json` are translations. A duplicate key or a broken bracket means do not open the pull request. Before the pull request, each file parses with `json.loads`.

Keys for the home page, Textile, Baby, the header, the footer, wholesale, and `/design` exist in all three languages. Do not silently rename a key a page already reads.

**Lead does not merge until:** the three files are valid JSON, the Armenian lines above are in `am.json`, and the same keys exist in `en` and `ru`.

---

## Հայերեն

Wave 4-ը փակ է. բարակ էկրանները մնում են։ Wave 3-ը մնում է գնման պայմանագիր՝ զամբյուղ, պատվեր, Idram, նամակ։ Այս ալիքը դա չի փակում և API-ն չի կոտրում։ Մանրամասն՝ [task-wave3.md](task-wave3.md)։ Wave 4-ի էկրանը՝ [task-wave4.md](task-wave4.md)։

Wave 5-ը լրիվ կադրն է։ Ամեն աշակերտ իր գոտին հասցնում է կադրի շերտերին՝ desktop 1440 լայնքում և իր Mobile կադրի լայնքում։ Ամբողջ էջը մեկ հոգի չի հավաքում։ Բարձրությունը աչքով չչափել. բացել կադրը և կրկնել սեկցիաները։

Կադրերը [Untitled](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=0-1) ֆայլում.

- [Ventum · Gateway desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=178-46) — `178-46`
- [Ventum · Design system](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12117) — `6-12117`
- [Gateway · Mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12462) — `6-12462`
- [Ventum Textile · Desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12494) — `6-12494`
- [Ventum Textile · Mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12776) — `6-12776`
- [Ventum Baby · Desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-13059) — `6-13059`
- [Ventum Baby · Mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-13319) — `6-13319`

`qHZfcqQumXuEPF8t3y62dF` ֆայլին տանող երկու տեքստային շերտը չհավաքել։ Երրորդ breakpoint չհորինել։ Desktop-ը 1440 է։ Mobile-ը Mobile կադրի լայնքն է։

**Git՝** [CONTRIBUTING.md](CONTRIBUTING.md)։ Կարճ ցանկ՝ [TASK.md](TASK.md)։ Տախտակ՝ [docs/zones/lead/README.md](docs/zones/lead/README.md)։

Ճյուղերը նույնն են։ Սկիզբ՝ `git checkout dev && git pull`, հետո սեփական `feat/...`։ Մեկ PR, **base = `dev`**։ `main` չpush անել։ `--force` չանել `dev`-ի և `main`-ի վրա։ Postgres չբարձրացնել։ Նոր մոդելի դաշտ չկա։ Նոր վճարում չկա։ Երկրորդ axios չստեղծել։

Նոր տողը միանգամից դնել `am.json`, `en.json` և `ru.json`։ Կադրի հայերենը `am.json`-ի աղբյուրն է։ `en`-ը և `ru`-ն թարգմանություն են։ Հարցումները՝ [frontend/src/api/client.js](frontend/src/api/client.js)-ի անվանական `api`։ Կոմպոնենտը մնում է `Name.jsx`, `name.css`, `name.js`։

Ընդհանուր կանոններ.

- «Վճարված» բառը միայն `status === 'paid'` դեպքում։ `?success=1`-ը վճարում չի նշանակում։
- Card-ը և Cash-ը երկուսն էլ ուղարկում են `POST /api/cart/items/`՝ `{ sku, qty: 1 }`։ Cash-ը Idram չի բացում և պատվերը `paid` չի դնում։
- Չափը, հին գինը և զեղչը երևում են միայն եթե կատալոգն արդեն տալիս է դրանք։ Կադրի համար մոդելի դաշտ չավելացնել։
- Որոնումը նոր API չի կանչում։ Դաշտը գրում է `?q=`։ Խանութը ֆիլտրում է արդեն բեռնված ցանկը։
- Վերնագրի բաժինները և խանութի ցանցը կարդում են նույն `?category=`-ը։
- 401-ը քարտի վրա է և չի տանում `/account`։

Merge-ի հերթը՝ **Lead → Ashot → Vach → Mariam → Suro → Karen → Svet → Daniel → Hayk → Artush**։

Ashot-ը էկրաններից առաջինն է. մյուսները վերցնում են նրա token-ները։ Vach-ը քարտը դնում է խանութներից առաջ։ Mariam-ը նավիգացիան դնում է էջերից առաջ։ Artush-ը վերջինն է. հավաքում է բանալիները և ստուգում է երեք JSON-ը։

### 1 — Lead

Միայն տախտակ։ Էկրաններ չնկարել։ Merge անել այս հերթով։ Եթե «ումից հետո»-ն `dev`-ում չէ, տողը չմիավորել։ Ուրիշի գոտին չվերագրել։ «in dev» դնել միայն կանաչ դռներից հետո։ Wave 4-ը նորից չբացել։ Wave 5-ի էկրանը Wave 3-ի պայմանագրով չպահել։

**Wave 5-ը չփակել, քանի դեռ** ինը գոտին `dev`-ում է, երեք JSON-ը բացվում են, `/`, `/textile` և `/baby` իրենց սեկցիաները ցույց են տալիս 1440-ում և mobile կադրի լայնքում, `/design`-ը բացվում է, և diff-ում Postgres ու վճարման փոփոխություն չկա։

### 10 — Ashot · դիզայն-համակարգ

**Պանակ՝** `frontend/src/design/`։ **Ճյուղ՝** `feat/ashot-ui`։ **Կադր՝** [Ventum · Design system](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12117)։

Էկրաններից առաջինը։ Մյուսները token-ները վերցնում են այստեղից։ Երթուղին՝ `/design`։ `App.jsx`-ում կարելի է մեկ route և մեկ lazy import։ Մնացած `App.jsx`-ը չվերագրել։ Կենդանի ապրանքի քարտը և կենդանի բաժանորդագրության ձևը չհավաքել. `/design`-ում դրանք նմուշ են։

Կադրն ամբողջովին.

- Cover՝ System masthead, System title, System description։
- Component library։
- Երկու պալիտրա՝ Textile և Baby։ Ամեն գույն ունի նմուշ, դեր և արժեք։
- Հայերեն առաջնային տիպոգրաֆիա, սանդղակ, նշում `am` / `en` / `ru`։
- Քայլ, ձև, մակերես Textile-ի և Baby-ի համար։
- Խանութի փոխարկիչ, որոնում և բաժին՝ որպես նմուշ, ոչ որպես կենդանի վերնագիր։
- Կոճակի վեց վիճակ՝ default, hover, pressed, focus-visible, disabled, loading։ Card և Cash, Textile և Baby։ Չափեր, բեյջեր, Visa և Mastercard։
- Քարտի անատոմիան նմուշ է։ Կենդանի քարտը գրում է Vach-ը։
- `08 / FORM`-ը և `09 / FEEDBACK`-ը նմուշ են։ Կենդանի ձևը Daniel-ինն է, կենդանի դատարկ/սխալը՝ Vach-ինը։
- System footer՝ միայն `/design`-ի ներքևը։

Token-ները երկու պալիտրայի CSS փոփոխականներ են։ Gateway, Textile, Baby, Header, Footer, ProductCard չփոխել։ `index.css`-ը կարող է միայն միացնել token-ների ֆայլը։

**Lead-ը չի merge անում, քանի դեռ** `/design`-ը բացվում է, երևում են երկու պալիտրան և կոճակի վեց վիճակը, և diff-ում չկան այդ ուրիշ էջերը։

### 9 — Vach · քարտ և կատալոգի վիճակներ

**Պանակներ՝** `frontend/src/components/ProductCard/` և `frontend/src/components/CatalogState/`։ **Ճյուղ՝** `feat/vach-catalog`։ Ashot-ից հետո։

Քարտը չգիտի՝ Textile է թե Baby։ Էջը տալիս է բրենդը։ `api`-ն ներմուծել անունով։ Կոճակի դասերը՝ Ashot-ից։

Անատոմիա, երկու բրենդ. լուսանկար, զեղչ, մնացորդ, անուն, կարճ բնութագիր, չափ (ընտրված և հասանելի), հին գին և վաճառքի գին, Visa, Mastercard, Card և Cash։

Վեց վիճակ երկու կոճակի և երկու բրենդի վրա։ Loading-ը երկրորդ POST չի ուղարկում, քանի դեռ առաջինը բաց է։

Card-ը և Cash-ը երկուսն էլ ուղարկում են `{ sku, qty: 1 }`։ Cash-ը Idram չի բացում։ 401-ը մնում է քարտի վրա։ Չափը, զեղչը և հին գինը երևում են միայն եթե կատալոգն արդեն տալիս է։

`CatalogState`, երկու բրենդ.

- Դատարկ. Textile՝ «Ոչ մի արդյունք չի գտնվել», «Փորձեք փոխել որոնման բառը կամ բաժինը։»։ Baby՝ «Ոչ մի ապրանք չի գտնվել», «Փորձեք ընտրել մեկ այլ բաժին։», «Բոլոր բաժինները»։
- Սկելետոն՝ լուսանկարի, անվան, բնութագրի, չափերի, գնի և երկու կոճակի տեղով։
- Սխալ՝ «Բեռնումը ձախողվել է», «Ստուգեք ձեր ինտերնետ կապը և փորձեք կրկին», «Կրկին փորձել»։ Կրկնումը կանչում է էջի տված նույն հարցումը։

`en`-ը և `ru`-ն թարգմանություն են։ `Textile.jsx`-ը և `Baby.jsx`-ը չփոխել։

**Lead-ը չի merge անում, քանի դեռ** քարտը `ProductCard`-ում է, `api`-ն default չէ, Card-ը և Cash-ը ունեն վեց վիճակ, և `CatalogState`-ը ցույց է տալիս դատարկ, սկելետոն և սխալ՝ կրկնելով։

### 5 — Mariam · նավիգացիա

**Պանակ՝** `frontend/src/components/Header/`։ **Ճյուղ՝** `feat/mariam-header`։ Vach-ից հետո։

Մեկ վերնագիր բոլոր կադրերի համար։ Խանութի էջերը, գլխավորի մեջտեղը և ներքևը չհավաքել։ `/cart`-ը չվերագրել։ Հաշվիչը և հղումը մնում են։ `?success=1`-ը վճարված չէ։

Desktop gateway. հարթակի անուն, խոստում, լեզու `am` / `en` / `ru`։ Անծանոթ կոդը լուռ `en` չի դառնում։

Textile և Baby. խանութի փոխարկիչ դեպի `/textile` և `/baby`, առաքման տող, Account → `/account`, Cart → `/cart`, token-ով `count`, բաժինների շարքը գրում է `?category=`, որոնումը գրում է `?q=` և նոր API չի կանչում։ Մեծածախի կետը տանում է դեպի բլոկը, բլոկը չնկարել։

Mobile. Gateway-ի կայմ՝ բրենդ, լեզու, ընդհանուր խոստում։ Textile-ի և Baby-ի mobile լայնքում կոմպակտ վերնագիր. փոխարկիչ, լեզու, որոնում, հաշվիչ։ Բաժինների շարքը տեղավորվում է կադրում և էջը հորիզոնական չի գլորում։

`t('account')`-ը մնում է տողային բանալի։

**Lead-ը չի merge անում, քանի դեռ** 1440-ում երևում են անունը, խոստումը, լեզուն, փոխարկիչը, որոնումը և բաժինները, mobile-ում վերնագիրը կոմպակտ է, token-ով երևում է `count`-ը, և `?success=1`-ը վճարված չի կոչվում։

### 2 — Suro · գլխավոր

**Պանակ՝** `frontend/src/pages/Gateway/`։ **Ճյուղ՝** `feat/suro-api`։ Mariam-ից հետո։ **Կադրեր՝** [desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=178-46) և [mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12462)։

Միայն էջի մեջտեղը։ Navigation-ը և Footer-ը էջի մեջ չպատճենել։

Desktop. Textile՝ eyebrow, promise, ստորագրություն, wordmark, designation, վերնագիր, նկարագրություն, Explore Home, lifestyle և collections, արևոտ ննջասենյակ։ Baby՝ իր պատմությունը, Explore Baby, արևոտ մանկասենյակ։

Explore Home-ը տանում է `/textile`։ Explore Baby-ն՝ `/baby`։

Mobile. նույն երկու մուտքը, իրար տակ։ Կայմը և gateway-ի ներքևը չպատճենել։

`GET /api/content/home-blocks/`-ը դեռ փնտրում է `hero`։ Եթե հարցումը ընկնում է, երկու մուտքը մնում են։ Պալիտրաները՝ Ashot-ի token-ներից։

**Lead-ը չի merge անում, քանի դեռ** `/`-ում 1440-ով երևում են երկու պատմությունն ու երկու հղումը, mobile-ում մուտքերը սյունակ են, և ընկած home-blocks-ը չի թաքցնում խանութի ընտրությունը։

### 7 — Karen · textile

**Պանակ՝** `frontend/src/pages/Textile/`։ **Ճյուղ՝** `feat/karen-textile`։ Suro-ից հետո։ **Կադրեր՝** [desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12494) և [mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12776)։

Ֆիլտրը մնում է `store === textile`։ Ապրանքը՝ Vach-ի քարտով։ Դատարկ, սկելետոն և սխալ՝ `CatalogState`։ Baby ապրանք չկա։

Սեկցիաներ, վերևից ներքև, 1440 և mobile. Seasonal editorial, Shopping assurances, Shop by category, Brand story and care, Shoppable product collection։ Ցանցի սալիկը գրում է նույն `?category=`-ը, ինչ վերնագիրը։ Կատալոգի կոնտրոլները կարդում են `?q=` և `?category=` և ֆիլտրում են արդեն բեռնված ցանկը։ Նոր API չկա։ Երկրորդ գործողությունը Baby չի բացում և վճարում չի ցույց տալիս։ Mobile-ում սեկցիաները սյունակ են, էջը հորիզոնական չի գլորվում։

Wholesale partnership-ը չհավաքել։ Այն դնում է Hayk-ը՝ հավաքածուի և ներքևի միջև։ Էկրանի բարձրությամբ դատարկ տեղ չթողնել։

**Lead-ը չի merge անում, քանի դեռ** `/textile`-ում կան այդ հինգ սեկցիաները, կա զամբյուղի կոճակ, չկա Baby քարտ, և դատարկ, բեռնում ու ցանցի սխալը ցույց են տալիս `CatalogState`։

### 8 — Svet · baby

**Պանակ՝** `frontend/src/pages/Baby/`։ **Ճյուղ՝** `feat/svet-baby`։ Karen-ից հետո։ **Կադրեր՝** [desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-13059) և [mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-13319)։

Նույն խտությունը, բայց Baby-ի շերտերն ու տեքստերը։ Baby պալիտրա։ Ֆիլտր՝ `store === baby`։ Vach-ի քարտ։ Textile ապրանք չկա։ Textile-ի diff-ը դատարկ է։

Սեկցիաներ. Seasonal editorial, Shopping assurances, Shop by category, Shoppable product collection, Brand story and care, և առանձին Parent care guide։ Կոնտրոլները կարդում են `?q=` և `?category=`։

Baby կադրում մեծածախի շերտ չկա։ Այն չնկարել։ Hayk-ը կդնի հավաքածուի և ներքևի միջև։

**Lead-ը չի merge անում, քանի դեռ** `/baby`-ում երևում են կադրի սեկցիաները, այդ թվում Parent care guide-ը, կա զամբյուղի կոճակ, չկա Textile քարտ, և Textile-ի diff-ը դատարկ է։

### 6 — Daniel · ներքև և բաժանորդագրություն

**Պանակ՝** `frontend/src/components/Footer/`։ **Ճյուղ՝** `feat/daniel-footer`։ Svet-ից հետո։

Մեկ ներքև, երկու տեսք։

Գլխավոր. desktop՝ Contact information, mobile՝ Copyright և Contact։

Խանութ, Textile և Baby, երկու լայնք. Footer information, Footer divider, Legal and payment։ Visa-ն և Mastercard-ը նշան են, ոչ թե նոր վճարում։

Բաժանորդագրությունը մնում է `POST /api/leads/newsletter/`։ Վիճակներ, երկու բրենդ. default, focus-visible, invalid, success, disabled, loading։

- Placeholder՝ «Ձեր էլ. փոստը»։
- Invalid-ը չի ուղարկում։ Տեքստ՝ «Մուտքագրեք վավեր էլ. հասցե։»։
- Success՝ «Բաժանորդագրությունն ավարտված է»։
- Loading-ը երկրորդ POST չի ուղարկում։ Disabled-ը չի ուղարկում։
- `en`-ը և `ru`-ն թարգմանություն են։

Ներքևի մեծածախ ձևը, որն արդեն գնում է `POST /api/leads/wholesale/`, մնում է աշխատող։ Էջի Wholesale partnership-ը ներքև չտեղափոխել։ Պատվերի մոդելները և `mail.py`-ը չկպնել։

**Lead-ը չի merge անում, քանի դեռ** ներքևը կա `/`-ում, `/textile`-ում և `/baby`-ում, invalid-ը չի ուղարկում, success-ը գալիս է պատասխանից հետո, և diff-ում պատվերի մոդել չկա։

### 4 — Hayk · մեծածախ

**Պանակ՝** `frontend/src/components/Wholesale/`։ **Ճյուղ՝** `feat/hayk-gateway`։ Daniel-ից հետո։ **Կադր՝** Wholesale partnership Textile-ի [desktop](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12494)-ում և [mobile](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12776)-ում։ Շերտեր՝ Supporting offer, Primary action։

Karen-ը և Svet-ը այս սեկցիան չեն հավաքում և ավելի շուտ են merge լինում։ Հետևաբար ներդնումը Hayk-ինն է, և միայն դա. մեկ կոմպոնենտ հավաքածուի և ներքևի միջև `Textile.jsx`-ում և `Baby.jsx`-ում։ Մյուս տողերը չվերագրել։ Baby-ն իր մեծածախ շերտը չունի. նույն կոմպոնենտը, Baby պալիտրա, նույն տեղը։

Երկու լայնք, երկու բրենդ։ Հարցումը հին `POST /api/leads/wholesale/`-ն է՝ `name`, `phone`, `email`, `text`։ Նոր endpoint չկա։ Դատարկ ուղարկումը չի գնում։ Սխալը երևում է բլոկի վրա։ Հաջողությունը հաջողության տեքստ է և վճարում չի կոչվում։

Checkout-ը, Idram callback-ը, `/account`-ը և `idram.py`-ը չվերագրել։ Cash-ը այս բլոկը չէ։

**Lead-ը չի merge անում, քանի դեռ** բլոկը երևում է `/textile`-ում և `/baby`-ում 1440-ով և mobile լայնքով, հարցումը գնում է հին endpoint, և checkout-ի ու `/account`-ի diff-ը դատարկ է։

### 3 — Artush · գրություններ

**Պանակ՝** `frontend/src/i18n/`։ **Ճյուղ՝** `feat/artush-i18n`։ Hayk-ից հետո։

Հավաքել ալիքի այն գրությունները, որոնք էջերն արդեն կարդում են, երեք ֆայլում՝ `am.json`, `en.json`, `ru.json`։ Ուրիշի `jsx`-ը և `css`-ը չհավաքել։

`am.json`-ում կադրի հայերենն է, այդ թվում.

- «Ձեր էլ. փոստը»
- «Մուտքագրեք վավեր էլ. հասցե։»
- «Բաժանորդագրությունն ավարտված է»
- «Ոչ մի արդյունք չի գտնվել»
- «Փորձեք փոխել որոնման բառը կամ բաժինը։»
- «Բեռնումը ձախողվել է»
- «Ստուգեք ձեր ինտերնետ կապը և փորձեք կրկին»
- «Կրկին փորձել»
- «Ոչ մի ապրանք չի գտնվել»
- «Փորձեք ընտրել մեկ այլ բաժին։»
- «Բոլոր բաժինները»

Նույն բանալիները `en.json`-ում և `ru.json`-ում թարգմանություն են։ Կրկնվող բանալին կամ կոտրված փակագիծը PR չբացելու պատճառ է։ PR-ից առաջ ամեն ֆայլ բացվում է `json.loads`-ով։

Գլխավորի, Textile-ի, Baby-ի, վերնագրի, ներքևի, մեծածախի և `/design`-ի բանալիները կան երեք լեզվով։ Էջի արդեն կարդացած բանալին լուռ չվերանվանել։

**Lead-ը չի merge անում, քանի դեռ** երեք ֆայլը վավեր JSON են, վերևի հայերեն տողերը `am.json`-ում են, և նույն բանալիները կան `en`-ում ու `ru`-ում։
