# Agent brief — Wave 2 — #6 Daniel

Отдай этот файл агенту целиком. Номер ученика — **6**. Он совпадает с [TASK.md](../../TASK.md) и с заголовком «6 — Daniel · footer» в [task-wave2.md](../../task-wave2.md).

Wave 1 закрыта: `NewsletterSubscriber` и `WholesaleInquiry` уже в `dev` и в админке. Полей не менять. Публичных ручек тогда не было. Теперь есть две, и формы в подвале.

## Русский

### Кто ты

Ты делаешь зону ученика 6, Daniel, ветка `feat/daniel-footer`, зона `footer`. README не удалять: [backend/apps/leads/README.md](../../backend/apps/leads/README.md), [frontend/src/components/Footer/README.md](../../frontend/src/components/Footer/README.md).

Старт: `git checkout dev && git pull`, затем `feat/daniel-footer` со свежим `dev`. Один PR, base = `dev`. В `main` не пушить. `--force` не делать. Postgres не поднимать. Срок — конец января.

Ждать, пока пакет `leads` в `dev` (он уже там с волны 1). В очереди ты после Hayk: **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**.

### Карта репозитория

- `NewsletterSubscriber`: уникальный `email`, `created_at`.
- `WholesaleInquiry`: `name`, `phone`, `email`, `text`, `created_at`.
- `backend/apps/leads/urls.py` пустой и подключён как `api/leads/`.
- Подвал — [frontend/src/components/Footer/](../../frontend/src/components/Footer/). Сейчас это ссылки без форм.
- HTTP — [frontend/src/api/client.js](../../frontend/src/api/client.js). `react-hook-form` уже в стеке.
- Авторизация на эти POST не нужна. Suro оставляет `AllowAny` по умолчанию.

### Зона ответственности

Можно: `leads/serializers.py`, `leads/views.py`, заполнить `leads/urls.py`, `Footer.jsx`, `footer.css`, `footer.js`, новые ключи в трёх JSON.

Нельзя: поля моделей заявок, шапка, корзина, заказы.

### Шаги

1. `POST /api/leads/newsletter/` принимает `{"email": "..."}`. Первая запись — **201**. Тот же email снова — **400** с ошибкой поля `email`, не 500, и вторая строка в базе не создаётся. Невалидный email — **400**.
2. `POST /api/leads/wholesale/` принимает `name`, `phone`, `email`, `text`. Все четыре обязательны. Успех — **201** и `id`. Пустое поле — **400**.
3. В Footer две формы на `react-hook-form`. Успех и ошибка видны в самой форме, не только в консоли. Отправка идёт через `api`.
4. Новые строки — в `am.json`, `en.json` и `ru.json`.

### Definition of Done

Lead не мержит, пока: первая подписка даёт 201 и строку в `/api/admin/`; вторая с тем же email даёт 400 и не плодит строку; опт без `text` даёт 400; обе формы в Footer вызывают эти пути; поля моделей в diff нет.

### Проверка

```bash
cd backend
python manage.py runserver
```

Дважды отправить один email через Swagger или форму. Открыть список подписчиков в админке: строка одна. Отправить опт без текста. На сайте заполнить обе формы до сообщения об успехе.

### Нельзя

Не ослаблять уникальность email. Не требовать JWT на эти две ручки. Не менять Header.

## English

You are student **6**, Daniel, branch `feat/daniel-footer`, zone `footer`. Do not delete the leads or Footer READMEs.

Wave 1 models are in `dev`. Do not change their fields. This wave adds the two public POSTs and the footer forms.

Pull `dev` into `feat/daniel-footer`. One PR, base `dev`. No force-push. No Postgres. Finish by the end of January. Queue: **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**.

**Own:** `leads/serializers.py`, `leads/views.py`, `leads/urls.py`, `Footer.jsx`, `footer.css`, `footer.js`, and new keys in all three JSON files.

**Do not own:** lead model fields, the header, cart, orders.

**Steps**

1. `POST /api/leads/newsletter/` takes `{"email": "..."}`. First save is **201**. The same email again is **400** on the `email` field, not 500, and does not insert a second row.
2. `POST /api/leads/wholesale/` takes `name`, `phone`, `email`, and `text`, all required. Success is **201** with `id`. A blank field is **400**. No JWT on either route.
3. Two `react-hook-form` forms in the Footer. Show success and error in the form. Submit with `frontend/src/api/client.js`.
4. Add every new string to `am.json`, `en.json`, and `ru.json`.

**Done when** the first subscription is 201 and visible in admin, the second is 400 with one row left, wholesale without `text` is 400, both forms call these paths, and the model fields are unchanged.

```bash
cd backend
python manage.py runserver
```

Do not require JWT on these two routes. Do not edit the Header.

## Հայերեն

Դու աշակերտ **6**-ն ես, Daniel, ճյուղը՝ `feat/daniel-footer`, գոտին՝ `footer`։ leads-ի և Footer-ի README-ները չջնջել։

Wave 1-ի մոդելներն արդեն `dev`-ում են։ Դաշտերը չփոխել։ Այս ալիքում ավելանում են երկու հրապարակային POST և Footer-ի ձևերը։

Թարմ `dev`-ը ձուլիր `feat/daniel-footer`-ի մեջ։ Մեկ PR, base-ը `dev`։ `--force` չանել։ Postgres չբարձրացնել։ Ավարտել մինչև հունվարի վերջ։ Հերթը՝ **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**։

**Քոնն է՝** `leads/serializers.py`, `leads/views.py`, `leads/urls.py`, `Footer.jsx`, `footer.css`, `footer.js` և նոր բանալիները երեք JSON-ում։

**Քոնը չէ՝** հայտերի մոդելների դաշտերը, Header-ը, զամբյուղը, պատվերները։

**Քայլեր**

1. `POST /api/leads/newsletter/` ընդունում է `{"email": "..."}`։ Առաջին պահումը՝ **201**։ Նույն email-ը կրկին՝ **400** `email` դաշտի վրա, ոչ թե 500, և երկրորդ տող չի ստեղծում։
2. `POST /api/leads/wholesale/` ընդունում է `name`, `phone`, `email`, `text`։ Բոլորը պարտադիր են։ Հաջողությունը՝ **201** և `id`։ Դատարկ դաշտը՝ **400**։ Երկու ուղին էլ առանց JWT։
3. Footer-ում երկու ձև `react-hook-form`-ով։ Հաջողությունն ու սխալը ցույց տուր ձևի մեջ։ Ուղարկիր `frontend/src/api/client.js`-ով։
4. Ամեն նոր տող գրիր `am.json`, `en.json` և `ru.json` ֆայլերում։

**Ավարտված է, երբ** առաջին բաժանորդագրությունը 201 է և երևում է ադմինում, երկրորդը 400 է և մնում է մեկ տող, առանց `text` մեծածախը 400 է, երկու ձևն էլ կանչում են այս ուղիները, իսկ մոդելների դաշտերը չեն փոխվել։

```bash
cd backend
python manage.py runserver
```

Այս երկու ուղուն JWT մի պահանջիր։ Header-ը չփոխել։
