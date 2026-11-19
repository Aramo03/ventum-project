import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { HOME_PATH } from './notFound.js'
import './notFound.css'

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <main className="not-found-page">
      <div className="not-found-layout">
        <aside className="not-found-aside" aria-hidden="true">
          <div className="not-found-aside__brand">
            <span className="not-found-aside__mark">V</span>
            <span>{t('brand')}</span>
          </div>
          <p className="not-found-aside__code">404</p>
          <div className="not-found-aside__rule" />
        </aside>

        <section className="not-found-card" aria-labelledby="not-found-title">
          <div>
            <span className="not-found-card__eyebrow">{t('pages.notFoundEyebrow')}</span>
            <h1 id="not-found-title">{t('pageTitles.notFound')}</h1>
          </div>
          <p className="not-found-card__copy">{t('pages.notFound')}</p>
          <p className="not-found-card__home">
            <Link to={HOME_PATH}>{t('pages.goHome')}</Link>
          </p>
        </section>
      </div>
    </main>
  )
}
