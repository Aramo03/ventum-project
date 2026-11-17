import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { HOME_PATH } from './notFound.js'
import './notFound.css'

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <main className="page not-found">
      <h1>{t('pageTitles.notFound')}</h1>
      <p>{t('pages.notFound')}</p>
      <p className="not-found__home">
        <Link to={HOME_PATH}>{t('pages.goHome')}</Link>
      </p>
    </main>
  )
}
