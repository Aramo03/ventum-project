# Agent brief — Wave 3 — #3 Artush

**Волна 6.** Три JSON, папка `frontend/src/i18n/`, ветка `feat/artush-i18n`, после Hayk. Подписи волны, единая «։» для «Հոգածություն ամեն թելում։», plurals для числа товаров. Перед PR — `json.loads`. Раздел «3 — Artush · подписи» в [task-wave6.md](../../task-wave6.md). Текст ниже не стирать.

**Wave 6.** Three JSON files, folder `frontend/src/i18n/`, branch `feat/artush-i18n`, after Hayk. Wave copy, a single «։» for «Հոգածություն ամեն թելում։», plurals for the item count. Before the PR — `json.loads`. Section “3 — Artush · copy” in [task-wave6.md](../../task-wave6.md). The text below stays.

**Wave 6.** Երեք JSON, պանակ `frontend/src/i18n/`, ճյուղ `feat/artush-i18n`, Hayk-ից հետո։ Ալիքի գրություններ, մեկ «։»՝ «Հոգածություն ամեն թելում։»-ի համար, հոգնակի՝ ապրանքների թվի համար։ PR-ից առաջ՝ `json.loads`։ Բաժինը՝ [task-wave6.md](../../task-wave6.md), «3 — Artush · подписи»։ Ներքևի տեքստը մնում է։

**Волна 5 (закрыта).** Последним. Только `frontend/src/i18n/`: три JSON, армянский кадра в `am.json`, перевод в `en` и `ru`. В очереди после Hayk. Раздел «3 — Artush · подписи» в [task-wave5.md](../../task-wave5.md). Чужие `jsx` и `css` не верстать. Текст ниже не стирать.

**Wave 5 (closed).** Last. Only `frontend/src/i18n/`: three JSON files, the frame’s Armenian in `am.json`, translations in `en` and `ru`. You follow Hayk. Section “3 — Artush · copy” in [task-wave5.md](../../task-wave5.md). Do not build other people’s `jsx` or `css`. The text below stays.

**Wave 5 (փակ).** Վերջինը։ Միայն `frontend/src/i18n/`՝ երեք JSON, կադրի հայերենը `am.json`-ում, թարգմանությունը `en`-ում և `ru`-ում։ Հերթում Hayk-ից հետո։ Բաժինը՝ [task-wave5.md](../../task-wave5.md), «3 — Artush · подписи»։ Ուրիշի `jsx`-ը և `css`-ը չհավաքել։ Ներքևի տեքստը մնում է։

**Волна 4.** Текущая зона — [task-wave4.md](../../task-wave4.md), раздел «3 — Artush · подписи». Только `frontend/src/i18n/`: три JSON по кадру, без вёрстки чужих страниц. В очереди ты после Mariam. Текст ниже не стирать.

**Wave 4.** Current zone: [task-wave4.md](../../task-wave4.md), section “3 — Artush · copy”. Only `frontend/src/i18n/`: three JSON files from the frame, no other pages. You follow Mariam in the queue. The text below stays.

**Wave 4.** Ընթացիկ գոտին՝ [task-wave4.md](../../task-wave4.md), «3 — Artush · գրություններ»։ Միայն `frontend/src/i18n/`՝ երեք JSON կադրից, ուրիշի էջեր չհավաքել։ Հերթում դու Mariam-ից հետո ես։ Ներքևի տեքստը մնում է։

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
