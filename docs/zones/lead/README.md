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
| 2 | Suro | `feat/suro-api` | api | Lead |  | ждёт PR |
| 3 | Artush | `feat/artush-i18n` | i18n | Suro |  | ждёт PR |
| 4 | Hayk | `feat/hayk-gateway` | gateway | Daniel |  | ждёт PR |
| 5 | Mariam | `feat/mariam-header` | header | Svet |  | ждёт PR |
| 6 | Daniel | `feat/daniel-footer` | footer | Vach |  | ждёт PR |
| 7 | Karen | `feat/karen-textile` | textile | Hayk |  | ждёт PR |
| 8 | Svet | `feat/svet-baby` | baby | Karen |  | ждёт PR |
| 9 | Vach | `feat/vach-catalog` | catalog | Artush |  | ждёт PR |
| 10 | Ashot | `feat/ashot-ui` | ui | Mariam |  | ждёт PR |

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
| 2 | Suro | `feat/suro-api` | api | Lead |  | waiting for PR |
| 3 | Artush | `feat/artush-i18n` | i18n | Suro |  | waiting for PR |
| 4 | Hayk | `feat/hayk-gateway` | gateway | Daniel |  | waiting for PR |
| 5 | Mariam | `feat/mariam-header` | header | Svet |  | waiting for PR |
| 6 | Daniel | `feat/daniel-footer` | footer | Vach |  | waiting for PR |
| 7 | Karen | `feat/karen-textile` | textile | Hayk |  | waiting for PR |
| 8 | Svet | `feat/svet-baby` | baby | Karen |  | waiting for PR |
| 9 | Vach | `feat/vach-catalog` | catalog | Artush |  | waiting for PR |
| 10 | Ashot | `feat/ashot-ui` | ui | Mariam |  | waiting for PR |

Queue: **Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**.

The skeleton already passes migrate, check, health, and the admin login. Merge in that named queue. Do not write other people's models. Wave 1 finishes by the end of December. After student 10, migrate a fresh sqlite and open health and admin.

## Հայերեն

Աշակերտ **1**, ճյուղը՝ `feat/lead`։ `#` սյունը աշակերտի համարն է և համընկնում է [TASK.md](../../../TASK.md)-ի ու [task-advanced.md](../../../task-advanced.md)-ի վերնագրերի հետ։ «Ումից հետո» նշանակում է՝ ով արդեն պետք է լինի `dev`-ում։ Գործակալին տուր ամբողջ [01-lead.md](../../../docs/agents/01-lead.md) ֆայլը։

| # | Անուն | Ճյուղ | Գոտի | Ումից հետո | PR | Կարգավիճակ |
|---|------|--------|------|------------|----|------------|
| 1 | Lead | `feat/lead` | lead | — | — | կարկասը ստուգված է, վարում է հերթը |
| 2 | Suro | `feat/suro-api` | api | Lead |  | սպասում է PR |
| 3 | Artush | `feat/artush-i18n` | i18n | Suro |  | սպասում է PR |
| 4 | Hayk | `feat/hayk-gateway` | gateway | Daniel |  | սպասում է PR |
| 5 | Mariam | `feat/mariam-header` | header | Svet |  | սպասում է PR |
| 6 | Daniel | `feat/daniel-footer` | footer | Vach |  | սպասում է PR |
| 7 | Karen | `feat/karen-textile` | textile | Hayk |  | սպասում է PR |
| 8 | Svet | `feat/svet-baby` | baby | Karen |  | սպասում է PR |
| 9 | Vach | `feat/vach-catalog` | catalog | Artush |  | սպասում է PR |
| 10 | Ashot | `feat/ashot-ui` | ui | Mariam |  | սպասում է PR |

Հերթը՝ **Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**։

Կարկասն արդեն անցել է migrate, check, health և ադմինի մուտքը։ PR-ները merge արա այս հերթով։ Ուրիշների մոդելները չգրել։ Wave 1-ն ավարտել մինչև դեկտեմբերի վերջ։ 10-րդ աշակերտից հետո՝ մաքուր sqlite, health և ադմին։
