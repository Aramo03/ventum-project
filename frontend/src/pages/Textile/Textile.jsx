import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ProductCard from './ProductCard';
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

  const heroImage = products.find((item) => item.image)?.image;

  return (
    <section className="textile-page">
      <header className="textile-hero">
        <div className="textile-hero-copy">
          <p className="textile-eyebrow">{t('brand')}</p>
          <h1 className="textile-title">{t('textile.heroTitle')}</h1>
          <p className="textile-hero-text">{t('textile.heroText')}</p>
        </div>
        <div className="textile-hero-media">
          {heroImage ? (
            <img src={heroImage} alt="" className="textile-hero-image" />
          ) : (
            <div className="textile-hero-placeholder" aria-hidden="true" />
          )}
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
      </header>

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
        <>
          <div className="textile-grid">
            {visibleProducts.map((product) => (
              <ProductCard key={product.sku} product={product} />
            ))}
          </div>

          <blockquote className="textile-quote">
            <p>{t('textile.quote')}</p>
          </blockquote>

          <section className="textile-collection" aria-labelledby="textile-collection-title">
            <h2 id="textile-collection-title" className="textile-collection-title">
              {t('textile.collectionTitle')}
            </h2>
            <div className="textile-grid">
              {visibleProducts.map((product) => (
                <ProductCard key={`collection-${product.sku}`} product={product} />
              ))}
            </div>
          </section>
        </>
      )}

      <aside className="textile-note">
        <h2>{t('textile.noteTitle')}</h2>
        <p>{t('textile.noteText')}</p>
      </aside>
    </section>
  );
}
