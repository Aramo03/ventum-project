# Исправления — 17 ноября 2026

Журналы `docs/zones/*/fix.md` не менялись: это разбор волны 1.

## Русский

### 1. Миграция корзины не импортировалась

**Симптом:** `python manage.py test` падал до тестов. `SyntaxError` в `backend/apps/cart/migrations/0001_initial.py`, строка 28: закрывающая `]` не совпадала со скобкой на строке 19.

**Файл:** `backend/apps/cart/migrations/0001_initial.py`.

**Что сделано:** у модели `Cart` поле `user` было записано дважды, второй раз уже после закрытого списка `fields`. Вторая копия и лишняя `]` удалены. В списке осталось одно поле `user`.

### 2. Три словаря витрины не были JSON

**Симптом:** Vite не открывал страницы. `en.json` ломался около блока `common` / `baby`, `ru.json` — на пропущенной запятой перед вторым `products`, `am.json` — на повторном `baby` и лишней скобке после `textile`.

**Файлы:** `frontend/src/i18n/en.json`, `frontend/src/i18n/ru.json`, `frontend/src/i18n/am.json`.

**Что сделано:** повтор блока `baby` убран, пропущенные запятые поставлены, скобки сведены к одному объекту. Ключи `checkout`, `account`, `textile` и `baby.addToCart` сохранены. У Textile оставлены `textile_cart_add`, `textile_cart_success`, `textile_cart_401` там, где они уже были (en, am). `json.loads` проходит на всех трёх файлах.

### 3. Прогон тестов после этих двух правок

**Симптом:** миграция уже импортируется, но набор из 28 тестов не стартует. `ImportError`: `apps.cart.views` просит `CartItemWriteSerializer` и `serialize_cart`, а `apps.cart.serializers` отдаёт `AddCartItemSerializer`, `UpdateCartItemSerializer` и `cart_representation`.

**Что сделано:** на том прогоне имена не переписывались. Временный sqlite `fix-check.sqlite3` на диске не оставлен.

Проверка GitHub на коммите волны 4 остановилась на этом же `ImportError`. В `backend/apps/cart/views.py` сверху лежала оборванная первая версия вью: она импортировала `CartItemWriteSerializer` и `serialize_cart` и обрывалась внутри `patch`. Ниже в том же файле уже была целая версия с `CartView`, `CartItemCreateView` и `CartItemDetailView`, и именно её подключает `urls.py`. Оборванный верх удалён. Сериализаторы `AddCartItemSerializer`, `UpdateCartItemSerializer` и `cart_representation` не переименовывались.

## English

The Wave 1 journals in `docs/zones/*/fix.md` were left as they were.

### 1. The cart migration did not import

**Symptom:** `python manage.py test` died before any test. `SyntaxError` in `backend/apps/cart/migrations/0001_initial.py`, line 28: the closing `]` did not match the parenthesis on line 19.

**File:** `backend/apps/cart/migrations/0001_initial.py`.

**Change:** `Cart.user` was written twice, the second time after `fields` had already closed. The extra copy and the extra `]` are gone. One `user` field remains inside `fields`.

### 2. The three storefront dictionaries were not JSON

**Symptom:** Vite could not open pages. `en.json` broke around `common` / `baby`, `ru.json` was missing a comma before the second `products`, and `am.json` repeated `baby` and had an extra brace after `textile`.

**Files:** `frontend/src/i18n/en.json`, `frontend/src/i18n/ru.json`, `frontend/src/i18n/am.json`.

**Change:** the repeated `baby` block is gone, the missing commas are in place, and each file is one object. The `checkout`, `account`, `textile`, and `baby.addToCart` keys stay. Textile keeps `textile_cart_add`, `textile_cart_success`, and `textile_cart_401` where they already existed (en, am). `json.loads` accepts all three files.

### 3. Test run after those two repairs

**Symptom:** the migration imports, and the suite of 28 tests still does not start. `ImportError`: `apps.cart.views` asks for `CartItemWriteSerializer` and `serialize_cart`, while `apps.cart.serializers` provides `AddCartItemSerializer`, `UpdateCartItemSerializer`, and `cart_representation`.

**Change:** those names were left on that run. The throwaway sqlite `fix-check.sqlite3` is not on disk.

The GitHub check on the Wave 4 commit stopped on the same `ImportError`. The top of `backend/apps/cart/views.py` was a cut-off first draft: it imported `CartItemWriteSerializer` and `serialize_cart` and stopped inside `patch`. The same file already had a complete `CartView`, `CartItemCreateView`, and `CartItemDetailView` below, and `urls.py` uses that second set. The cut-off top is removed. `AddCartItemSerializer`, `UpdateCartItemSerializer`, and `cart_representation` keep their names.

## Հայերեն

