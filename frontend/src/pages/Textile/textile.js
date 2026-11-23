import { api } from '../../api/client';

export const STORE_KEY = 'textile';

export const ASSURANCE_KEYS = [
  { id: 'quality', titleKey: 'textile.assurances.qualityTitle', textKey: 'textile.assurances.qualityText' },
  { id: 'delivery', titleKey: 'textile.assurances.deliveryTitle', textKey: 'textile.assurances.deliveryText' },
  { id: 'care', titleKey: 'textile.assurances.careTitle', textKey: 'textile.assurances.careText' },
];

export const CARE_PILLAR_KEYS = [
  'textile.story.pillar1',
  'textile.story.pillar2',
  'textile.story.pillar3',
];

function extractList(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  return [];
}

export async function fetchTextileCatalog() {
  const [categoriesRes, productsRes] = await Promise.all([
    api.get('/api/catalog/categories/', { params: { store: STORE_KEY } }),
    api.get('/api/catalog/products/', { params: { store: STORE_KEY } }),
  ]);

  const categories = extractList(categoriesRes.data).filter(
    (item) => !item.store || item.store === STORE_KEY
  );

  const products = extractList(productsRes.data).filter(
    (item) => item.store === STORE_KEY
  );

  return { categories, products };
}

export function filterTextileProducts(products, { category, q }) {
  const normalizedCategory = (category || '').trim().toLowerCase();
  const normalizedQuery = (q || '').trim().toLowerCase();

  return products.filter((product) => {
    if (product.store !== STORE_KEY) return false;

    if (normalizedCategory) {
      const productSlug = (product.category?.slug || '').toLowerCase();
      if (productSlug !== normalizedCategory) return false;
    }

    if (normalizedQuery) {
      const name = (product.name || '').toLowerCase();
      const sku = (product.sku || '').toLowerCase();
      const catName = (product.category?.name || '').toLowerCase();
      return (
        name.includes(normalizedQuery) ||
        sku.includes(normalizedQuery) ||
        catName.includes(normalizedQuery)
      );
    }

    return true;
  });
}