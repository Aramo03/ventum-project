import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const STORAGE_KEY = 'ventum_shop'

function readStoredShop() {
  try {
    const value = sessionStorage.getItem(STORAGE_KEY)
    return value === 'textile' || value === 'baby' ? value : null
  } catch {
    return null
  }
}

function writeStoredShop(shop) {
  try {
    if (shop) {
      sessionStorage.setItem(STORAGE_KEY, shop)
    }
  } catch {
    /* ignore quota / private mode */
  }
}

function shopFromPath(pathname) {
  if (pathname === '/textile' || pathname.startsWith('/textile/')) {
    return 'textile'
  }
  if (pathname === '/baby' || pathname.startsWith('/baby/')) {
    return 'baby'
  }
  return null
}

function keepsLastShop(pathname) {
  return pathname === '/cart' || pathname.startsWith('/product/')
}

/**
 * Active shop for header/footer chrome.
 * /textile and /baby set it. /product/:sku and /cart keep the last tab shop.
 * Other routes have no shop.
 */
export function useShop() {
  const { pathname } = useLocation()
  const [shop, setShop] = useState(() => {
    const fromPath = shopFromPath(pathname)
    if (fromPath) return fromPath
    if (keepsLastShop(pathname)) return readStoredShop()
    return null
  })

  useEffect(() => {
    const fromPath = shopFromPath(pathname)
    if (fromPath) {
      writeStoredShop(fromPath)
      setShop(fromPath)
      return
    }

    if (keepsLastShop(pathname)) {
      setShop(readStoredShop())
      return
    }

    setShop(null)
  }, [pathname])

  return shop
}
