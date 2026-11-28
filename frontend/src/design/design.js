export const BUTTON_STATES = [
  { id: 'default', label: 'default' },
  { id: 'hover', label: 'hover', className: 'is-hover' },
  { id: 'pressed', label: 'pressed', className: 'is-pressed' },
  { id: 'focus', label: 'focus-visible', className: 'is-focus' },
  { id: 'disabled', label: 'disabled', className: 'is-disabled', disabled: true },
  { id: 'loading', label: 'loading', className: 'is-loading' },
]

export const LIBRARY = [
  { href: '#palettes', name: 'Palette', note: 'Textile and Baby. Sample, role, value.' },
  { href: '#type', name: 'Type', note: 'Armenian display and body. Scale for am, en, ru.' },
  { href: '#rhythm', name: 'Space and surface', note: 'Measure, value, elevation, 4:3 media.' },
  { href: '#motion', name: 'Motion', note: 'Durations, easing, shift, and scale tokens.' },
  { href: '#controls', name: 'Store controls', note: 'Switch, search, category, primary action.' },
  { href: '#purchase', name: 'Button, size, badge', note: 'Six states. Card and Cash. Visa and Mastercard.' },
  { href: '#card', name: 'Product card', note: 'Anatomy and interaction states. Specimen only.' },
  { href: '#form', name: '08 / Form', note: 'Newsletter field states. No live request.' },
  { href: '#feedback', name: '09 / Feedback', note: 'Empty, skeleton, and error. No live request.' },
]

export const MOTION_TOKENS = [
  { token: '--ds-duration-fast', value: '120ms', role: 'Hover and press' },
  { token: '--ds-duration-base', value: '200ms', role: 'State change' },
  { token: '--ds-duration-enter', value: '280ms', role: 'Section enter' },
  { token: '--ds-duration-slow', value: '400ms', role: 'Photo change' },
  { token: '--ds-duration-spin', value: '700ms', role: 'Loading spin' },
  { token: '--ds-duration-skeleton', value: '1.2s', role: 'Skeleton pulse' },
  { token: '--ds-ease-standard', value: 'cubic-bezier(0.4, 0, 0.2, 1)', role: 'Standard curve' },
  { token: '--ds-ease-enter', value: 'cubic-bezier(0.2, 0.8, 0.2, 1)', role: 'Enter curve' },
  { token: '--ds-ease-exit', value: 'cubic-bezier(0.4, 0, 1, 1)', role: 'Exit curve' },
  { token: '--ds-motion-shift', value: '0.75rem → 0', role: 'Reveal shift' },
  { token: '--ds-motion-scale', value: '0.98 → 1', role: 'Press scale' },
]

export const PALETTES = [
  {
    id: 'textile',
    identity: 'Ventum Textile',
    wordmark: 'VENTUM',
    mark: 'textile',
    tagline: 'Crisp / Natural / Precise',
    principles: ['Crisp', 'Natural', 'Precise'],
    colors: [
      { role: 'Leaf / Primary', token: '--ds-textile-accent', value: '#6CC218' },
      { role: 'White / Surface', token: '--ds-textile-canvas', value: '#FFFFFF' },
      { role: 'Charcoal / Ink', token: '--ds-textile-ink', value: '#2F353B' },
    ],
  },
  {
    id: 'baby',
    identity: 'Ventum Baby',
    wordmark: 'VENTUM',
    mark: 'BABY',
    tagline: 'Cozy / Gentle / Caring',
    principles: ['Cozy', 'Gentle', 'Caring'],
    colors: [
      { role: 'Sage / Primary', token: '--ds-baby-accent', value: '#6E8B57' },
      { role: 'Cream / Canvas', token: '--ds-baby-canvas', value: '#FAF7F0' },
      { role: 'Soft gold / Detail', token: '--ds-baby-detail', value: '#C5A66B' },
    ],
  },
]

