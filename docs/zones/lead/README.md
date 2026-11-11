# 1 — Lead

**Номер ученика:** 1. Тот же номер в [TASK.md](../../../TASK.md) и в разделе «1 — Lead» файла [task-wave2.md](../../../task-wave2.md).  
**Ветка:** `feat/lead`  
**Задание:** [task-wave2.md](../../../task-wave2.md), раздел «1 — Lead».  
**Агент:** [docs/agents/01-lead.md](../../agents/01-lead.md). Отдай агенту файл целиком.

Wave 1 закрыта: все десять PR уже в `dev`. Чужие фичи волны 2 не писать. PR принимать только по очереди ниже. **Срок волны 2:** до конца января.

## Доска merge — Wave 2

Колонка `#` — номер ученика, не шаг очереди. Колонка «После кого» — кто уже должен лежать в `dev`, прежде чем мержить эту строку.

| # | Имя | Ветка | Зона | После кого | PR | Статус |
|---|-----|--------|------|------------|----|--------|
| 1 | Lead | `feat/lead` | lead | — | — | ведёт очередь волны 2 |
| 2 | Suro | `feat/suro-api` | api | Lead | — | не начато |
| 3 | Artush | `feat/artush-i18n` | i18n | Suro | — | не начато |
| 4 | Hayk | `feat/hayk-gateway` | gateway | Vach | — | не начато |
| 5 | Mariam | `feat/mariam-header` | header | Daniel | — | не начато |
| 6 | Daniel | `feat/daniel-footer` | footer | Hayk | — | не начато |
| 7 | Karen | `feat/karen-textile` | textile | Mariam | — | не начато |
| 8 | Svet | `feat/svet-baby` | baby | Karen | — | не начато |
| 9 | Vach | `feat/vach-catalog` | catalog | Artush | — | не начато |
| 10 | Ashot | `feat/ashot-ui` | ui | Svet | — | не начато |

Очередь именами: **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**.

## После PR ученика 10 (Ashot)

```bash
cd backend
python manage.py test
python manage.py runserver
```

Открыть `http://127.0.0.1:8000/api/health/`, Swagger, `http://127.0.0.1:8000/api/admin/analytics/` под staff, затем сайт: `/`, `/textile`, `/baby` и несуществующий путь.

**Не закрывать Wave 2, пока:** health отвечает `{"status":"ok"}`; Swagger показывает пути контракта; аналитика видна только staff и числа живые; три витрины читают API; повторная подписка не создаёт вторую строку; `python manage.py test` зелёный; корзины, заказов и Postgres нет.

## English

Student **1**, branch `feat/lead`. The `#` column is the student number and matches [TASK.md](../../../TASK.md) and the headings in [task-wave2.md](../../../task-wave2.md). “After” is the person who must already be in `dev`. Give your agent [01-lead.md](../../agents/01-lead.md) in full.

Wave 1 is closed. Do not write Wave 2 features yourself. **Finish Wave 2 by the end of January.**

| # | Name | Branch | Zone | After | PR | Status |
|---|------|--------|------|-------|----|--------|
| 1 | Lead | `feat/lead` | lead | — | — | runs the Wave 2 queue |
| 2 | Suro | `feat/suro-api` | api | Lead | — | not started |
| 3 | Artush | `feat/artush-i18n` | i18n | Suro | — | not started |
| 4 | Hayk | `feat/hayk-gateway` | gateway | Vach | — | not started |
| 5 | Mariam | `feat/mariam-header` | header | Daniel | — | not started |
| 6 | Daniel | `feat/daniel-footer` | footer | Hayk | — | not started |
| 7 | Karen | `feat/karen-textile` | textile | Mariam | — | not started |
| 8 | Svet | `feat/svet-baby` | baby | Karen | — | not started |
| 9 | Vach | `feat/vach-catalog` | catalog | Artush | — | not started |
| 10 | Ashot | `feat/ashot-ui` | ui | Svet | — | not started |

Queue: **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**.

After student 10, run `python manage.py test` and open health, Swagger, staff analytics, the three store routes, and an unknown path.

## Հայերեն

Աշակերտ **1**, ճյուղը՝ `feat/lead`։ `#` սյունը աշակերտի համարն է և համընկնում է [TASK.md](../../../TASK.md)-ի ու [task-wave2.md](../../../task-wave2.md)-ի վերնագրերի հետ։ «Ումից հետո» նշանակում է՝ ով արդեն պետք է լինի `dev`-ում։ Գործակալին տուր ամբողջ [01-lead.md](../../agents/01-lead.md) ֆայլը։

Wave 1-ը փակ է։ Wave 2-ի ֆիչերն ինքդ չգրել։ **Wave 2-ն ավարտել մինչև հունվարի վերջ։**

