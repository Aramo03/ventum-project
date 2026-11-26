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

async function fetchAllPages(url, params) {
  const items = []
  for (let page = 1; page <= 20; page += 1) {
    const { data } = await api.get(url, { params: { ...params, page } })
    if (Array.isArray(data)) return data
    items.push(...extractList(data))
    if (!data?.next) break
  }
  return items
}

export async function fetchBabyCatalog() {
  const [categoryList, productList] = await Promise.all([
    fetchAllPages('/api/catalog/categories/', { store: STORE_KEY }),
    fetchAllPages('/api/catalog/products/', { store: STORE_KEY }),
  ])

  const categories = categoryList.filter(
    (category) => !category.store || category.store === STORE_KEY,
  )
  const products = productList.filter(
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