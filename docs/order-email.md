# Письмо магазину после оплаты

**RU** · **EN** · **HY**

Волна **B3**. Письмо уходит **один раз**, когда заказ первый раз становится `paid` после верного callback Idram. Precheck, `SUCCESS_URL` и неуспешная оплата письмо не шлют. Повторный callback — тоже не шлёт.

Получатель — переменная окружения, не захардкоженный адрес в коде:

```env
ORDER_NOTIFY_EMAIL=aram1023aram@gmail.com
```

Адрес меняют в `.env` на сервере, когда почта магазина сменится. В git попадает только пример в `.env.example`.

## Что в письме

Тема: номер заказа Ventum и слово paid.

Текст (можно простым письмом, язык — русский, это почта магазина, не витрина):

- номер заказа и `EDP_BILL_NO`
- email и имя покупателя
- строки: название (`ru`, если нет — `en`), количество, цена AMD, сумма строки
- итог AMD
- `EDP_TRANS_ID` и время перехода в `paid`
- статус `paid`

Пароль, `SECRET_KEY`, номер карты и CVV в письмо не попадают. Их у нас нет.

## Как отправлять

Уже есть настройки Django: `EMAIL_BACKEND`, `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USE_TLS`, `EMAIL_HOST_USER`, `EMAIL_HOST_PASSWORD`, `DEFAULT_FROM_EMAIL`.

Локально в B3 оставить console backend: письмо видно в терминале `runserver`.

```env
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
```

На VPS (волна D1) — SMTP. Для Gmail нужен пароль приложения, не обычный пароль от ящика. Пароль только в `.env` на сервере.

```env
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=
EMAIL_HOST_PASSWORD=
DEFAULT_FROM_EMAIL=Ventum <aram1023aram@gmail.com>
ORDER_NOTIFY_EMAIL=aram1023aram@gmail.com
```

`ORDER_NOTIFY_EMAIL` читает зона `api` в `settings` в волне B3. Пустой адрес — заказ всё равно `paid`, в лог пишется, что письмо пропущено, исключение покупателю не показываем.

## Тест

Тест confirmation с верным checksum: ровно один вызов отправки. Второй такой же POST: статус остаётся `paid`, отправка не вызывается снова.

## English

Send **one** email to `ORDER_NOTIFY_EMAIL` the first time an order becomes `paid` after a valid Idram confirmation. Not on precheck, not on the browser return, not on a duplicate callback.

The sample recipient in `.env.example` is `aram1023aram@gmail.com`. Change it in `.env` when the shop inbox changes. Do not hardcode it in Python.

Body: order number, `EDP_BILL_NO`, customer name and email, lines (Russian name, else English), AMD totals, `EDP_TRANS_ID`, paid time. No card data and no secrets.

Local B3: console email backend. VPS (D1): SMTP. Gmail needs an app password in the server `.env` only. If `ORDER_NOTIFY_EMAIL` is empty, keep `paid` and skip sending.

## Հայերեն

**Մեկ** նամակ `ORDER_NOTIFY_EMAIL`-ին, երբ պատվերն առաջին անգամ դառնում է `paid`՝ ճիշտ Idram հաստատումից հետո։ Precheck-ը, դիտարկիչի վերադարձը և կրկնակի callback-ը նամակ չեն ուղարկում։

Օրինակ ստացողը `.env.example`-ում `aram1023aram@gmail.com` է։ Փոխում են `.env`-ում, կոդում չեն գրում։

Նամակում՝ պատվերի համարը, `EDP_BILL_NO`, գնորդի անունը և email-ը, տողերը (անունը `ru`, եթե չկա՝ `en`), AMD գումարը, `EDP_TRANS_ID`։ Քարտի տվյալ և գաղտնիք չկա։

B3 լոկալ՝ console backend։ VPS (D1)՝ SMTP։ Gmail-ի հավելվածի գաղտնաբառը միայն սերվերի `.env`-ում է։ Եթե հասցեն դատարկ է, պատվերը մնում է `paid`, նամակը բաց է թողնվում։
