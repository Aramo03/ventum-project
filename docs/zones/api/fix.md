# 2 — Suro · api — ошибки и разбор

**Ветка:** `feat/suro-api`  
**Агент:** [docs/agents/02-suro.md](../../agents/02-suro.md)

Журнал того, что пошло не так при работе над зоной, и что **не** считать лишним кодом. Нужен Lead и следующим ученикам (Artush и далее).

---

## Русский

### Ошибка 1: `migrate` на старой SQLite

**Симптом:**

```text
django.db.migrations.exceptions.InconsistentMigrationHistory:
Migration admin.0001_initial is applied before its dependency accounts.0001_initial
```

**Причина:** Сначала выполнили `python manage.py migrate` без `AUTH_USER_MODEL = "accounts.User"` и без миграции `accounts`. В `ventum.sqlite3` записалась история со стандартным `auth.User`. Потом добавили кастомного пользователя — граф миграций изменился, а файл БД остался старым.

**Исправление (локальная разработка, данные не важны):**

```powershell
cd backend
del ventum.sqlite3
python manage.py makemigrations accounts   # если миграции ещё не в репозитории
python manage.py migrate
```

На Linux/macOS: `rm -f ventum.sqlite3`.

**Правило из brief:** `AUTH_USER_MODEL` и приложение `accounts` в `INSTALLED_APPS` — **до** первого `makemigrations` и **до** первого `migrate` на новой машине. Если меняли модель пользователя — удалите локальный `ventum.sqlite3` и мигрируйте заново.

### Ошибка 2: `migrate` до `makemigrations accounts`

Та же `InconsistentMigrationHistory` или отсутствие таблицы пользователя, если в БД уже есть записи `admin.*`, а `accounts.0001_initial` не применялась. Решение то же: чистый `ventum.sqlite3`, затем `migrate`.

### Ошибка 3: неверный порядок команд при первой настройке

Правильная последовательность для Suro (см. [02-suro.md](../../agents/02-suro.md)):

1. Настроить `models.py`, `AUTH_USER_MODEL`, `INSTALLED_APPS`.
2. `python manage.py makemigrations accounts`
3. Удалить старый `ventum.sqlite3` (если уже запускали migrate раньше).
4. `python manage.py migrate`
5. `python manage.py createsuperuser` — должен спрашивать **email**, не username.

### Что не «лишний код» (оставить в PR)

| Файл | Зачем |
|------|--------|
| `accounts/models.py` — `AccountManager`, `use_in_migrations` | Создание пользователей по email в миграциях и в рантайме |
| `accounts/admin.py` | Пользователь с email виден в `/api/admin/` (DoD) |
| `accounts/migrations/0001_initial.py` | Единственная разрешённая миграция Suro в этой волне |

### Чего в зоне Suro не делали (и правильно)

- Модели в `catalog`, `leads`, `content`
- Изменения `GET /api/health/`
- `frontend/`
- `search.py`

### Чеклист после pull / перед merge

- [ ] `del ventum.sqlite3` (или `rm -f`), если раньше мигрировали без `accounts`
- [ ] `python manage.py check` — без замечаний
- [ ] `python manage.py migrate` — без ошибок
- [ ] `createsuperuser` — email
- [ ] `/api/health/` → `{"status":"ok"}`
- [ ] `/api/schema/swagger-ui/` открывается
- [ ] `catalog/models.py` пустой

---

## English

### Mistake 1: migrate on an old SQLite file

**Symptom:** `InconsistentMigrationHistory` — `admin.0001_initial` before `accounts.0001_initial`.

**Cause:** `migrate` ran before `AUTH_USER_MODEL` and `accounts.0001_initial` existed. The DB still reflects the default user model.

**Fix:** Delete `backend/ventum.sqlite3`, then `migrate` again. Set `AUTH_USER_MODEL` before the first `makemigrations`.

### Mistake 2: migrate before `makemigrations accounts`

Same broken history. Fix: fresh SQLite + `migrate`.

### Not “extra” code

`AccountManager` with `use_in_migrations`, `admin.py`, and `accounts` migrations are required for email login and the Definition of Done.

### Out of scope (correct)

No product/leads/home models, no health view changes, no frontend.

### Checklist

Fresh `ventum.sqlite3`, `check`, `migrate`, email-based `createsuperuser`, health OK, Swagger opens, empty `catalog/models.py`.

---

## Հայերեն

### Սխալ 1. հին SQLite-ով `migrate`

**Ախտանիշ.** `InconsistentMigrationHistory` — `admin.0001_initial`-ը `accounts.0001_initial`-ից առաջ է։

**Պատճառ.** `migrate`-ը արվել է առանց `AUTH_USER_MODEL` և `accounts` միգրացիայի։

**Լուծում.** Ջնջել `backend/ventum.sqlite3`, կրկին `migrate`. `AUTH_USER_MODEL`-ը գրել առաջին `makemigrations`-ից առաջ։

### Սխալ 2. `makemigrations accounts`-ից առաջ `migrate`

Նույն պատմության խախտում. մաքուր SQLite + `migrate`.

### «Ավելորդ» չէ

`AccountManager`, `admin.py`, `accounts`-ի միգրացիաները պետք են email մուտքի և DoD-ի համար։

### Չի պատկանում Suro-ին

Կատալոգի/հայտերի/բովանդակության մոդելներ, health view, frontend — չենք փոխել։

### Ստուգացային ցանկ

Մաքուր sqlite, `check`, `migrate`, `createsuperuser`-ը հարցնում է email, health `{"status":"ok"}`, Swagger բացվում է, դատարկ `catalog/models.py`:
