# 6 — Daniel · footer — ошибки и разбор

> Журнал Wave 1. В Wave 2 этот разбор не переписывать. Текущее задание — [task-wave2.md](../../../task-wave2.md).
> Wave 1 journal. Do not rewrite it for Wave 2.
> Wave 1-ի մատյան։ Wave 2-ի համար չվերաշարադրել։

**Ветка:** `feat/daniel-footer`  
**Агент:** [docs/agents/06-daniel.md](../../agents/06-daniel.md)

---

## Русский

### Ошибка 1: публичные URL в `leads/urls.py`

**Симптом:** `path("subscribe/", ...)` в `apps/leads` или `config/urls.py`.

**Исправление:** brief запрещает API подписки в Wave 1. Оставить `urlpatterns = []`; include от Suro не убирать.

### Ошибка 2: правка Footer на фронте

**Симптом:** diff в `frontend/src/components/Footer/`.

**Исправление:** Daniel — только модели и админка в `backend/apps/leads/`.

### Ошибка 3: ветка без пакета `leads`

**Симптом:** нет `apps/leads` в `INSTALLED_APPS`.

**Исправление:** ветка от актуального `origin/dev` (после Suro).

### Ошибка 4: дубль email только в форме

**Симптом:** второй подписчик с тем же email сохраняется.

**Исправление:** `EmailField(unique=True)` на `NewsletterSubscriber` + миграция.

### Что не «лишний код»

| Элемент | Зачем |
|---------|--------|
| `admin.py` с list_display | DoD: обе модели видны в `/api/admin/` |
| `created_at` auto_now_add | дата создания по brief |
| Пустой `urls.py` | нет публичного endpoint |

### Чего не делали

- Catalog / Vach models
- DRF views, serializers для заявок
- Вёрстка Footer

### Чеклист

- [ ] `makemigrations leads` + `migrate`
- [ ] Дубль email подписки → ошибка уникальности
- [ ] Нет новых API path для leads
- [ ] `git diff` Footer пустой

---

## English

Do not add public subscribe routes; do not edit Footer JSX. Unique email on the model, both models in admin, empty `leads/urls.py`.

---

## Հայերեն

Հանրային subscribe URL մի ավելացնել։ Footer-ը չփոխել։ Email-ը եզակի մոդելում, երկու մոդելը ադմինում, դատարկ `urls.py`։

---

# Wave 2

Журнал выше — волна 1. Ниже только то, что в волне 2 ещё не закрыто. Ручки в этот список не входят.

## Русский

### Ошибка 1: формы в Footer не сделаны

**Симптом:** [frontend/src/components/Footer/Footer.jsx](../../../frontend/src/components/Footer/Footer.jsx) по-прежнему только ссылки. Нет `react-hook-form`, нет отправки через [frontend/src/api/client.js](../../../frontend/src/api/client.js) на `/api/leads/newsletter/` и `/api/leads/wholesale/`. Успех и ошибка в форме не показываются. [footer.js](../../../frontend/src/components/Footer/footer.js) содержит только `FOOTER_LINKS`.

**По брифу:** две формы в подвале. Подписка — email. Опт — имя, телефон, email, текст.

### Ошибка 2: нет новых строк форм в JSON

**Симптом:** в [frontend/src/i18n/am.json](../../../frontend/src/i18n/am.json) и [frontend/src/i18n/en.json](../../../frontend/src/i18n/en.json) нет текстов этих форм. `ru.json` в дереве ещё нет: его заводит Artush, ключей форм там тоже нет.

### Что уже совпадает с брифом

`POST /api/leads/newsletter/` и `POST /api/leads/wholesale/` есть. Первая подписка — 201. Тот же email снова — 400 на поле `email`, вторая строка не создаётся. Невалидный email — 400. Опт принимает `name`, `phone`, `email`, `text`. Пустое поле — 400, в ответе есть `id`. Отдельного JWT на этих вью нет. Поля `NewsletterSubscriber` и `WholesaleInquiry` не менялись. Header не тронут.

## English

### Mistake 1: Footer forms are missing

[Footer.jsx](../../../frontend/src/components/Footer/Footer.jsx) is still links only. There is no `react-hook-form`, no submit through [client.js](../../../frontend/src/api/client.js) to `/api/leads/newsletter/` and `/api/leads/wholesale/`, and no success or error in the form. [footer.js](../../../frontend/src/components/Footer/footer.js) only exports `FOOTER_LINKS`.

The brief asks for a newsletter email form and a wholesale form with name, phone, email, and text.

### Mistake 2: form strings are missing from the JSON files

[am.json](../../../frontend/src/i18n/am.json) and [en.json](../../../frontend/src/i18n/en.json) have no form copy. `ru.json` is not in the tree yet; Artush adds that file, and it has no form keys either.

### Already matches the brief

Both POSTs exist. The first subscription is 201. The same email again is 400 on `email` and does not insert a second row. An invalid email is 400. Wholesale takes `name`, `phone`, `email`, and `text`. A blank field is 400 and the success body includes `id`. These views do not require JWT. The lead model fields and the Header are unchanged.

## Հայերեն

### Սխալ 1. Footer-ում ձևեր չկան

[Footer.jsx](../../../frontend/src/components/Footer/Footer.jsx)-ը դեռ միայն հղումներ է։ Չկա `react-hook-form`, չկա ուղարկում [client.js](../../../frontend/src/api/client.js)-ով դեպի `/api/leads/newsletter/` և `/api/leads/wholesale/`։ Ձևի մեջ հաջողություն և սխալ չեն երևում։ [footer.js](../../../frontend/src/components/Footer/footer.js)-ը միայն `FOOTER_LINKS` ունի։

Պետք է բաժանորդագրություն email-ով և մեծածախ՝ անուն, հեռախոս, email, տեքստ։

### Սխալ 2. ձևի տողերը JSON-ում չկան

[am.json](../../../frontend/src/i18n/am.json)-ում և [en.json](../../../frontend/src/i18n/en.json)-ում ձևի տեքստեր չկան։ `ru.json`-ը դեռ ծառում չկա. այն ավելացնում է Artush-ը, ձևի բանալիներ այնտեղ էլ չկան։

### Արդեն համընկնում է

Երկու POST-ը կա։ Առաջին բաժանորդագրությունը 201 է։ Նույն email-ը կրկին 400 է `email` դաշտի վրա և երկրորդ տող չի ստեղծում։ Սխալ email-ը 400 է։ Մեծածախը ընդունում է `name`, `phone`, `email`, `text`։ Դատարկ դաշտը 400 է, պատասխանում կա `id`։ Այս վյուերին JWT պետք չէ։ Հայտերի դաշտերը և Header-ը չեն փոխվել։
