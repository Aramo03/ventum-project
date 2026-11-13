import { useTranslation } from 'react-i18next'
import './textile.css'

export default function Textile() {
  const { t } = useTranslation()

  return (
    <main className="page">
      <h1>{t('stores.textile')}</h1>
      <p>{t('pages.textileLead')}</p>
    </main>
  )
}

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchTextileCatalog } from './textile';
import './textile.css';

export default function Textile() {
  const { t, i18n } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      setLoading(true);
      setError(false);
      try {
        const data = await fetchTextileCatalog();
        if (isMounted) {
          setCategories(data.categories);
          setProducts(data.products);
        }
      } catch (err) {
        if (isMounted) {
          setError(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [i18n.language]);

  const visibleProducts = selectedCategory
    ? products.filter((item) => item.category?.slug === selectedCategory)
    : products;

  return (
    <section className="textile-page">
      <div className="textile-header">
        <h1 className="textile-title">{t('textile.title', 'Ventum Textile')}</h1>
      </div>

      {categories.length > 0 && (
        <div className="textile-categories" role="tablist">
          <button
            type="button"
            className={`textile-category-btn ${selectedCategory === null ? 'active' : ''}`}
            onClick={() => setSelectedCategory(null)}
          >
            {t('textile.allCategories', 'All')}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              className={`textile-category-btn ${selectedCategory === cat.slug ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.slug)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {loading && (
        <div className="textile-status" data-testid="textile-loading">
          {t('textile.loading', 'Loading...')}
        </div>
      )}

      {!loading && error && (
        <div className="textile-status error" role="alert" data-testid="textile-error">
          {t('textile.error', 'Network error. Failed to load data.')}
        </div>
      )}

      {!loading && !error && visibleProducts.length === 0 && (
        <div className="textile-status" data-testid="textile-empty">
          {t('textile.empty', 'No products found')}
        </div>
      )}

      {!loading && !error && visibleProducts.length > 0 && (
        <div className="textile-grid">
          {visibleProducts.map((product) => (
            <article key={product.sku} className="textile-card">
              <div className="textile-card-image-box">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="textile-card-image"
                  />
                ) : (
                  <div
                    className="textile-card-image-placeholder"
                    aria-hidden="true"
                  />
                )}
              </div>
              <div className="textile-card-body">
                {product.category?.name && (
                  <span className="textile-card-category">
                    {product.category.name}
                  </span>
                )}
                <h2 className="textile-card-name">{product.name}</h2>
                <div className="textile-card-price">
                  {product.price} {t('textile.currency', 'AMD')}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}