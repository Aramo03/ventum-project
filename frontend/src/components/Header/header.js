
export const LANGUAGES = [
  { code: 'am', label: 'ARM' },
  { code: 'en', label: 'ENG' },
  { code: 'ru', label: 'RU' },
]

export const NAV_ITEMS = [
  { key: 'nav.bedLinen', label: 'Bed Linen', slug: 'textile-home' },
  { key: 'nav.fabrics', label: 'Fabrics', slug: 'textile-fabrics' },
  { key: 'nav.towels', label: 'Towels', slug: 'textile-towels' },
  { key: 'nav.hotel', label: 'Hotel Series', slug: 'textile-hotel' },
  { key: 'nav.curtains', label: 'Curtains', slug: 'textile-curtains' },
  { key: 'nav.tablecloths', label: 'Tablecloths', slug: 'textile-tablecloths' },
  { key: 'nav.sewingSupplies', label: 'Sewing Supplies', slug: 'textile-sewing' },
  { key: 'nav.blankets', label: 'Blankets', slug: 'textile-blankets' },
  { key: 'nav.pillows', label: 'Pillows', slug: 'textile-pillows' },
  { key: 'nav.mattresses', label: 'Mattresses', slug: 'textile-mattresses' },
]

export const BABY_NAV_ITEMS = [
  { key: 'nav.babyApparel', label: 'Baby Apparel', slug: 'baby-care' },
  { key: 'nav.newbornSets', label: 'Newborn Sets', slug: 'baby-newborn' },
  { key: 'nav.nurseryCribs', label: 'Nursery Cribs', slug: 'baby-bedding' },
  { key: 'nav.strollers', label: 'Strollers', slug: 'baby-strollers' },
  { key: 'nav.highChairs', label: 'High Chairs', slug: 'baby-chairs' },
]

export function knownLanguage(code) {
  const base = String(code || '').split('-')[0]
  return LANGUAGES.some((language) => language.code === base) ? base : ''
}

export function activeLanguageCode(resolved) {
  let stored = ''
  try {
    stored = localStorage.getItem('i18nextLng') || ''
  } catch {
    stored = ''
  }
  if (stored && !knownLanguage(stored)) return ''
  return knownLanguage(stored) || knownLanguage(resolved)
}

export function shopPathname(pathname) {
  if (String(pathname || '').startsWith('/baby')) return '/baby'
  return '/textile'
}

export const PHONE = '+374 10 55 44 33'
