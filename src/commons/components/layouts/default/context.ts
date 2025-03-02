import { createContext, ReactElement } from 'react'
import { State } from '@/commons/utils'

export type BreadcrumbElement = {
  label: string
  url?: string
}

export type PageProps = {
  trailing?: ReactElement
}

export const BreadcrumbContext = createContext<State<BreadcrumbElement[]>>(null as never)
export const PageContext = createContext<State<PageProps>>(null as never)
