import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FOOTER_LINKS } from './footer.js'
import './footer.css'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <strong>{t('brand')}</strong>
        {FOOTER_LINKS.map((item) => (
          <Link key={item.to} to={item.to}>
            {t(item.key)}
          </Link>
        ))}
        <a href="tel:+37410554433">{t('phone')}</a>
        <span>{t('footer.note')}</span>
      </div>
    </footer>
  )
}
