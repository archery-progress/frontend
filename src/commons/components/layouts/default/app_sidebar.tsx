import { ComponentProps, useEffect } from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from '@/commons/components/ui/sidebar'
import { ScrollArea, ScrollBar } from '@/commons/components/ui/scroll-area'
import { Button } from '@/commons/components/ui/button'
import { LogOutIcon, User2Icon } from 'lucide-react'
import ViewSelector from '@/commons/components/layouts/default/view_selector'
import { SidebarCollapse, SidebarItem } from '@/commons/components/layouts/default/sidebar_items'
import { LayoutProps } from '@/commons/components/layouts/default/layout'
import { sidebarLinks } from '@/commons/components/layouts/default/settings'
import { useGetAuthenticatedUserQuery, useLogoutMutation } from '@/data/api/auth_api.ts'
import { AsyncData } from '@/commons/components/async_data.tsx'
import { User } from '@/data/models/user.ts'
import { toast } from 'sonner'
import { toastVariant } from '@/commons/utils'
import { useDispatch } from 'react-redux'
import { userSlice } from '@/data/store/user_store.ts'

export function AppSidebar(props: ComponentProps<typeof Sidebar> & LayoutProps) {
  const dispatch = useDispatch()

  const [logout, result] = useLogoutMutation()
  const userQuery = useGetAuthenticatedUserQuery()

  const {mode, ...rest} = props
  const currentLinks = sidebarLinks[mode]

  useEffect(() => {
    if (result.isSuccess) {
      dispatch(userSlice.actions.logout())

      sessionStorage.removeItem('user')
      sessionStorage.removeItem('token')

      toast.success('Success', {
        ...toastVariant.success,
        description: 'User has been created.'
      })
    }

    if (result.isError) toast.error('Error', {
      ...toastVariant.error,
      description: 'An error occurred while creating the user.'
    })
  }, [result])

  return (
    <Sidebar {...rest}>
      <SidebarHeader className="px-4 pt-4">
        <ScrollArea className="w-96 whitespace-nowrap">
          <AsyncData<User>
            source={userQuery}
            onLoading={<p>Loading...</p>}
            onData={(data) => (
              <p className="text-lg font-bold">
                {data.lastname} {data.lastname}
              </p>
            )}
          />
          <ScrollBar orientation="horizontal"/>
        </ScrollArea>
        <ViewSelector currentView={mode}/>
      </SidebarHeader>
      <SidebarContent className="py-5 gap-0">
        {currentLinks.map((item) => {
          if (item.items) {
            return <SidebarCollapse key={item.title} item={item}/>
          }
          return <SidebarItem key={item.title} item={item}/>
        })}
      </SidebarContent>
      <SidebarRail/>
      <SidebarFooter>
        {mode === 'archery' && (
          <Button variant="outline">
            <User2Icon className="mr-2"/>
            Mon compte
          </Button>
        )}
        <Button
          variant="default"
          onClick={() => logout()}
        >
          <LogOutIcon className="mr-2"/>
          Déconnexion
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
