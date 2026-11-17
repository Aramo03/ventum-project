# 10 — ui — Ashot

**Номер ученика:** 10. Тот же номер в [TASK.md](../../../../TASK.md) и в разделе «10 — Ashot · ui» файла [task-wave3.md](../../../../task-wave3.md).  
**Ветка:** `feat/ashot-ui`  
**Агент:** [docs/agents/10-ashot.md](../../../../docs/agents/10-ashot.md). Отдай агенту файл целиком.

Страница 404 уже ведёт на `/`. Её не ломать. `index.css` не менять. Тесты волн 1 и 2 не удалять. В очереди ты последний.

## Сделать

- `/checkout/success` и `/checkout/fail`: query `bill`, слово «оплачено» только при `status=paid`
- тесты корзины, пустого checkout, precheck и checksum без сети
- `python manage.py test` из `backend/` зелёный целиком

## Нельзя

Не менять поля моделей, чтобы тест позеленел. Не ходить на живой Idram.

## English

Student **10**, Ashot, `feat/ashot-ui`. Keep the 404 page. Add the return pages and the payment tests. Give your agent [10-ashot.md](../../../../docs/agents/10-ashot.md) in full.

**Done when** `manage.py test` is green and the screen says paid only when `status` is `paid`.

## Հայերեն

Աշակերտ **10**, Ashot, `feat/ashot-ui`։ 404 էջը թող։ Ավելացրու վերադարձի էջերը և վճարման թեստերը։ Գործակալին տուր ամբողջ [10-ashot.md](../../../../docs/agents/10-ashot.md)։

**Ավարտված է, երբ** `manage.py test`-ը կանաչ է, և էկրանը «վճարված» է գրում միայն `status=paid` դեպքում։
