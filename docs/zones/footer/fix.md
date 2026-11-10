# 6 — Daniel · footer — ошибки и разбор

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
