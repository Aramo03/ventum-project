from .translations import parse_language


def idram_language(value):
    language = parse_language(value)

    mapping = {
        "am": "AM",
        "en": "EN",
        "ru": "RU",
    }

    return mapping[language]