| # | Անուն | Ճյուղ | Գոտի | Ումից հետո | PR | Կարգավիճակ |
|---|------|--------|------|------------|----|------------|
| 1 | Lead | `feat/lead` | lead | — | — | վարում է Wave 2-ի հերթը |
| 2 | Suro | `feat/suro-api` | api | Lead | — | չի սկսվել |
| 3 | Artush | `feat/artush-i18n` | i18n | Suro | — | չի սկսվել |
| 4 | Hayk | `feat/hayk-gateway` | gateway | Vach | — | չի սկսվել |
| 5 | Mariam | `feat/mariam-header` | header | Daniel | — | չի սկսվել |
| 6 | Daniel | `feat/daniel-footer` | footer | Hayk | — | չի սկսվել |
| 7 | Karen | `feat/karen-textile` | textile | Mariam | — | չի սկսվել |
| 8 | Svet | `feat/svet-baby` | baby | Karen | — | չի սկսվել |
| 9 | Vach | `feat/vach-catalog` | catalog | Artush | — | չի սկսվել |
| 10 | Ashot | `feat/ashot-ui` | ui | Svet | — | չի սկսվել |

Հերթը՝ **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**։

10-րդ աշակերտից հետո՝ `python manage.py test`, health, Swagger, staff անալիտիկա, երեք էջ և անհայտ ուղի։

---

# Архив — доска Wave 1 (закрыта)

Все строки этой таблицы уже в `dev`. Заново не мержить и не писать. Подробности: [task-advanced.md](../../../task-advanced.md).

| # | Имя | Ветка | Зона | После кого | PR | Статус |
|---|-----|--------|------|------------|----|--------|
| 1 | Lead | `feat/lead` | lead | — | — | каркас проверен, вёл очередь |
| 2 | Suro | `feat/suro-api` | api | Lead | #1 | в `dev` |
| 3 | Artush | `feat/artush-i18n` | i18n | Suro | #2 | в `dev` |
| 4 | Hayk | `feat/hayk-gateway` | gateway | Daniel | #3 | в `dev` |
| 5 | Mariam | `feat/mariam-header` | header | Svet | #11 | в `dev` |
| 6 | Daniel | `feat/daniel-footer` | footer | Vach | #4 | в `dev` |
| 7 | Karen | `feat/karen-textile` | textile | Hayk | #10 | в `dev` |
| 8 | Svet | `feat/svet-baby` | baby | Karen | #5, #9 | в `dev` |
| 9 | Vach | `feat/vach-catalog` | catalog | Artush | #7 | в `dev` |
| 10 | Ashot | `feat/ashot-ui` | ui | Mariam | #8 | в `dev` |

Очередь волны 1: **Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**.

## English

Wave 1 board, closed. Every row is already in `dev`. Do not merge it again.

| # | Name | Branch | Zone | After | PR | Status |
|---|------|--------|------|-------|----|--------|
| 1 | Lead | `feat/lead` | lead | — | — | skeleton checked, ran the queue |
| 2 | Suro | `feat/suro-api` | api | Lead | #1 | in `dev` |
| 3 | Artush | `feat/artush-i18n` | i18n | Suro | #2 | in `dev` |
| 4 | Hayk | `feat/hayk-gateway` | gateway | Daniel | #3 | in `dev` |
| 5 | Mariam | `feat/mariam-header` | header | Svet | #11 | in `dev` |
| 6 | Daniel | `feat/daniel-footer` | footer | Vach | #4 | in `dev` |
| 7 | Karen | `feat/karen-textile` | textile | Hayk | #10 | in `dev` |
| 8 | Svet | `feat/svet-baby` | baby | Karen | #5, #9 | in `dev` |
| 9 | Vach | `feat/vach-catalog` | catalog | Artush | #7 | in `dev` |
| 10 | Ashot | `feat/ashot-ui` | ui | Mariam | #8 | in `dev` |

Wave 1 queue: **Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**.

## Հայերեն

Wave 1-ի տախտակ, փակ է։ Բոլոր տողերն արդեն `dev`-ում են։ Նորից չmerge անել։

| # | Անուն | Ճյուղ | Գոտի | Ումից հետո | PR | Կարգավիճակ |
|---|------|--------|------|------------|----|------------|
| 1 | Lead | `feat/lead` | lead | — | — | կարկասը ստուգված է, վարել է հերթը |
| 2 | Suro | `feat/suro-api` | api | Lead | #1 | `dev`-ում |
| 3 | Artush | `feat/artush-i18n` | i18n | Suro | #2 | `dev`-ում |
| 4 | Hayk | `feat/hayk-gateway` | gateway | Daniel | #3 | `dev`-ում |
| 5 | Mariam | `feat/mariam-header` | header | Svet | #11 | `dev`-ում |
| 6 | Daniel | `feat/daniel-footer` | footer | Vach | #4 | `dev`-ում |
| 7 | Karen | `feat/karen-textile` | textile | Hayk | #10 | `dev`-ում |
| 8 | Svet | `feat/svet-baby` | baby | Karen | #5, #9 | `dev`-ում |
| 9 | Vach | `feat/vach-catalog` | catalog | Artush | #7 | `dev`-ում |
| 10 | Ashot | `feat/ashot-ui` | ui | Mariam | #8 | `dev`-ում |

Wave 1-ի հերթը՝ **Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**։
