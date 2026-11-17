# Ventum — Wave 3

Wave 1 закрыта: модели и админка. Wave 2 закрыта: публичное API и витрина, включая формы подвала. Заново это не делать и не ломать. Архив волны 2: [task-wave2.md](task-wave2.md). Архив волны 1: [task-advanced.md](task-advanced.md).

Wave 3 собирает покупку: корзина, заказ, оплата Idram и одно письмо магазину. База — SQLite. Postgres не входит: это финал проекта, [docs/postgresql.md](docs/postgresql.md).

Спеки, которые в этой волне становятся контрактом:

- [docs/idram.md](docs/idram.md)
- [docs/order-email.md](docs/order-email.md)

**Срок:** до конца января 2027.  
**Git:** [CONTRIBUTING.md](CONTRIBUTING.md). Короткий список: [TASK.md](TASK.md). Доска: [docs/zones/lead/README.md](docs/zones/lead/README.md).

Номер ученика один. Он стоит в таблице, в заголовке раздела и в имени файла `docs/agents/`. Очередь merge этим номером не пользуется. Имена веток волны 1 не переименовывать.

Админка: `http://127.0.0.1:8000/api/admin/`. Health: `http://127.0.0.1:8000/api/health/` — по-прежнему `{"status":"ok"}`. Swagger: `http://127.0.0.1:8000/api/schema/swagger-ui/`. Сайт: `http://127.0.0.1:3000/`.

Номер карты, срок и CVV Ventum не принимает и не хранит. Их вводит только страница Idram. `SUCCESS_URL` в браузере не означает оплату.

---

## Команда

Одна зона на человека. Чужие файлы не переписывать. Файл из колонки «Агент» ученик отдаёт своему агенту целиком.

| # | Имя | Ветка | Зона | Агент |
|---|-----|--------|------|--------|
| 1 | Lead | `feat/lead` | `lead` | [01-lead.md](docs/agents/01-lead.md) |
| 2 | Suro | `feat/suro-api` | `api` | [02-suro.md](docs/agents/02-suro.md) |
| 3 | Artush | `feat/artush-i18n` | `i18n` | [03-artush.md](docs/agents/03-artush.md) |
| 4 | Hayk | `feat/hayk-gateway` | `payments` | [04-hayk.md](docs/agents/04-hayk.md) |
| 5 | Mariam | `feat/mariam-header` | `cart-page` | [05-mariam.md](docs/agents/05-mariam.md) |
| 6 | Daniel | `feat/daniel-footer` | `orders` | [06-daniel.md](docs/agents/06-daniel.md) |
| 7 | Karen | `feat/karen-textile` | `textile` | [07-karen.md](docs/agents/07-karen.md) |
| 8 | Svet | `feat/svet-baby` | `baby` | [08-svet.md](docs/agents/08-svet.md) |
| 9 | Vach | `feat/vach-catalog` | `cart` | [09-vach.md](docs/agents/09-vach.md) |
| 10 | Ashot | `feat/ashot-ui` | `ui` | [10-ashot.md](docs/agents/10-ashot.md) |

Очередь merge (порядок имён, не номера учеников):

```
Lead → Suro → Artush → Vach → Karen → Svet → Daniel → Hayk → Mariam → Ashot
```

Suro первый среди кода: пустые приложения и настройки должны лежать в `dev`, прежде чем появятся модели. Artush следом: код языка Idram пишется один раз, до checkout. Vach после Artush: корзина берёт товар и перевод. Karen и Svet после корзины: кнопки бьют в его API. Daniel после витрин: модели заказа и функция письма, без платёжной вью. Hayk после Daniel: checkout и callback вызывают его функцию и не переписывают её. Mariam после Hayk: страница корзины отправляет форму Idram. Ashot последний: тесты на уже смерженное API и страницы возврата.

Старт: `git checkout dev && git pull`, затем своя `feat/...`, влить в неё свежий `dev`. Один новый pull request, **base = `dev`**. В `main` не пушить. `--force` на `dev` и `main` не делать.

