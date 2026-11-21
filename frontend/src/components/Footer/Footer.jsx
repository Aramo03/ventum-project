import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { api } from '../../api/client'
import './footer.css'

const EMPTY_WHOLESALE = {
  name: '',
  phone: '',
  email: '',
  text: '',
}

export default function Footer() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState(null)
  const [wholesaleOpen, setWholesaleOpen] = useState(false)
  const [wholesaleData, setWholesaleData] = useState(EMPTY_WHOLESALE)
  const [wholesaleStatus, setWholesaleStatus] = useState(null)

  const handleNewsletterSubmit = async (event) => {
    event.preventDefault()
    try {
      await api.post('/api/leads/newsletter/', { email })
      setNewsletterStatus({
        success: true,
        message: t('footer.newsletterSuccess'),
      })
      setEmail('')
    } catch {
      setNewsletterStatus({
        success: false,
        message: t('footer.submitError'),
      })
    }
  }

  const handleWholesaleSubmit = async (event) => {
    event.preventDefault()
    try {
      await api.post('/api/leads/wholesale/', {
        name: wholesaleData.name,
        phone: wholesaleData.phone,
        email: wholesaleData.email,
        text: wholesaleData.text,
      })
      setWholesaleStatus({
        success: true,
        message: t('footer.wholesaleSuccess'),
      })
      setWholesaleData(EMPTY_WHOLESALE)
    } catch {
      setWholesaleStatus({
        success: false,
        message: t('footer.submitError'),
      })
    }
  }

  const setField = (field) => (event) => {
    setWholesaleData((current) => ({ ...current, [field]: event.target.value }))
  }

  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div>
          <h2>{t('brand')}</h2>
          <p>{t('footer.description')}</p>
          <p>{t('footer.note')}</p>
          <p>
            © {new Date().getFullYear()} Ventum. {t('footer.rights')}
          </p>
        </div>

        <nav aria-label={t('footer.navigation')}>
          <h2>{t('footer.navigation')}</h2>
          <Link to="/">{t('nav.home')}</Link>
          <Link to="/textile">{t('nav.textile')}</Link>
          <Link to="/baby">{t('nav.baby')}</Link>
          <Link to="/cart">{t('nav.cart')}</Link>
        </nav>

        <form onSubmit={handleNewsletterSubmit}>
          <h2>{t('footer.newsletterTitle')}</h2>
          <p>{t('footer.newsletterHint')}</p>
          <label className="vt-field">
            <span>{t('footer.newsletterEmail')}</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <button className="vt-button" type="submit">
            {t('footer.newsletterSubmit')}
          </button>
          {newsletterStatus && (
            <p
              className={newsletterStatus.success ? 'vt-status vt-status--ok' : 'vt-status vt-status--error'}
              role="status"
            >
              {newsletterStatus.message}
            </p>
          )}
        </form>

        <div>
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
      </div>

      {wholesaleOpen && (
        <form className="site-footer__form" onSubmit={handleWholesaleSubmit}>
          <label className="vt-field">
            <span>{t('footer.wholesaleName')}</span>
            <input type="text" value={wholesaleData.name} onChange={setField('name')} required />
          </label>
          <label className="vt-field">
            <span>{t('footer.wholesalePhone')}</span>
            <input type="text" value={wholesaleData.phone} onChange={setField('phone')} required />
          </label>
          <label className="vt-field site-footer__wide">
            <span>{t('footer.wholesaleEmail')}</span>
            <input type="email" value={wholesaleData.email} onChange={setField('email')} required />
          </label>
          <label className="vt-field site-footer__wide">
            <span>{t('footer.wholesaleText')}</span>
            <textarea value={wholesaleData.text} onChange={setField('text')} required />
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
