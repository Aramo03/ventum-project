# Agent brief — Wave 3 — #3 Artush

Отдай этот файл агенту целиком. Номер ученика — **3**. Он совпадает с [TASK.md](../../TASK.md) и с заголовком «3 — Artush · i18n» в [task-wave3.md](../../task-wave3.md).

`parse_language` и `pick_translation` уже в `dev`. Их не ослаблять. `ru.json` уже есть.

## Русский

### Кто ты

Ты делаешь зону ученика 3, Artush, ветка `feat/artush-i18n`, зона `i18n`. Срок — конец января 2027.

Один PR, base = `dev`. В `main` не пушить. Postgres не поднимать.

В очереди ты после Suro: **Lead → Suro → Artush → Vach → Karen → Svet → Daniel → Hayk → Mariam → Ashot**.

### Зона ответственности

Можно: новый файл `backend/apps/core/idram_language.py` с функцией `idram_language`.

Нельзя: вью checkout, шапка, ослаблять `parse_language`.

### Шаги

1. `idram_language(value)` сначала вызывает `parse_language`.
2. Потом карта: `am` → `AM`, `en` → `EN`, `ru` → `RU`.
3. Неизвестный код остаётся `ValueError`. Тихое `EN` запрещено. Пустое значение, как и раньше, становится `en`, затем `EN`.

### Definition of Done

Три кода мапятся. `de` не становится `EN`. Health отвечает `{"status":"ok"}`.

### Нельзя

Писать платёжную вью, которая вызывает эту функцию. Её вызывает Hayk.

## English

You are student **3**, Artush, branch `feat/artush-i18n`. Add `idram_language` in `apps/core/idram_language.py`. It calls `parse_language`, then maps `am`/`en`/`ru` to `AM`/`EN`/`RU`. `de` stays an error. Do not weaken `parse_language` and do not write the checkout view.

**Done when** the three codes map, `de` does not become `EN`, and health is `{"status":"ok"}`.

## Հայերեն

Դու աշակերտ **3**-ն ես, Artush, ճյուղը՝ `feat/artush-i18n`։ Ավելացրու `idram_language`՝ `apps/core/idram_language.py`։ Սկզբում `parse_language`, հետո `am`/`en`/`ru` → `AM`/`EN`/`RU`։ `de`-ն մնում է սխալ։ `parse_language`-ը չթուլացնել և checkout-ի վյու չգրել։

**Ավարտված է, երբ** երեք կոդը քարտեզագրվում է, `de`-ն `EN` չի դառնում, և health-ը `{"status":"ok"}` է։
