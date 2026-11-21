import { api } from '../../api/client'

export const PAGE_TITLE_KEY = 'pageTitles.baby'
export const BABY_STORE = 'baby'

export async function fetchBabyCatalog() {
  const [categoriesResponse, productsResponse] = await Promise.all([
    api.get('/api/catalog/categories/', { params: { store: BABY_STORE } }),
    api.get('/api/catalog/products/', { params: { store: BABY_STORE } }),
  ])

  const categoryList = Array.isArray(categoriesResponse.data)
    ? categoriesResponse.data
    : categoriesResponse.data?.results ?? []

  const productList = Array.isArray(productsResponse.data)
    ? productsResponse.data
    : productsResponse.data?.results ?? []

  const categories = categoryList.filter(
    (category) => !category.store || category.store === BABY_STORE,
  )
  const products = productList.filter(
    (product) => product.store === BABY_STORE && product.published !== false,
  )

  return { categories, products }
}
