import { useTranslation } from 'react-i18next'
import './notFound.css'

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <main className="page">
      <h1>{t('pageTitles.notFound')}</h1>
      <p>{t('pages.notFound')}</p>
    </main>
  )
}
