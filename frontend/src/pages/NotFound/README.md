# 10 — ui — Ashot

**Номер ученика:** 10. Тот же номер в [TASK.md](../../../../TASK.md) и в разделе «10 — Ashot · ui» файла [task-wave2.md](../../../../task-wave2.md).  
**Ветка:** `feat/ashot-ui`  
**Агент:** [docs/agents/10-ashot.md](../../../../docs/agents/10-ashot.md). Отдай агенту файл целиком.

Тесты моделей волны 1 не удалять. `index.css` не менять. В очереди ты последний.

## Сделать

- страница 404: заголовок, короткий текст, ссылка на `/`
- тесты API: только опубликованные, фильтр магазина, fallback языка, `q`, повтор подписки, опт без текста, `me` без токена даёт 401, home block отдаёт `title`
- `python manage.py test` из `backend/` зелёный целиком

## Нельзя

Не менять поля моделей, чтобы тест позеленел. Не ходить в сеть и не поднимать Postgres.

## English

Student **10**, Ashot, `feat/ashot-ui`. Build the 404 page and the Wave 2 API tests. Keep the Wave 1 model tests. Give your agent [10-ashot.md](../../../../docs/agents/10-ashot.md) in full.

**Done when** `manage.py test` is green and the diff does not change model fields or `index.css`.

## Հայերեն

Աշակերտ **10**, Ashot, `feat/ashot-ui`։ Սարքի 404 էջը և Wave 2-ի API թեստերը։ Wave 1-ի մոդելների թեստերը թող։ Գործակալին տուր ամբողջ [10-ashot.md](../../../../docs/agents/10-ashot.md)։

**Ավարտված է, երբ** `manage.py test`-ը կանաչ է, իսկ diff-ում չկան մոդելների դաշտերը և `index.css`-ը։
