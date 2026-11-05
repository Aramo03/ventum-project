# Idram — оплата заказа Ventum

**RU** · **EN** · **HY**

Волна **B3** (сервер) и волны **F5–F6** (экраны). До B3 этот файл только читают.

Покупатель платит на странице **Idram** (Армения): кошелёк Idram и, если договор магазина это включает, **VISA / Mastercard**. Номер карты, срок и CVV вводятся только у Idram. Ventum их не принимает и не хранит.

Успех в браузере (`SUCCESS_URL`) **не** означает оплату. Заказ становится `paid` только после серверного подтверждения на `RESULT_URL` с верной контрольной суммой.

Официальная схема: [Idram Merchant Interface](https://web.idram.am/) (поля `EDP_*`, три URL и `SECRET_KEY` выдаёт Idram после договора).

## Что хранить в env

В `backend/.env` (не в git):

```env
IDRAM_REC_ACCOUNT=
IDRAM_SECRET_KEY=
IDRAM_PAYMENT_URL=https://web.idram.am/payment.aspx
IDRAM_LANGUAGE=RU
```

| Переменная | Смысл |
|------------|--------|
| `IDRAM_REC_ACCOUNT` | IdramID магазина, поле `EDP_REC_ACCOUNT` |
| `IDRAM_SECRET_KEY` | Секрет для `EDP_CHECKSUM`. В репозиторий и в логи не писать |
| `IDRAM_PAYMENT_URL` | Куда браузер POST-ит форму. Idram может выдать другой URL — его и ставим |
| `IDRAM_LANGUAGE` | `RU`, `EN` или `AM` для страницы Idram |

В кабинете Idram (не в коде) прописывают:

| URL | Куда | Роль |
|-----|------|------|
| `SUCCESS_URL` | фронт, страница возврата | браузер после попытки оплаты |
| `FAIL_URL` | фронт, страница неуспеха | браузер, если оплату не закончили |
| `RESULT_URL` | backend | precheck и подтверждение, server-to-server |

На локальной машине Idram не достучится до `localhost`. В B3 обязательны тесты с поддельным POST. Боевой `RESULT_URL` на домене — волна **D1**.

## Старт оплаты

`POST /api/checkout/` (только JWT) создаёт заказ `pending` и отдаёт фронту поля формы. Браузер отправляет **POST** на `IDRAM_PAYMENT_URL`:

| Поле | Откуда |
|------|--------|
| `EDP_LANGUAGE` | `RU` / `EN` / `AM` |
| `EDP_REC_ACCOUNT` | `IDRAM_REC_ACCOUNT` |
| `EDP_DESCRIPTION` | краткий текст заказа, UTF-8 |
| `EDP_AMOUNT` | сумма в AMD, точка как разделитель (`1500.00`) |
| `EDP_BILL_NO` | номер заказа Ventum, уникальный |
| `EDP_EMAIL` | email покупателя, необязательно |

Сумма и `EDP_BILL_NO` потом приходят обратно. Их нельзя менять на клиенте: сервер помнит сумму заказа.

## Precheck

Idram POST-ит на `RESULT_URL` **до** списания:

| Поле | Значение |
|------|----------|
| `EDP_PRECHECK` | `YES` |
| `EDP_BILL_NO` | наш номер |
| `EDP_REC_ACCOUNT` | наш IdramID |
| `EDP_AMOUNT` | сумма |

Ответ — голое тело `OK` (не HTML), если заказ есть, он `pending`, счёт наш и сумма совпала. Иначе не `OK`. Статус заказа здесь не менять.

## Подтверждение

Второй POST без `EDP_PRECHECK`:

`EDP_BILL_NO`, `EDP_REC_ACCOUNT`, `EDP_PAYER_ACCOUNT`, `EDP_AMOUNT`, `EDP_TRANS_ID`, `EDP_TRANS_DATE`, `EDP_CHECKSUM`.

Контрольная сумма — MD5 (так требует Idram) от строки через двоеточие:

```text
EDP_REC_ACCOUNT:EDP_AMOUNT:SECRET_KEY:EDP_BILL_NO:EDP_PAYER_ACCOUNT:EDP_TRANS_ID:EDP_TRANS_DATE
```

Совпало, сумма та же, заказ ещё не `paid` → статус `paid`, сохранить `EDP_TRANS_ID`, ответить `OK`, отправить **одно** письмо ([docs/order-email.md](order-email.md)). Повтор того же callback — снова `OK`, без второго письма и без второй смены статуса.

Неверная сумма, чужой `EDP_REC_ACCOUNT` или плохой checksum → заказ не `paid`.

`SUCCESS_URL` только показывает состояние из `GET` заказа. Query `success=1` без статуса `paid` на экране не писать как «оплачено».

## Тест без Idram

Юнит-тест шлёт на вьюху precheck и confirmation с тестовым секретом. Сеть не нужна. Отдельно, когда учитель даст тестовый магазин: реальная оплата с кошелька или карты на странице Idram и проверка письма.

## English

Idram (Armenia) hosts the payment page, including Visa and Mastercard when the merchant contract allows cards. Ventum never collects the card number, expiry, or CVV.

`SUCCESS_URL` is only the browser return. The order becomes `paid` only after `RESULT_URL` confirms the checksum.

Env (not committed): `IDRAM_REC_ACCOUNT`, `IDRAM_SECRET_KEY`, `IDRAM_PAYMENT_URL` (default `https://web.idram.am/payment.aspx`), `IDRAM_LANGUAGE`. Idram’s staff register `SUCCESS_URL`, `FAIL_URL`, and `RESULT_URL`.

Checkout (JWT) creates a `pending` order and a POST form: `EDP_LANGUAGE`, `EDP_REC_ACCOUNT`, `EDP_DESCRIPTION`, `EDP_AMOUNT` (AMD, dot decimals), `EDP_BILL_NO`, optional `EDP_EMAIL`.

Precheck (`EDP_PRECHECK=YES`): reply plain `OK` only if the bill matches the pending order and the amount. Do not mark paid.

Confirmation checksum is MD5 of:

```text
EDP_REC_ACCOUNT:EDP_AMOUNT:SECRET_KEY:EDP_BILL_NO:EDP_PAYER_ACCOUNT:EDP_TRANS_ID:EDP_TRANS_DATE
```

On match, set `paid`, store `EDP_TRANS_ID`, reply `OK`, send one shop email. A duplicate callback must not send a second email. Localhost cannot receive Idram’s callback; B3 tests use a fake POST. The public `RESULT_URL` is wave D1.

## Հայերեն

Idram-ը (Հայաստան) ցույց է տալիս վճարման էջը։ VISA և Mastercard լրացվում են այնտեղ, եթե պայմանագիրը թույլ է տալիս քարտ։ Ventum-ը քարտի համարը, ժամկետը և CVV-ն չի վերցնում։

`SUCCESS_URL`-ը միայն դիտարկիչի վերադարձն է։ Պատվերը `paid` է դառնում միայն `RESULT_URL`-ի հաստատումից հետո։

Env (git-ում չի գնում)՝ `IDRAM_REC_ACCOUNT`, `IDRAM_SECRET_KEY`, `IDRAM_PAYMENT_URL`, `IDRAM_LANGUAGE`։ Idram-ը գրանցում է `SUCCESS_URL`, `FAIL_URL`, `RESULT_URL`։

Checkout-ը (JWT) ստեղծում է `pending` պատվեր և POST ձև՝ `EDP_LANGUAGE`, `EDP_REC_ACCOUNT`, `EDP_DESCRIPTION`, `EDP_AMOUNT` (AMD), `EDP_BILL_NO`, կամընտիր `EDP_EMAIL`։

Precheck (`EDP_PRECHECK=YES`)՝ պատասխան `OK`, եթե հաշիվը և գումարը համընկնում են։ Այստեղ `paid` չդնել։

Checksum-ը MD5 է այս տողից.

```text
EDP_REC_ACCOUNT:EDP_AMOUNT:SECRET_KEY:EDP_BILL_NO:EDP_PAYER_ACCOUNT:EDP_TRANS_ID:EDP_TRANS_DATE
```

Համընկնելու դեպքում՝ `paid`, պահել `EDP_TRANS_ID`, պատասխան `OK`, մեկ նամակ խանութին։ Կրկնակի callback-ը երկրորդ նամակ չի ուղարկում։ Լոկալ `localhost`-ին Idram-ը չի հասնի. B3-ում թեստը կեղծ POST է։ Հանրային `RESULT_URL`-ը D1 ալիքն է։
