import { useTranslation } from 'react-i18next'
import './baby.css'

export default function Baby() {
  const { t } = useTranslation()

  return (
    <main className="page">
      <h1>{t('stores.baby')}</h1>
      <p>{t('pages.babyLead')}</p>
    </main>
  )
}
