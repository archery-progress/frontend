import { useEffect, useState } from 'react'
import { useGetAuthenticatedUserQuery } from '@/data/api/auth_api.ts'

/**
 * Custom hook to debounce useEffect
 * @param fn The effect callback to debounce
 * @param dependencies Dependencies that trigger the effect
 * @param delay The debounce delay in milliseconds
 */
export function useDebouncedEffect(fn: () => void, dependencies: unknown[], delay: number) {
  useEffect(() => {
    const handler = setTimeout(fn, delay)
    return () => clearTimeout(handler)
  }, [...dependencies, delay])
}

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

export function useUserPermissions(permissions: string[] | string, strategy?: string): boolean {
  const { data: user } = useGetAuthenticatedUserQuery()
  if (!user || !user?.permissions || !user?.roles) return false
  if (!permissions) return false

  const targetPermissions = Array.isArray(permissions) ? permissions : [permissions]
  const currentPermissions = [
    ...user.permissions.map((permission) => permission.uid),
    ...user.roles.reduce((acc, role) => {
      return [...acc, ...role.permissions!.map((permission) => permission.uid)]
    }, [] as string[]),
  ]

  const match: { [key: string]: () => boolean } = {
    'and': () => targetPermissions.every((permission) => currentPermissions.includes(permission)),
    'or': () => targetPermissions.some((permission) => currentPermissions.includes(permission)),
    _: () => currentPermissions.some((permission) => permission === targetPermissions[0]),
  }

  return (strategy ? match[strategy] : match._)()
}

export type DialogContext = {
  state: boolean
  setState: (state: boolean) => void
  open: () => void
  close: () => void
}

export function useDialog(): DialogContext {
  const [state, setState] = useState(false)

  const open = () => setState(true)
  const close = () => setState(false)

  return { state, setState, open, close }
}
