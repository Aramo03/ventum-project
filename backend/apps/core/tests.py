from django.test import SimpleTestCase

from apps.core.idram_language import idram_language


class IdramLanguageTests(SimpleTestCase):
    def test_supported_languages(self):
        for language, idram_code in (("am", "AM"), ("en", "EN"), ("ru", "RU")):
            with self.subTest(language=language):
                self.assertEqual(idram_language(language), idram_code)

    def test_empty_input_defaults_to_english(self):
        self.assertEqual(idram_language(""), "EN")

    def test_unsupported_language_raises_value_error(self):
        with self.assertRaises(ValueError):
            idram_language("de")

    def test_health_endpoint_returns_ok(self):
        response = self.client.get("/api/health/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "ok"})