Новую строку интерфейса ученик добавляет сразу в три файла: `frontend/src/i18n/am.json`, `en.json`, `ru.json`. Второй axios не создавать. Запросы идут через [frontend/src/api/client.js](frontend/src/api/client.js). Токен уже лежит в `localStorage` под ключом `ventum_access_token`. На запрос клиент сам ставит `Authorization: Bearer`. На GET он уже подставляет `language`. Ученик вызывает `setAuthToken` и не пишет второй перехватчик. У компонента по-прежнему три файла: `Name.jsx`, `name.css`, `name.js`.

---

## Контракт API

Волна 2 остаётся как есть: каталог, блоки главной, заявки, JWT. Второй префикс каталога не добавлять.

Общее:

- Коды языка витрины только `am`, `en`, `ru`. Пустой или отсутствующий `language` значит `en`. Любое другое значение — **400**. Это по-прежнему `parse_language`.
- Цена и сумма — строка десятичной дроби с двумя знаками, в AMD. Не float.
- `DEFAULT_PERMISSION_CLASSES` остаётся `AllowAny`. Корзину, checkout и карточку заказа закрывает сама вью через JWT. Callback Idram публичный: его зовёт сервер Idram, не браузер покупателя.
- Карта, срок и CVV в запросах Ventum не появляются.

| Метод | Путь | Кто | Кто вызывает |
|--------|------|-----|----------------|
| `GET` | `/api/cart/` | Vach | Mariam, Karen, Svet |
| `POST` | `/api/cart/items/` | Vach | Karen, Svet, страница корзины |
| `PATCH` | `/api/cart/items/<sku>/` | Vach | Mariam |
| `DELETE` | `/api/cart/items/<sku>/` | Vach | Mariam |
| `POST` | `/api/checkout/` | Hayk | Mariam |
| `POST` | `/api/payments/idram/result/` | Hayk | тест Ashot, не браузер |
| `GET` | `/api/orders/<bill_no>/` | Daniel | Ashot, владелец заказа |
| `POST` | `/api/auth/token/` | уже есть | Hayk, страница `/account` |

Корзина. Без токена — **401**. Один открытый cart на пользователя. Повторный вход не создаёт вторую корзину.

`GET /api/cart/`

```json
{
  "count": 1,
  "total": "12000.00",
  "items": [
    {
      "sku": "TX-001",
      "name": "Sheet",
      "store": "textile",
      "qty": 1,
      "price": "12000.00",
      "line_total": "12000.00"
    }
  ]
}
```

`count` — сумма `qty`, не число строк. `name` берётся через `pick_translation`: запрошенный язык, иначе `en`, иначе любой существующий. Цена строки — текущая цена опубликованного товара, не запомненная заранее. `line_total` = цена × qty, два знака.

`POST /api/cart/items/` тело `{"sku": "TX-001", "qty": 1}`. Нет товара или `is_published=False` — **404**. Тот же sku ещё раз увеличивает `qty`, вторая строка не создаётся. `qty` меньше 1, кроме нуля на PATCH и DELETE, — **400**.

`PATCH /api/cart/items/<sku>/` тело `{"qty": 2}`. `qty: 0` удаляет строку и отвечает **200** с корзиной. Чужой sku в этой корзине — **404**.

`DELETE /api/cart/items/<sku>/` — **204**.

Заказ. Статус только `pending` или `paid`. `bill_no` уникален и равен `EDP_BILL_NO`. Формат номера: `VNT-` и первичный ключ заказа, например `VNT-15`. Его проставляет Hayk после insert. Daniel даёт поле.

Строка заказа хранит снимок: `sku`, имя (`ru`, если нет — `en`), `qty`, `price`, `line_total`. После checkout смена цены товара этот снимок не меняет.

`GET /api/orders/<bill_no>/` — только владелец, JWT. Чужой пользователь и гость — **404**, не 403: номер не подтверждает, что заказ есть. Ответ: `bill_no`, `status`, `amount`, `items` со снимком.

