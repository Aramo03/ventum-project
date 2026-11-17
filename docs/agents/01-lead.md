# Agent brief — Wave 3 — #1 Lead

Отдай этот файл агенту целиком. Номер ученика — **1**. Он совпадает с [TASK.md](../../TASK.md) и с заголовком «1 — Lead» в [task-wave3.md](../../task-wave3.md).

Wave 1 и Wave 2 закрыты. Их модели, API и страницы не переписывать. Очередь этой волны — список имён, не второй номер.

## Русский

### Кто ты

Ты ведёшь ученика 1, Lead, ветка `feat/lead`. Wave 3 — корзина, заказ, Idram и одно письмо магазину, на SQLite. Срок — конец января 2027.

Один PR = одна зона. Base PR = `dev`. В `main` не пушить. `--force` на `dev` и `main` не делать. Postgres не поднимать. README доски не удалять: [docs/zones/lead/README.md](../zones/lead/README.md).

### Карта репозитория

- Контракт — [task-wave3.md](../../task-wave3.md). Оплата — [docs/idram.md](../idram.md). Письмо — [docs/order-email.md](../order-email.md).
- Health: `http://127.0.0.1:8000/api/health/` отвечает `{"status":"ok"}`.
- Сайт: `http://127.0.0.1:3000/`.

### Очередь

**Lead → Suro → Artush → Vach → Karen → Svet → Daniel → Hayk → Mariam → Ashot**.

Suro ставит пустые приложения. Artush — `idram_language`. Vach — API корзины. Karen и Svet — кнопки. Daniel — модели заказа и письмо. Hayk — checkout и callback. Mariam — страница корзины. Ashot последний.

### Зона ответственности

Порядок PR и сборка `dev`. Колонка статуса на доске волны 3. Конфликт чинить вместе с владельцем файла. Чужие вью, модели и вёрстку не переписывать. Номер PR не писать до merge.

### Шаги

1. Принимать PR в `dev` только в очереди имён выше.
2. Сверять PR с разделом ученика в [task-wave3.md](../../task-wave3.md) и с его файлом в `docs/agents/`.
3. После merge Ashot прогнать тесты и открыть health, Swagger, `/`, `/textile`, `/baby`, `/cart`, `/account`, `/checkout/success`.

### Definition of Done

Wave 3 не закрыта, пока тесты зелёные целиком, повторный callback не шлёт второе письмо, страницы возврата не называют заказ оплаченным без `status=paid`, а Postgres в diff нет.

### Нельзя

Писать корзину, заказ, Idram, письмо и страницы за других учеников.

## English

You are student **1**, Lead, branch `feat/lead`. Wave 3 is the cart, the order, Idram, and one shop email, on SQLite. Finish by the end of January 2027. Wave 1 and Wave 2 stay. Do not rebuild them.

One pull request is one zone. Base is `dev`. Do not push `main`. Do not force-push. Do not start Postgres. Do not delete [docs/zones/lead/README.md](../zones/lead/README.md).

Merge queue, by name: **Lead → Suro → Artush → Vach → Karen → Svet → Daniel → Hayk → Mariam → Ashot**.

You own the queue and the status column. After Ashot, run `python manage.py test` and open health, Swagger, the three store routes, `/cart`, `/account`, and `/checkout/success`.

**Done when** the suite is green, a duplicate callback does not send a second email, return pages say paid only when `status` is `paid`, and Postgres is absent.

Do not write cart, order, Idram, email, or pages for other students.

## Հայերեն

Դու աշակերտ **1**-ն ես, Lead, ճյուղը՝ `feat/lead`։ Wave 3-ը զամբյուղն է, պատվերը, Idram-ը և մեկ նամակը, SQLite։ Ավարտել մինչև 2027-ի հունվարի վերջ։ Wave 1-ը և Wave 2-ը թող։

Մեկ PR = մեկ գոտի։ Base-ը `dev` է։ `main` չpush անել։ Postgres չբարձրացնել։ [docs/zones/lead/README.md](../zones/lead/README.md)-ն չջնջել։

Հերթը՝ **Lead → Suro → Artush → Vach → Karen → Svet → Daniel → Hayk → Mariam → Ashot**։

Քոնն է հերթը և կարգավիճակի սյունը։ Ashot-ից հետո՝ `python manage.py test`, health, Swagger, երեք խանութի էջ, `/cart`, `/account`, `/checkout/success`։

**Ավարտված է, երբ** թեստերը կանաչ են, կրկնակի callback-ը երկրորդ նամակ չի ուղարկում, վերադարձի էջերը «վճարված» են գրում միայն `status=paid` դեպքում, և Postgres չկա։

Ուրիշների զամբյուղը, պատվերը, Idram-ը, նամակը և էջերը չգրել։
