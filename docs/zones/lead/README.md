# Lead

**Ветка:** `feat/lead`  
**Задание:** [task-advanced.md](../../../task-advanced.md), раздел Lead.  
**Список класса:** [TASK.md](../../../TASK.md).

Каркас уже проверен: `migrate` без ошибок, `manage.py check` без замечаний, `/api/health/` отвечает `{"status":"ok"}`, `/api/admin/login/` открывается. Чужие модели не писать. PR в `dev` принимать только по порядку.

**Срок всего задания:** до конца декабря.

## Доска merge

| # | Имя | Ветка | Зона | PR | Статус |
|---|-----|--------|------|----|--------|
| 1 | Lead | `feat/lead` | lead | — | каркас проверен, ждёт PR |
| 2 | Suro | `feat/suro-api` | api |  | ждёт PR |
| 3 | Artush | `feat/artush-i18n` | i18n |  | ждёт PR |
| 4 |  | `feat/<имя>-catalog` | catalog |  | ждёт имя и PR |
| 5 | Daniel | `feat/daniel-footer` | footer |  | ждёт PR |
| 6 | Hayk | `feat/hayk-gateway` | gateway |  | ждёт PR |
| 7 | Karen | `feat/karen-textile` | textile |  | ждёт PR |
| 8 | Svet | `feat/svet-baby` | baby |  | ждёт PR |
| 9 | Mariam | `feat/mariam-header` | header |  | ждёт PR |
| 10 |  | `feat/<имя>-ui` | ui |  | ждёт имя и PR |

Порядок: **Lead → Suro → Artush → catalog → Daniel → Hayk → Karen → Svet → Mariam → ui**.

## После последнего PR

```bash
cd backend
del ventum.sqlite3
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Открыть `http://127.0.0.1:8000/api/health/` и `http://127.0.0.1:8000/api/admin/`.

## English

Branch `feat/lead`. The skeleton already passes migrate, check, health, and the admin login. Merge pull requests in the order above. Do not write other people's models. Finish by the end of December. Catalog and ui names are still blank.

## Հայերեն

Ճյուղը՝ `feat/lead`։ Կարկասն արդեն անցել է migrate, check, health և ադմինի մուտքը։ PR-ները merge արա աղյուսակի կարգով։ Ուրիշների մոդելները չգրել։ Ավարտել մինչև դեկտեմբերի վերջ։ catalog-ի և ui-ի անունները դեռ դատարկ են։