```json
{
  "bill_no": "VNT-15",
  "status": "pending",
  "amount": "12000.00",
  "items": [
    {
      "sku": "TX-001",
      "name": "Простыня",
      "qty": 1,
      "price": "12000.00",
      "line_total": "12000.00"
    }
  ]
}
```

`POST /api/checkout/` — JWT. Пустая корзина — **400**. Иначе создаётся заказ `pending`, строки копируются, корзина очищается, статус не становится `paid`. Ответ:

```json
{
  "bill_no": "VNT-15",
  "payment_url": "https://web.idram.am/payment.aspx",
  "fields": {
    "EDP_LANGUAGE": "EN",
    "EDP_REC_ACCOUNT": "",
    "EDP_DESCRIPTION": "Ventum VNT-15",
    "EDP_AMOUNT": "12000.00",
    "EDP_BILL_NO": "VNT-15",
    "EDP_EMAIL": "buyer@example.com"
  }
}
```

`EDP_LANGUAGE` берётся только из `idram_language`. `EDP_REC_ACCOUNT` и `payment_url` — из settings. Сумма — сумма снимков. Клиент эти числа не придумывает заново: он отправляет полученный словарь.

`POST /api/payments/idram/result/` — без JWT, CSRF снят, ответ — голое тело `OK` или не `OK`. Не JSON и не HTML.

Precheck (`EDP_PRECHECK=YES`): `OK`, если заказ есть, он `pending`, `EDP_REC_ACCOUNT` наш и сумма совпала. Статус здесь не менять. Иначе не `OK`.

Подтверждение. Контрольная сумма — MD5 от строки через двоеточие, как требует Idram:

```text
EDP_REC_ACCOUNT:EDP_AMOUNT:SECRET_KEY:EDP_BILL_NO:EDP_PAYER_ACCOUNT:EDP_TRANS_ID:EDP_TRANS_DATE
```

Совпало, сумма та же, счёт наш, заказ ещё не `paid`: статус `paid`, сохранить `EDP_TRANS_ID` и время, ответить `OK`, один раз вызвать `send_order_paid_email(order)`. Повтор того же callback — снова `OK`, функция письма не вызывается, статус не пишется второй раз.

Неверная сумма, чужой счёт или плохой checksum: заказ не `paid`, тело не `OK`.

Письмо. `send_order_paid_email(order)` живёт в `apps/orders/mail.py` и **не меняет статус**. Получатель — `settings.ORDER_NOTIFY_EMAIL`. Пустой адрес: функция возвращает `False`, в лог пишется, что письмо пропущено, исключение наружу не летит. Непустой адрес: одно письмо, функция возвращает `True`. Тема: номер заказа и слово paid. Текст на русском, по [docs/order-email.md](docs/order-email.md). Секретов и данных карты в письме нет.

Страницы:

- `/account` — вход и выход. Hayk.
- `/cart` — строки корзины и отправка формы на `payment_url`. Mariam. Query `success=1` на этой странице не писать как «оплачено».
- `/checkout/success` и `/checkout/fail` — читают `GET /api/orders/<bill_no>/`. Номер берётся из query `bill`. Слово «оплачено» только при `status=paid`. Ashot.

---

## Чьи файлы

| # | Можно | Нельзя |
|---|--------|--------|
| 1 Lead | доска волны 3, конфликт только чтобы собрать `dev` | фичи зон |
| 2 Suro | пустые `apps/cart` и `apps/orders` (`apps.py`, пустые `urls.py` и `payment_urls.py`), `INSTALLED_APPS`, `include` в `config/urls.py`, чтение пяти настроек из env | модели, вью оплаты, фронт |
| 3 Artush | `apps/core/idram_language.py` | checkout, `parse_language` не ослаблять |
| 4 Hayk | `apps/orders/checkout.py`, `apps/orders/idram.py`, заполнить `payment_urls.py`, страница `pages/Account/`, маршрут `/account` в `App.jsx` | переписывать `mail.py`, модели корзины, второй JWT |
| 5 Mariam | `Header`, `pages/Cart/`, маршрут `/cart` | страницы магазинов, `/account`, callback |
| 6 Daniel | модели заказа, миграция, админка, `orders/urls.py` с GET, `mail.py` | вью Idram, Footer, модели корзины |
| 7 Karen | `pages/Textile/` | сид, модели, страница Baby |
| 8 Svet | `pages/Baby/` | сид, страница Textile |
| 9 Vach | `apps/cart/` модели, сериализатор, вью, `urls.py`, админка | поля каталога, React, заказы |
| 10 Ashot | тесты API, `pages/Checkout/` успех и неуспех, два маршрута в `App.jsx` | поля чужих моделей, `index.css` |

