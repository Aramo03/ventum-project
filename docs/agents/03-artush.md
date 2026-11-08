# Agent brief — Wave 1 — #3 Artush

Отдай этот файл агенту целиком. Номер ученика — **3**. Он совпадает с [TASK.md](../../TASK.md) и с заголовком «3 — Artush · i18n» в [task-advanced.md](../../task-advanced.md).

## Русский

### Кто ты

Ты делаешь зону ученика 3, Artush, ветка `feat/artush-i18n`, зона `i18n`. README не удалять: [backend/apps/core/README.md](../../backend/apps/core/README.md).

Старт от `dev`, ветка `feat/artush-i18n`, один PR в `dev`. В `main` не пушить. Postgres не поднимать. Страницы не верстать. Срок — конец декабря.

В очереди имён ты после Suro: **Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**. Твой класс перевода нужен Vach (9) и Hayk (4). Не начинай модели товара за них.

### Карта репозитория

- Языки и абстрактная модель живут в `backend/apps/core/`.
- Health уже в `backend/apps/core/views.py` и `urls.py`. Его не менять. Ответ остаётся `{"status":"ok"}`.
- Фронтовые словари `frontend/src/i18n/` не трогать. Там сейчас интерфейс, не тексты товаров.
- Коды контента только `am`, `en`, `ru`.

### Зона ответственности

Можно: `backend/apps/core/languages.py` и абстрактная модель перевода в `apps/core`.

Нельзя: вью `/api/health/`, JSON фронта, модели `Category` / `Product` / `HomeBlock`.

### Шаги

1. `languages.py`: только коды `am`, `en`, `ru` и человекочитаемые подписи. Остальные модули импортируют коды отсюда, не копируют список.
2. Абстрактная модель перевода: язык из этого списка. Наследник задаёт связь с родителем. Пара «родитель + язык» уникальна.
3. В docstring класса дословно зафиксировать правило: нет перевода на язык запроса — объект не удаляется из выдачи; текст берётся из `en`, иначе из любого перевода, который есть.

### Definition of Done

Lead не мержит, пока три кода импортируются из одного модуля, миграция ядра проходит на SQLite, `/api/health/` отвечает `{"status":"ok"}`.

### Проверка

```bash
cd backend
python manage.py makemigrations
python manage.py migrate
python manage.py test
```

Если тестов ещё нет, достаточно `migrate` и ручной проверки, что health не изменился. Открыть `http://127.0.0.1:8000/api/health/`.

### Нельзя

Не менять `views.py` ручки health. Не править `frontend/src/i18n/`. Не писать товар и слот главной.

## English

You are student **3**, Artush, branch `feat/artush-i18n`, zone `i18n`. Do not delete [backend/apps/core/README.md](../../backend/apps/core/README.md).

Branch from `dev`. One PR into `dev`. Do not push `main`. No Postgres. No page layout. Finish by the end of December.

You follow Suro in the name queue: **Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**. Vach (9) and Hayk (4) will subclass your translation model. Do not build their models.

Languages and the abstract model live in `backend/apps/core/`. Health is already in `views.py` and must stay `{"status":"ok"}`. Do not edit `frontend/src/i18n/`. Content codes are only `am`, `en`, `ru`.

**Own:** `backend/apps/core/languages.py` and an abstract translation model in `apps/core`.

**Do not own:** the health view, frontend JSON, `Category`, `Product`, `HomeBlock`.

**Steps**

1. `languages.py` exports only `am`, `en`, `ru` and labels. Other modules import the codes from here.
2. Abstract translation model: language from that list, child sets the parent link, pair of parent and language is unique.
3. Docstring states the rule: if the requested language is missing, the object stays in the result; text comes from `en`, otherwise from any existing translation.

**Done when** the three codes import from one module, the core migration applies on SQLite, and `/api/health/` still returns `{"status":"ok"}`.

```bash
cd backend
python manage.py makemigrations
python manage.py migrate
```

Open `http://127.0.0.1:8000/api/health/`.

## Հայերեն

Դու աշակերտ **3**-ն ես, Artush, ճյուղը՝ `feat/artush-i18n`, գոտին՝ `i18n`։ Չջնջել [backend/apps/core/README.md](../../backend/apps/core/README.md)։

Ճյուղը `dev`-ից է։ Մեկ PR դեպի `dev`։ `main` չpush անել։ Postgres չբարձրացնել։ Էջ չձևավորել։ Ավարտել մինչև դեկտեմբերի վերջ։

Անունների հերթում դու Suro-ից հետո ես՝ **Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**։ Vach-ը (9) և Hayk-ը (4) ժառանգելու են քո դասը։ Նրանց մոդելները մի գրիր։

Լեզուներն ու աբստրակտ մոդելը `backend/apps/core/`-ում են։ Health-ը `views.py`-ում է և պետք է մնա `{"status":"ok"}`։ `frontend/src/i18n/`-ը չփոխել։ Կոդերը միայն `am`, `en`, `ru` են։

**Քոնն է՝** `backend/apps/core/languages.py` և աբստրակտ թարգմանության մոդելը `apps/core`-ում։

**Քոնը չէ՝** health view-ը, frontend JSON-ը, `Category`-ն, `Product`-ը, `HomeBlock`-ը։

**Քայլեր**

1. `languages.py`-ն արտահանում է միայն `am`, `en`, `ru` և ստորագրություններ։ Մյուս մոդուլները կոդերը ներմուծում են այստեղից։
2. Աբստրակտ մոդել՝ լեզուն այդ ցանկից է, ժառանգը դնում է ծնողի կապը, ծնող + լեզու զույգը եզակի է։
3. Docstring-ում կանոնը՝ եթե հարցված լեզուն չկա, օբյեկտը չի անհետանում. տեքստը գալիս է `en`-ից, այլապես առկա ցանկացած թարգմանությունից։

**Ավարտված է, երբ** երեք կոդը գալիս են մեկ մոդուլից, միջուկի միգրացիան անցնում է SQLite-ով, և `/api/health/`-ը վերադարձնում է `{"status":"ok"}`։

```bash
cd backend
python manage.py makemigrations
python manage.py migrate
```

Բացիր `http://127.0.0.1:8000/api/health/`։
