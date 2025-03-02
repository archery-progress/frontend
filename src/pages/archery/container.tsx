import { Outlet } from 'react-router'
import { ApplicationLayout } from '@/commons/components/layouts/default/layout.tsx'
import { AppSidebar, SidebarProps } from '@/commons/components/layouts/default/app_sidebar.tsx'
import { BasicView } from '@/commons/components/layouts/sidebar_views/basic_view.tsx'
import { Fragment } from 'react'
import { userPractices } from '@/commons/configs/sidebar/archery.tsx'
import MyProfilButton from '@/commons/components/my-profil-button.tsx'

export default function Container() {
  const sidebarProps: SidebarProps = {
    trailing: <MyProfilButton />,
    items: (
      <Fragment>
        <BasicView item={userPractices()}/>
      </Fragment>
    ),
  }

  return (
    <ApplicationLayout sidebar={<AppSidebar {...sidebarProps} />}>
      <Outlet/>
    </ApplicationLayout>
  )
}