Suro подключает так, и дальше `config/urls.py` не трогают:

- `api/cart/` → `apps.cart.urls`
- `api/orders/` → `apps.orders.urls`
- `api/` → `apps.orders.payment_urls` (там позже появятся `checkout/` и `payments/idram/result/`)

Пустые `urlpatterns = []` на старте — это нормально. Их заполняют владельцы зон.

---

## 1 — Lead

**Папка:** [docs/zones/lead/README.md](docs/zones/lead/README.md). **Ветка:** `feat/lead`. **Агент:** [docs/agents/01-lead.md](docs/agents/01-lead.md).

Принимать PR в `dev` строго по очереди имён этой волны. Конфликт чинить вместе с владельцем файла. Чужую зону не переписывать. Колонку статуса на доске вести самому. Номер PR не ставить до merge.

После merge Ashot (ученик 10): health, Swagger, `/`, `/textile`, `/baby`, `/cart`, `/account`, `/checkout/success`, затем `python manage.py test`. Postgres не поднимать.

**Не закрывать Wave 3, пока:** тесты зелёные целиком; повторный callback не шлёт второе письмо; страницы возврата не называют заказ оплаченным без `status=paid`; корзина и checkout есть в Swagger.

## 2 — Suro · api

**Папка:** [backend/apps/accounts/README.md](backend/apps/accounts/README.md), плюс README в `cart` и `orders`. **Ветка:** `feat/suro-api`. **Агент:** [docs/agents/02-suro.md](docs/agents/02-suro.md).

Ждать только Lead. Аналитику, JWT и `PAGE_SIZE` не переписывать.

**Сделать**

1. Пакеты `apps.cart` и `apps.orders` становятся устанавливаемыми: `apps.py`, `__init__.py`, пустой `urls.py`. У orders ещё пустой `payment_urls.py`.
2. Оба — в `INSTALLED_APPS`. В `config/urls.py` три `include` из таблицы выше.
3. Settings читает `IDRAM_REC_ACCOUNT`, `IDRAM_SECRET_KEY`, `IDRAM_PAYMENT_URL` (по умолчанию `https://web.idram.am/payment.aspx`), `IDRAM_LANGUAGE` (по умолчанию `RU`), `ORDER_NOTIFY_EMAIL`. Секреты не хардкодить. В `.env.example` ключи уже есть: не класть туда настоящий секрет.

**Нельзя:** модели, миграции корзины и заказа, вью оплаты, React.

**Lead не мержит, пока:** `migrate` на чистом SQLite проходит, пять настроек читаются, в diff нет моделей.

## 3 — Artush · i18n

**Папка:** [backend/apps/core/README.md](backend/apps/core/README.md). **Ветка:** `feat/artush-i18n`. **Агент:** [docs/agents/03-artush.md](docs/agents/03-artush.md).

`parse_language` и `pick_translation` уже есть. Их не ослаблять.

**Сделать**

`idram_language(value)` в `apps/core/idram_language.py`. Сначала `parse_language`. Потом карта: `am` → `AM`, `en` → `EN`, `ru` → `RU`. Неизвестный код по-прежнему `ValueError`, не тихий `EN`.

**Нельзя:** вью checkout, шапка, JSON витрины кроме строки, которая нужна самому помощнику. Помощнику строка интерфейса не нужна.

**Lead не мержит, пока:** три кода мапятся, `de` не становится `EN`, health отвечает `{"status":"ok"}`.

