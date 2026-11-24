# Agent brief — Wave 3 — #1 Lead

**Волна 6.** Доска и ворота. Экраны не рисовать. Очередь [task-wave6.md](../../task-wave6.md): **Lead → Ashot → Vach → Mariam → Suro → Karen → Svet → Daniel → Hayk → Artush**. Ворота — «Lead не мержит, пока» / «Lead не открывает волну 6, пока» / «Lead не закрывает волну 6, пока», раздел «1 — Lead». Волна 5 закрыта. Текст ниже не стирать.

**Wave 6.** Board and gates. Do not draw screens. Queue in [task-wave6.md](../../task-wave6.md): **Lead → Ashot → Vach → Mariam → Suro → Karen → Svet → Daniel → Hayk → Artush**. Gates are the “Lead does not merge until” / “Lead does not open Wave 6 until” / “Lead does not close Wave 6 until” lines in section “1 — Lead”. Wave 5 is closed. The text below stays.

**Wave 6.** Տախտակ և դռներ։ Էկրաններ մի նկարիր։ Հերթը [task-wave6.md](../../task-wave6.md)-ում՝ **Lead → Ashot → Vach → Mariam → Suro → Karen → Svet → Daniel → Hayk → Artush**։ Դռները՝ «1 — Lead» բաժնի «Lead-ը չի merge անում, քանի դեռ» / «Lead-ը Wave 6-ը չի բացում, քանի դեռ» / «Lead-ը Wave 6-ը չի փակում, քանի դեռ» տողերը։ Wave 5-ը փակ է։ Ներքևի տեքստը մնում է։

**Волна 5 (закрыта).** Полные кадры мержить по очереди [task-wave5.md](../../task-wave5.md): **Lead → Ashot → Vach → Mariam → Suro → Karen → Svet → Daniel → Hayk → Artush**. Ворота — строка «Lead не мержит, пока» в том же файле, раздел «1 — Lead». Доска и ворота. Экраны не рисовать. Волна 4 закрыта. Очередь ниже — контракт покупки волны 3. Текст ниже не стирать.

**Wave 5 (closed).** Merge the full frames in the [task-wave5.md](../../task-wave5.md) order: **Lead → Ashot → Vach → Mariam → Suro → Karen → Svet → Daniel → Hayk → Artush**. A gate is the “Lead does not merge until” line in section “1 — Lead”. Board and gates. Do not draw screens. Wave 4 is closed. The queue below is the Wave 3 purchase contract. The text below stays.

**Wave 5 (փակ).** Լրիվ կադրերը միավորել [task-wave5.md](../../task-wave5.md)-ի հերթով՝ **Lead → Ashot → Vach → Mariam → Suro → Karen → Svet → Daniel → Hayk → Artush**։ Դուռը այդ ֆայլի «1 — Lead» բաժնի «Lead-ը չի merge անում, քանի դեռ» տողն է։ Տախտակ և դռներ։ Էկրաններ չնկարել։ Wave 4-ը փակ է։ Ներքևի հերթը Wave 3-ի գնման պայմանագիրն է։ Ներքևի տեքստը մնում է։

**Волна 4.** Экраны мержить по очереди [task-wave4.md](../../task-wave4.md): **Lead → Suro → Vach → Karen → Svet → Daniel → Hayk → Mariam → Artush → Ashot**. Ворота экрана — строка «Lead не мержит, пока» в том же файле. Доска и ворота. Экраны не рисовать. Очередь в разделе «Очередь» ниже — контракт покупки волны 3: экран ею не задерживать. Текст ниже не стирать.

**Wave 4.** Merge screens in the [task-wave4.md](../../task-wave4.md) order: **Lead → Suro → Vach → Karen → Svet → Daniel → Hayk → Mariam → Artush → Ashot**. A screen gate is the “Lead does not merge until” line in that file. Board and gates. Do not draw screens. The name queue in the section below is the Wave 3 purchase contract. Do not hold a screen for it. The text below stays.

**Wave 4.** Էկրանները միավորել [task-wave4.md](../../task-wave4.md)-ի հերթով՝ **Lead → Suro → Vach → Karen → Svet → Daniel → Hayk → Mariam → Artush → Ashot**։ Էկրանի դուռը այդ ֆայլի «Lead-ը չի merge անում, քանի դեռ» տողն է։ Տախտակ և դռներ։ Էկրաններ չնկարել։ Ներքևի հերթը Wave 3-ի գնման պայմանագիրն է. էկրանը դրանով չպահել։ Ներքևի տեքստը մնում է։

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
