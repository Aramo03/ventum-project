import api from '../../api/client';

export const TEXTILE_STORE = 'textile';

export async function fetchTextileCatalog() {
  const [categoriesRes, productsRes] = await Promise.all([
    api.get('/api/catalog/categories/', { params: { store: TEXTILE_STORE } }),
    api.get('/api/catalog/products/', { params: { store: TEXTILE_STORE } }),
  ]);

  const categoriesList = Array.isArray(categoriesRes.data?.results)
    ? categoriesRes.data.results
    : Array.isArray(categoriesRes.data)
    ? categoriesRes.data
    : [];

  const productsList = Array.isArray(productsRes.data?.results)
    ? productsRes.data.results
    : Array.isArray(productsRes.data)
    ? productsRes.data
    : [];

  // Ապահովագրում ենք, որ ցուցադրվեն միայն textile խանութի տվյալները
  const categories = categoriesList.filter((cat) => !cat.store || cat.store === TEXTILE_STORE);
  const products = productsList.filter((prod) => prod.store === TEXTILE_STORE);

  return { categories, products };
}