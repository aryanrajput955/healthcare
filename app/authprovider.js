// app/providers.js
'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import useAuthStore from './lib/authstore'

export function AuthProvider({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const { initializeAuth, token } = useAuthStore()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    initializeAuth()
    setIsInitialized(true)
  }, [])

  useEffect(() => {
    if (!isInitialized) return

    const protectedRoutes = ['/dashboard', '/admin', '/profile', '/settings', '/claims', '/create-user-journey']
    const isProtected = protectedRoutes.some(route => pathname.startsWith(route))

    if (isProtected && !token) {
      router.push(`/login?redirect=${pathname}`)
    }
  }, [pathname, token, router, isInitialized])

  return children
}