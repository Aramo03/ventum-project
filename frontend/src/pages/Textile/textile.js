import { api } from '../../api/client';

export const TEXTILE_HIGHLIGHTS = [
  { key: 'assurance1', icon: '✦' },
  { key: 'assurance2', icon: '◈' },
  { key: 'assurance3', icon: '◇' },
];

export const TEXTILE_VISUAL_CATEGORIES = [
  { slug: 'bed-linen', fallbackName: 'Bed Linen' },
  { slug: 'natural-fabrics', fallbackName: 'Natural Fabrics' },
  { slug: 'bath-towels', fallbackName: 'Bath Towels' },
  { slug: 'duvet-covers', fallbackName: 'Duvet Covers' },
  { slug: 'drapery-curtains', fallbackName: 'Drapery & Curtains' },
  { slug: 'table-linen', fallbackName: 'Table Linen' },
  { slug: 'fabrics-craft', fallbackName: 'Fabrics & Craft' },
  { slug: 'home-blankets', fallbackName: 'Home Blankets' },
  { slug: 'sleep-pillows', fallbackName: 'Sleep Pillows' },
  { slug: 'mattress-protectors', fallbackName: 'Mattress Protectors' },
];

export async function fetchTextileCategories() {
  const response = await api.get('/api/catalog/categories/', {
    params: { store: 'textile' },
  });
  const data = response.data;
  return Array.isArray(data) ? data : data?.results || [];
}

export async function fetchTextileProducts() {
  const response = await api.get('/api/catalog/products/', {
    params: { store: 'textile' },
  });
  const data = response.data;
  const items = Array.isArray(data) ? data : data?.results || [];
  return items.filter((item) => item?.store === 'textile');
}

export function filterTextileProducts(products, { q = '', category = '' } = {}) {
  const normalizedQuery = q.trim().toLowerCase();
  const normalizedCategory = category.trim().toLowerCase();

  return products.filter((product) => {
    if (!product || product.store !== 'textile') {
      return false;
    }

    if (normalizedCategory) {
      const catSlug =
        typeof product.category === 'string'
          ? product.category.toLowerCase()
          : (product.category?.slug || '').toLowerCase();
      const catName =
        typeof product.category === 'object'
          ? (product.category?.name || '').toLowerCase()
          : '';

      if (catSlug !== normalizedCategory && catName !== normalizedCategory) {
        return false;
      }
    }

    if (normalizedQuery) {
      const name = (product.name || '').toLowerCase();
      const sku = (product.sku || '').toLowerCase();
      const description = (product.description || '').toLowerCase();

      return (
        name.includes(normalizedQuery) ||
        sku.includes(normalizedQuery) ||
        description.includes(normalizedQuery)
      );
    }

    return true;
  });
}