## 4 — Hayk · payments

**Папка:** [backend/apps/content/README.md](backend/apps/content/README.md) для старого слота не трогать. Новая страница: `frontend/src/pages/Account/`. **Ветка:** `feat/hayk-gateway`. **Агент:** [docs/agents/04-hayk.md](docs/agents/04-hayk.md).

Ждать Daniel: модели заказа и `send_order_paid_email` уже в `dev`. Ждать Artush и Vach по очереди имён: они раньше.

**Сделать**

1. `POST /api/checkout/` по контракту. Пустая корзина — 400. Заказ `pending`, корзина пустая, `paid` не ставить. `EDP_LANGUAGE` только через `idram_language`.
2. `POST /api/payments/idram/result/` по [docs/idram.md](docs/idram.md). CSRF снят. Тело `OK` — не JSON. Precheck статус не меняет. Верный checksum ставит `paid`, пишет `EDP_TRANS_ID`, один раз зовёт `send_order_paid_email`. Повтор не зовёт. Плохой checksum оставляет `pending`.
3. `/account`: email и пароль на `POST /api/auth/token/`, успех — `setAuthToken(access)`, выход — `setAuthToken(null)`. С токеном показать `GET /api/auth/me/`. Маршрут добавить в `App.jsx` одной строкой.

**Нельзя:** переписывать `mail.py` и модели, второй пакет JWT, страницу корзины.

**Lead не мержит, пока:** пустой checkout даёт 400; precheck не ставит `paid`; верный checksum ставит `paid` и шлёт одно письмо; повтор письма не шлёт; `/account` берёт токен из уже существующей ручки.

## 5 — Mariam · cart-page

**Папка:** [frontend/src/components/Header/README.md](frontend/src/components/Header/README.md). Страница: `frontend/src/pages/Cart/`. **Ветка:** `feat/mariam-header`. **Агент:** [docs/agents/05-mariam.md](docs/agents/05-mariam.md).

Ждать Hayk. Поиск волны 2 не ломать. Кнопки Account и Cart сейчас выключены: их включить ссылками.

**Сделать**

1. Account ведёт на `/account`. Cart ведёт на `/cart`. Если токен есть, рядом с Cart виден `count` из `GET /api/cart/`. Нет токена — ссылки всё равно есть, счётчик не обязателен.
2. `/cart`: строки, количество через PATCH, удаление через DELETE, кнопка оплаты. Оплата: `POST /api/checkout/`, затем обычная HTML-форма method POST на `payment_url` с полями из `fields`. Это уход браузера на Idram, не axios на Idram.
3. Query `success=1` не показывать как «оплачено».

**Нельзя:** страницы Textile и Baby, `/account`, callback.

**Lead не мержит, пока:** обе ссылки живые, корзина показывает строки, `success=1` не считается оплатой.

## 6 — Daniel · orders

**Папка:** [backend/apps/orders/README.md](backend/apps/orders/README.md). **Ветка:** `feat/daniel-footer`. **Агент:** [docs/agents/06-daniel.md](docs/agents/06-daniel.md).

Footer волны 2 не трогать. Модели заявок не трогать.

**Сделать**

1. `Order`: пользователь, `bill_no` уникальный, статус `pending`/`paid`, сумма, email покупателя, имя, `idram_trans_id` пустое, `paid_at` пустое, `created_at`.
2. `OrderLine`: заказ, `sku`, снимок имени, `qty`, `price`, `line_total`.
3. Админка обоих. `GET /api/orders/<bill_no>/` по контракту, только владелец.
4. `send_order_paid_email(order)` в `mail.py` по [docs/order-email.md](docs/order-email.md). Функция не меняет статус. Пустой адрес возвращает `False` и пишет в лог.

**Нельзя:** вью Idram, модели корзины, Footer.

**Lead не мержит, пока:** чужой `bill_no` даёт 404, функция письма не пишет статус, пустой адрес не бросает исключение.

## 7 — Karen · textile

