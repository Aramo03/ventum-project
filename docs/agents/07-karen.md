# Agent brief — Wave 1 — #7 Karen

Отдай этот файл агенту целиком. Номер ученика — **7**. Он совпадает с [TASK.md](../../TASK.md) и с заголовком «7 — Karen · textile» в [task-advanced.md](../../task-advanced.md). В очереди имён Karen стоит после Hayk.

## Русский

### Кто ты

Ты делаешь зону ученика 7, Karen, ветка `feat/karen-textile`, зона `textile`. README не удалять: [frontend/src/pages/Textile/README.md](../../frontend/src/pages/Textile/README.md).

Старт от `dev`, ветка `feat/karen-textile`, один PR в `dev`. В `main` не пушить. Postgres не поднимать. Срок — конец декабря.

Ждать merge Vach (ученик 9): без его `Category`, `Product` и `ProductImage` сид не к чему привязать. Очередь: **Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**.

### Карта репозитория

- Страница `/textile` — `frontend/src/pages/Textile/`. Её не собирать. Макет не верстать.
- Данные пишутся в модели Vach через команду управления Django или фикстуру `loaddata`. Поля моделей не менять.
- Картинка — файл из репозитория, не случайный URL в интернет.
- Магазин Baby не трогать. Его данные пишет Svet (8).

### Зона ответственности

Команда `seed_textile` или фикстура с данными `store=textile`.

Нельзя: поля `Category` и `Product`, страница `/textile`, удаление записей Baby.

### Шаги

Команда `seed_textile` или фикстура:

- минимум две категории с `store=textile` и переводами `name` на `am`, `en`, `ru`;
- один опубликованный товар с ценой `Decimal` в AMD и тремя переводами имени;
- картинка — файл из репозитория;
- повторный запуск не создаёт второй slug и не падает;
- записи Baby не удаляются.

Ищем существующие записи по slug (или другому стабильному ключу) и обновляем их, а не создаём копию.

### Definition of Done

Lead не мержит, пока команда или `loaddata` на чистой базе создаёт эти записи, а второй запуск не падает и не плодит дубликаты.

### Проверка

```bash
cd backend
del ventum.sqlite3
python manage.py migrate
python manage.py seed_textile
python manage.py seed_textile
```

Если сдана фикстура, второй шаг — `loaddata` дважды, без дубликатов slug. На Linux/macOS: `rm -f ventum.sqlite3`. В админке фильтр `store=textile` показывает две категории и один товар. Записей `store=baby` эта команда не удаляет.

### Нельзя

Не менять `models.py`. Не верстать `/textile`. Не стирать данные Baby.

## English

You are student **7**, Karen, branch `feat/karen-textile`, zone `textile`. Do not delete [frontend/src/pages/Textile/README.md](../../frontend/src/pages/Textile/README.md). Do not build the `/textile` page.

Branch from `dev`. One PR into `dev`. Do not push `main`. No Postgres. Finish by the end of December.

Wait for Vach (student 9). Queue: **Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**. Your student number stays 7.

**Own:** a `seed_textile` command or a fixture for `store=textile`.

**Do not own:** model fields, the Textile page, Baby rows (Svet, 8).

**Steps**

- at least two categories with `store=textile` and `name` in `am`, `en`, `ru`;
- one published product with an AMD `Decimal` price and a name in three languages;
- an image file stored in the repository, not a random web URL;
- a second run does not create a second slug and does not crash;
- Baby rows are not deleted.

Look up existing rows by slug and update them.

**Done when** the command or `loaddata` fills a fresh database, and the second run neither crashes nor duplicates slugs.

```bash
cd backend
del ventum.sqlite3
python manage.py migrate
python manage.py seed_textile
python manage.py seed_textile
```

Linux/macOS: `rm -f ventum.sqlite3`.

## Հայերեն

Դու աշակերտ **7**-ն ես, Karen, ճյուղը՝ `feat/karen-textile`, գոտին՝ `textile`։ Չջնջել [frontend/src/pages/Textile/README.md](../../frontend/src/pages/Textile/README.md)։ `/textile` էջը չհավաքել։

Ճյուղը `dev`-ից է։ Մեկ PR դեպի `dev`։ `main` չpush անել։ Postgres չբարձրացնել։ Ավարտել մինչև դեկտեմբերի վերջ։

Սպասիր Vach-ի (աշակերտ 9) merge-ին։ Հերթը՝ **Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**։ Համարը մնում է 7։

**Քոնն է՝** `seed_textile` հրամանը կամ ֆիքստուրան `store=textile`-ի համար։

**Քոնը չէ՝** մոդելների դաշտերը, Textile էջը, Baby-ի տողերը (Svet, 8)։

**Քայլեր**

- առնվազն երկու կատեգորիա `store=textile` և `name`-ով `am`, `en`, `ru`;
- մեկ հրապարակված ապրանք AMD `Decimal` գնով և անունով երեք լեզվով;
- նկարը ֆայլ է ռեպոզիտորիայից, ոչ պատահական հղում;
- երկրորդ անգամը նոր slug չի ստեղծում և չի ընկնում;
- Baby-ի տողերը չեն ջնջվում։

Գտիր եղած տողը slug-ով և թարմացրու, կրկնօրինակ մի ստեղծիր։

**Ավարտված է, երբ** հրամանը կամ `loaddata`-ն լցնում է մաքուր բազան, իսկ երկրորդ անգամը չի ընկնում և slug չի կրկնում։

```bash
cd backend
del ventum.sqlite3
python manage.py migrate
python manage.py seed_textile
python manage.py seed_textile
```

Linux/macOS՝ `rm -f ventum.sqlite3`։
