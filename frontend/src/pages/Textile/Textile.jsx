import { useTranslation } from 'react-i18next'
import './textile.css'

export default function Textile() {
  const { t } = useTranslation()

  return (
    <main className="page">
      <h1>{t('stores.textile')}</h1>
      <p>{t('pages.textileLead')}</p>
    </main>
  )
}
