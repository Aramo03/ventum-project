import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { api } from '../../api/client.js'
import { STORE_LINKS } from './gateway.js'
import './gateway.css'

export default function Gateway() {
  const { t, i18n } = useTranslation()
  const [hero, setHero] = useState(null)
  const [requestFailed, setRequestFailed] = useState(false)

  useEffect(() => {
    let active = true

    api
      .get('/api/content/home-blocks/')
      .then(({ data }) => {
        if (!active) return
        const blocks = Array.isArray(data) ? data : []
        setHero(blocks.find((block) => block.slot === 'hero') ?? null)
        setRequestFailed(false)
      })
      .catch(() => {
        if (active) setRequestFailed(true)
      })

    return () => {
      active = false
    }
  }, [i18n.language, i18n.resolvedLanguage])

  return (
    <main className="gateway-page">
      <section className="gateway-hero" aria-labelledby="gateway-title">
        <p className="gateway-eyebrow">{t('brand')}</p>
        <h1 id="gateway-title">{hero?.title || t('stores.choose')}</h1>
        {hero?.text && <p className="gateway-copy">{hero.text}</p>}
        {requestFailed && (
          <p className="gateway-status" role="status">
            {t('gateway.contentUnavailable')}
          </p>
        )}
      </section>
      <section className="gateway-stores" aria-label={t('stores.choose')}>
        {STORE_LINKS.map((store) => (
          <Link className="gateway-store" key={store.to} to={store.to}>
            {t(store.key)}
            <span aria-hidden="true">↗</span>
          </Link>
        ))}
      </section>
    </main>
  )
}
