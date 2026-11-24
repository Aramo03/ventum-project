import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ProductCard from '../../components/ProductCard/ProductCard.jsx';
import CatalogState from '../../components/CatalogState/CatalogState.jsx';
import {
  ASSURANCE_KEYS,
  CARE_PILLAR_KEYS,
  STORE_KEY,
  fetchTextileCatalog,
  filterTextileProducts,
} from './textile';
import './textile.css';

export default function Textile() {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const activeCategory = searchParams.get('category') || '';
  const activeQuery = searchParams.get('q') || '';

  const loadCatalog = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchTextileCatalog();
      setCategories(data.categories);
      setProducts(data.products);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCatalog();
  }, [loadCatalog, i18n.language]);

  const filteredProducts = useMemo(
    () =>
      filterTextileProducts(products, {
        category: activeCategory,
        q: activeQuery,
      }),
    [products, activeCategory, activeQuery]
  );

  const handleSelectCategory = (slug) => {
    const next = new URLSearchParams(searchParams);
    if (!slug || slug === activeCategory) {
      next.delete('category');
    } else {
      next.set('category', slug);
    }
    setSearchParams(next);

    const collectionEl = document.getElementById('textile-collection');
    if (collectionEl) {
      collectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleClearFilters = () => {
    const next = new URLSearchParams(searchParams);
    next.delete('category');
    next.delete('q');
    setSearchParams(next);
  };

  const scrollToCollection = () => {
    const el = document.getElementById('textile-collection');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="textile-page" data-brand={STORE_KEY}>
      {/* 1. Seasonal editorial */}
      <section className="textile-section textile-editorial">
        <div className="textile-container textile-editorial__grid">
          <div className="textile-editorial__intro">
            <span className="textile-eyebrow">{t('textile.editorial.eyebrow')}</span>
            <h1 className="textile-editorial__title">{t('textile.editorial.title')}</h1>
            <p className="textile-editorial__text">{t('textile.editorial.description')}</p>
            <button
              type="button"
              className="textile-btn textile-btn--primary"
              onClick={scrollToCollection}
            >
              {t('textile.editorial.cta')}
            </button>
          </div>
          <div className="textile-editorial__media" aria-label={t('textile.editorial.mediaAlt')}>
            <div className="textile-editorial__photo-frame">
              <span className="textile-editorial__caption">{t('textile.editorial.caption')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Shopping assurances */}
      <section className="textile-section textile-assurances">
        <div className="textile-container">
          <div className="textile-assurances__grid">
            {ASSURANCE_KEYS.map((item) => (
              <article key={item.id} className="textile-assurance-card">
                <h2 className="textile-assurance-card__title">{t(item.titleKey)}</h2>
                <p className="textile-assurance-card__text">{t(item.textKey)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Shop by category */}
      <section className="textile-section textile-categories">
        <div className="textile-container">
          <div className="textile-section-head">
            <h2 className="textile-section-title">{t('textile.categories.heading')}</h2>
            <p className="textile-section-subtitle">{t('textile.categories.subheading')}</p>
          </div>

          <div className="textile-category-grid">
            <button
              type="button"
              className={`textile-category-tile ${!activeCategory ? 'is-active' : ''}`}
              onClick={() => handleSelectCategory('')}
            >
              <span className="textile-category-tile__name">{t('textile.categories.all')}</span>
            </button>

            {categories.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                className={`textile-category-tile ${activeCategory === cat.slug ? 'is-active' : ''}`}
                onClick={() => handleSelectCategory(cat.slug)}
              >
                <span className="textile-category-tile__name">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Brand story and care */}
      <section className="textile-section textile-story">
        <div className="textile-container textile-story__layout">
          <div className="textile-story__content">
            <span className="textile-eyebrow">{t('textile.story.eyebrow')}</span>
            <h2 className="textile-section-title">{t('textile.story.title')}</h2>
            <p className="textile-story__text">{t('textile.story.philosophy')}</p>
          </div>
          <ul className="textile-story__pillars">
            {CARE_PILLAR_KEYS.map((key) => (
              <li key={key} className="textile-story__pillar">
                {t(key)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Shoppable product collection */}
      <section id="textile-collection" className="textile-section textile-collection">
        <div className="textile-container">
          <div className="textile-collection__header">
            <div>
              <h2 className="textile-section-title">{t('textile.collection.heading')}</h2>
              <p className="textile-section-subtitle">
                {t('textile.collection.count', { count: filteredProducts.length })}
              </p>
            </div>

            <div className="textile-catalog-controls">
              {(activeCategory || activeQuery) && (
                <div className="textile-active-filters">
                  {activeCategory && (
                    <span className="textile-filter-chip">
                      {t('textile.collection.categoryLabel')}: {activeCategory}
                    </span>
                  )}
                  {activeQuery && (
                    <span className="textile-filter-chip">
                      {t('textile.collection.searchLabel')}: {activeQuery}
                    </span>
                  )}
                  <button
                    type="button"
                    className="textile-btn textile-btn--ghost"
                    onClick={handleClearFilters}
                  >
                    {t('textile.collection.resetFilters')}
                  </button>
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <CatalogState state="loading" brand={STORE_KEY} />
          ) : error ? (
            <CatalogState state="error" brand={STORE_KEY} onRetry={loadCatalog} />
          ) : filteredProducts.length === 0 ? (
            <CatalogState state="empty" brand={STORE_KEY} onReset={handleClearFilters} />
          ) : (
            <div className="textile-product-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.sku} product={product} brand={STORE_KEY} />
              ))}
            </div>
          )}

          <div className="textile-collection__footer">
            <button
              type="button"
              className="textile-btn textile-btn--secondary"
              onClick={activeCategory || activeQuery ? handleClearFilters : scrollToCollection}
            >
              {activeCategory || activeQuery
                ? t('textile.collection.showAll')
                : t('textile.collection.backToTop')}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}