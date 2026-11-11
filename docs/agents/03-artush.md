# Agent brief — Wave 2 — #3 Artush

Отдай этот файл агенту целиком. Номер ученика — **3**. Он совпадает с [TASK.md](../../TASK.md) и с заголовком «3 — Artush · i18n» в [task-wave2.md](../../task-wave2.md).

Wave 1 закрыта: `LANGUAGE_CODES`, `BaseTranslation` и правило «нет перевода — объект остаётся, текст из `en`» уже в `dev`. Список кодов не копировать. Health не менять.

## Русский

### Кто ты

Ты делаешь зону ученика 3, Artush, ветка `feat/artush-i18n`, зона `i18n`. README не удалять: [backend/apps/core/README.md](../../backend/apps/core/README.md), [frontend/src/i18n/README.md](../../frontend/src/i18n/README.md).

Старт: `git checkout dev && git pull`, затем `feat/artush-i18n` со свежим `dev`. Один PR, base = `dev`. В `main` не пушить. `--force` не делать. Postgres не поднимать. Срок — конец января.

В очереди ты сразу после Suro: **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**.

### Карта репозитория

- Коды и подписи уже в `backend/apps/core/languages.py`: `am`, `en`, `ru`, `DEFAULT_LANGUAGE = "en"`.
- Правило выбора текста записано в docstring `BaseTranslation` в `backend/apps/core/models.py`. Вью health в `apps/core/views.py` не трогать.
- Фронт сейчас знает только `am` и `en`: [frontend/src/i18n/index.js](../../frontend/src/i18n/index.js) и `en.json`. Кнопку `ru` в шапку ставит Mariam. Ты готовишь словарь и регистрацию языка.
- Vach и Hayk будут импортировать твои функции. Свой разбор `language` им писать нельзя.

### Зона ответственности

Можно: новый `backend/apps/core/translations.py`, новый `frontend/src/i18n/ru.json`, регистрация `ru` в `index.js`.

Нельзя: `views.py` health, модели каталога, `Header`, значения `am.json` и `en.json`.

### Шаги

1. `parse_language(value)` в `translations.py`. `None` и пустая строка, в том числе из пробелов, возвращают `en`. `am`, `en`, `ru` возвращаются как есть. Любое другое значение, включая `AM`, `RU` и `hy`, поднимает `ValueError`. Неизвестный код нельзя молча превращать в `en`.
2. `pick_translation(rows, language)`. Ищет строку с этим `language`. Если её нет — строку `en`. Если нет и её — первую по коду языка. Если строк нет — `None`. Функция не удаляет родительский товар или блок из выдачи. Это делает вью, которое всё равно сериализует объект.
3. В docstring коротко повторить правило волны 1, чтобы Vach и Hayk импортировали модуль, а не копировали текст.
4. `ru.json` — те же ключи, что сейчас в `en.json`, значения по-русски. В `index.js` добавить ресурс и включить `ru` в `supportedLngs`. Существующие значения `am.json` и `en.json` не менять.

### Definition of Done

Lead не мержит, пока: три кода по-прежнему импортируются из `languages.py`; `parse_language("de")` и `parse_language("AM")` поднимают `ValueError`; `parse_language(None)` равен `en`; `pick_translation` на наборе без `ru` возвращает английскую строку; `i18n.changeLanguage('ru')` не падает; health отвечает `{"status":"ok"}`; шапка в diff не изменена.

### Проверка

```bash
cd backend
python manage.py shell
```

Импортировать `parse_language` и `pick_translation`. Прогнать пустое значение, `ru`, `de`. Затем `python manage.py test` — старые тесты остаются зелёными. На фронте в консоли браузера язык `ru` не должен отвергаться `supportedLngs`.

### Нельзя

Не писать сериализаторы каталога и контента. Не менять health. Не добавлять кнопку языка в Header: это зона Mariam.

## English

You are student **3**, Artush, branch `feat/artush-i18n`, zone `i18n`. Do not delete the core or i18n READMEs.

Wave 1 is in `dev`: `am`, `en`, `ru`, `BaseTranslation`, and the fallback rule. Do not copy the code list. Do not edit the health view.

