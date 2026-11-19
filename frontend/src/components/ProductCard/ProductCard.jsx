import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { addProductToCart } from './productCard'
import './productCard.css'

export default function ProductCard({ product }) {
  const { t } = useTranslation()
  const [status, setStatus] = useState('idle')

  async function handleAddToCart() {
    if (status === 'loading' || !product?.sku) return

    setStatus('loading')

    try {
      await addProductToCart(product.sku)
      setStatus('added')
    } catch (error) {
      if (error.response?.status === 401) {
        setStatus('signIn')
      } else {
        setStatus('failed')
      }
    }
  }

  const buttonLabel =
    status === 'loading' ? t('productCard.adding') : t('productCard.addToCart')

  return (
    <article className="product-card">
      <div className="product-card__media">
        {product?.image ? (
          <img
            src={product.image}
            alt={product.name || ''}
            className="product-card__image"
          />
        ) : (
          <div className="product-card__placeholder" aria-hidden="true" />
        )}
      </div>
      <div className="product-card__body">
        <h2 className="product-card__name">{product?.name}</h2>
        <p className="product-card__price">
          {product?.price} {t('productCard.currency')}
        </p>
        <button
          type="button"
          className="product-card__button"
          onClick={handleAddToCart}
          disabled={status === 'loading'}
        >
          {buttonLabel}
        </button>
        {status === 'added' && (
          <p className="product-card__note product-card__note--added" role="status">
            {t('productCard.added')}
          </p>
        )}
        {status === 'signIn' && (
          <p className="product-card__note product-card__note--signin" role="alert">
            {t('productCard.signIn')}
          </p>
        )}
        {status === 'failed' && (
          <p className="product-card__note product-card__note--failed" role="alert">
            {t('productCard.failed')}
          </p>
        )}
      </div>
    </article>
  )
}
