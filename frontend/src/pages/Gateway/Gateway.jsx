import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { api } from '../../api/client.js'
import { STORE_LINKS } from './gateway.js'
import '../../design/controls.css'
import './gateway.css'

import textileLogo from './textile-logo.jpg'
import bedroomPhoto from './bedroom.jpg'
import babyLogo from './baby-logo.jpg'
import nurseryPhoto from './nursery.jpg'

const STORY_DETAILS = {
  '/textile': {
    kind: 'textile',
    logo: textileLogo,
    photo: bedroomPhoto,
    promise: 'header.textileTagline',
    caption: 'gateway.textileCaption',
    designation: 'gateway.textileType',
    title: 'gateway.textileTitle',
    description: 'gateway.textileDescription',
    action: 'gateway.textileAction',
    categories: 'gateway.textileCategories',
  },
  '/baby': {
    kind: 'baby',
    logo: babyLogo,
    photo: nurseryPhoto,
    promise: 'header.babyTagline',
    caption: 'gateway.babyCaption',
    designation: 'gateway.babyType',
    title: 'gateway.babyTitle',
    description: 'gateway.babyDescription',
    action: 'gateway.babyAction',
    categories: 'gateway.babyCategories',
  },
}

function HomeBlock({ hero }) {
  if (!hero?.title && !hero?.text) return null

  return (
    <aside className="gateway-home-block" aria-live="polite">
      {hero.title ? <strong>{hero.title}</strong> : null}
      {hero.text ? <span>{hero.text}</span> : null}
    </aside>
  )
}

function StoryPanel({ store, t }) {
  const story = STORY_DETAILS[store.to]
  const categoryList = t(story.categories).split(' · ')

  return (
    <section
      className={`gateway-panel gateway-panel--${story.kind}`}
      data-brand={story.kind}
      aria-labelledby={`gateway-${story.kind}-title`}
    >
      <div className="gateway-panel__tag">
        <span>{t(story.caption)}</span>
        <span>{t(story.promise)}</span>
      </div>

      <img className="gateway-panel__logo" src={story.logo} alt={t(store.key)} />

      <span className="gateway-panel__designation">{t(story.designation)}</span>
      <h2 id={`gateway-${story.kind}-title`}>{t(story.title)}</h2>
      <p className="gateway-panel__description">{t(story.description)}</p>

      <Link className="gateway-panel__action ds-btn ds-btn--card" to={store.to}>
        {t(story.action)}
      </Link>

      <img
        className="gateway-panel__photo"
        src={story.photo}
        alt=""
        loading="lazy"
      />

      <ul className="gateway-panel__categories" aria-label={t(story.caption)}>
        {categoryList.map((category) => (
          <li key={category}>{category}</li>
        ))}
      </ul>
    </section>
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
      <HomeBlock hero={hero} />
      {requestFailed ? (
        <p className="gateway-request-status" role="status">
          {t('gateway.contentUnavailable')}
        </p>
      ) : null}

      {STORE_LINKS.map((store) => (
        <StoryPanel key={store.to} store={store} t={t} />
      ))}
    </main>
  )
}
