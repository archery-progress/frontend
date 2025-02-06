import { useEffect, useState } from 'react'
import { useGetAuthenticatedUserQuery } from '@/data/api/auth_api.ts'
import { Permission, PermissionKey } from '@/data/models/permission.ts'
import { toast } from 'sonner'
import { toastVariant } from '@/commons/utils/utils.tsx'
import { TypedUseQueryHookResult } from '@reduxjs/toolkit/query/react'

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
    mql.addEventListener('change', onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return !!isMobile
}

export function useUserPermissions() {
  const {data: user} = useGetAuthenticatedUserQuery()
  const {deserialize} = usePermissionBitwise()

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

  return {state, setState, open, close}
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

  return {resource, setResource, open, close}
}


export function usePermissionBitwise() {
  function serialize(values: PermissionKey[]): number {
    return values.reduce((acc: number, element: PermissionKey) => acc | Permission[element].value, 0)
  }

  function deserialize(value: number): PermissionKey[] {
    const permissionKeys: PermissionKey[] = []

    Object.entries(Permission).forEach(([key, val]) => {
      if ((value & val.value) === val.value) {
        permissionKeys.push(key as PermissionKey)
      }
    })

    return permissionKeys
  }

  function has(value: number, permission: PermissionKey): boolean {
    if (!Permission[permission]) return false
    return (value & Permission[permission].value) === Permission[permission].value
  }

  function hasOne(value: number, permissions: PermissionKey[]): boolean {
    return permissions.some((permission) => {
      return has(value, permission)
    })
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
    hasOne,
    add,
    remove,
    internals: {
      INTERNAL_PLATFORM: Permission.INTERNAL_PLATFORM,
      INTERNAL_MANAGER: Permission.INTERNAL_MANAGER
    },
    structures: {
      MANAGE_STRUCTURE: Permission.MANAGE_STRUCTURE,
      MANAGE_MEMBERS: Permission.MANAGE_MEMBERS,
      VIEW_MEMBERS: Permission.VIEW_MEMBERS,
      MANAGE_ROLES: Permission.MANAGE_ROLES,
      VIEW_LOGS: Permission.VIEW_LOGS,
      MANAGE_PRACTICES: Permission.MANAGE_PRACTICES,
      MANAGE_NOTIFICATIONS: Permission.MANAGE_NOTIFICATIONS,
      VIEW_ROLES: Permission.VIEW_ROLES
    }
  }
}

export function useCurrentMemberPermissions(_structureId?: string) {
  const {data: user} = useGetAuthenticatedUserQuery()
  const {deserialize} = usePermissionBitwise()

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

type ResultQueryType<T> = TypedUseQueryHookResult<T, void, any, any>
type UseResultQueryProps = {
  onSuccess: string
  onError: string
}

export function useQueryResult<T>(result: ResultQueryType<T>, props: UseResultQueryProps) {
  useEffect(() => {
    if (result.isSuccess) {
      toast.success('Success', {
        ...toastVariant.success,
        description: props.onSuccess
      })
    }

    if (result.isError) {
      toast.error('Error', {
        ...toastVariant.error,
        description: props.onError
      })
    }
  }, [result])
}
