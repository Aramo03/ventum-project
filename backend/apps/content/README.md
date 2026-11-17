# content — Hayk

**Ветка:** `feat/hayk-gateway`  
**Задание:** [task-wave3.md](../../../task-wave3.md) — «4 — Hayk · payments».  
**Агент:** [docs/agents/04-hayk.md](../../../docs/agents/04-hayk.md).

`HomeBlock` и `GET /api/content/home-blocks/` закрыты волной 2. Поля модели не менять. Страницу `/` не переписывать.

Зона этой волны — оплата и `/account`, не эта папка. Checkout и callback Idram живут в `apps/orders/`. Страница входа — `frontend/src/pages/Account/`.

**Lead не мержит, пока:** пустой checkout даёт 400, precheck не ставит `paid`, верный checksum шлёт одно письмо.

## English

Hayk, `feat/hayk-gateway`. Home blocks are closed. Wave 3 is checkout, the Idram callback, and `/account`. Do not change `HomeBlock`.

## Հայերեն

Hayk, `feat/hayk-gateway`։ Home block-երը փակ են։ Wave 3-ը checkout-ն է, Idram-ի callback-ը և `/account`-ը։ `HomeBlock`-ը չփոխել։
