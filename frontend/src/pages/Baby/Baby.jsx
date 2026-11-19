import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { mediaUrl } from '../../api/client'
import ProductCard from '../../components/ProductCard/ProductCard.jsx'
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
      } catch (err) {
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
    <main className="baby-page">
      <header className="baby-hero">
        <div className="baby-hero-copy">
          <p className="baby-eyebrow">{t('stores.baby')}</p>
          <h1>{t('baby.heroTitle')}</h1>
          <p className="baby-hero-text">{t('baby.heroText')}</p>
        </div>
        <div className="baby-hero-media">
          {heroImage ? (
            <img src={mediaUrl(heroImage)} alt="" className="baby-hero-image" />
          ) : (
            <div className="baby-hero-placeholder" aria-hidden="true" />
          )}
        </div>
        {categories.length > 0 && (
          <div className="baby-categories" role="tablist">
            <button
              type="button"
              className={`baby-category ${selectedCategory === null ? 'active' : ''}`}
              onClick={() => setSelectedCategory(null)}
            >
              {t('baby.allCategories')}
            </button>
            {categories.map((category) => (
              <button
                key={category.slug}
                type="button"
                className={`baby-category ${selectedCategory === category.slug ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.slug)}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </header>

      {loading && (
        <p className="baby-message" data-testid="baby-loading">
          {t('baby.loading')}
        </p>
      )}

      {!loading && error && (
        <p className="baby-message" role="alert" data-testid="baby-error">
          {t('baby.error')}
        </p>
      )}

      {!loading && !error && visibleProducts.length === 0 && (
        <p className="baby-message" data-testid="baby-empty">
          {t('baby.empty')}
        </p>
      )}

      {!loading && !error && visibleProducts.length > 0 && (
        <>
          <section className="baby-favorites" id="baby-favorites" aria-labelledby="baby-favorites-title">
            <h2 id="baby-favorites-title">{t('baby.favoritesTitle')}</h2>
            <div className="baby-grid">
              {visibleProducts.map((product) => (
                <ProductCard key={product.sku} product={product} />
              ))}
            </div>
          </section>

          <blockquote className="baby-story">
            <p className="baby-story-title">{t('baby.storyTitle')}</p>
            <p>{t('baby.storyText')}</p>
          </blockquote>

          <section className="baby-collection" aria-labelledby="baby-collection-title">
            <h2 id="baby-collection-title">{t('baby.products')}</h2>
            <div className="baby-grid">
              {visibleProducts.map((product) => (
                <ProductCard key={`collection-${product.sku}`} product={product} />
              ))}
            </div>
          </section>
        </>
      )}

      <section className="baby-gift">
        <div>
          <h2>{t('baby.giftTitle')}</h2>
          <p>{t('baby.giftText')}</p>
        </div>
        <a className="baby-gift-link" href="#baby-favorites">
          {t('baby.addToCart')}
        </a>
      </section>

      <aside className="baby-note">
        <h2>{t('baby.noteTitle')}</h2>
        <p>{t('baby.noteText')}</p>
      </aside>
    </main>
  )
}
