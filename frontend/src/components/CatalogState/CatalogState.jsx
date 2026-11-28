import { useTranslation } from 'react-i18next'
import { emptyCopy, shopBrand } from './catalogState'
import '../../design/controls.css'
import './catalogState.css'

function SkeletonCard() {
  return (
    <div className="catalog-skeleton ds-skeleton" aria-hidden="true">
      <i className="catalog-skeleton__photo ds-skeleton__photo" />
      <i className="catalog-skeleton__name ds-skeleton__name" />
      <i className="catalog-skeleton__spec ds-skeleton__spec" />
      <span className="catalog-skeleton__sizes ds-skeleton__sizes">
        <i />
        <i />
        <i />
      </span>
      <i className="catalog-skeleton__price ds-skeleton__price" />
      <span className="catalog-skeleton__buttons ds-skeleton__buttons">
        <i />
        <i />
      </span>
    </div>
  )
}

export default function CatalogState({ state, brand, onRetry, onReset }) {
  const { t } = useTranslation()
  const shop = shopBrand(brand)

  if (state === 'loading') {
    return (
      <div className="catalog-state" data-brand={shop} aria-busy="true">
        <p className="catalog-state__sr">{t('common.loading')}</p>
        <div className="catalog-state__grid">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    )
  }

  if (state === 'error') {
    return (
      <section className="catalog-state catalog-state--panel" data-brand={shop} role="alert">
        <h2 className="catalog-state__title">{t('catalogState.errorTitle')}</h2>
        <p className="catalog-state__text">{t('catalogState.errorText')}</p>
        <button type="button" className="ds-btn ds-btn--card" onClick={onRetry}>
          {t('catalogState.retry')}
        </button>
      </section>
    )
  }

  const copy = emptyCopy(shop)

  return (
    <section className="catalog-state catalog-state--panel" data-brand={shop}>
      <h2 className="catalog-state__title">{t(copy.titleKey)}</h2>
      <p className="catalog-state__text">{t(copy.textKey)}</p>
      {copy.actionKey ? (
        <button type="button" className="ds-btn ds-btn--card" onClick={onReset}>
          {t(copy.actionKey)}
        </button>
      ) : null}
    </section>
  )
}
