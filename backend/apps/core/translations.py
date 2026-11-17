from apps.core.languages import DEFAULT_LANGUAGE, LANGUAGE_CODES


def parse_language(value):
    """Default missing or blank input to English; reject unsupported codes."""
    if value is None or (isinstance(value, str) and not value.strip()):
        return DEFAULT_LANGUAGE
    if isinstance(value, str) and value in LANGUAGE_CODES:
        return value
    raise ValueError(f"Unsupported language code: {value!r}")


def pick_translation(rows, language):
    """Return the requested row, English, alphabetically first, or None.

    Keep the parent in API results even when no translation exists.
    """
    rows = sorted(rows, key=lambda row: row.language)
    for row in rows:
        if row.language == language:
            return row
    for row in rows:
        if row.language == DEFAULT_LANGUAGE:
            return row
    return rows[0] if rows else None
