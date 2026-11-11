# 1 — Lead

**Номер ученика:** 1. Тот же номер в [TASK.md](../../../TASK.md) и в разделе «1 — Lead» файла [task-advanced.md](../../../task-advanced.md).  
**Ветка:** `feat/lead`  
**Задание:** [task-advanced.md](../../../task-advanced.md), раздел «1 — Lead».  
**Агент:** [docs/agents/01-lead.md](../../../docs/agents/01-lead.md). Отдай агенту файл целиком.

Каркас уже проверен: `migrate` без ошибок, `manage.py check` без замечаний, `/api/health/` отвечает `{"status":"ok"}`, `/api/admin/login/` открывается. Чужие модели не писать. PR в `dev` принимать только по очереди ниже.

**Срок всего задания Wave 1:** до конца декабря.

## Доска merge

Колонка `#` — номер ученика, не шаг очереди. Колонка «После кого» — кто уже должен лежать в `dev`, прежде чем мержить эту строку.

| # | Имя | Ветка | Зона | После кого | PR | Статус |
|---|-----|--------|------|------------|----|--------|
| 1 | Lead | `feat/lead` | lead | — | — | каркас проверен, ведёт очередь |
| 2 | Suro | `feat/suro-api` | api | Lead | #1 | в `dev` |
| 3 | Artush | `feat/artush-i18n` | i18n | Suro | #2 | в `dev` |
| 4 | Hayk | `feat/hayk-gateway` | gateway | Daniel | #3 | в `dev` |
| 5 | Mariam | `feat/mariam-header` | header | Svet | #11 | в `dev` |
| 6 | Daniel | `feat/daniel-footer` | footer | Vach | #4 | в `dev` |
| 7 | Karen | `feat/karen-textile` | textile | Hayk | #10 | в `dev` |
| 8 | Svet | `feat/svet-baby` | baby | Karen | #5, #9 | в `dev` |
| 9 | Vach | `feat/vach-catalog` | catalog | Artush | #7 | в `dev` |
| 10 | Ashot | `feat/ashot-ui` | ui | Mariam | #8 | в `dev` |

Очередь именами: **Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**.

## После PR ученика 10 (Ashot)

```bash
cd backend
del ventum.sqlite3
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Открыть `http://127.0.0.1:8000/api/health/` и `http://127.0.0.1:8000/api/admin/`.

**Не закрывать Wave 1, пока:** в админке есть пользователь с логином-email, категории и товары Textile и Baby с переводами `am`/`en`/`ru`, подписчик рассылки и слот главной; health и Swagger живы.

## English

Student **1**, branch `feat/lead`. The `#` column is the student number and matches [TASK.md](../../../TASK.md) and the headings in [task-advanced.md](../../../task-advanced.md). “After” is the person who must already be in `dev`. Give your agent [01-lead.md](../../../docs/agents/01-lead.md) in full.

| # | Name | Branch | Zone | After | PR | Status |
|---|------|--------|------|-------|----|--------|
| 1 | Lead | `feat/lead` | lead | — | — | skeleton checked, runs the queue |
| 2 | Suro | `feat/suro-api` | api | Lead | #1 | in `dev` |
| 3 | Artush | `feat/artush-i18n` | i18n | Suro | #2 | in `dev` |
| 4 | Hayk | `feat/hayk-gateway` | gateway | Daniel | #3 | in `dev` |
| 5 | Mariam | `feat/mariam-header` | header | Svet | #11 | in `dev` |
| 6 | Daniel | `feat/daniel-footer` | footer | Vach | #4 | in `dev` |
| 7 | Karen | `feat/karen-textile` | textile | Hayk | #10 | in `dev` |
| 8 | Svet | `feat/svet-baby` | baby | Karen | #5, #9 | in `dev` |
| 9 | Vach | `feat/vach-catalog` | catalog | Artush | #7 | in `dev` |
| 10 | Ashot | `feat/ashot-ui` | ui | Mariam | #8 | in `dev` |

Queue: **Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**.

The skeleton already passes migrate, check, health, and the admin login. Merge in that named queue. Do not write other people's models. Wave 1 finishes by the end of December. After student 10, migrate a fresh sqlite and open health and admin.

## Հայերեն

Աշակերտ **1**, ճյուղը՝ `feat/lead`։ `#` սյունը աշակերտի համարն է և համընկնում է [TASK.md](../../../TASK.md)-ի ու [task-advanced.md](../../../task-advanced.md)-ի վերնագրերի հետ։ «Ումից հետո» նշանակում է՝ ով արդեն պետք է լինի `dev`-ում։ Գործակալին տուր ամբողջ [01-lead.md](../../../docs/agents/01-lead.md) ֆայլը։

| # | Անուն | Ճյուղ | Գոտի | Ումից հետո | PR | Կարգավիճակ |
|---|------|--------|------|------------|----|------------|
| 1 | Lead | `feat/lead` | lead | — | — | կարկասը ստուգված է, վարում է հերթը |
| 2 | Suro | `feat/suro-api` | api | Lead | #1 | `dev`-ում |
| 3 | Artush | `feat/artush-i18n` | i18n | Suro | #2 | `dev`-ում |
| 4 | Hayk | `feat/hayk-gateway` | gateway | Daniel | #3 | `dev`-ում |
| 5 | Mariam | `feat/mariam-header` | header | Svet | #11 | `dev`-ում |
| 6 | Daniel | `feat/daniel-footer` | footer | Vach | #4 | `dev`-ում |
| 7 | Karen | `feat/karen-textile` | textile | Hayk | #10 | `dev`-ում |
| 8 | Svet | `feat/svet-baby` | baby | Karen | #5, #9 | `dev`-ում |
| 9 | Vach | `feat/vach-catalog` | catalog | Artush | #7 | `dev`-ում |
| 10 | Ashot | `feat/ashot-ui` | ui | Mariam | #8 | `dev`-ում |

Հերթը՝ **Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**։

Կարկասն արդեն անցել է migrate, check, health և ադմինի մուտքը։ PR-ները merge արա այս հերթով։ Ուրիշների մոդելները չգրել։ Wave 1-ն ավարտել մինչև դեկտեմբերի վերջ։ 10-րդ աշակերտից հետո՝ մաքուր sqlite, health և ադմին։
