import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { addTextileToCart } from './textile';
import './productCard.css';

export default function ProductCard({ product }) {
  const { t } = useTranslation();
  const [status, setStatus] = useState('idle');

  async function handleAddToCart() {
    if (status === 'loading') return;

    setStatus('loading');

    try {
      await addTextileToCart(product.sku);
      setStatus('success');
    } catch (error) {
      if (error.response?.status === 401) {
        setStatus('unauthorized');
      } else {
        setStatus('idle');
      }
    }
  }

  return (
    <article className="textile-card">
      <div className="textile-card-image-box">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="textile-card-image"
          />
        ) : (
          <div className="textile-card-image-placeholder" aria-hidden="true" />
        )}
      </div>
      <div className="textile-card-body">
        {product.category?.name && (
          <span className="textile-card-category">{product.category.name}</span>
        )}
        <h2 className="textile-card-name">{product.name}</h2>
        <p className="textile-card-price">
          {product.price} {t('textile.currency', 'AMD')}
        </p>
        <button
          type="button"
          className="textile-card-button"
          onClick={handleAddToCart}
          disabled={status === 'loading'}
        >
          {status === 'loading'
            ? t('textile.loading')
            : t('textile.addToCart')}
        </button>
        {status === 'success' && (
          <p className="textile-card-success" role="status">
            {t('textile.cartSuccess')}
          </p>
        )}
        {status === 'unauthorized' && (
          <p className="textile-card-signin" role="alert">
            {t('textile.cartSignIn')}
          </p>
        )}
      </div>
    </article>
  );
}
