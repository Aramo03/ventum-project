import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { HOME_PATH } from './notFound.js'
import './notFound.css'

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <main className="not-found-page">
      <section className="vt-panel" aria-labelledby="not-found-title">
        <div className="vt-type">
          <p className="vt-eyebrow">{t('pages.notFoundEyebrow')}</p>
          <h1 id="not-found-title">{t('pageTitles.notFound')}</h1>
        </div>
        <p className="vt-status">{t('pages.notFound')}</p>
        <Link className="vt-button" to={HOME_PATH}>
          {t('pages.goHome')}
        </Link>
      </section>
    </main>
  )
}
