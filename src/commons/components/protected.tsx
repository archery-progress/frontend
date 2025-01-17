import { PropsWithChildren } from 'react'
import { useUserPermissions } from '@/commons/utils'

type Props = {
  permissions: string | string[]
  strategy?: 'and' | 'or'
}

export default function Protected(props: PropsWithChildren<Props>) {
  const result = useUserPermissions(props.permissions, props.strategy)
  if (result) return props.children
}