Pull `dev` into `feat/artush-i18n`. One PR, base `dev`. No force-push. No Postgres. Finish by the end of January. You follow Suro: **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**.

**Own:** `backend/apps/core/translations.py`, `frontend/src/i18n/ru.json`, and the `ru` registration in `index.js`.

**Do not own:** the health view, catalog models, the Header, and the current values in `am.json` and `en.json`.

**Steps**

1. `parse_language(value)`. `None` and a blank string return `en`. `am`, `en`, and `ru` pass through. Every other value, including `AM`, `RU`, and `hy`, raises `ValueError`. Do not quietly map an unknown code to `en`.
2. `pick_translation(rows, language)`. Return the row for that language, else the `en` row, else the first row by language code, else `None`. Do not drop the parent object.
3. State the Wave 1 rule in the docstring so Vach and Hayk import the module.
4. `ru.json` has the same keys as today’s `en.json`, in Russian. Add `ru` to `resources` and `supportedLngs`. Mariam adds the header button.

**Done when** the three codes still come from `languages.py`, `de` and `AM` raise `ValueError`, a missing `ru` row falls back to `en`, `i18n.changeLanguage('ru')` does not throw, health is `{"status":"ok"}`, and the Header is untouched.

```bash
cd backend
python manage.py shell
python manage.py test
```

Do not write catalog or content serializers. Do not put the language button in the Header.

## Հայերեն

Դու աշակերտ **3**-ն ես, Artush, ճյուղը՝ `feat/artush-i18n`, գոտին՝ `i18n`։ core-ի և i18n-ի README-ները չջնջել։

Wave 1-ն արդեն `dev`-ում է՝ `am`, `en`, `ru`, `BaseTranslation` և fallback կանոնը։ Կոդերի ցանկը չպատճենել։ Health-ի վью-ն չփոխել։

Թարմ `dev`-ը ձուլիր `feat/artush-i18n`-ի մեջ։ Մեկ PR, base-ը `dev`։ `--force` չանել։ Postgres չբարձրացնել։ Ավարտել մինչև հունվարի վերջ։ Դու Suro-ից հետո ես. **Lead → Suro → Artush → Vach → Hayk → Daniel → Mariam → Karen → Svet → Ashot**։

**Քոնն է՝** `backend/apps/core/translations.py`, `frontend/src/i18n/ru.json` և `ru`-ի գրանցումը `index.js`-ում։

**Քոնը չէ՝** health-ի վью-ն, կատալոգի մոդելները, Header-ը, `am.json`-ի և `en.json`-ի ներկա արժեքները։

**Քայլեր**

1. `parse_language(value)`։ `None`-ը և դատարկ տողը վերադարձնում են `en`։ `am`, `en`, `ru` անցնում են։ Մնացած ամեն արժեք, այդ թվում `AM`, `RU` և `hy`, բարձրացնում է `ValueError`։ Անհայտ կոդը լուռ `en` չդարձնել։
2. `pick_translation(rows, language)`։ Վերադարձրու այդ լեզվի տողը, ապա `en` տողը, ապա առաջինը ըստ լեզվի կոդի, ապա `None`։ Ծնող օբյեկտը չհանել։
3. Wave 1-ի կանոնը կարճ գրիր docstring-ում, որպեսզի Vach-ը և Hayk-ը ներմուծեն մոդուլը։
4. `ru.json`-ը ունի այսօրվա `en.json`-ի նույն բանալիները, ռուսերեն։ `ru`-ն ավելացրու `resources`-ին և `supportedLngs`-ին։ Կոճակը Header-ում դնում է Mariam-ը։

**Ավարտված է, երբ** երեք կոդը դեռ գալիս են `languages.py`-ից, `de`-ն և `AM`-ը բարձրացնում են `ValueError`, բացակա `ru` տողը ընկնում է `en`-ի վրա, `i18n.changeLanguage('ru')`-ն չի ընկնում, health-ը `{"status":"ok"}` է, իսկ Header-ը չի դիպչվել։

```bash
cd backend
python manage.py shell
python manage.py test
```

Կատալոգի և կոնտենտի սերիալիզատորներ չգրել։ Լեզվի կոճակը Header-ում չդնել։