`docs/zones/*/fix.md` մատյանները չեն փոխվել. դա Wave 1-ի գրառումն է։

### 1. Զամբյուղի միգրացիան չէր ներմուծվում

**Ախտանիշ:** `python manage.py test`-ը կանգնում էր թեստերից առաջ։ `SyntaxError`՝ `backend/apps/cart/migrations/0001_initial.py`, տող 28. փակող `]`-ը չէր համընկնում 19-րդ տողի փակագծին։

**Ֆայլ:** `backend/apps/cart/migrations/0001_initial.py`։

**Ինչ արվեց:** `Cart`-ի `user` դաշտը գրված էր երկու անգամ, երկրորդը՝ արդեն փակված `fields` ցանկից հետո։ Երկրորդ օրինակը և ավելորդ `]`-ը հանված են։ Ցանկում մնացել է մեկ `user`։

### 2. Խանութի երեք բառարանները JSON չէին

**Ախտանիշ:** Vite-ը էջերը չէր բացում։ `en.json`-ը կոտրվում էր `common` / `baby` հատվածում, `ru.json`-ում պակասում էր ստորակետը երկրորդ `products`-ից առաջ, `am.json`-ում `baby`-ն կրկնվում էր և `textile`-ից հետո ավելորդ փակագիծ կար։

**Ֆայլեր:** `frontend/src/i18n/en.json`, `frontend/src/i18n/ru.json`, `frontend/src/i18n/am.json`։

**Ինչ արվեց:** կրկնվող `baby` բլոկը հանված է, ստորակետները դրված են, ամեն ֆայլ մեկ օբյեկտ է։ `checkout`, `account`, `textile` և `baby.addToCart` բանալիները մնացել են։ Textile-ի `textile_cart_add`, `textile_cart_success`, `textile_cart_401` մնացել են այնտեղ, որտեղ արդեն կային (en, am)։ `json.loads`-ը երեք ֆայլն էլ ընդունում է։

### 3. Թեստերի փորձն այս երկու ուղղումից հետո

**Ախտանիշ:** միգրացիան արդեն ներմուծվում է, բայց 28 թեստը չի սկսվում։ `ImportError`. `apps.cart.views`-ը ուզում է `CartItemWriteSerializer` և `serialize_cart`, իսկ `apps.cart.serializers`-ը տալիս է `AddCartItemSerializer`, `UpdateCartItemSerializer` և `cart_representation`։

**Ինչ արվեց:** այդ փորձի ժամանակ անունները չվերաշարադրվեցին։ Ժամանակավոր `fix-check.sqlite3`-ը սկավառակին չկա։

GitHub-ի ստուգումը Wave 4-ի կոմիտի վրա կանգնեց նույն `ImportError`-ով։ `backend/apps/cart/views.py`-ի վերևում ընկած էր առաջին կտրված տարբերակը. այն ներմուծում էր `CartItemWriteSerializer` և `serialize_cart` և կտրվում էր `patch`-ի մեջ։ Նույն ֆայլի ներքևում արդեն կար ամբողջական `CartView`, `CartItemCreateView` և `CartItemDetailView`, և `urls.py`-ը միացնում է հենց դրանք։ Կտրված վերևը հանված է։ `AddCartItemSerializer`, `UpdateCartItemSerializer` և `cart_representation` անունները մնացել են։

# Исправления — 20 ноября 2026

Волна 4 закрыта на общем листе Figma. Запись от 17 ноября выше остаётся. Журналы `docs/zones/*/fix.md` не менялись.

## Русский

### 1. Подпись кабинета в шапке была объектом

**Симптом:** `t('account')` в `frontend/src/components/Header/Header.jsx` попадал в объект `account`, и на экране был служебный текст i18next.

**Что сделано:** ссылка читает строку `accountLink`. После входа и выхода шапка слушает `ventum-auth` и заново берёт `count`.

### 2. Корзина не пользовалась своими текстами и `cart.js`

**Симптом:** `Cart.jsx` был на английском, не вызывал `getCart`, `updateCartItem`, `deleteCartItem`, `checkout` и `submitPaymentForm`. Картинки строк шли без `mediaUrl`. Счётчик в шапке не обновлялся после «в корзину».

**Что сделано:** страница берёт `cartPage` и функции из `cart.js`. Успешный `POST /api/cart/items/` шлёт `cart-updated`. `?success=1` показывает `cartPage.paymentReturn` и не содержит Paid, «Оплачено», «Վճարված».

### 3. Опт уходил с чужим полем, у подвала не было ключей

**Симптом:** `Footer.jsx` отправлял `message`, а `WholesaleInquirySerializer` ждёт `text`. Ключи `footer.description`, `footer.navigation`, `footer.newsletterHint`, `footer.wholesaleHint`, `footer.closeForm`, `footer.rights`, `nav.home`, `nav.textile`, `nav.baby`, `nav.cart` отсутствовали. Подвал был тёмным amber, этого цвета на листе нет.

