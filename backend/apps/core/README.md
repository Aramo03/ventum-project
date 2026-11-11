# i18n — Artush

**Ветка:** `feat/artush-i18n`  
**Задание:** [task-wave2.md](../../../task-wave2.md) — «3 — Artush · i18n».  
**Агент:** [docs/agents/03-artush.md](../../../docs/agents/03-artush.md).

`languages.py` и `BaseTranslation` уже в `dev`. Вью `/api/health/` не менять.

Добавь `backend/apps/core/translations.py`:

- `parse_language` — пустое значение даёт `en`, неизвестный код поднимает `ValueError`;
- `pick_translation` — запрошенный язык, иначе `en`, иначе любая существующая строка.

На фронте добавь `ru.json` и зарегистрируй `ru` в `frontend/src/i18n/index.js`. Значения `am.json` и `en.json` не переписывать. Кнопку языка в шапку не ставить: её ставит Mariam.

**Lead не мержит, пока:** `de` не становится молча `en`, health отвечает `{"status":"ok"}`.

## English

Artush. Add `parse_language` and `pick_translation`, plus `ru.json`. Do not change the health view or the header button.

## Հայերեն

Artush։ Ավելացրու `parse_language` և `pick_translation`, նաև `ru.json`։ Health-ը և Header-ի կոճակը չփոխել։
