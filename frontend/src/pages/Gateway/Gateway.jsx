import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { api } from '../../api/client.js'
import { STORE_LINKS } from './gateway.js'
import './gateway.css'

const STORE_COPY = {
  '/textile': {
    kind: 'textile',
    caption: 'gateway.textileCaption',
    title: 'gateway.textileTitle',
    description: 'gateway.textileDescription',
    action: 'gateway.textileAction',
  },
  '/baby': {
    kind: 'baby',
    caption: 'gateway.babyCaption',
    title: 'gateway.babyTitle',
    description: 'gateway.babyDescription',
    action: 'gateway.babyAction',
  },
}

function Swatches() {
  return (
    <span className="vt-swatches" aria-hidden="true">
      <span className="vt-swatch vt-swatch--ink" />
      <span className="vt-swatch vt-swatch--muted" />
      <span className="vt-swatch vt-swatch--accent" />
    </span>
  )
}

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
      <header className="vt-type">
        <p className="vt-eyebrow">{t('brand')}</p>
        <h1>{t('gateway.identitiesTitle')}</h1>
        <p className="vt-lead">{t('gateway.identitiesLead')}</p>
      </header>

      {hero?.title || hero?.text ? (
        <section className="gateway-welcome" aria-labelledby="gateway-welcome-title">
          <h2 id="gateway-welcome-title">{hero?.title || t('stores.choose')}</h2>
          {hero?.text ? <p>{hero.text}</p> : null}
        </section>
      ) : null}

      {requestFailed ? (
        <p className="vt-status" role="status">
          {t('gateway.contentUnavailable')}
        </p>
      ) : null}

      <section className="gateway-stores" aria-label={t('stores.choose')}>
        {STORE_LINKS.map((store) => {
          const copy = STORE_COPY[store.to]
          return (
            <Link
              className={`vt-identity vt-identity--${copy.kind}`}
              key={store.to}
              to={store.to}
            >
              <Swatches />
              <span className="vt-identity__kicker">{t(copy.caption)}</span>
              <h2>{t(store.key)}</h2>
              <p>
                <strong>{t(copy.title)}</strong>
                {' '}
                {t(copy.description)}
              </p>
              <span className="vt-button">{t(copy.action)}</span>
            </Link>
          )
        })}
      </section>
    </main>
  )
}