**Что сделано:** тело заявки — `name`, `phone`, `email`, `text`. Новые ключи лежат в `am.json`, `en.json` и `ru.json`. Подвал — светлая полоса листа: колонки, рассылка, опт.

### 4. Герой Textile и подпись подарка Baby

**Симптом:** `Textile.jsx` ставил `src={heroImage}` без `mediaUrl`. Ссылка подарка на `/baby` называлась `baby.addToCart`, хотя это переход к сетке.

**Что сделано:** герой идёт через `mediaUrl`. У подарка ключ `baby.giftAction`. Сетка одна, карточка одна — `components/ProductCard/`.

### 5. У каждой страницы была своя палитра

**Симптом:** hex жил в CSS Gateway, Textile, Baby, ProductCard, Header, Footer, Cart, Account, Checkout и NotFound. Общие токены в `index.css` были другие: `#6fbf3a`, `#1d2b25`.

**Что сделано:** цвета листа записаны только в `frontend/src/index.css`. Textile: `#1A1A1A`, `#4A4A4A`, `#76B82A`, холст `#F9F9F9`, текст `#333333`. Baby: `#5C6B4A`, `#8A9A7B`, `#A3B18A`, холст `#F8F8F5`, текст `#3E4A38`. Общая кнопка покупки зелёная. Оболочка сидит на тёплом холсте `#F7F6F2`. Линия карточек `#E4E4E4`. Красная обводка ошибки на листе без читаемого hex: в токене `--vt-danger` стоит `#B42318`.

### 6. `Cart.updated_at` был только в миграции

**Симптом:** `backend/apps/cart/migrations/0001_initial.py` создаёт `updated_at`, `models.py` поле не объявлял.

**Что сделано:** в модели `Cart` поле `updated_at = DateTimeField(auto_now=True)`. Новая миграция не создавалась.

## English

Wave 4 is closed on the shared Figma sheet. The 17 November entry above stays. The Wave 1 journals in `docs/zones/*/fix.md` were left as they were.

### 1. The account label in the header was an object

**Symptom:** `t('account')` in `Header.jsx` resolved to the `account` object, so the screen showed an i18next message.

**Change:** the link reads the string `accountLink`. After sign-in and sign-out the header listens for `ventum-auth` and loads `count` again.

### 2. The cart ignored its own copy and `cart.js`

**Symptom:** `Cart.jsx` was English-only and did not call `getCart`, `updateCartItem`, `deleteCartItem`, `checkout`, or `submitPaymentForm`. Line images skipped `mediaUrl`. The header count stayed stale after add-to-cart.

**Change:** the page uses `cartPage` and the helpers in `cart.js`. A successful `POST /api/cart/items/` emits `cart-updated`. `?success=1` shows `cartPage.paymentReturn` and does not say Paid, Оплачено, or Վճարված.

### 3. Wholesale posted the wrong field, and the footer keys were missing

**Symptom:** `Footer.jsx` sent `message`; `WholesaleInquirySerializer` expects `text`. `footer.description`, `footer.navigation`, `footer.newsletterHint`, `footer.wholesaleHint`, `footer.closeForm`, `footer.rights`, `nav.home`, `nav.textile`, `nav.baby`, and `nav.cart` were missing. The footer was dark amber, a color the sheet does not have.

**Change:** the inquiry body is `name`, `phone`, `email`, `text`. The new keys are in `am.json`, `en.json`, and `ru.json`. The footer is the light sheet band: columns, newsletter, wholesale.

### 4. The Textile hero and the Baby gift label

**Symptom:** `Textile.jsx` set `src={heroImage}` without `mediaUrl`. The gift link on `/baby` used `baby.addToCart` for a jump to the grid.

**Change:** the hero goes through `mediaUrl`. The gift uses `baby.giftAction`. One grid, one card, `components/ProductCard/`.

### 5. Every page carried its own palette

**Symptom:** hex lived in the CSS of Gateway, Textile, Baby, ProductCard, Header, Footer, Cart, Account, Checkout, and NotFound. The shared tokens in `index.css` were different: `#6fbf3a`, `#1d2b25`.

**Change:** sheet colors live only in `frontend/src/index.css`. Textile: `#1A1A1A`, `#4A4A4A`, `#76B82A`, canvas `#F9F9F9`, text `#333333`. Baby: `#5C6B4A`, `#8A9A7B`, `#A3B18A`, canvas `#F8F8F5`, text `#3E4A38`. The shared purchase button is green. The shell sits on the warm canvas `#F7F6F2`. Card lines are `#E4E4E4`. The sheet’s error outline has no readable hex, so `--vt-danger` is `#B42318`.

