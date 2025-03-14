import { Fragment, PropsWithChildren, ReactNode } from 'react'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/commons/components/ui/sidebar'
import { Separator } from '@/commons/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/commons/components/ui/breadcrumb'
import { AppSidebar } from '@/commons/components/layouts/default/app_sidebar'
import { ViewMode } from '@/commons/components/layouts/default/settings.ts'
import { useNavigate } from 'react-router'

export type LayoutProps = {
  breadcrumb?: { label: string; url?: string }[]
  trailing?: ReactNode
  mode: ViewMode
}

export function ApplicationLayout(props: PropsWithChildren<LayoutProps>) {

  const navigate = useNavigate()

  const handleNavigate = (url: string) => {
    navigate(url)
  }

  return (
    <SidebarProvider>
      <AppSidebar {...props} />
      <SidebarInset className="bg-background">
        <header className="flex sticky z-10 top-0 h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1"/>
          {props.breadcrumb && (
            <div className="hidden md:flex items-center">
              <Separator orientation="vertical" className="mr-2 !h-6"/>
              <Breadcrumb>
                <BreadcrumbList>
                  {props.breadcrumb.map((item, index) => {
                    if (index === props.breadcrumb!.length - 1) {
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

          {props.trailing && <div className="hidden md:block flex-1 items-center w-full">{props.trailing}</div>}
        </header>
        {props.children}
      </SidebarInset>
    </SidebarProvider>
  )
}