**Папка:** [frontend/src/pages/Textile/README.md](frontend/src/pages/Textile/README.md). **Ветка:** `feat/karen-textile`. **Агент:** [docs/agents/07-karen.md](docs/agents/07-karen.md).

Ждать Vach. Страницу Baby не трогать. Сид не трогать.

**Сделать**

На каждом опубликованном товаре `/textile` кнопка шлёт `POST /api/cart/items/` с его `sku` и `qty: 1`. Ответ 401 показывает в карточке, что нужен вход, и не уводит на чужую страницу. Успех виден на карточке. Новые строки — в трёх JSON.

**Нельзя:** `seed_textile`, модели, `/baby`.

**Lead не мержит, пока:** кнопка кладёт товар Textile и страница не показывает товар Baby.

## 8 — Svet · baby

**Папка:** [frontend/src/pages/Baby/README.md](frontend/src/pages/Baby/README.md). **Ветка:** `feat/svet-baby`. **Агент:** [docs/agents/08-svet.md](docs/agents/08-svet.md).

То же, что у Karen, для `/baby` и `store=baby`. Файлы Textile не менять.

**Lead не мержит, пока:** кнопка кладёт товар Baby и страница Textile не изменилась.

## 9 — Vach · cart

**Папка:** [backend/apps/cart/README.md](backend/apps/cart/README.md). **Ветка:** `feat/vach-catalog`. **Агент:** [docs/agents/09-vach.md](docs/agents/09-vach.md).

Ждать Artush и Suro: приложение уже зарегистрировано, перевод уже есть. Поля `Product` не менять. `search.py` не переписывать.

**Сделать**

Модели корзины и строки, миграция, админка, четыре маршрута контракта. Один cart на пользователя. Цена из текущего опубликованного товара. Имя через `pick_translation`. Язык через `parse_language`: ошибка — 400.

**Нельзя:** React, модели заказа, поля каталога.

**Lead не мержит, пока:** гость получает 401, черновик — 404, повтор sku не плодит строку, `qty` 0 удаляет строку, `models.py` каталога в diff нет.

## 10 — Ashot · ui

**Папка:** [frontend/src/pages/NotFound/README.md](frontend/src/pages/NotFound/README.md) не переписывать ради 404: страница 404 уже есть. Новые страницы: `frontend/src/pages/Checkout/`. **Ветка:** `feat/ashot-ui`. **Агент:** [docs/agents/10-ashot.md](docs/agents/10-ashot.md).

Ждать всех. Тесты волны 1 и волны 2 не удалять. `APIClient`. Сеть, Postgres и живой `runserver` тестам не нужны.

**Сделать**

1. `/checkout/success` и `/checkout/fail`. Query `bill`. `GET /api/orders/<bill>/`. «Оплачено» только при `status=paid`. Нет `bill` — короткая нейтральная фраза, не «оплачено».
2. Тесты: корзина без токена — 401; снятый sku — 404; пустой checkout — 400; precheck не ставит `paid`; верный checksum ставит `paid` и зовёт отправку один раз; тот же POST не зовёт снова; плохой checksum оставляет `pending`.

**Нельзя:** менять поля моделей, чтобы тест позеленел. `index.css` не менять.

**Lead не мержит, пока:** `python manage.py test` из `backend/` зелёный целиком, а экран не называет заказ оплаченным без статуса.

---

## English

Wave 1 and Wave 2 are closed. Do not rebuild them. This wave is the cart, the order, Idram, and one shop email, on SQLite. **Finish by the end of January 2027.** Postgres is the final phase, not this wave. Payment spec: [docs/idram.md](docs/idram.md). Email spec: [docs/order-email.md](docs/order-email.md).

Same people, same branch names. One pull request, base `dev`. Do not push `main`.

Queue: **Lead → Suro → Artush → Vach → Karen → Svet → Daniel → Hayk → Mariam → Ashot**.

Use the existing `api` client and `setAuthToken`. Do not add a second axios. New UI strings go into `am.json`, `en.json`, and `ru.json`.