### 6. `Cart.updated_at` existed only on the migration

**Symptom:** `0001_initial.py` creates `updated_at`, and `models.py` did not declare it.

**Change:** `Cart.updated_at` is a `DateTimeField(auto_now=True)`. No new migration was created.

## Հայերեն

Wave 4-ը փակ է ընդհանուր Figma թերթի վրա։ Նոյեմբերի 17-ի գրառումը վերևում մնում է։ `docs/zones/*/fix.md` մատյանները չեն փոխվել։

### 1. Վերնագրի հաշվի գրությունը օբյեկտ էր

**Ախտանիշ:** `Header.jsx`-ի `t('account')`-ը ընկնում էր `account` օբյեկտի վրա, և էկրանին i18next-ի ծառայողական տեքստ էր։

**Ինչ արվեց:** հղումը կարդում է `accountLink` տողը։ Մուտքից և ելքից հետո վերնագիրը լսում է `ventum-auth` և նորից վերցնում `count`։

### 2. Զամբյուղը չէր օգտագործում իր տեքստերն ու `cart.js`-ը

**Ախտանիշ:** `Cart.jsx`-ը անգլերեն էր և չէր կանչում `getCart`, `updateCartItem`, `deleteCartItem`, `checkout`, `submitPaymentForm`։ Տողերի նկարները `mediaUrl` չէին անցնում։ «Զամբյուղ» ավելացնելուց հետո հաշվիչը չէր թարմանում։

**Ինչ արվեց:** էջը վերցնում է `cartPage` և `cart.js`-ի ֆունկցիաները։ Հաջող `POST /api/cart/items/` ուղարկում է `cart-updated`։ `?success=1`-ը ցույց է տալիս `cartPage.paymentReturn` և չի պարունակում Paid, «Оплачено», «Վճարված»։

### 3. Մեծածախը գնում էր սխալ դաշտով, ներքևի բանալիները չկային

**Ախտանիշ:** `Footer.jsx`-ը ուղարկում էր `message`, իսկ `WholesaleInquirySerializer`-ը սպասում է `text`։ `footer.description`, `footer.navigation`, `footer.newsletterHint`, `footer.wholesaleHint`, `footer.closeForm`, `footer.rights`, `nav.home`, `nav.textile`, `nav.baby`, `nav.cart` չկային։ Ներքևը մուգ amber էր. այդ գույնը թերթում չկա։

**Ինչ արվեց:** հայտի մարմինը՝ `name`, `phone`, `email`, `text`։ Նոր բանալիները `am.json`, `en.json` և `ru.json` ֆայլերում են։ Ներքևը թերթի բաց շերտն է. սյուներ, բաժանորդագրություն, մեծածախ։

### 4. Textile-ի վերնագիրն ու Baby-ի նվերի գրությունը

**Ախտանիշ:** `Textile.jsx`-ը դնում էր `src={heroImage}` առանց `mediaUrl`։ `/baby`-ի նվերի հղումը `baby.addToCart` էր, թեև դա ցանցի անցում է։

**Ինչ արվեց:** վերնագիրը գնում է `mediaUrl`-ով։ Նվերը օգտագործում է `baby.giftAction`։ Մեկ ցանց, մեկ քարտ՝ `components/ProductCard/`։

### 5. Ամեն էջ իր գունապնակն ուներ

**Ախտանիշ:** hex-ը Gateway, Textile, Baby, ProductCard, Header, Footer, Cart, Account, Checkout և NotFound CSS-ում էր։ `index.css`-ի ընդհանուր տոկենները այլ էին՝ `#6fbf3a`, `#1d2b25`։

**Ինչ արվեց:** թերթի գույները միայն `frontend/src/index.css`-ում են։ Textile՝ `#1A1A1A`, `#4A4A4A`, `#76B82A`, հիմք `#F9F9F9`, տեքստ `#333333`։ Baby՝ `#5C6B4A`, `#8A9A7B`, `#A3B18A`, հիմք `#F8F8F5`, տեքստ `#3E4A38`։ Ընդհանուր գնման կոճակը կանաչ է։ Պատյանը տաք հիմքի վրա է՝ `#F7F6F2`։ Քարտի գիծը `#E4E4E4` է։ Սխալի կարմիր եզրը թերթում ընթեռնելի hex չունի. `--vt-danger`-ը `#B42318` է։

### 6. `Cart.updated_at`-ը միայն միգրացիայում էր

**Ախտանիշ:** `0001_initial.py`-ը ստեղծում է `updated_at`, իսկ `models.py`-ը դաշտը չէր հայտարարում։

**Ինչ արվեց:** `Cart.updated_at`-ը `DateTimeField(auto_now=True)` է։ Նոր միգրացիա չի ստեղծվել։
