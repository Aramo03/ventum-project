import { api } from '../../api/client'

export const PAGE_TITLE_KEY = 'pageTitles.baby'
export const STORE_KEY = 'baby'
export const BABY_STORE = STORE_KEY

export const ASSURANCE_KEYS = [
  { id: 'cotton', titleKey: 'baby.assurances.cottonTitle', textKey: 'baby.assurances.cottonText' },
  { id: 'delivery', titleKey: 'baby.assurances.deliveryTitle', textKey: 'baby.assurances.deliveryText' },
  { id: 'wash', titleKey: 'baby.assurances.washTitle', textKey: 'baby.assurances.washText' },
]

export const STORY_PILLAR_KEYS = [
  'baby.story.pillar1',
  'baby.story.pillar2',
  'baby.story.pillar3',
]

export const CARE_STEP_KEYS = [
  'baby.care.step1',
  'baby.care.step2',
  'baby.care.step3',
]

function extractList(data) {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.results)) return data.results
  return []
}

export async function fetchBabyCatalog() {
  const [categoriesResponse, productsResponse] = await Promise.all([
    api.get('/api/catalog/categories/', { params: { store: STORE_KEY } }),
    api.get('/api/catalog/products/', { params: { store: STORE_KEY } }),
  ])

  const categories = extractList(categoriesResponse.data).filter(
    (category) => !category.store || category.store === STORE_KEY,
  )
  const products = extractList(productsResponse.data).filter(
    (product) => product.store === STORE_KEY && product.published !== false,
  )

  return { categories, products }
}

export function filterBabyProducts(products, { category, q }) {
  const normalizedCategory = (category || '').trim().toLowerCase()
  const normalizedQuery = (q || '').trim().toLowerCase()

  return products.filter((product) => {
    if (product.store !== STORE_KEY) return false

    if (normalizedCategory) {
      const productSlug = (product.category?.slug || '').toLowerCase()
      if (productSlug !== normalizedCategory) return false
    }

    if (normalizedQuery) {
      const name = (product.name || '').toLowerCase()
      const sku = (product.sku || '').toLowerCase()
      const catName = (product.category?.name || '').toLowerCase()
      return (
        name.includes(normalizedQuery) ||
        sku.includes(normalizedQuery) ||
        catName.includes(normalizedQuery)
      )
    }

    return true
  })
}
