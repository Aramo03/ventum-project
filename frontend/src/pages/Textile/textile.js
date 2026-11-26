import { api } from '../../api/client';

export function resolveMediaUrl(url) {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  const base = (api.defaults.baseURL || '').replace(/\/+$/, '');
  const cleanPath = url.startsWith('/') ? url : `/${url}`;
  return `${base}${cleanPath}`;
}

export async function fetchTextileCatalog(language) {
  const params = { store: 'textile' };
  if (language) {
    params.language = language;
  }

  const [categoriesRes, productsRes] = await Promise.all([
    api.get('/api/catalog/categories/', { params }),
    api.get('/api/catalog/products/', { params }),
  ]);

  const categoriesData = Array.isArray(categoriesRes.data)
    ? categoriesRes.data
    : categoriesRes.data?.results || [];

  const productsData = Array.isArray(productsRes.data)
    ? productsRes.data
    : productsRes.data?.results || [];

  const categories = categoriesData.filter(
    (item) => !item.store || item.store === 'textile'
  );

  const products = productsData.filter(
    (item) =>
      (!item.store || item.store === 'textile') &&
      item.is_published !== false
  );

  return { categories, products };
}

export async function addTextileItemToCart(sku, qty = 1) {
  const response = await api.post('/api/cart/items/', { sku, qty });
  window.dispatchEvent(new CustomEvent('cart-updated', { detail: response.data }));
  return response.data;
}

export function formatAmdPrice(price) {
  const num = Number(price);
  if (Number.isNaN(num)) return String(price ?? '');
  return `${num.toLocaleString('en-US')} AMD`;
}