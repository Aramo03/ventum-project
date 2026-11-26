import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  addTextileItemToCart,
  fetchTextileCatalog,
  formatAmdPrice,
  resolveMediaUrl,
} from './textile';
import './textile.css';

export default function Textile() {
  const { t, i18n } = useTranslation();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [showAll, setShowAll] = useState(false);

  const [addingSku, setAddingSku] = useState('');
  const [cardFeedback, setCardFeedback] = useState({});

  const activeLanguage = (i18n.language || 'en').split('-')[0];

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');

    fetchTextileCatalog(activeLanguage)
      .then(({ categories: loadedCategories, products: loadedProducts }) => {
        if (!active) return;
        setCategories(loadedCategories);
        setProducts(loadedProducts);
      })
      .catch(() => {
        if (!active) return;
        setError(
          t('textile.errorLoad', {
            defaultValue: 'Could not load Textile catalog. Please try again.',
          })
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [activeLanguage, t]);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedCategory !== 'all') {
      list = list.filter((item) => {
        const catSlug =
          typeof item.category === 'string'
            ? item.category
            : item.category?.slug || item.category_slug || '';
        return catSlug === selectedCategory;
      });
    }

    if (inStockOnly) {
      list = list.filter((item) => item.in_stock !== false);
    }

    if (sortBy === 'priceAsc') {
      list.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === 'priceDesc') {
      list.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return list;
  }, [products, selectedCategory, inStockOnly, sortBy]);

  const visibleProducts = showAll
    ? filteredProducts
    : filteredProducts.slice(0, 8);

  const handleAddToCart = async (product) => {
    const sku = product.sku;
    if (!sku) return;

    setAddingSku(sku);
    setCardFeedback((prev) => ({
      ...prev,
      [sku]: null,
    }));

    try {
      await addTextileItemToCart(sku, 1);
      setCardFeedback((prev) => ({
        ...prev,
        [sku]: {
          type: 'success',
          message: t('textile.addedToCart', {
            defaultValue: 'Added to cart',
          }),
        },
      }));
    } catch (err) {
      const status = err?.response?.status;
      if (status === 401) {
        setCardFeedback((prev) => ({
          ...prev,
          [sku]: {
            type: 'auth',
            message: t('textile.signInRequired', {
              defaultValue: 'Sign in required to add items to cart.',
            }),
          },
        }));
      } else {
        setCardFeedback((prev) => ({
          ...prev,
          [sku]: {
            type: 'error',
            message: t('textile.addError', {
              defaultValue: 'Could not add item to cart.',
            }),
          },
        }));
      }
    } finally {
      setAddingSku('');
    }
  };

  return (
    <main className="textile-page">
      {/* Seasonal Editorial Hero */}
      <section className="textile-hero">
        <div className="textile-container textile-hero__grid">
          <div>
            <div className="textile-hero__eyebrow">
              {t('textile.heroEyebrow', {
                defaultValue: 'VENTUM TEXTILE · NATURAL HOME SANCTUARY',
              })}
            </div>
            <h1 className="textile-hero__title">
              {t('textile.heroTitle', {
                defaultValue: 'Woven for quiet, sunlit mornings.',
              })}
            </h1>
            <p className="textile-hero__subtitle">
              {t('textile.heroSubtitle', {
                defaultValue:
                  'Experience breathable organic cottons, artisanal weaves, and timeless textures crafted to bring effortless serenity to every corner of your home.',
              })}
            </p>
            <a href="#textile-collection" className="textile-hero__cta">
              {t('textile.exploreCollection', {
                defaultValue: 'Explore the Collection',
              })}
            </a>
            <div className="textile-hero__note">
              {t('textile.heroNote', {
                defaultValue: '100% Natural Fibers · Tailored Perfection',
              })}
            </div>
          </div>

          <div className="textile-hero__media">
            {resolveMediaUrl(products[0]?.image) ? (
              <img
                src={resolveMediaUrl(products[0]?.image)}
                alt={
                  products[0]?.name ||
                  t('textile.heroTitle', {
                    defaultValue: 'Woven for quiet, sunlit mornings.',
                  })
                }
                className="textile-hero__img"
              />
            ) : (
              <div className="textile-media-placeholder">
                {t('textile.noImage', { defaultValue: 'Image unavailable' })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Shopping Assurances */}
      <section className="textile-assurances">
        <div className="textile-container textile-assurances__grid">
          <div className="textile-assurances__item">
            <span>
              {t('textile.assuranceDelivery', {
                defaultValue: 'Free Delivery across Yerevan & Regions',
              })}
            </span>
          </div>
          <div className="textile-assurances__item">
            <span>
              {t('textile.assuranceQuality', {
                defaultValue: '100% Certified Natural Fabrics',
              })}
            </span>
          </div>
          <div className="textile-assurances__item">
            <span>
              {t('textile.assurancePayment', {
                defaultValue: 'Flexible Cash & Card Payment',
              })}
            </span>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="textile-categories">
        <div className="textile-container">
          <div className="textile-section-head">
            <h2 className="textile-section-title">
              {t('textile.categoriesTitle', {
                defaultValue: 'Curated by Category',
              })}
            </h2>
            <span className="textile-section-caption">
              {t('textile.categoriesCaption', {
                defaultValue: 'Thoughtfully organized for every room in your home',
              })}
            </span>
          </div>

          {categories.length > 0 && (
            <div className="textile-categories__grid">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.slug;
                const thumbUrl = resolveMediaUrl(cat.image);
                return (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() =>
                      setSelectedCategory(isSelected ? 'all' : cat.slug)
                    }
                    className={`textile-category-card ${
                      isSelected ? 'textile-category-card--active' : ''
                    }`}
                  >
                    <div className="textile-category-card__thumb">
                      {thumbUrl ? (
                        <img src={thumbUrl} alt={cat.name || cat.slug} />
                      ) : (
                        <div className="textile-media-placeholder">
                          {cat.name || cat.slug}
                        </div>
                      )}
                    </div>
                    <div className="textile-category-card__title">
                      {cat.name || cat.slug}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Brand Story and Care */}
      <section className="textile-story">
        <div className="textile-container textile-story__grid">
          <div className="textile-story__media">
            {resolveMediaUrl(products[1]?.image || products[0]?.image) ? (
              <img
                src={resolveMediaUrl(products[1]?.image || products[0]?.image)}
                alt={t('textile.storyTitle', {
                  defaultValue: 'Quality you feel at the very first touch.',
                })}
              />
            ) : (
              <div className="textile-media-placeholder">
                {t('textile.noImage', { defaultValue: 'Image unavailable' })}
              </div>
            )}
          </div>

          <div>
            <div className="textile-hero__eyebrow">
              {t('textile.storyEyebrow', {
                defaultValue: 'THE VENTUM TEXTILE STANDARD',
              })}
            </div>
            <h2 className="textile-story__title">
              {t('textile.storyTitle', {
                defaultValue: 'Quality you feel at the very first touch.',
              })}
            </h2>
            <p className="textile-story__text">
              {t('textile.storyText', {
                defaultValue:
                  'At Ventum Textile, we select only breathable fibers and enduring weaves that grow softer with every wash—bringing quiet luxury, warmth, and comfort to your daily rituals.',
              })}
            </p>
            <a href="#textile-collection" className="textile-story__link">
              {t('textile.discoverCraft', {
                defaultValue: 'Discover our craft ->',
              })}
            </a>
          </div>
        </div>
      </section>

      {/* Shoppable Product Collection */}
      <section id="textile-collection" className="textile-collection">
        <div className="textile-container">
          <h2 className="textile-section-title">
            {t('textile.collectionTitle', {
              defaultValue: 'The Comfort Collection',
            })}
          </h2>
          <p className="textile-collection__sub">
            {t('textile.collectionSubtitle', {
              defaultValue:
                'Our most-loved bedding sets and textile essentials, tailored for deep and restorative rest.',
            })}
          </p>

          <div className="textile-toolbar">
            <div className="textile-filters">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setInStockOnly(false);
                }}
                className={`textile-filter-btn ${
                  selectedCategory === 'all' && !inStockOnly
                    ? 'textile-filter-btn--active'
                    : ''
                }`}
              >
                {t('textile.allProducts', { defaultValue: 'All Pieces' })}
              </button>

              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`textile-filter-btn ${
                    selectedCategory === cat.slug
                      ? 'textile-filter-btn--active'
                      : ''
                  }`}
                >
                  {cat.name || cat.slug}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setInStockOnly((prev) => !prev)}
                className={`textile-filter-btn ${
                  inStockOnly ? 'textile-filter-btn--active' : ''
                }`}
              >
                {t('textile.inStock', { defaultValue: 'In Stock' })}
              </button>
            </div>

            <select
              aria-label={t('textile.sortLabel', { defaultValue: 'Sort products' })}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="textile-sort-select"
            >
              <option value="featured">
                {t('textile.sortFeatured', { defaultValue: 'Sort by: Featured' })}
              </option>
              <option value="priceAsc">
                {t('textile.sortPriceAsc', { defaultValue: 'Price: Low to High' })}
              </option>
              <option value="priceDesc">
                {t('textile.sortPriceDesc', { defaultValue: 'Price: High to Low' })}
              </option>
            </select>
          </div>

          {loading && (
            <div className="textile-state-box">
              {t('textile.loading', { defaultValue: 'Loading products...' })}
            </div>
          )}

          {!loading && error && (
            <div className="textile-state-box textile-card__status--error">
              {error}
            </div>
          )}

          {!loading && !error && visibleProducts.length === 0 && (
            <div className="textile-state-box">
              {t('textile.empty', {
                defaultValue: 'No textile products found.',
              })}
            </div>
          )}

          {!loading && !error && visibleProducts.length > 0 && (
            <>
              <div className="textile-products-grid">
                {visibleProducts.map((product) => {
                  const imgUrl = resolveMediaUrl(product.image);
                  const feedback = cardFeedback[product.sku];
                  const isAdding = addingSku === product.sku;

                  return (
                    <article key={product.sku} className="textile-card">
                      <div>
                        <div className="textile-card__media">
                          {imgUrl ? (
                            <img
                              src={imgUrl}
                              alt={product.name || product.sku}
                            />
                          ) : (
                            <div className="textile-media-placeholder">
                              {t('textile.noImage', {
                                defaultValue: 'No image',
                              })}
                            </div>
                          )}

                          {product.discount_label && (
                            <span className="textile-card__badge">
                              {product.discount_label}
                            </span>
                          )}

                          <span className="textile-card__stock">
                            {product.in_stock === false
                              ? t('textile.outOfStock', {
                                  defaultValue: 'Out of Stock',
                                })
                              : t('textile.inStockBadge', {
                                  defaultValue: 'In Stock',
                                })}
                          </span>
                        </div>

                        <h3 className="textile-card__title">
                          {product.name || product.sku}
                        </h3>
                        <div className="textile-card__meta">
                          {product.category?.name || ''}
                        </div>
                      </div>

                      <div className="textile-card__price-row">
                        <span className="textile-card__price">
                          {formatAmdPrice(product.price)}
                        </span>
                        {product.compare_at_price && (
                          <span className="textile-card__old-price">
                            {formatAmdPrice(product.compare_at_price)}
                          </span>
                        )}
                      </div>

                      <div className="textile-card__actions">
                        <button
                          type="button"
                          disabled={isAdding || product.in_stock === false}
                          onClick={() => handleAddToCart(product)}
                          className="textile-card__cart-btn"
                        >
                          {isAdding
                            ? t('textile.addingToCart', {
                                defaultValue: 'Adding...',
                              })
                            : t('textile.addToCart', {
                                defaultValue: 'Add to Cart',
                              })}
                        </button>

                        {feedback && (
                          <div
                            className={`textile-card__status textile-card__status--${feedback.type}`}
                          >
                            {feedback.message}
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>

              {filteredProducts.length > 8 && (
                <div className="textile-view-all-wrap">
                  <button
                    type="button"
                    onClick={() => setShowAll((prev) => !prev)}
                    className="textile-view-all-btn"
                  >
                    {showAll
                      ? t('textile.showLess', { defaultValue: 'Show Less' })
                      : `${t('textile.viewAll', {
                          defaultValue: 'View All Products',
                        })} (${filteredProducts.length})`}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}