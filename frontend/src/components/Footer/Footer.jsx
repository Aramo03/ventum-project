import { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { api } from '../../api/client'
import { footerConfig, isValidEmail } from './footer.js'
import '../../design/controls.css'
import './footer.css'

const EMPTY_WHOLESALE = {
  name: '',
  phone: '',
  email: '',
  text: '',
}

export default function Footer() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const isShop = pathname === '/textile' || pathname === '/baby'
  const brand = pathname.startsWith('/baby')
    ? 'baby'
    : pathname.startsWith('/textile')
      ? 'textile'
      : undefined

  const [email, setEmail] = useState('')
  const [newsletterState, setNewsletterState] = useState('default')
  const [serverError, setServerError] = useState('')
  const sending = useRef(false)

  const [wholesaleOpen, setWholesaleOpen] = useState(false)
  const [wholesaleData, setWholesaleData] = useState(EMPTY_WHOLESALE)
  const [wholesaleStatus, setWholesaleStatus] = useState(null)

  const fieldLocked = newsletterState === 'loading'

  async function handleNewsletterSubmit(event) {
    event.preventDefault()
    if (sending.current || fieldLocked) return
    if (!isValidEmail(email)) {
      setServerError('')
      setNewsletterState('invalid')
      return
    }

    sending.current = true
    setServerError('')
    setNewsletterState('loading')
    try {
      await api.post('/api/leads/newsletter/', { email: email.trim() })
      setNewsletterState('success')
      setEmail('')
    } catch {
      setNewsletterState('default')
      setServerError(t('footer.submitError'))
    } finally {
      sending.current = false
    }
  }

  async function handleWholesaleSubmit(event) {
    event.preventDefault()
    const payload = {
      name: wholesaleData.name.trim(),
      phone: wholesaleData.phone.trim(),
      email: wholesaleData.email.trim(),
      text: wholesaleData.text.trim(),
    }
    if (!payload.name || !payload.phone || !payload.email || !payload.text) return
    try {
      await api.post('/api/leads/wholesale/', payload)
      setWholesaleStatus({ success: true, message: t('footer.wholesaleSuccess') })
      setWholesaleData(EMPTY_WHOLESALE)
    } catch {
      setWholesaleStatus({ success: false, message: t('footer.submitError') })
    }
  }

  function setField(field) {
    return (event) => {
      setWholesaleData((current) => ({ ...current, [field]: event.target.value }))
    }
  }

  const year = new Date().getFullYear()

  return (
    <footer className="site-footer" data-brand={brand} data-variant={isShop ? 'shop' : 'home'}>
      {isShop ? (
        <div className="site-footer__shop">
          <div className="site-footer__info">
            <h2>{t('brand')}</h2>
            <p>{t('footer.description')}</p>
            <nav aria-label={t('footer.navigation')}>
              <Link to="/">{t('nav.home')}</Link>
              <Link to="/textile">{t('nav.textile')}</Link>
              <Link to="/baby">{t('nav.baby')}</Link>
              <Link to="/cart">{t('nav.cart')}</Link>
            </nav>
          </div>
          <hr className="site-footer__divider" />
          <div className="site-footer__legal">
            <p>
              © {year} Ventum. {t('footer.rights')}
            </p>
            <div className="site-footer__payments" aria-label={t('footer.payments')}>
              <span className="ds-pay ds-pay--visa">VISA</span>
              <span className="ds-pay ds-pay--mastercard">
                <span className="ds-pay__circles" aria-hidden="true">
                  <span />
                  <span />
                </span>
                Mastercard
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="site-footer__home">
          <div className="site-footer__contact">
            <h2>{t('footer.contactTitle')}</h2>
            <p>{footerConfig.contact.phone}</p>
            <p>{footerConfig.contact.email}</p>
            <p>{t('footer.note')}</p>
          </div>
          <p className="site-footer__copyright">
            © {year} Ventum. {t('footer.rights')}
          </p>
        </div>
      )}

      <form className="site-footer__newsletter" noValidate onSubmit={handleNewsletterSubmit}>
        <h2>{t('footer.newsletterTitle')}</h2>
        <p>{t('footer.newsletterHint')}</p>
        <label
          className={[
            'ds-field',
            newsletterState === 'invalid' ? 'is-invalid' : '',
            newsletterState === 'success' ? 'is-success' : '',
            newsletterState === 'loading' ? 'is-loading' : '',
            fieldLocked ? 'is-disabled' : '',
          ].filter(Boolean).join(' ')}
        >
          <span>{t('footer.newsletterEmail')}</span>
          <input
            type="email"
            value={email}
            placeholder={t('footer.newsletterPlaceholder')}
            aria-invalid={newsletterState === 'invalid'}
            disabled={fieldLocked}
            onChange={(event) => {
              setEmail(event.target.value)
              if (newsletterState === 'invalid' || newsletterState === 'success') {
                setNewsletterState('default')
                setServerError('')
              }
            }}
          />
          {newsletterState === 'loading' && <span className="ds-field__spinner" aria-hidden="true" />}
          {newsletterState === 'invalid' && (
            <p className="ds-field__hint" role="alert">
              {t('footer.newsletterInvalid')}
            </p>
          )}
          {newsletterState === 'success' && (
            <p className="ds-field__hint" role="status">
              {t('footer.newsletterSuccess')}
            </p>
          )}
          {serverError && (
            <p className="ds-field__hint" role="alert">
              {serverError}
            </p>
          )}
        </label>
        <button className="vt-button" type="submit" disabled={fieldLocked}>
          {fieldLocked ? t('common.loading') : t('footer.newsletterSubmit')}
        </button>
      </form>

      <div className="site-footer__wholesale">
        <h2>{t('footer.wholesaleTitle')}</h2>
        <p>{t('footer.wholesaleHint')}</p>
        <button
          className="vt-button vt-button--ghost"
          type="button"
          onClick={() => setWholesaleOpen((open) => !open)}
        >
          {wholesaleOpen ? t('footer.closeForm') : t('footer.wholesaleTitle')}
        </button>
      </div>

      {wholesaleOpen && (
        <form className="site-footer__form" noValidate onSubmit={handleWholesaleSubmit}>
          <label className="vt-field">
            <span>{t('footer.wholesaleName')}</span>
            <input type="text" value={wholesaleData.name} onChange={setField('name')} />
          </label>
          <label className="vt-field">
            <span>{t('footer.wholesalePhone')}</span>
            <input type="text" value={wholesaleData.phone} onChange={setField('phone')} />
          </label>
          <label className="vt-field site-footer__wide">
            <span>{t('footer.wholesaleEmail')}</span>
            <input type="email" value={wholesaleData.email} onChange={setField('email')} />
          </label>
          <label className="vt-field site-footer__wide">
            <span>{t('footer.wholesaleText')}</span>
            <textarea value={wholesaleData.text} onChange={setField('text')} />
          </label>
          <div className="site-footer__wide">
            <button className="vt-button" type="submit">
              {t('footer.wholesaleSubmit')}
            </button>
          </div>
          {wholesaleStatus && (
            <p
              className={`site-footer__wide ${wholesaleStatus.success ? 'vt-status vt-status--ok' : 'vt-status vt-status--error'}`}
              role="status"
            >
              {wholesaleStatus.message}
            </p>
          )}
        </form>
      )}
    </footer>
  )
}
