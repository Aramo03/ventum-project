import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ProductCard from '../../components/ProductCard/ProductCard.jsx'
import CatalogState from '../../components/CatalogState/CatalogState.jsx'
import {
  ASSURANCE_KEYS,
  CARE_STEP_KEYS,
  STORE_KEY,
  STORY_PILLAR_KEYS,
  fetchBabyCatalog,
  filterBabyProducts,
} from './baby.js'
import './baby.css'

function scrollToId(id) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.getElementById(id)?.scrollIntoView({
    behavior: reduced ? 'auto' : 'smooth',
    block: 'start',
  })
}

export default function Baby() {
  const { t, i18n } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()

  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const activeCategory = searchParams.get('category') || ''
  const activeQuery = searchParams.get('q') || ''

  const loadCatalog = useCallback(async () => {
    setLoading(true)
    setError(false)
    try {
      const data = await fetchBabyCatalog()
      setCategories(data.categories)
      setProducts(data.products)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadCatalog()
  }, [loadCatalog, i18n.language])

  const filteredProducts = useMemo(
    () =>
      filterBabyProducts(products, {
        category: activeCategory,
        q: activeQuery,
      }),
    [products, activeCategory, activeQuery],
  )

  function writeCategory(slug) {
    const next = new URLSearchParams(searchParams)
    if (!slug || slug === activeCategory) next.delete('category')
    else next.set('category', slug)
    setSearchParams(next)
    scrollToId('baby-collection')
  }

  function clearFilters() {
    const next = new URLSearchParams(searchParams)
    next.delete('category')
    next.delete('q')
    setSearchParams(next)
  }

  function scrollToCollection() {
    scrollToId('baby-collection')
  }

  return (
    <main className="baby-page" data-brand={STORE_KEY}>
      {/* 1. Seasonal editorial */}
      <section className="baby-section baby-editorial ds-reveal">
        <div className="baby-container baby-editorial__grid">
          <div>
            <span className="baby-eyebrow">{t('baby.editorial.eyebrow')}</span>
            <h1 className="baby-editorial__title">{t('baby.editorial.title')}</h1>
            <p className="baby-editorial__text">{t('baby.editorial.description')}</p>
            <button type="button" className="baby-btn baby-btn--primary" onClick={scrollToCollection}>
              {t('baby.editorial.cta')}
            </button>
          </div>
          <div className="baby-editorial__media" aria-label={t('baby.editorial.mediaAlt')}>
            <div className="baby-editorial__photo">
              <span>{t('baby.editorial.caption')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Shopping assurances */}
      <section className="baby-section baby-assurances ds-reveal">
        <div className="baby-container baby-assurances__grid">
          {ASSURANCE_KEYS.map((item) => (
            <article key={item.id} className="baby-assurance">
              <h2>{t(item.titleKey)}</h2>
              <p>{t(item.textKey)}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Shop by category */}
      <section className="baby-section ds-reveal">
        <div className="baby-container">
          <h2 className="baby-section-title">{t('baby.categories.heading')}</h2>
          <p className="baby-section-subtitle">{t('baby.categories.subheading')}</p>
          <div className="baby-category-grid">
            <button
              type="button"
              className={`baby-category ${!activeCategory ? 'is-active' : ''}`}
              onClick={() => writeCategory('')}
            >
              {t('baby.categories.all')}
            </button>
            {categories.map((category) => (
              <button
                key={category.slug}
                type="button"
                className={`baby-category ${activeCategory === category.slug ? 'is-active' : ''}`}
                onClick={() => writeCategory(category.slug)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Shoppable product collection */}
      <section id="baby-collection" className="baby-section baby-collection ds-reveal">
        <div className="baby-container">
          <div className="baby-collection__header">
            <div>
              <h2 className="baby-section-title">{t('baby.collection.heading')}</h2>
              <p className="baby-section-subtitle">
                {t('baby.collection.count', { count: filteredProducts.length })}
              </p>
            </div>
            {(activeCategory || activeQuery) && (
              <div className="baby-filters">
                {activeCategory && (
                  <span className="baby-chip">
                    {t('baby.collection.categoryLabel')}: {activeCategory}
                  </span>
                )}
                {activeQuery && (
                  <span className="baby-chip">
                    {t('baby.collection.searchLabel')}: {activeQuery}
                  </span>
                )}
                <button type="button" className="baby-btn baby-btn--ghost" onClick={clearFilters}>
                  {t('baby.collection.resetFilters')}
                </button>
              </div>
            )}
          </div>

          {loading ? (
            <CatalogState state="loading" brand={STORE_KEY} />
          ) : error ? (
            <CatalogState state="error" brand={STORE_KEY} onRetry={loadCatalog} />
          ) : filteredProducts.length === 0 ? (
            <CatalogState state="empty" brand={STORE_KEY} onReset={clearFilters} />
          ) : (
            <div className="baby-product-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.sku} product={product} brand={STORE_KEY} />
              ))}
            </div>
          )}

          <div className="baby-collection__footer">
            <button
              type="button"
              className="baby-btn baby-btn--secondary"
              onClick={activeCategory || activeQuery ? clearFilters : scrollToCollection}
            >
              {activeCategory || activeQuery
                ? t('baby.collection.showAll')
                : t('baby.collection.backToTop')}
            </button>
          </div>
        </div>
      </section>

      {/* 5. Brand story and care */}
      <section
        id="brand-story"
        className="baby-section baby-story ds-reveal"
        aria-labelledby="baby-story-title"
      >
        <div className="baby-container baby-story__layout">
          <div>
            <span className="baby-eyebrow">{t('baby.story.eyebrow')}</span>
            <h2 id="baby-story-title" className="baby-section-title">
              {t('baby.story.title')}
            </h2>
            <p>{t('baby.story.philosophy')}</p>
          </div>
          <ul className="baby-story__pillars">
            {STORY_PILLAR_KEYS.map((key) => (
              <li key={key}>{t(key)}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. Parent care guide (отдельная секция) */}
      <section className="baby-section baby-care ds-reveal" aria-labelledby="baby-care-title">
        <div className="baby-container">
          <span className="baby-eyebrow">{t('baby.care.eyebrow')}</span>
          <h2 id="baby-care-title" className="baby-section-title">{t('baby.care.title')}</h2>
          <p className="baby-section-subtitle">{t('baby.care.intro')}</p>
          <ol className="baby-care__steps">
            {CARE_STEP_KEYS.map((key) => (
              <li key={key}>{t(key)}</li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  )
}