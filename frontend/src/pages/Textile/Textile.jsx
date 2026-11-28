import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ProductCard from '../../components/ProductCard/ProductCard';
import CatalogState from '../../components/CatalogState/CatalogState';
import {
  TEXTILE_HIGHLIGHTS,
  TEXTILE_VISUAL_CATEGORIES,
  fetchTextileCategories,
  fetchTextileProducts,
  filterTextileProducts,
} from './textile';
import './textile.css';

export default function Textile() {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'error'

  const currentQuery = searchParams.get('q') || '';
  const currentCategory = searchParams.get('category') || '';

  const loadStorefront = useCallback(async () => {
    setStatus('loading');
    try {
      const [catList, prodList] = await Promise.all([
        fetchTextileCategories(),
        fetchTextileProducts(),
      ]);
      setCategories(catList.filter((cat) => !cat.store || cat.store === 'textile'));
      setProducts(prodList);
      setStatus('ready');
    } catch {
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    loadStorefront();
  }, [loadStorefront, i18n.language]);

  const handleSelectCategory = (slug) => {
    const nextParams = new URLSearchParams(searchParams);
    if (!slug || nextParams.get('category') === slug) {
      nextParams.delete('category');
    } else {
      nextParams.set('category', slug);
    }
    setSearchParams(nextParams);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    const nextParams = new URLSearchParams(searchParams);
    if (value.trim()) {
      nextParams.set('q', value);
    } else {
      nextParams.delete('q');
    }
    setSearchParams(nextParams);
  };

  const handleResetFilters = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('q');
    nextParams.delete('category');
    setSearchParams(nextParams);
  };

  const filteredProducts = useMemo(
    () =>
      filterTextileProducts(products, {
        q: currentQuery,
        category: currentCategory,
      }),
    [products, currentQuery, currentCategory]
  );

  const categoryCards = useMemo(() => {
    if (categories.length > 0) {
      return categories.map((cat) => ({
        slug: cat.slug || String(cat.id),
        name: cat.name || cat.slug,
        image: cat.image || null,
      }));
    }
    return TEXTILE_VISUAL_CATEGORIES.map((item) => ({
      slug: item.slug,
      name: t(`textile.categories.${item.slug}`, { defaultValue: item.fallbackName }),
      image: null,
    }));
  }, [categories, t]);

  return (
    <main className="textile-page" data-store="textile">
      {/* 1. Seasonal editorial */}
      <section className="textile-editorial" aria-labelledby="textile-hero-title">
        <div className="textile-editorial__inner">
          <div className="textile-editorial__content">
            <p className="textile-eyebrow">{t('textile.editorial.eyebrow')}</p>
            <h1 id="textile-hero-title" className="textile-editorial__title">
              {t('textile.editorial.title')}
            </h1>
            <p className="textile-editorial__lead">{t('textile.editorial.description')}</p>
            <div className="textile-editorial__actions">
              <a href="#textile-collection" className="textile-btn textile-btn--primary">
                {t('textile.editorial.cta')}
              </a>
            </div>
            <p className="textile-editorial__caption">{t('textile.editorial.caption')}</p>
          </div>
          <div className="textile-editorial__media">
            <div className="textile-editorial__photo-placeholder" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* 2. Shopping assurances */}
      <section className="textile-assurances" aria-label={t('textile.assurances.label')}>
        <div className="textile-assurances__inner">
          {TEXTILE_HIGHLIGHTS.map((item) => (
            <div key={item.key} className="textile-assurance-item">
              <span className="textile-assurance-item__icon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="textile-assurance-item__text">
                {t(`textile.assurances.${item.key}`)}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Shop by category */}
      <section className="textile-categories" aria-labelledby="textile-categories-title">
        <div className="textile-section-head">
          <div>
            <h2 id="textile-categories-title" className="textile-section-title">
              {t('textile.categories.heading')}
            </h2>
          </div>
          <p className="textile-section-note">{t('textile.categories.subheading')}</p>
        </div>

        <div className="textile-category-grid">
          {categoryCards.map((cat) => {
            const isSelected = currentCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => handleSelectCategory(cat.slug)}
                className={`textile-category-tile ${isSelected ? 'is-active' : ''}`}
                aria-pressed={isSelected}
              >
                <div className="textile-category-tile__media">
                  {cat.image ? (
                    <img src={cat.image} alt={cat.name} />
                  ) : (
                    <div className="textile-media-blank" aria-hidden="true" />
                  )}
                </div>
                <span className="textile-category-tile__label">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. Brand story and care */}
      <section className="textile-story" aria-labelledby="textile-story-title">
        <div className="textile-story__inner">
          <div className="textile-story__media">
            <div className="textile-story__photo-placeholder" aria-hidden="true" />
          </div>
          <div className="textile-story__content">
            <p className="textile-eyebrow">{t('textile.story.eyebrow')}</p>
            <h2 id="textile-story-title" className="textile-story__title">
              {t('textile.story.title')}
            </h2>
            <p className="textile-story__text">{t('textile.story.body')}</p>
            <p className="textile-story__care">{t('textile.story.care')}</p>
          </div>
        </div>
      </section>

      {/* 5. Shoppable product collection */}
      <section
        id="textile-collection"
        className="textile-collection"
        aria-labelledby="textile-collection-title"
      >
        <div className="textile-collection__top">
          <div>
            <p className="textile-eyebrow">{t('textile.collection.eyebrow')}</p>
            <h2 id="textile-collection-title" className="textile-section-title">
              {t('textile.collection.heading')}
            </h2>
            <p className="textile-section-lead">{t('textile.collection.description')}</p>
          </div>
        </div>

        <div className="textile-controls">
          <div className="textile-filter-pills" role="group" aria-label={t('textile.categories.heading')}>
            <button
              type="button"
              onClick={() => handleSelectCategory('')}
              className={`textile-pill ${!currentCategory ? 'is-active' : ''}`}
            >
              {t('textile.filters.all')}
            </button>
            {categoryCards.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => handleSelectCategory(cat.slug)}
                className={`textile-pill ${currentCategory === cat.slug ? 'is-active' : ''}`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="textile-search-wrap">
            <label htmlFor="textile-search-input" className="sr-only">
              {t('textile.filters.searchPlaceholder')}
            </label>
            <input
              id="textile-search-input"
              type="search"
              className="textile-search-input"
              value={currentQuery}
              onChange={handleSearchChange}
              placeholder={t('textile.filters.searchPlaceholder')}
            />
          </div>
        </div>

        {status === 'loading' && (
          <CatalogState store="textile" variant="loading" />
        )}

        {status === 'error' && (
          <CatalogState
            store="textile"
            variant="error"
            onRetry={loadStorefront}
          />
        )}

        {status === 'ready' && filteredProducts.length === 0 && (
          <CatalogState
            store="textile"
            variant="empty"
            onReset={handleResetFilters}
          />
        )}

        {status === 'ready' && filteredProducts.length > 0 && (
          <div className="textile-products-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.sku || product.id}
                product={product}
                store="textile"
                priceLabel={t('textile.currencyAmd')}
              />
            ))}
          </div>
        )}

        <div className="textile-collection__footer">
          <button
            type="button"
            onClick={handleResetFilters}
            className="textile-btn textile-btn--secondary"
          >
            {t('textile.collection.secondaryAction')}
          </button>
        </div>
      </section>
    </main>
  );
}