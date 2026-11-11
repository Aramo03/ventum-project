# api — Suro

**Номер ученика:** 2. **Ветка:** `feat/suro-api`  
**Задание:** [task-wave2.md](../../../task-wave2.md) — «2 — Suro · api».  
**Агент:** [docs/agents/02-suro.md](../../../docs/agents/02-suro.md). Отдай файл целиком.

Wave 1 закрыта: пользователь с логином-email уже в `dev`. Модель не переписывать. README не удалять.

Сделать три вещи:

- страница аналитики только для staff: `/api/admin/analytics/`, пункт в сайдбаре Unfold, живые числа по товарам, категориям, подписчикам, опту, пользователям и `HomeBlock`;
- `POST /api/auth/token/`, `POST /api/auth/token/refresh/`, `GET /api/auth/me/`;
- `PAGE_SIZE = 12` и описание Swagger вместо «Health only». `AllowAny` по умолчанию не снимать.

**Lead не мержит, пока:** staff видит числа, гость их не видит, токен по email выдаётся, `me` без токена даёт 401, health остаётся `{"status":"ok"}`.

## English

Suro, student 2, `feat/suro-api`. Wave 1 user stays. Add the staff analytics page, JWT token / refresh / me, and page size 12. Give your agent [02-suro.md](../../../docs/agents/02-suro.md) in full. Do not delete this README.

## Հայերեն

Suro, աշակերտ 2, `feat/suro-api`։ Wave 1-ի user-ը մնում է։ Ավելացրու staff-ի անալիտիկան, JWT token / refresh / me և էջի չափ 12։ Գործակալին տուր ամբողջ [02-suro.md](../../../docs/agents/02-suro.md)։ README-ն չջնջել։
