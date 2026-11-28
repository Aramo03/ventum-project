import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ProductCard from '../../components/ProductCard/ProductCard.jsx'
import CatalogState from '../../components/CatalogState/CatalogState.jsx'
import {
  ASSURANCE_KEYS,
  CARE_STEP_KEYS,
  STORE_KEY,
  fetchBabyCatalog,
  filterBabyProducts,
} from './baby.js'
import './baby.css'

const HERO_IMAGE = '/baby/hero.png'
const STORY_IMAGE = '/baby/story.png'
const CATEGORY_IMAGES = [
  '/baby/category-1.png',
  '/baby/category-2.png',
  '/baby/category-3.png',
  '/baby/category-4.png',
  '/baby/category-5.png',
]

function scrollToId(id) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.getElementById(id)?.scrollIntoView({
    behavior: reduced ? 'auto' : 'smooth',
    block: 'start',
  })
}

function Photo({ src, alt = '', eager = false }) {
  return (
    <img
      className="baby-photo__img"
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
        display: 'block',
        margin: 0,
        padding: 0,
        border: 0,
        borderRadius: 0,
      }}
      onError={(e) => {
        e.currentTarget.style.visibility = 'hidden'
      }}
    />
  )
}

export default function Baby() {
  const { t, i18n } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()

  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [showCare, setShowCare] = useState(false)

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

  const hasFilters = Boolean(activeCategory || activeQuery)

  return (
    <main className="baby-page" data-brand={STORE_KEY}>
      {/* 1. Hero */}
      <section className="baby-section baby-hero ds-reveal">
        <div className="baby-container baby-hero__grid">
          <div className="baby-hero__text">
            <span className="baby-eyebrow">{t('baby.editorial.eyebrow')}</span>
            <h1 className="baby-hero__title">{t('baby.editorial.title')}</h1>
            <p className="baby-hero__description">{t('baby.editorial.description')}</p>
            <button type="button" className="baby-btn baby-btn--primary" onClick={scrollToCollection}>
              {t('baby.editorial.cta')}
            </button>
          </div>
          <div className="baby-photo baby-hero__media">
            <Photo src={HERO_IMAGE} alt={t('baby.editorial.mediaAlt')} eager />
          </div>
        </div>

        <div className="baby-container baby-assurances">
          {ASSURANCE_KEYS.map((item) => (
            <div key={item.id} className="baby-assurance" title={t(item.textKey)}>
              {t(item.titleKey)}
            </div>
          ))}
        </div>
      </section>

      {/* 2. Curated for Little Ones */}
      <section className="baby-section baby-categories ds-reveal">
        <div className="baby-container">
          <div className="baby-section-head">
            <h2 className="baby-section-title">{t('baby.categories.heading')}</h2>
            <p className="baby-section-subtitle">{t('baby.categories.subheading')}</p>
          </div>
          <div className="baby-category-grid">
            {categories.map((category, index) => (
              <button
                key={category.slug}
                type="button"
                className={`baby-category ${activeCategory === category.slug ? 'is-active' : ''}`}
                onClick={() => writeCategory(category.slug)}
              >
                <span className="baby-photo baby-category__media">
                  <Photo
                    src={category.image || CATEGORY_IMAGES[index % CATEGORY_IMAGES.length]}
                    alt=""
                  />
                </span>
                <span className="baby-category__label">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Little Favorites */}
      <section id="baby-collection" className="baby-section baby-collection ds-reveal">
        <div className="baby-container">
          <div className="baby-section-head">
            <div>
              <h2 className="baby-section-title">{t('baby.collection.heading')}</h2>
              <p className="baby-section-subtitle">
                {t('baby.collection.count', { count: filteredProducts.length })}
              </p>
            </div>
            {hasFilters && (
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
              className="baby-btn baby-btn--link"
              onClick={hasFilters ? clearFilters : scrollToCollection}
            >
              {hasFilters ? t('baby.collection.showAll') : t('baby.collection.backToTop')}
            </button>
          </div>
        </div>
      </section>

      {/* 4. Care woven into every single stitch */}
      <section
        id="brand-story"
        className="baby-section baby-story ds-reveal"
        aria-labelledby="baby-story-title"
      >
        <div className="baby-container baby-story__layout">
          <div className="baby-photo baby-story__media">
            <Photo src={STORY_IMAGE} alt={t('baby.story.mediaAlt', { defaultValue: '' })} />
          </div>
          <div className="baby-story__text">
            <span className="baby-eyebrow">{t('baby.story.eyebrow')}</span>
            <h2 id="baby-story-title" className="baby-section-title">
              {t('baby.story.title')}
            </h2>
            <p>{t('baby.story.philosophy')}</p>
            <button type="button" className="baby-btn baby-btn--link" onClick={scrollToCollection}>
              {t('baby.story.cta', { defaultValue: 'Կարդալ մեր պատմությունը' })} →
            </button>
          </div>
        </div>
      </section>

      {/* 5. A gentle guide to your baby's first days */}
      <section className="baby-section baby-care ds-reveal" aria-labelledby="baby-care-title">
        <div className="baby-container">
          <div className="baby-care__bar">
            <div>
              <span className="baby-eyebrow">{t('baby.care.eyebrow')}</span>
              <h2 id="baby-care-title" className="baby-section-title">{t('baby.care.title')}</h2>
              <p className="baby-section-subtitle">{t('baby.care.intro')}</p>
            </div>
            <button
              type="button"
              className="baby-btn baby-btn--primary"
              aria-expanded={showCare}
              onClick={() => setShowCare((v) => !v)}
            >
              {showCare
                ? t('baby.care.hide', { defaultValue: 'Թաքցնել ուղեցույցը' })
                : t('baby.care.cta', { defaultValue: 'Կարդալ ուղեցույցը' })}
            </button>
          </div>
          {showCare && (
            <ol className="baby-care__steps">
              {CARE_STEP_KEYS.map((key) => (
                <li key={key}>{t(key)}</li>
              ))}
            </ol>
          )}
        </div>
      </section>
    </main>
  )
}