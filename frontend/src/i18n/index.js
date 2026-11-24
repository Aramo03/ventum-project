import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import am from './am.json'
import en from './en.json'
import ru from './ru.json'

const KNOWN_LANGUAGES = ['am', 'en', 'ru']

function languageBase(code) {
  return String(code || '').split('-')[0]
}

function isKnownLanguage(code) {
  return KNOWN_LANGUAGES.includes(languageBase(code))
}

const detector = new LanguageDetector()
const detectLanguage = detector.detect.bind(detector)
const cacheLanguage = detector.cacheUserLanguage.bind(detector)

detector.detect = () => {
  const found = detectLanguage()
  if (!found) return undefined
  const base = languageBase(found)
  return isKnownLanguage(base) ? base : found
}

detector.cacheUserLanguage = (lng) => {
  const next = languageBase(lng)
  if (!isKnownLanguage(next)) {
    cacheLanguage(lng)
    return
  }
  let stored = ''
  try {
    stored = localStorage.getItem('i18nextLng') || ''
  } catch {
    stored = ''
  }
  if (stored && !isKnownLanguage(stored) && next === 'en') return
  cacheLanguage(next)
}

i18n.use(detector).use(initReactI18next).init({
  resources: {
    am: { translation: am },
    en: { translation: en },
    ru: { translation: ru },
  },
  fallbackLng: 'en',
  supportedLngs: KNOWN_LANGUAGES,
  nonExplicitSupportedLngs: true,
  load: 'languageOnly',
  detection: {
    order: ['localStorage'],
    caches: ['localStorage'],
  },
  interpolation: { escapeValue: false },
})

function applyDocumentLang() {
  let stored = ''
  try {
    stored = localStorage.getItem('i18nextLng') || ''
  } catch {
    stored = ''
  }
  const base = languageBase(stored)
  const lang = isKnownLanguage(base)
    ? base
    : base || languageBase(i18n.resolvedLanguage || i18n.language) || 'en'
  if (typeof document === 'undefined') return
  document.documentElement.lang = lang
}

applyDocumentLang()
i18n.on('languageChanged', applyDocumentLang)

export default i18n
