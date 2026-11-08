# Agent brief — Wave 1 — #8 Svet

Отдай этот файл агенту целиком. Номер ученика — **8**. Он совпадает с [TASK.md](../../TASK.md) и с заголовком «8 — Svet · baby» в [task-advanced.md](../../task-advanced.md). В очереди имён Svet стоит после Karen.

## Русский

### Кто ты

Ты делаешь зону ученика 8, Svet, ветка `feat/svet-baby`, зона `baby`. README не удалять: [frontend/src/pages/Baby/README.md](../../frontend/src/pages/Baby/README.md).

Старт от `dev`, ветка `feat/svet-baby`, один PR в `dev`. В `main` не пушить. Postgres не поднимать. Срок — конец декабря.

Ждать merge Vach (ученик 9). Данные Textile пишет Karen (7): их не стирать и не переписывать. Очередь: **Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**.

### Карта репозитория

- Страница `/baby` — `frontend/src/pages/Baby/`. Её не собирать.
- Пишешь команду `seed_baby` или фикстуру в модели Vach. Поля `Category` и `Product` не менять.
- `store` твоих записей только `baby`.
- Картинка — файл из репозитория.

### Зона ответственности

Данные магазина Baby.

Нельзя: схема моделей, страница `/baby`, записи Karen со `store=textile`.

### Шаги

Команда `seed_baby` или фикстура:

- две свои категории с `store=baby` и переводами `am`, `en`, `ru`;
- один опубликованный товар с ценой `Decimal` в AMD и тремя переводами имени;
- картинка из репозитория;
- повторный запуск не создаёт второй slug;
- данные Textile остаются на месте.

Slug категорий Baby не должны совпадать со slug категорий Textile, потому что slug уникален на весь каталог.

### Definition of Done

Lead не мержит, пока фильтр админки по `store` показывает и Textile, и Baby, а повторный запуск не плодит slug.

### Проверка

На базе, где уже есть данные Karen (или после обоих сидов):

```bash
cd backend
python manage.py seed_baby
python manage.py seed_baby
```

В админке фильтр `textile` и фильтр `baby` оба непустые. Второй запуск не добавляет категорий. `frontend/src/pages/Baby/` в diff нет.

### Нельзя

Не менять поля моделей. Не удалять Textile. Не верстать `/baby`.

## English

You are student **8**, Svet, branch `feat/svet-baby`, zone `baby`. Do not delete [frontend/src/pages/Baby/README.md](../../frontend/src/pages/Baby/README.md). Do not build `/baby`.

Branch from `dev`. One PR into `dev`. Do not push `main`. No Postgres. Finish by the end of December.

Wait for Vach (student 9). Do not delete or rewrite Karen’s Textile rows (student 7). Queue: **Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**. Your student number stays 8.

**Own:** `seed_baby` or a fixture with `store=baby`.

**Do not own:** model fields, the Baby page, Textile rows.

**Steps**

- two categories with `store=baby` and translations in `am`, `en`, `ru`;
- one published product with an AMD `Decimal` price and a name in three languages;
- an image file from the repository;
- a second run does not create another slug;
- Textile data stays.

Baby slugs must differ from Textile slugs because slug is unique for the whole catalog.

**Done when** the admin `store` filter shows both stores and the second run does not duplicate slugs.

```bash
cd backend
python manage.py seed_baby
python manage.py seed_baby
```

`frontend/src/pages/Baby/` must not appear in the diff.

## Հայերեն

Դու աշակերտ **8**-ն ես, Svet, ճյուղը՝ `feat/svet-baby`, գոտին՝ `baby`։ Չջնջել [frontend/src/pages/Baby/README.md](../../frontend/src/pages/Baby/README.md)։ `/baby` էջը չհավաքել։

Ճյուղը `dev`-ից է։ Մեկ PR դեպի `dev`։ `main` չpush անել։ Postgres չբարձրացնել։ Ավարտել մինչև դեկտեմբերի վերջ։

Սպասիր Vach-ի (աշակերտ 9) merge-ին։ Karen-ի (7) Textile տվյալները չջնջել և չվերագրել։ Հերթը՝ **Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**։ Համարը մնում է 8։

**Քոնն է՝** `seed_baby`-ն կամ ֆիքստուրան `store=baby`-ով։

**Քոնը չէ՝** մոդելների դաշտերը, Baby էջը, Textile-ի տողերը։

**Քայլեր**

- երկու կատեգորիա `store=baby` և թարգմանությամբ `am`, `en`, `ru`;
- մեկ հրապարակված ապրանք AMD `Decimal` գնով և անունով երեք լեզվով;
- նկարը ռեպոզիտորիայի ֆայլ է;
- երկրորդ անգամը նոր slug չի ստեղծում;
- Textile-ի տվյալները մնում են։

Baby-ի slug-ը չպետք է համընկնի Textile-ի slug-ի հետ, որովհետև slug-ը եզակի է ամբողջ կատալոգում։

**Ավարտված է, երբ** ադմինի `store` ֆիլտրը ցույց է տալիս երկու խանութը, և երկրորդ անգամը slug չի կրկնում։

```bash
cd backend
python manage.py seed_baby
python manage.py seed_baby
```

`frontend/src/pages/Baby/`-ն չպետք է լինի diff-ում։
