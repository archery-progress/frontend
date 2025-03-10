import { Outlet, useParams } from 'react-router'
import { ApplicationLayout } from '@/commons/components/layouts/default/layout.tsx'
import { AppSidebar, SidebarProps } from '@/commons/components/layouts/default/app_sidebar.tsx'
import { GroupView } from '@/commons/components/layouts/sidebar_views/group_view.tsx'
import { platformLinks, platformSettingLinks } from '@/commons/configs/sidebar/platform.tsx'
import { Fragment } from 'react'
import { BasicView } from '@/commons/components/layouts/sidebar_views/basic_view.tsx'

export default function Container() {
  const params = useParams()
  const sidebarProps: SidebarProps = {
    items: (
      <Fragment>
        <GroupView title="Votre organisation" items={platformLinks(params.structureId)}/>
        <BasicView item={platformSettingLinks(params.structureId)}/>
      </Fragment>
    ),
  }

  return (
    <ApplicationLayout sidebar={<AppSidebar {...sidebarProps} />}>
      <Outlet/>
    </ApplicationLayout>
  )
}
