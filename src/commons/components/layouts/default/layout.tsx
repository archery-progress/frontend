import { Fragment, PropsWithChildren, ReactNode, useEffect, useState } from 'react'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/commons/components/ui/sidebar'
import { Separator } from '@/commons/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/commons/components/ui/breadcrumb'


import { useLocation, useNavigate, useNavigation } from 'react-router'
import {
  BreadcrumbContext,
  BreadcrumbElement, PageContext, PageProps
} from '@/commons/components/layouts/default/context'

export type LayoutProps = {
  breadcrumb?: BreadcrumbElement[]
  sidebar: ReactNode,
  trailing?: ReactNode
}

export function ApplicationLayout(props: PropsWithChildren<LayoutProps>) {
  const navigate = useNavigate()

  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbElement[]>(props.breadcrumb ?? [])
  const [page, setPage] = useState<PageProps>({})

  const handleNavigate = (url: string) => {
    navigate(url)
  }

  return (
    <PageContext.Provider value={[page, setPage]}>
      <BreadcrumbContext.Provider value={[breadcrumbs, setBreadcrumbs]}>
        <SidebarProvider>
          {props.sidebar}

          <SidebarInset className="bg-background">
            <header className="flex sticky z-10 top-0 h-16 shrink-0 items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1"/>
              {breadcrumbs && (
                <div className="hidden md:flex items-center">
                  <Separator orientation="vertical" className="mr-2 !h-6"/>
                  <Breadcrumb>
                    <BreadcrumbList>
                      {breadcrumbs.map((item, index) => {
                        if (index === breadcrumbs.length - 1) {
                          return (
                            <BreadcrumbItem key={index}>
                              <BreadcrumbPage className="font-medium cursor-pointer">{item.label}</BreadcrumbPage>
                            </BreadcrumbItem>
                          )
                        }

                    return (
                      <Fragment key={index}>
                        <BreadcrumbItem className="hidden md:block">
                          <span
                            className='font-medium cursor-pointer'
                            onClick={() => handleNavigate(item.url!)}
                          >
                            {item.label}
                          </span>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block"/>
                      </Fragment>
                    )
                  })}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          )}

              {page.trailing && <div className="hidden md:block flex-1 items-center w-full">{page.trailing}</div>}
            </header>
            {props.children}
          </SidebarInset>
        </SidebarProvider>
      </BreadcrumbContext.Provider>
    </PageContext.Provider>
  )
}
