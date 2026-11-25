export const CATALOG_STATES = ['empty', 'loading', 'error']

export function emptyCopy(brand) {
  if (brand === 'baby') {
    return {
      titleKey: 'catalogState.babyEmptyTitle',
      textKey: 'catalogState.babyEmptyText',
      actionKey: 'catalogState.babyEmptyAction',
    }
  }

  return {
    titleKey: 'catalogState.textileEmptyTitle',
    textKey: 'catalogState.textileEmptyText',
    actionKey: '',
  }
}

export function shopBrand(brand) {
  return brand === 'baby' ? 'baby' : 'textile'
}
