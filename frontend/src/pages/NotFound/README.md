# 10 — ui — Ashot

**Номер ученика:** 10. Тот же номер в [TASK.md](../../../../TASK.md) и в разделе «10 — Ashot · ui» файла [task-advanced.md](../../../../task-advanced.md).  
**Ветка:** `feat/ashot-ui`  
**Агент:** [docs/agents/10-ashot.md](../../../../docs/agents/10-ashot.md). Отдай агенту файл целиком.

Эта папка лежит рядом со страницей 404. Страницу 404 и `frontend/src/index.css` не менять. Работа — тесты моделей в `backend/`.

Ждать, пока в `dev` уже есть пользователь, переводы, каталог, заявки и слот главной. В очередь merge ты последний, после Mariam (ученик 5).

## Зона ответственности

Файлы тестов Django в `backend/`: `tests.py` или пакет `tests/` рядом с уже смерженными приложениями. Запуск: `python manage.py test`. База — SQLite, без Postgres и без сети.

## Сделать

- пользователь, у которого логин — email;
- категория с переводами `am`, `en`, `ru`;
- опубликованный товар Textile и отдельный товар Baby, цена `Decimal` в AMD;
- товар без перевода `ru` всё равно сохраняется;
- `NewsletterSubscriber` сохраняется, второй такой же email не сохраняется;
- `python manage.py test` из `backend/` зелёный целиком.

## Нельзя

Не менять `NotFound.jsx`, `notFound.css`, `notFound.js`, `index.css`. Не менять поля моделей, `admin.py` и миграции. Не ходить в сеть и не поднимать Postgres.

## Definition of Done

Lead не мержит, пока `python manage.py test` зелёный целиком, тесты не требуют сеть и Postgres, а diff не содержит страницу NotFound, `index.css` и поля моделей.

## English

Student **10**, Ashot, branch `feat/ashot-ui`. Same number in TASK.md and in task-advanced section «10 — Ashot». Give your agent [10-ashot.md](../../../../docs/agents/10-ashot.md) in full.

Do not build the 404 page and do not edit `index.css`. Write Django model tests under `backend/` and run `python manage.py test` on SQLite.

Wait until the user, translations, catalog, leads, and home slot are in `dev`. You are last in the merge queue, after Mariam (5).

Cover an email user, a category in three languages, a Textile product and a Baby product, a product that still saves with no `ru` translation, and a `NewsletterSubscriber` that rejects a duplicate email.

**Done when** the whole `manage.py test` run is green and the diff does not change NotFound, `index.css`, or model fields.

## Հայերեն

Աշակերտ **10**, Ashot, ճյուղը՝ `feat/ashot-ui`։ Համարը նույնն է TASK.md-ում և task-advanced-ի «10 — Ashot» բաժնում։ Գործակալին տուր ամբողջ [10-ashot.md](../../../../docs/agents/10-ashot.md) ֆայլը։

404 էջը չսարքել և `index.css`-ը չփոխել։ Գրիր մոդելների թեստեր `backend/`-ում և աշխատացրու `python manage.py test` SQLite-ով։

Սպասիր, մինչև `dev`-ում լինեն user-ը, թարգմանությունները, կատալոգը, հայտերը և գլխավոր սլոթը։ Merge-ի հերթում դու վերջինն ես, Mariam-ից (5) հետո։

Ծածկիր email-ով user, երեք լեզվով կատեգորիա, Textile և Baby ապրանք, ապրանք առանց `ru`, և `NewsletterSubscriber`, որը կրկնակի email-ը մերժում է։

**Ավարտված է, երբ** ամբողջ `manage.py test`-ը կանաչ է, իսկ diff-ում չկան NotFound-ը, `index.css`-ը և մոդելների դաշտերը։