### Contract

- Cart requires JWT. One open cart per user. `GET /api/cart/` returns `count` (sum of qty), `total`, and `items` with `sku`, `name`, `store`, `qty`, `price`, `line_total`. Prices are AMD strings with two decimals, taken from the published product.
- `POST /api/cart/items/` with `{sku, qty}`. Unknown or unpublished sku is 404. The same sku increases qty. `PATCH .../items/<sku>/` with `qty: 0` deletes the line. `DELETE` returns 204. No token is 401.
- `GET /api/orders/<bill_no>/` is the owner only. Anyone else, including a guest, gets 404. Body: `bill_no`, `status` (`pending` or `paid`), `amount`, snapshotted `items`. The snapshot name is Russian, else English.
- `POST /api/checkout/` (JWT) rejects an empty cart with 400. Otherwise it creates `pending`, copies lines, clears the cart, and does not set `paid`. Response: `bill_no` like `VNT-15`, `payment_url`, and `fields` (`EDP_LANGUAGE`, `EDP_REC_ACCOUNT`, `EDP_DESCRIPTION`, `EDP_AMOUNT`, `EDP_BILL_NO`, `EDP_EMAIL`). `EDP_LANGUAGE` comes only from `idram_language`.
- `POST /api/payments/idram/result/` is public, CSRF-exempt, and returns plain `OK`. Precheck does not change status. Confirmation is the MD5 line in [docs/idram.md](docs/idram.md). A match sets `paid`, stores `EDP_TRANS_ID`, and calls `send_order_paid_email` once. The same callback returns `OK` and does not send again. A bad checksum leaves `pending`.
- `send_order_paid_email(order)` does not change status. An empty `ORDER_NOTIFY_EMAIL` returns `False` and logs a skip.
- `/account` logs in through the existing token endpoint. `/cart` posts the Idram form in the browser. `?success=1` is not paid. `/checkout/success` and `/checkout/fail` read `?bill=` and say paid only when `status` is `paid`.

### Zones

- **Suro.** Install empty `cart` and `orders`, wire the three includes, read the five settings from env. No models and no payment views.
- **Artush.** `idram_language`: `am`/`en`/`ru` → `AM`/`EN`/`RU` after `parse_language`. `de` stays an error.
- **Vach.** Cart models and the four routes. Do not edit catalog fields or React.
- **Karen / Svet.** Add-to-cart on their own page only. A 401 says sign-in is required.
- **Daniel.** Order models, owner GET, `mail.py`. No Idram view and no Footer edits.
- **Hayk.** Checkout, Idram result, `/account` with `setAuthToken`. Do not rewrite `mail.py`.
- **Mariam.** Enable Account and Cart links, build `/cart`, submit the Idram form in the browser.
- **Ashot.** Success and fail pages, API tests, full green `manage.py test`.
- **Lead.** The queue only. Do not close the wave until the gates in the Russian sections above are true.

## Հայերեն

Wave 1-ը և Wave 2-ը փակ են։ Դրանք նորից չսարքել։ Այս ալիքը զամբյուղն է, պատվերը, Idram-ը և մեկ նամակ խանութին, SQLite։ **Ավարտել մինչև 2027-ի հունվարի վերջ։** Postgres-ը վերջնափուլն է, ոչ թե այս ալիքը։ Վճարումը՝ [docs/idram.md](docs/idram.md)։ Նամակը՝ [docs/order-email.md](docs/order-email.md)։

Նույն մարդիկ, նույն ճյուղերի անունները։ Մեկ PR, base-ը `dev`։ `main` չpush անել։

Հերթը՝ **Lead → Suro → Artush → Vach → Karen → Svet → Daniel → Hayk → Mariam → Ashot**։

Գործածիր արդեն եղած `api` հաճախորդը և `setAuthToken`-ը։ Երկրորդ axios մի ավելացրու։ Նոր տողերը՝ `am.json`, `en.json`, `ru.json`։

### Պայմանագիր

