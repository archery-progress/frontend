import { ComponentProps, ReactElement, useEffect } from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/commons/components/ui/sidebar'
import { Button } from '@/commons/components/ui/button-old'
import { LogOutIcon } from 'lucide-react'
import ViewSelector from '@/commons/components/layouts/default/view_selector'
import { toast } from 'sonner'
import { toastVariant } from '@/commons/utils'
import { useDispatch, useSelector } from 'react-redux'
import { getUserState, userSlice } from '@/data/store/user_store.ts'
import { useNavigate } from 'react-router'
import { useLogoutMutation } from '@/data/api/auth_api'
import AlertCallout from '@/commons/components/alert-callout.tsx'

export type SidebarProps = {
  items: ReactElement
  trailing?: ReactElement
}

export function AppSidebar(props: ComponentProps<typeof Sidebar> & SidebarProps) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [logout, result] = useLogoutMutation()
  const {user} = useSelector(getUserState)

  useEffect(() => {
    if (result.isSuccess) {
      dispatch(userSlice.actions.logout())

      sessionStorage.removeItem('user')
      sessionStorage.removeItem('token')

      toast.success('Success', {
        ...toastVariant.success,
        description: 'User has been created.'
      })

      navigate('/authentication/login')
    }

    if (result.isError) toast.error('Error', {
      ...toastVariant.error,
      description: 'An error occurred while creating the user.'
    })
  }, [result])

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="px-2 pt-4">
        {user && <ViewSelector user={user}/>}
      </SidebarHeader>
      <SidebarContent className="py-5 gap-0">
        {props.items}
      </SidebarContent>
      <SidebarRail/>
      <SidebarFooter>
        {props.trailing}
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