export const TYPE_SCALE = [
  { token: '--ds-type-display', name: 'Display', size: '4rem', line: '1.05', sample: 'Հանգիստ', lang: 'hy' },
  { token: '--ds-type-title', name: 'Title', size: '2.5rem', line: '1.12', sample: 'Վենտում', lang: 'hy' },
  { token: '--ds-type-heading', name: 'Heading', size: '1.75rem', line: '1.25', sample: 'Գործվածք', lang: 'hy' },
  { token: '--ds-type-body', name: 'Body', size: '1rem', line: '1.5', sample: 'Հանգիստ տուն', lang: 'hy' },
  { token: '--ds-type-small', name: 'Small', size: '0.875rem', line: '1.4', sample: 'Կարճ բնութագիր', lang: 'hy' },
  { token: '--ds-type-caption', name: 'Caption', size: '0.75rem', line: '1.3', sample: 'ԴԵՐ', lang: 'hy' },
]

export const SPACING = [
  { token: '--ds-space-1', measure: '4', value: '0.25rem' },
  { token: '--ds-space-2', measure: '8', value: '0.5rem' },
  { token: '--ds-space-3', measure: '12', value: '0.75rem' },
  { token: '--ds-space-4', measure: '16', value: '1rem' },
  { token: '--ds-space-5', measure: '24', value: '1.5rem' },
  { token: '--ds-space-6', measure: '32', value: '2rem' },
  { token: '--ds-space-7', measure: '48', value: '3rem' },
  { token: '--ds-space-8', measure: '64', value: '4rem' },
]

export const BRANDS = [
  {
    id: 'textile',
    name: 'Textile',
    search: 'Search linen',
    categories: ['Bed linen', 'Fabrics', 'Curtains'],
    selectedCategory: 'Bed linen',
    activeStore: 'Textile',
    product: {
      name: 'Washed linen sheet',
      spec: 'Stone · washed linen',
      price: '22,400 AMD',
      oldPrice: '28,000 AMD',
      discount: '−20%',
      stock: 'In stock',
    },
  },
  {
    id: 'baby',
    name: 'Baby',
    search: 'Search cotton',
    categories: ['Apparel', 'Bedding', 'Nursery'],
    selectedCategory: 'Apparel',
    activeStore: 'Baby',
    product: {
      name: 'Cloud cotton wrap',
      spec: 'Sage · organic cotton',
      price: '14,900 AMD',
      oldPrice: '18,600 AMD',
      discount: '−20%',
      stock: 'In stock',
    },
  },
]

export const SIZES = [
  { id: 's', label: 'S', selected: true },
  { id: 'm', label: 'M', selected: false },
  { id: 'l', label: 'L', selected: false },
]

export const FORM_STATES = [
  { id: 'default', label: 'default', hint: '' },
  { id: 'focus', label: 'focus-visible', className: 'is-focus', hint: '' },
  {
    id: 'invalid',
    label: 'invalid',
    className: 'is-invalid',
    hint: 'Մուտքագրեք վավեր էլ. հասցե։',
    value: 'not-an-email',
  },
  {
    id: 'success',
    label: 'success',
    className: 'is-success',
    hint: 'Բաժանորդագրությունն ավարտված է',
    value: 'name@ventum.am',
  },
  { id: 'disabled', label: 'disabled', className: 'is-disabled', disabled: true, hint: '' },
  { id: 'loading', label: 'loading', className: 'is-loading', hint: '' },
]

export const FEEDBACK = {
  textileEmptyTitle: 'Ոչ մի արդյունք չի գտնվել',
  textileEmptyText: 'Փորձեք փոխել որոնման բառը կամ բաժինը։',
  babyEmptyTitle: 'Ոչ մի ապրանք չի գտնվել',
  babyEmptyText: 'Փորձեք ընտրել մեկ այլ բաժին։',
  babyEmptyAction: 'Բոլոր բաժինները',
  errorTitle: 'Բեռնումը ձախողվել է',
  errorText: 'Ստուգեք ձեր ինտերնետ կապը և փորձեք կրկին',
  errorAction: 'Կրկին փորձել',
}
