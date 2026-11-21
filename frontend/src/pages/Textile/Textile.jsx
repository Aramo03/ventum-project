import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { mediaUrl } from '../../api/client'
import ProductCard from '../../components/ProductCard/ProductCard.jsx'
import { fetchTextileCatalog } from './textile'
import './textile.css'

export default function Textile() {
  const { t, i18n } = useTranslation()
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function loadData() {
      setLoading(true)
      setError(false)
      try {
        const data = await fetchTextileCatalog()
        if (isMounted) {
          setCategories(data.categories)
          setProducts(data.products)
        }
      } catch {
        if (isMounted) setError(true)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [i18n.language])

  const visibleProducts = selectedCategory
    ? products.filter((item) => item.category?.slug === selectedCategory)
    : products

  const heroImage = products.find((item) => item.image)?.image

  return (
    <main className="shop-page textile-page" data-shop="textile">
      <header className="shop-hero">
        <div className="vt-type">
          <p className="vt-eyebrow">{t('brand')}</p>
          <h1>{t('textile.heroTitle')}</h1>
          <p className="vt-lead">{t('textile.heroText')}</p>
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
            {t('textile.allCategories')}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              className={`vt-chip ${selectedCategory === cat.slug ? 'is-active' : ''}`}
              onClick={() => setSelectedCategory(cat.slug)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {loading && (
        <p className="vt-status" data-testid="textile-loading" role="status">
          {t('textile.loading')}
        </p>
      )}

      {!loading && error && (
        <p className="vt-status vt-status--error" role="alert" data-testid="textile-error">
          {t('textile.error')}
        </p>
      )}

      {!loading && !error && visibleProducts.length === 0 && (
        <p className="vt-status" data-testid="textile-empty">
          {t('textile.empty')}
        </p>
      )}

      {!loading && !error && visibleProducts.length > 0 && (
        <section className="shop-block" id="shop-grid" aria-labelledby="textile-collection-title">
          <h2 id="textile-collection-title">{t('textile.collectionTitle')}</h2>
          <div className="shop-grid">
            {visibleProducts.map((product) => (
              <ProductCard key={product.sku} product={product} />
            ))}
          </div>
        </section>
      )}

      <blockquote className="vt-status shop-block">
        <p>{t('textile.quote')}</p>
      </blockquote>

      <aside className="vt-type shop-block">
        <h2>{t('textile.noteTitle')}</h2>
        <p className="vt-lead">{t('textile.noteText')}</p>
      </aside>
    </main>
  )
}
