import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { api } from '../../api/client.js'
import { STORE_LINKS } from './gateway.js'
import babyIllustration from './baby-illustration.webp'
import './gateway.css'

const STORE_COPY = {
  '/textile': {
    kind: 'textile',
    caption: 'gateway.textileCaption',
    type: 'gateway.textileType',
    title: 'gateway.textileTitle',
    titleFallback: 'Woven for quiet mornings.',
    description: 'gateway.textileDescription',
    descriptionFallback: 'Breathable natural fabrics and timeless linen crafted to bring effortless serenity to your everyday living.',
    action: 'gateway.textileAction',
    actionFallback: 'Explore Home',
    categories: 'gateway.textileCategories',
    categoriesFallback: 'Bed Linen · Natural Fabrics · Home Textiles',
  },
  '/baby': {
    kind: 'baby',
    caption: 'gateway.babyCaption',
    type: 'gateway.babyType',
    title: 'gateway.babyTitle',
    titleFallback: 'Little moments, endless love.',
    description: 'gateway.babyDescription',
    descriptionFallback: 'Pure, cloud-soft essentials thoughtfully designed to cradle your baby from their very first breath.',
    action: 'gateway.babyAction',
    actionFallback: 'Explore Baby',
    categories: 'gateway.babyCategories',
    categoriesFallback: 'Apparel · Bedding Sets · Nursery · Essentials',
  },
}

function TextileArtwork() {
  return (
    <svg className="gateway-textile-art" viewBox="0 0 600 300" role="img" aria-label="Ventum Textile">
      <rect width="600" height="300" rx="16" fill="#DDF2CD" />
      <path d="M183 86c49-22 92-20 130-4 30 13 67 16 104 7v24c-43 12-86 9-121-5-34-13-72-12-113 6V86Z" fill="#4E5250" />
      <path d="M183 123c44-18 84-18 119-4 37 15 77 18 115 6v22c-44 13-87 9-123-5-34-13-71-11-111 5v-24Z" fill="#4E5250" />
      <path d="M307 35c28 0 45 18 44 46-1 22-14 36-38 42-18-21-23-42-16-61 2-10 6-19 10-27Z" fill="#65C51D" />
      <path d="M354 73c21-17 41-17 58-2-7 20-24 31-51 31-5-10-7-19-7-29Z" fill="#65C51D" />
      <text x="300" y="192" textAnchor="middle" fill="#66BE26" fontFamily="Georgia, serif" fontSize="48" letterSpacing="-2">VENTUM</text>
      <text x="300" y="222" textAnchor="middle" fill="#404541" fontFamily="Georgia, serif" fontSize="24" fontStyle="italic">textile</text>
      <path d="M184 245c48 15 85 16 119 4 35-12 72-13 114-1v12c-44-10-79-10-111 1-39 13-77 12-122-2v-14Z" fill="#4E5250" />
      <path d="M190 268c44 13 79 14 113 3 38-11 74-12 109-1v10H190v-12Z" fill="#4E5250" />
    </svg>
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
      {hero?.title || hero?.text ? (
        <section className="gateway-welcome" aria-labelledby="gateway-welcome-title">
          <h1 id="gateway-welcome-title">{hero?.title || t('stores.choose')}</h1>
          {hero?.text && <p>{hero.text}</p>}
        </section>
      ) : (
        <h1 className="gateway-visually-hidden">{t('stores.choose')}</h1>
      )}
      {requestFailed && (
        <p className="gateway-status" role="status">
          {t('gateway.contentUnavailable')}
        </p>
      )}
      <section className="gateway-stores" aria-label={t('stores.choose')}>
        {STORE_LINKS.map((store) => {
          const copy = STORE_COPY[store.to]
          return (
            <Link className={`gateway-store gateway-store--${copy.kind}`} key={store.to} to={store.to}>
              <span className="gateway-store__topline">
                <span>{t(store.key).toUpperCase()}</span>
                <span>{t(copy.caption, { defaultValue: copy.kind === 'textile' ? 'Sanctuary for your home' : 'A gentle world for little ones' })}</span>
              </span>
              <span className="gateway-store__identity">
                <span className="gateway-store__brand">VENTUM</span>
                <span className="gateway-store__type">{t(copy.type)}</span>
              </span>
              <span className="gateway-store__message">
                <span className="gateway-store__title">{t(copy.title, { defaultValue: copy.titleFallback })}</span>
                <span className="gateway-store__description">{t(copy.description, { defaultValue: copy.descriptionFallback })}</span>
              </span>
              <span className="gateway-store__cta">{t(copy.action, { defaultValue: copy.actionFallback })}</span>
              <span className="gateway-store__art">
                {copy.kind === 'textile' ? (
                  <TextileArtwork />
                ) : (
                  <img src={babyIllustration} alt="" />
                )}
              </span>
              <span className="gateway-store__categories">
                {t(copy.categories, { defaultValue: copy.categoriesFallback })}
              </span>
            </Link>
          )
        })}
      </section>
    </main>
  )
}
