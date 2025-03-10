import { ReactElement, useContext, useEffect } from 'react'
import { BreadcrumbContext, BreadcrumbElement, PageContext } from '@/commons/components/layouts/default/context.ts'

export function useDefineBreadcrumb(elements: BreadcrumbElement[]) {
  const [_, setBreadcrumb] = useContext(BreadcrumbContext)

  useEffect(() => {
    setBreadcrumb(elements)
  }, [])
}

export function useDefineTrailing(trailing: ReactElement) {
  const [page, setPage] = useContext(PageContext)

  useEffect(() => {
    setPage({...page, trailing})
    return () => setPage({...page, trailing: undefined})
  }, [])
}
