# Agent brief — Wave 1 — #6 Daniel

Отдай этот файл агенту целиком. Номер ученика — **6**. Он совпадает с [TASK.md](../../TASK.md) и с заголовком «6 — Daniel · footer» в [task-advanced.md](../../task-advanced.md). В очереди имён Daniel стоит после Vach.

## Русский

### Кто ты

Ты делаешь зону ученика 6, Daniel, ветка `feat/daniel-footer`, зона `footer`. README не удалять: [backend/apps/leads/README.md](../../backend/apps/leads/README.md). Страницу [frontend/src/components/Footer/](../../frontend/src/components/Footer/) не верстать.

Старт от `dev`, ветка `feat/daniel-footer`, один PR в `dev`. В `main` не пушить. Postgres не поднимать. Срок — конец декабря.

Ждать, пока Suro (2) заведёт пустой пакет `leads`. В очередь merge ты встаёшь после Vach: **Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**. Номер ученика при этом остаётся 6.

### Карта репозитория

- Модели заявок: `backend/apps/leads/`.
- Админка уже на `/api/admin/`. Свои URL для отправки с сайта не добавлять в `urls.py`.
- `Footer.jsx`, `footer.css`, `footer.js` не менять.
- Это заявки посетителя, не товар. Товар пишет Vach (9).

### Зона ответственности

Можно: модели, админка и миграции `leads`.

Нельзя: API-ручки и вёрстка подвала.

### Шаги

1. `NewsletterSubscriber`: email уникален, дата создания.
2. `WholesaleInquiry`: имя, телефон, email, текст, дата. Это заявка опта, не товар.
3. Обе модели видны в админке списком. Публичного URL нет.

### Definition of Done

Lead не мержит, пока обе модели видны в `/api/admin/`, второй такой же email подписки база не принимает, в `urls` нет ручек этих заявок.

### Проверка

```bash
cd backend
python manage.py makemigrations leads
python manage.py migrate
python manage.py runserver
```

В админке создать подписчика. Повтор того же email должен завершиться ошибкой уникальности. `git diff` по `frontend/src/components/Footer/` пустой, новых path в `urls.py` нет.

### Нельзя

Не делать endpoint подписки. Не верстать Footer. Не менять каталог.

## English

You are student **6**, Daniel, branch `feat/daniel-footer`, zone `footer`. Do not delete [backend/apps/leads/README.md](../../backend/apps/leads/README.md). Do not lay out [frontend/src/components/Footer/](../../frontend/src/components/Footer/).

Branch from `dev`. One PR into `dev`. Do not push `main`. No Postgres. Finish by the end of December.

Wait until Suro (2) has created the empty `leads` package. Your merge place is after Vach: **Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**. Your student number stays 6.

**Own:** `leads` models, admin, and migrations.

**Do not own:** public API routes and the footer layout. Products belong to Vach (9).

**Steps**

1. `NewsletterSubscriber`: unique email, created date.
2. `WholesaleInquiry`: name, phone, email, text, date. This is a request, not a product.
3. Both models appear as lists in admin. No public URL.

**Done when** both models are in `/api/admin/`, a duplicate subscriber email is rejected, and `urls` has no routes for these forms.

```bash
cd backend
python manage.py makemigrations leads
python manage.py migrate
python manage.py runserver
```

`git diff` for the Footer folder must be empty.

## Հայերեն

Դու աշակերտ **6**-ն ես, Daniel, ճյուղը՝ `feat/daniel-footer`, գոտին՝ `footer`։ Չջնջել [backend/apps/leads/README.md](../../backend/apps/leads/README.md)։ Չձևավորել [frontend/src/components/Footer/](../../frontend/src/components/Footer/)։

Ճյուղը `dev`-ից է։ Մեկ PR դեպի `dev`։ `main` չpush անել։ Postgres չբարձրացնել։ Ավարտել մինչև դեկտեմբերի վերջ։

Սպասիր, մինչև Suro-ն (2) ստեղծի դատարկ `leads` փաթեթը։ Merge-ի տեղդ Vach-ից հետո է՝ **Lead → Suro → Artush → Vach → Daniel → Hayk → Karen → Svet → Mariam → Ashot**։ Համարը մնում է 6։

**Քոնն է՝** `leads` մոդելները, ադմինը և միգրացիաները։

**Քոնը չէ՝** հանրային API-ն և footer-ի դասավորությունը։ Ապրանքը Vach-ինն է (9)։

**Քայլեր**

1. `NewsletterSubscriber`՝ եզակի email, ստեղծման ամսաթիվ։
2. `WholesaleInquiry`՝ անուն, հեռախոս, email, տեքստ, ամսաթիվ։ Սա հայտ է, ոչ ապրանք։
3. Երկու մոդելն էլ ադմինում են ցանկով։ Հանրային URL չկա։

**Ավարտված է, երբ** երկու մոդելն էլ երևում են `/api/admin/`-ում, կրկնակի email-ը մերժվում է, և `urls`-ում այդ հայտերի ճանապարհ չկա։

```bash
cd backend
python manage.py makemigrations leads
python manage.py migrate
python manage.py runserver
```

Footer պանակի `git diff`-ը պետք է դատարկ լինի։
