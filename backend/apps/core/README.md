# i18n — Artush (backend)

**Ветка:** `feat/artush-i18n`  
**Задание B1:** [task-advanced.md](../../../task-advanced.md) — «Artush · i18n».

Здесь живут health и будущее поле языков. `views.py` ручки `/api/health/` не меняй.

Добавь `languages.py`: коды `am`, `en`, `ru`. Добавь абстрактную модель перевода: язык из этого списка, пара с родителем уникальна. В docstring — если перевода нет, объект не пропадает, текст берётся из `en`.

`ru.json` на фронте — волна F1, см. [frontend/src/i18n/README.md](../../../frontend/src/i18n/README.md).

**Lead не мержит, пока:** три кода импортируются из одного модуля, миграция ядра проходит, health отвечает `{"status":"ok"}`.

## English

Artush. B1 is the language list and the abstract translation model in this app. Do not change the health view. `ru.json` is F1.

## Հայերեն

Artush։ B1-ում լեզուների ցանկը և թարգմանության աբստրակտ մոդելը։ Health-ը չփոխել։ `ru.json`-ը F1-ում է։
