# i18n — Artush

**Ветка:** `feat/artush-i18n`  
**Задание:** [task-wave3.md](../../../task-wave3.md) — «3 — Artush · i18n».  
**Агент:** [docs/agents/03-artush.md](../../../docs/agents/03-artush.md).

`parse_language`, `pick_translation` и `ru.json` уже в дереве. Их не ослаблять и не переписывать. Вью `/api/health/` не менять.

Добавь `backend/apps/core/idram_language.py`:

- `idram_language` сначала вызывает `parse_language`;
- `am` → `AM`, `en` → `EN`, `ru` → `RU`;
- неизвестный код по-прежнему `ValueError`, не тихий `EN`.

Checkout пишет Hayk. Эту функцию он вызывает, файл функции — твой.

**Lead не мержит, пока:** `de` не становится `EN`, health отвечает `{"status":"ok"}`.

## English

Artush. Add `idram_language`. Do not weaken `parse_language` and do not write the checkout view.

## Հայերեն

Artush։ Ավելացրու `idram_language`։ `parse_language`-ը չթուլացնել և checkout-ի վյու չգրել։
