from .translations import parse_language


_IDRAM_CODES = {
    "am": "AM",
    "en": "EN",
    "ru": "RU",
}


def idram_language(value):
    """Validate a Ventum language code and return Idram's uppercase code."""
    language = parse_language(value)
    return _IDRAM_CODES[language]
