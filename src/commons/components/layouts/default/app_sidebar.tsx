import { ComponentProps, Fragment, useEffect } from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/commons/components/ui/sidebar'
import { Button } from '@/commons/components/ui/button-old'
import { LogOutIcon, User2Icon } from 'lucide-react'
import ViewSelector from '@/commons/components/layouts/default/view_selector'
import { LayoutProps } from '@/commons/components/layouts/default/layout'
import { platformSettingLinks, sidebarLinks } from '@/commons/components/layouts/default/settings.ts'
import { toast } from 'sonner'
import { toastVariant } from '@/commons/utils'
import { useDispatch, useSelector } from 'react-redux'
import { getUserState, userSlice } from '@/data/store/user_store.ts'
import { useNavigate, useParams } from 'react-router'
import { BasicView } from '@/commons/components/layouts/sidebar_views/basic_view.tsx'
import { GroupView } from '@/commons/components/layouts/sidebar_views/group_view.tsx'
import { useLogoutMutation } from '@/data/api/auth_api'

export function AppSidebar(props: ComponentProps<typeof Sidebar> & LayoutProps) {
  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()

  const [logout, result] = useLogoutMutation()
  const { user } = useSelector(getUserState)

  const {mode, ...rest} = props
  const currentLinks = sidebarLinks(params.structureId)[mode]

  const handleProfile = () => {
    navigate('/profil/general')
  }

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
    <Sidebar variant="inset" {...rest}>
      <SidebarHeader className="px-2 pt-4">
        {user && (
          <ViewSelector currentView={mode} user={user} />
        )}
      </SidebarHeader>
      <SidebarContent className="py-5 gap-0">
        {mode === 'platform' && (
          <Fragment>
            <GroupView title="Vie de l'association" items={currentLinks} />
            <BasicView item={platformSettingLinks(params.structureId)} />
          </Fragment>
        )}
      </SidebarContent>
      <SidebarRail/>
      <SidebarFooter>
        {mode === 'archery' && (
          <Button variant="outline" onClick={handleProfile}>
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
