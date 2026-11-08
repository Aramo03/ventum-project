# Agent brief — Wave 1 — #4 Hayk

Отдай этот файл агенту целиком. Номер ученика — **4**. Он совпадает с [TASK.md](../../TASK.md) и с заголовком «4 — Hayk · gateway» в [task-advanced.md](../../task-advanced.md). Это не шаг очереди. В очереди имён Hayk стоит после Daniel.

## Русский

### Кто ты

Ты делаешь зону ученика 4, Hayk, ветка `feat/hayk-gateway`, зона `gateway`. README не удалять: [backend/apps/content/README.md](../../backend/apps/content/README.md). Страница [frontend/src/pages/Gateway/](../../frontend/src/pages/Gateway/) в этом задании не верстается.

Старт от `dev`, ветка `feat/hayk-gateway`, один PR в `dev`. В `main` не пушить. Postgres не поднимать. Срок — конец декабря.

Ждать, пока в `dev` есть пакет `content` от Suro (2) и абстрактный перевод Artush (3). В очередь merge ты встаёшь после Daniel: **Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**.

### Карта репозитория

- Модель слота: `backend/apps/content/`. Пакет пустым создаёт Suro.
- Класс перевода и коды `am`, `en`, `ru` импортируй у Artush из `apps/core`, не копируй список языков.
- Страница `/` — `frontend/src/pages/Gateway/`. Её `jsx` / `css` / `js` не менять. Макет только смотреть: [кадр магазина](https://www.figma.com/design/0eqS5GfJPjqqiUD2uLVCPK/Untitled?node-id=6-12495).
- Админка: `/api/admin/`. База: `backend/ventum.sqlite3`.

### Зона ответственности

Можно: приложение `backend/apps/content/` — модель, админка, миграции `content`.

Нельзя: `frontend/src/pages/Gateway/`, модели товара Vach (9), пользователь, заявки, `search.py`.

### Шаги

1. `HomeBlock`: ключ слота (`hero` или `stores` — блоки входа в макете), порядок, переводы `title` и `text` на `am` / `en` / `ru` через класс Artush.
2. Админка Unfold с инлайном переводов.
3. Пара «слот + язык» уникальна, как требует базовый класс.

### Definition of Done

Lead не мержит, пока слот `hero` сохраняется в админке на трёх языках, модели товара не изменены, папка `frontend/src/pages/Gateway/` без новой вёрстки.

### Проверка

```bash
cd backend
python manage.py makemigrations content
python manage.py migrate
python manage.py runserver
```

В `/api/admin/` сохранить `HomeBlock` с ключом `hero`, переводы title и text на `am`, `en`, `ru`. `git diff` не должен содержать `frontend/src/pages/Gateway/` и `apps/catalog/models.py`.

### Нельзя

Не верстать главную. Не менять каталог. Не регистрировать приложение заново, если Suro уже добавил его в `INSTALLED_APPS`.

## English

You are student **4**, Hayk, branch `feat/hayk-gateway`, zone `gateway`. Do not delete [backend/apps/content/README.md](../../backend/apps/content/README.md). Do not restyle [frontend/src/pages/Gateway/](../../frontend/src/pages/Gateway/).

Branch from `dev`. One PR into `dev`. Do not push `main`. No Postgres. Finish by the end of December.

Wait until Suro’s empty `content` package and Artush’s translation class are in `dev`. Your merge slot is after Daniel: **Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**. Your student number stays 4.

**Own:** `backend/apps/content/` model, admin, and `content` migrations.

**Do not own:** the Gateway page, Vach’s product models, the user, leads, `search.py`.

**Steps**

1. `HomeBlock` with a slot key (`hero` or `stores`), an order, and `title` / `text` in `am` / `en` / `ru` through Artush’s class.
2. Unfold admin with a translation inline.
3. The pair of slot and language is unique.

**Done when** slot `hero` saves in admin in three languages, product models are unchanged, and `frontend/src/pages/Gateway/` has no new layout.

```bash
cd backend
python manage.py makemigrations content
python manage.py migrate
python manage.py runserver
```

Save a `hero` block in `/api/admin/`. `git diff` must not include the Gateway page or `apps/catalog/models.py`.

## Հայերեն

Դու աշակերտ **4**-ն ես, Hayk, ճյուղը՝ `feat/hayk-gateway`, գոտին՝ `gateway`։ Չջնջել [backend/apps/content/README.md](../../backend/apps/content/README.md)։ Չձևավորել [frontend/src/pages/Gateway/](../../frontend/src/pages/Gateway/)։

Ճյուղը `dev`-ից է։ Մեկ PR դեպի `dev`։ `main` չpush անել։ Postgres չբարձրացնել։ Ավարտել մինչև դեկտեմբերի վերջ։

Սպասիր, մինչև `dev`-ում լինեն Suro-ի դատարկ `content`-ը և Artush-ի թարգմանության դասը։ Merge-ի տեղդ Daniel-ից հետո է՝ **Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**։ Աշակերտի համարը մնում է 4։

**Քոնն է՝** `backend/apps/content/` մոդելը, ադմինը և `content` միգրացիաները։

**Քոնը չէ՝** Gateway էջը, Vach-ի ապրանքի մոդելները, user-ը, հայտերը, `search.py`-ն։

**Քայլեր**

1. `HomeBlock`՝ սլոթի բանալի (`hero` կամ `stores`), հերթ, `title` և `text` `am` / `en` / `ru` Artush-ի դասով։
2. Unfold ադմին՝ թարգմանության inline-ով։
3. Սլոթ + լեզու զույգը եզակի է։

**Ավարտված է, երբ** `hero` սլոթը պահվում է ադմինում երեք լեզվով, ապրանքի մոդելները չեն փոխվել, և Gateway էջում նոր դասավորություն չկա։

```bash
cd backend
python manage.py makemigrations content
python manage.py migrate
python manage.py runserver
```

`/api/admin/`-ում պահիր `hero`։ `git diff`-ում չպետք է լինեն Gateway էջը և `apps/catalog/models.py`-ն։
