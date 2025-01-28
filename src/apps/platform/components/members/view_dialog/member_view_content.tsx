import { DialogDescription, DialogTitle } from '@/commons/components/ui/dialog.tsx'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider
} from '@/commons/components/ui/sidebar.tsx'
import { Copyright, Key, LucideIcon, Tag, User } from 'lucide-react'
import { Fragment, ReactElement, useState } from 'react'
import { useGetMemberQuery } from '@/data/api/member_api.ts'
import { Member } from '@/data/models/user.ts'
import { AsyncData } from '@/commons/components/async_data.tsx'
import MemberProfilView from '@/apps/platform/components/members/view_dialog/views/member_profil_view.tsx'
import MemberLicenceView from '@/apps/platform/components/members/view_dialog/views/member_licence_view.tsx'
import MemberRolesView from '@/apps/platform/components/members/view_dialog/views/member_roles_view.tsx.tsx'
import MemberPermissionsView from '@/apps/platform/components/members/view_dialog/views/member_permissions_view.tsx.tsx'

type Props = {
  structureId?: string
  memberId?: string
}

type TabItem = {
  name: string
  icon: LucideIcon
  component: (props: {member: Member}) => ReactElement
}

export default function MemberViewContent(props: Props) {
  const tabs: TabItem[] = [
    {name: 'Profil', icon: User, component: MemberProfilView},
    {name: 'Roles', icon: Tag, component: MemberRolesView},
    {name: 'Permissions', icon: Key, component: MemberPermissionsView},
    {name: 'Licence', icon: Copyright, component: MemberLicenceView}
  ]

  const [currentTab, setCurrentTab] = useState<TabItem>(tabs[0])
  const userQuery = useGetMemberQuery(props, {
    skip: !props.structureId || !props.memberId
  })

  return (
    <Fragment>
      <DialogTitle className="sr-only">Settings</DialogTitle>
      <DialogDescription className="sr-only">
        Customize your member here.
      </DialogDescription>
      <SidebarProvider className="items-start">
        <Sidebar collapsible="none" className="hidden md:flex">
          <SidebarHeader className="px-4">
            <AsyncData<Member>
              source={userQuery}
              onData={(member) => (
                <Fragment>
                  <p className="truncate font-semibold">
                    {member.user.firstname} {member.user.lastname}
                  </p>
                  <p className="-mt-2 truncate text-xs">
                    {member.structure.name}
                  </p>
                </Fragment>
              )}
            />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {tabs.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton
                        className="cursor-pointer"
                        isActive={item.name === currentTab.name}
                        onClick={() => setCurrentTab(item)}
                        asChild
                      >
                        <div className="flex">
                          <item.icon/>
                          <span>{item.name}</span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <p>dd</p>
          </SidebarFooter>
        </Sidebar>
        <main className="flex h-[480px] flex-1 flex-col overflow-hidden">
          <AsyncData<Member>
            source={userQuery}
            onData={(member) => (
              <currentTab.component member={member} />
            )}
          />
        </main>
      </SidebarProvider>
    </Fragment>
  )
}
