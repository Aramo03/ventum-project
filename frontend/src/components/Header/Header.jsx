import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LANGUAGES, NAV_ITEMS, PHONE } from './header.js'
import './header.css'

export default function Header() {
  const { t, i18n } = useTranslation()

  return (
    <header className="site-header">
      <div className="site-header__bar">
        <span>{t('delivery')}</span>
        <a href={`tel:${PHONE.replace(/\s/g, '')}`}>{t('phone')}</a>
      </div>
      <div className="site-header__tools">
        <Link className="site-header__brand" to="/">
          {t('brand')}
        </Link>
        <input
          type="search"
          readOnly
          placeholder={t('searchPlaceholder')}
          aria-label={t('searchPlaceholder')}
        />
        <div>
          {LANGUAGES.map((language) => (
            <button
              key={language.code}
              type="button"
              className="site-header__lang"
              aria-pressed={(i18n.resolvedLanguage || i18n.language || 'en').startsWith(language.code)}
              onClick={() => i18n.changeLanguage(language.code)}
            >
              {language.label}
            </button>
          ))}
        </div>
        <button type="button" className="site-header__icon" disabled>
          {t('account')}
        </button>
        <button type="button" className="site-header__icon" disabled>
          {t('cart')} 0
        </button>
      </div>
      <nav className="site-header__nav" aria-label={t('brand')}>
        {NAV_ITEMS.map((item) => (
          <span key={item.key} className="site-header__nav-item">
            {t(item.key)}
          </span>
        ))}
        <button type="button" className="site-header__wholesale" disabled>
          {t('wholesale')}
        </button>
      </nav>
    </header>
  )
}
