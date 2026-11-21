
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { api, mediaUrl } from '../../api/client'
import {
  addProductToCart,
  formatProductPrice,
} from '../../components/ProductCard/productCard'

import './productDetails.css'

export default function ProductDetails() {
  const { sku } = useParams()
  const { t } = useTranslation()

  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [cartStatus, setCartStatus] = useState('idle')

  useEffect(() => {
    let cancelled = false

    async function loadProduct() {
      setLoading(true)
      setError(false)
      setProduct(null)
      setSelectedImage('')

      try {
        const response = await api.get(
          `/api/catalog/products/${encodeURIComponent(sku)}/`
        )

        if (cancelled) return

        const data = response.data
        setProduct(data)

        const firstImage =
          data.images?.find((image) => image.url)?.url || data.image

        setSelectedImage(firstImage || '')
      } catch {
        if (!cancelled) {
          setError(true)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    if (sku) {
      loadProduct()
    }

    return () => {
      cancelled = true
    }
  }, [sku])

  async function handleAddToCart() {
    if (!product?.sku || cartStatus === 'loading') return

    setCartStatus('loading')

    try {
      await addProductToCart(product.sku)
      setCartStatus('added')
    } catch (error) {
      setCartStatus(
        error.response?.status === 401 ? 'signIn' : 'failed'
      )
    }
  }

  if (loading) {
    return (
      <main className="product-details page">
        <p className="vt-status" role="status">
          {t('common.loading', { defaultValue: 'Loading...' })}
        </p>
      </main>
    )
  }

  if (error || !product) {
    return (
      <main className="product-details page">
        <div className="product-details__message">
          <h1>
            {t('productDetails.notFound', {
              defaultValue: 'Product not found',
            })}
          </h1>

          <p>
            {t('productDetails.loadError', {
              defaultValue: 'Could not load this product.',
            })}
          </p>

          <Link to="/" className="vt-button">
            {t('pages.goHome', { defaultValue: 'Back to home' })}
          </Link>
        </div>
      </main>
    )
  }

  const images = product.images?.length
    ? product.images.filter((image) => image.url)
    : product.image
      ? [{ url: product.image, alt: product.name }]
      : []

  return (
    <main className="product-details page">
      <Link to="/" className="product-details__back">
        ← {t('pages.goHome', { defaultValue: 'Back to home' })}
      </Link>

      <div className="product-details__layout">
        <section className="product-details__gallery">
          <div className="product-details__main-image">
            {selectedImage ? (
              <img
                src={mediaUrl(selectedImage)}
                alt={product.name || ''}
              />
            ) : (
              <div className="product-details__placeholder">
                {t('productDetails.noImage', {
                  defaultValue: 'No image',
                })}
              </div>
            )}
          </div>

          {images.length > 1 && (
            <div className="product-details__thumbnails">
              {images.map((image, index) => (
                <button
                  type="button"
                  key={`${image.url}-${index}`}
                  className={
                    selectedImage === image.url
                      ? 'product-details__thumbnail is-active'
                      : 'product-details__thumbnail'
                  }
                  onClick={() => setSelectedImage(image.url)}
                  aria-label={`Show image ${index + 1}`}
                >
                  <img
                    src={mediaUrl(image.url)}
                    alt={image.alt || product.name || ''}
                  />
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="product-details__info">
          {product.category?.name && (
            <p className="product-details__category">
              {product.category.name}
            </p>
          )}

          <h1>{product.name}</h1>

          <p className="product-details__sku">
            SKU: {product.sku}
          </p>

          <p className="product-details__price">
            {formatProductPrice(product.price)} AMD
          </p>

          {product.description && (
            <div className="product-details__description">
              {product.description}
            </div>
          )}

          <button
            type="button"
            className="vt-button product-details__cart-button"
            onClick={handleAddToCart}
            disabled={cartStatus === 'loading'}
          >
            {cartStatus === 'loading'
              ? t('productCard.adding')
              : t('productCard.addToCart')}
          </button>

          {cartStatus === 'added' && (
            <p className="vt-status vt-status--ok" role="status">
              {t('productCard.added')}
            </p>
          )}

          {cartStatus === 'signIn' && (
            <p className="vt-status vt-status--error" role="alert">
              {t('productCard.signIn')}
            </p>
          )}

          {cartStatus === 'failed' && (
            <p className="vt-status vt-status--error" role="alert">
              {t('productCard.failed')}
            </p>
          )}

          {product.store && (
            <p className="product-details__store">
              Store: {product.store}
            </p>
          )}
        </section>
      </div>
    </main>
  )
}
