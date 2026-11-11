# gateway — Hayk

**Ветка:** `feat/hayk-gateway`  
**Задание:** [task-wave2.md](../../../task-wave2.md) — «4 — Hayk · gateway».  
**Агент:** [docs/agents/04-hayk.md](../../../docs/agents/04-hayk.md).

`HomeBlock` уже в `dev`. Поля модели не менять.

- `GET /api/content/home-blocks/?language=` — массив `slot`, `order`, `title`, `text`
- страница `/` по макету: hero и выбор Textile / Baby
- если API молчит, ссылки на магазины всё равно видны

Папка страницы: [frontend/src/pages/Gateway/README.md](../../../frontend/src/pages/Gateway/README.md).

**Lead не мержит, пока:** `hero` отдаётся на трёх языках, `?language=de` даёт 400, поля модели в diff нет.

## English

Hayk, `feat/hayk-gateway`. Serve home blocks and build `/`. Do not change `HomeBlock` fields.

## Հայերեն

Hayk, `feat/hayk-gateway`։ Տուր home block-երը և հավաքիր `/` էջը։ `HomeBlock`-ի դաշտերը չփոխել։