- Զամբյուղը JWT է ուզում։ Մեկ բաց զամբյուղ՝ մեկ օգտատիրոջ։ `GET /api/cart/`-ը վերադարձնում է `count` (qty-ի գումարը), `total` և `items`՝ `sku`, `name`, `store`, `qty`, `price`, `line_total`։ Գինը AMD տող է, երկու նիշ, վերցված հրապարակված ապրանքից։
- `POST /api/cart/items/`՝ `{sku, qty}`։ Անհայտ կամ չհրապարակված sku-ն 404 է։ Նույն sku-ն qty-ն է ավելացնում։ `PATCH .../items/<sku>/` `qty: 0`-ով ջնջում է տողը։ `DELETE`-ը 204 է։ Առանց թոքենի՝ 401։
- `GET /api/orders/<bill_no>/`-ը միայն տիրոջն է։ Մնացածը, ներառյալ հյուրը, 404 է ստանում։ Մարմինը՝ `bill_no`, `status` (`pending` կամ `paid`), `amount`, սառեցված `items`։ Անունը՝ `ru`, եթե չկա՝ `en`։
- `POST /api/checkout/`-ը (JWT) դատարկ զամբյուղի դեպքում 400 է։ Այլապես ստեղծում է `pending`, պատճենում է տողերը, մաքրում է զամբյուղը և `paid` չի դնում։ Պատասխանը՝ `bill_no` ինչպես `VNT-15`, `payment_url` և `fields`։ `EDP_LANGUAGE`-ը գալիս է միայն `idram_language`-ից։
- `POST /api/payments/idram/result/`-ը հրապարակային է, առանց CSRF, պատասխանը մերկ `OK`։ Precheck-ը կարգավիճակը չի փոխում։ Հաստատումը [docs/idram.md](docs/idram.md)-ի MD5 տողն է։ Համընկնելիս՝ `paid`, պահել `EDP_TRANS_ID`, մեկ անգամ `send_order_paid_email`։ Նույն callback-ը `OK` է և երկրորդ նամակ չի ուղարկում։ Վատ checksum-ը թողնում է `pending`։
- `send_order_paid_email(order)`-ը կարգավիճակը չի փոխում։ Դատարկ `ORDER_NOTIFY_EMAIL`-ը վերադարձնում է `False` և գրում է լոգ։
- `/account`-ը մտնում է արդեն եղած token endpoint-ով։ `/cart`-ը Idram-ի ձևը ուղարկում է դիտարկիչով։ `?success=1`-ը վճարված չէ։ `/checkout/success`-ը և `/checkout/fail`-ը կարդում են `?bill=` և «վճարված» են գրում միայն `status=paid` դեպքում։

### Գոտիներ

- **Suro.** Դատարկ `cart` և `orders`, երեք include, հինգ կարգավորում env-ից։ Առանց մոդելի և առանց վճարման վյուի։
- **Artush.** `idram_language`՝ `am`/`en`/`ru` → `AM`/`EN`/`RU`, `parse_language`-ից հետո։ `de`-ն մնում է սխալ։
- **Vach.** Զամբյուղի մոդելները և չորս ուղին։ Կատալոգի դաշտերը և React-ը չդիպչել։
- **Karen / Svet.** «Զամբյուղ» միայն իրենց էջում։ 401-ը ասում է, որ մուտք է պետք։
- **Daniel.** Պատվերի մոդելներ, տիրոջ GET, `mail.py`։ Առանց Idram-ի վյուի և առանց Footer-ի։
- **Hayk.** Checkout, Idram-ի պատասխան, `/account`՝ `setAuthToken`-ով։ `mail.py`-ն չվերաշարադրել։
- **Mariam.** Միացրու Account և Cart հղումները, սարքի `/cart`, Idram-ի ձևը ուղարկիր դիտարկիչով։
- **Ashot.** Հաջողության և ձախողման էջեր, API թեստեր, կանաչ `manage.py test`։
- **Lead.** Միայն հերթը։ Ալիքը չփակել, քանի դեռ վերևի ռուսերեն բաժինների դռները ճիշտ չեն։
