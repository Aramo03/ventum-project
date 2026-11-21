import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { mediaUrl } from '../../api/client'
import ProductCard from '../../components/ProductCard/ProductCard.jsx'
import Wholesale from '../../components/Wholesale/Wholesale.jsx'
import { fetchBabyCatalog } from './baby'
import './baby.css'

export default function Baby() {
  const { t, i18n } = useTranslation()
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true

    async function loadBabyData() {
      setLoading(true)
      setError(false)

      try {
        const data = await fetchBabyCatalog()
        if (!active) return
        setCategories(data.categories)
        setProducts(data.products)
      } catch {
        if (!active) return
        setCategories([])
        setProducts([])
        setError(true)
      } finally {
        if (active) setLoading(false)
      }
    }

    loadBabyData()

    return () => {
      active = false
    }
  }, [i18n.resolvedLanguage])

  const visibleProducts = selectedCategory
    ? products.filter((product) => product.category?.slug === selectedCategory)
    : products

  const heroImage = products.find((product) => product.image)?.image

  return (
    <main className="shop-page baby-page" data-shop="baby">
      <header className="shop-hero">
        <div className="vt-type">
          <p className="vt-eyebrow">{t('stores.baby')}</p>
          <h1>{t('baby.heroTitle')}</h1>
          <p className="vt-lead">{t('baby.heroText')}</p>
        </div>
        <div className="shop-hero__media">
          {heroImage ? (
            <img src={mediaUrl(heroImage)} alt="" />
          ) : (
            <div className="shop-hero__placeholder" aria-hidden="true" />
          )}
        </div>
      </header>

      {categories.length > 0 && (
        <div className="shop-chips" role="tablist">
          <button
            type="button"
            className={`vt-chip ${selectedCategory === null ? 'is-active' : ''}`}
            onClick={() => setSelectedCategory(null)}
          >
            {t('baby.allCategories')}
          </button>
          {categories.map((category) => (
            <button
              key={category.slug}
              type="button"
              className={`vt-chip ${selectedCategory === category.slug ? 'is-active' : ''}`}
              onClick={() => setSelectedCategory(category.slug)}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}

      {loading && (
        <p className="vt-status" data-testid="baby-loading" role="status">
          {t('baby.loading')}
        </p>
      )}

      {!loading && error && (
        <p className="vt-status vt-status--error" role="alert" data-testid="baby-error">
          {t('baby.error')}
        </p>
      )}

      {!loading && !error && visibleProducts.length === 0 && (
        <p className="vt-status" data-testid="baby-empty">
          {t('baby.empty')}
        </p>
      )}

      {!loading && !error && visibleProducts.length > 0 && (
        <section className="shop-block" id="shop-grid" aria-labelledby="baby-favorites-title">
          <h2 id="baby-favorites-title">{t('baby.favoritesTitle')}</h2>
          <div className="shop-grid">
            {visibleProducts.map((product) => (
              <ProductCard key={product.sku} product={product} />
            ))}
          </div>
        </section>
      )}

      <blockquote className="vt-status shop-block">
        <p className="vt-eyebrow">{t('baby.storyTitle')}</p>
        <p>{t('baby.storyText')}</p>
      </blockquote>

      <section className="shop-gift">
        <div>
          <h2>{t('baby.giftTitle')}</h2>
          <p>{t('baby.giftText')}</p>
        </div>
        <a className="vt-button" href="#shop-grid">
          {t('baby.giftAction')}
        </a>
      </section>

      <aside className="vt-type shop-block">
        <h2>{t('baby.noteTitle')}</h2>
        <p className="vt-lead">{t('baby.noteText')}</p>
      </aside>

      <Wholesale brand="baby" />
    </main>
  )
}
