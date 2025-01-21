import { useEffect, useState } from 'react'
import { useGetAuthenticatedUserQuery } from '@/data/api/auth_api.ts'
import { Permission, PermissionKey } from '@/data/models/permission.ts'

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

export function useUserPermissions() {
  const { data: user } = useGetAuthenticatedUserQuery()
  const { deserialize } = usePermissionBitwise()

  function can(permissions: PermissionKey | PermissionKey[]) {
    if (!user) return false

    const userPermissions = deserialize(user.permissions)
    return Array.isArray(permissions)
      ? permissions.every((permission) => userPermissions.includes(permission))
      : userPermissions.includes(permissions)
  }

  return {
    can
  }
}

export type DialogContext = {
  state: boolean
  setState: (state: boolean) => void
  open: () => void
  close: () => void
}

export function useDialog(defaultValue = false): DialogContext {
  const [state, setState] = useState(defaultValue)

  const open = () => setState(true)
  const close = () => setState(false)

  return { state, setState, open, close }
}

export type DialogResourceContext<T> = {
  resource: T | null
  setResource: (state: T | null) => void
  open: (value: T) => void
  close: () => void
}

export function useDialogResource<T>(defaultValue = null): DialogResourceContext<T> {
  const [resource, setResource] = useState<T | null>(defaultValue)

  const open = (value: T) => setResource(value)
  const close = () => setResource(null)

  return { resource, setResource, open, close }
}


export function usePermissionBitwise() {
  function serialize(values: PermissionKey[]): number {
    return values.reduce((acc: number, element: PermissionKey) => acc | Permission[element].value, 0)
  }

  function deserialize(value: number): PermissionKey[] {
    const permissionKeys: PermissionKey[] = [];

    Object.entries(Permission).forEach(([key, val]) => {
      if ((value & val.value) === val.value) {
        permissionKeys.push(key as PermissionKey);
      }
    })

    return permissionKeys;
  }

  function has(value: number, permission: PermissionKey): boolean {
    return (value & Permission[permission].value) === Permission[permission].value
  }

  function add(value: number, permission: PermissionKey): number {
    return value | Permission[permission].value
  }

  function remove(value: number, permission: PermissionKey): number {
    return value & ~Permission[permission].value
  }

  return {
    serialize,
    deserialize,
    has,
    add,
    remove,
    internals: {
      INTERNAL_PLATFORM: Permission.INTERNAL_PLATFORM,
      INTERNAL_MANAGER: Permission.INTERNAL_MANAGER,
    },
  }
}
