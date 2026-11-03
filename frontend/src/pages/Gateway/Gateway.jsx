import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { STORE_LINKS } from './gateway.js'
import './gateway.css'

export default function Gateway() {
  const { t } = useTranslation()

  return (
    <main className="page">
      <h1>{t('stores.choose')}</h1>
      <p>{t('pages.gatewayLead')}</p>
      <div className="store-links">
        {STORE_LINKS.map((store) => (
          <Link key={store.to} to={store.to}>
            {t(store.key)}
          </Link>
        ))}
      </div>
    </main>
  )
}
