# i18n — Artush

**Ветка:** `feat/artush-i18n`  
**Задание:** [task-advanced.md](../../../task-advanced.md) — «Artush · i18n».

`views.py` ручки `/api/health/` не меняй.

Добавь `languages.py`: коды `am`, `en`, `ru`. Добавь абстрактную модель перевода: язык из этого списка, пара с родителем уникальна. В docstring: если перевода нет, объект не пропадает, текст берётся из `en`.

Файлы `frontend/src/i18n/` не меняй.

**Lead не мержит, пока:** три кода импортируются из одного модуля, миграция ядра проходит, health отвечает `{"status":"ok"}`.

## English

Artush. Language list and the abstract translation model. Do not change the health view or the frontend JSON.

## Հայերեն

Artush։ Լեզուների ցանկը և թարգմանության աբստրակտ մոդելը։ Health-ը և frontend JSON-ը չփոխել։
