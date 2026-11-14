
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { api, mediaUrl } from '../../api/client'
import './baby.css'


function AddToCartButton({ sku }) {
  const { t } = useTranslation()
  const [status, setStatus] = useState('idle')

  async function handleAddToCart() {
    if (status === 'loading') return

    setStatus('loading')

    try {
      await api.post('/api/cart/items/', {
        sku,
        qty: 1,
      })

      setStatus('success')
    } catch (error) {
      if (error.response?.status === 401) {
        setStatus('unauthorized')
      } else {
        setStatus('error')
      }
    }
  }

  return (
    <div className="baby-cart-actions">
      <button
        type="button"
        className="baby-cart-button"
        onClick={handleAddToCart}
        disabled={status === 'loading'}
      >
        {status === 'loading'
          ? t('baby.cartAdding')
          : t('baby.addToCart')}
      </button>

      {status === 'success' && (
        <p className="baby-cart-success" role="status">
          {t('baby.cartSuccess')}
        </p>
      )}

      {status === 'unauthorized' && (
        <p className="baby-cart-error" role="alert">
          {t('baby.cartSignIn')}
        </p>
      )}

      {status === 'error' && (
        <p className="baby-cart-error" role="alert">
          {t('baby.cartError')}
        </p>
      )}
    </div>
  )
}
export default function Baby() {
  const { t, i18n } = useTranslation()

  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true

    async function loadBabyData() {
      setLoading(true)
      setError(false)

      try {
        const [categoriesResponse, productsResponse] =
          await Promise.all([
            api.get('/api/catalog/categories/', {
              params: { store: 'baby' },
            }),
            api.get('/api/catalog/products/', {
              params: { store: 'baby' },
            }),
          ])

        if (!active) return

        const categoryList = Array.isArray(categoriesResponse.data)
          ? categoriesResponse.data
          : categoriesResponse.data?.results ?? []

        const productList = Array.isArray(productsResponse.data)
          ? productsResponse.data
          : productsResponse.data?.results ?? []

        setCategories(
          categoryList.filter(
            (category) => category.store === 'baby'
          )
        )

        setProducts(
          productList.filter(
            (product) =>
              product.store === 'baby' &&
              product.published !== false
          )
        )
      } catch (err) {
        if (!active) return

        console.error('Failed to load Baby data:', err)
        setCategories([])
        setProducts([])
        setError(true)
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadBabyData()

    return () => {
      active = false
    }
  }, [i18n.resolvedLanguage])

  return (
    <main className="page baby-page">
      <section className="baby-header">
        <h1>{t('stores.baby')}</h1>
        <p>{t('pages.babyLead')}</p>
      </section>

      {loading && (
        <p className="baby-message">
          {t('baby.loading')}
        </p>
      )}

      {!loading && error && (
        <p className="baby-message" role="alert">
          {t('baby.error')}
        </p>
      )}

      {!loading && !error && (
        <>
          <section className="baby-categories">
            <h2>{t('baby.categories')}</h2>

            {categories.length > 0 && (
              <div className="baby-category-list">
                {categories.map((category) => (
                  <div
                    className="baby-category"
                    key={category.slug}
                  >
                    {category.name}
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="baby-products-section">
            <h2>{t('baby.products')}</h2>

            {products.length === 0 ? (
              <p className="baby-message">
                {t('baby.empty')}
              </p>
            ) : (
              <div className="baby-products">
                {products.map((product) => (
                  <article
                    className="baby-product-card"
                    key={product.sku}
                  >
                    <div className="baby-product-image">
                      {product.image ? (
                        <img
                          src={mediaUrl(product.image)}
                          alt={product.name || ''}
                          loading="lazy"
                        />
                      ) : null}
                    </div>

                    <div className="baby-product-info">
                      <h3>{product.name}</h3>

                      <p className="baby-product-price">
                        {Number(product.price).toLocaleString(
                          'hy-AM'
                        )}{' '}
                        AMD
                      </p>
                      <AddToCartButton sku={product.sku} />
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </main>
  )
}
