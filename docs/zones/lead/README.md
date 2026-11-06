# Lead — Aram

**Ветка:** `feat/aram-lead`  
**Волна:** B1 открыта. Подробности: [task-advanced.md](../../../task-advanced.md) (раздел B1, «Aram · lead»).  
**Текущая таблица для класса:** [TASK.md](../../../TASK.md).

День задания закрыт **6 ноября 2026**. Модели чужих зон не писать. Дальше Aram только принимает PR в `dev` по порядку.

## Проверка каркаса

На SQLite, без Postgres и без новых приложений:

- `python manage.py migrate --noinput` — применять нечего, ошибок нет
- `python manage.py check` — замечаний нет
- `GET /api/health/` — `200` и `{"status":"ok"}`
- `GET /api/admin/login/` — `200`

Финальный DoD волны (все модели в админке на пустой базе) — после merge ui, не сейчас.

## Доска merge B1

Колонка PR пустая, пока ученик не откроет pull request в `dev`.

| # | Имя | Ветка | Зона | PR | Статус |
|---|-----|--------|------|----|--------|
| 1 | Aram | `feat/aram-lead` | lead | — | день задания сделан, ждёт PR |
| 2 | Suro | `feat/suro-api` | api |  | ждёт PR |
| 3 | Artush | `feat/artush-i18n` | i18n |  | ждёт PR |
| 4 |  | `feat/<имя>-catalog` | catalog |  | ждёт имя и PR |
| 5 |  | `feat/<имя>-footer` | footer |  | ждёт имя и PR |
| 6 | Hayk | `feat/hayk-gateway` | gateway |  | ждёт PR |
| 7 |  | `feat/<имя>-textile` | textile |  | ждёт имя и PR |
| 8 |  | `feat/<имя>-baby` | baby |  | ждёт имя и PR |
| 9 | Mariam | `feat/mariam-header` | header |  | ждёт PR |
| 10 |  | `feat/<имя>-ui` | ui |  | ждёт имя и PR |

Порядок: **Aram не мержит чужой код раньше Suro.** Дальше Artush, catalog, footer, Hayk, textile, baby, Mariam, ui. Конфликт чинить вместе с владельцем файла.

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

Aram owns `lead`. His task day is done: the SQLite skeleton passes migrate, check, health, and the admin login page. He merges the other pull requests in the order above and does not write their models. Five names are still empty.

## Հայերեն

Aram-ը `lead` է։ Առաջադրանքի օրը փակ է. SQLite կարկասը անցել է migrate, check, health և ադմինի մուտքը։ Նա merge է անում կարգով և ուրիշների մոդելները չի գրում։ Հինգ անուն դեռ դատարկ է։
