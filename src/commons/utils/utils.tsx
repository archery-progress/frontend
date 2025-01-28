import { ExternalToast } from 'sonner'
import { useNavigate } from 'react-router'

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function getCurrentParameters(source?: URLSearchParams): { [key: string]: string } {
  const queryParams = source ?? new URLSearchParams(window.location.search)
  return Array.from(queryParams.entries()).reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
}

export function useChangeItemPerPage() {
  const navigate = useNavigate()

  function changeItemPerPage(url: string, value: string | number) {
    const queryParams = new URLSearchParams(window.location.search)
    queryParams.set('limit', value.toString())

    navigate({
      pathname: url,
      search: `?${queryParams.toString()}`
    })
  }

  return changeItemPerPage
}

export function useChangeParameter() {
  const navigate = useNavigate()

  function changeParameter(resourceRoute: string, key: string, value: string | number | boolean) {
    const queryParams = new URLSearchParams(window.location.search)
    const target = queryParams.get(key)

    if (target === value) {
      queryParams.delete(key)
    } else {
      queryParams.set(key, value.toString())
    }

    navigate({
      pathname: resourceRoute,
      search: `?${queryParams.toString()}`
    })
  }

  return changeParameter
}

export function useChangeCurrentPage() {
  const navigate = useNavigate()

  function replaceCurrentPage(url: string, value: string | number | undefined) {
    const queryParams = new URLSearchParams(window.location.search)
    if (value) {
      queryParams.set('page', value.toString())
    }

    navigate({
      pathname: url,
      search: `?${queryParams.toString()}`
    })
  }

  return replaceCurrentPage
}

export function useSearchByKey() {
  const navigate = useNavigate()

  function searchByKey(route: string, searchKey: string, value: string | number | undefined, source?: URLSearchParams) {
    const payload = getCurrentParameters(source)

    if (value) {
      payload[searchKey] = value.toString()
    }

    const queryParams = new URLSearchParams(payload)
    navigate({
      pathname: route,
      search: `?${queryParams.toString()}`
    })
  }

  return searchByKey
}

enum ToastVariant {
  error = 'error',
  success = 'success',
}

const baseVariant: ExternalToast = {
  closeButton: true,
  unstyled: true,
  classNames: {
    toast: 'w-[356px] p-4 rounded flex gap-2 border border-input !shadow-sm',
    title: 'flex items-center -mt-0.5 text-sm font-semibold',
    content: '!text-sm',
    success: '!text-green-600 !bg-green-50',
    error: '!text-red-600 !bg-red-50',
    warning: '!text-yellow-600 !bg-yellow-50',
    info: '!text-blue-600 !bg-blue-50',
    description: 'font-medium',
    closeButton: 'bg-white border border-input',
  },
}

export const toastVariant: { [key in ToastVariant]: ExternalToast } = {
  error: baseVariant,
  success: baseVariant,
}

type Action = 'store' | 'update' | 'delete'

export const permission = {
  users: (action: Action, manager: boolean = false) => `${manager ? 'manager:' : ''}users:${action}`,
  roles: (action: Action, manager: boolean = false) => `${manager ? 'manager:' : ''}roles:${action}`,
  permissions: (action: Action, manager: boolean = false) => `${manager ? 'manager:' : ''}permissions:${action}`,
  guilds: (action: Action, manager: boolean = false) => `${manager ? 'manager:' : ''}guilds:${action}`,
}
