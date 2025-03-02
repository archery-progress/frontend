import { ReactElement, useContext, useEffect } from 'react'
import { BreadcrumbContext, BreadcrumbElement, PageContext } from '@/commons/components/layouts/default/context.ts'

export function useDefineBreadcrumb(elements: BreadcrumbElement[]) {
  const [breadcrumb, setBreadcrumb] = useContext(BreadcrumbContext)

  useEffect(() => {
    const copy = [...breadcrumb]
    setBreadcrumb([...breadcrumb, ...elements])
    return () => setBreadcrumb(copy)
  }, [])
}

export function useDefineTrailing(trailing: ReactElement) {
  const [page, setPage] = useContext(PageContext)

  useEffect(() => {
    setPage({...page, trailing})
    return () => setPage({...page, trailing: undefined})
  }, [])
}
