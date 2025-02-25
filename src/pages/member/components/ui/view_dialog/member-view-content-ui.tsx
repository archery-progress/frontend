import { DialogDescription, DialogTitle } from '@/commons/components/ui/dialog.tsx'
import {
  Sidebar,
  SidebarContent, SidebarFooter,
  SidebarGroup, SidebarGroupContent,
  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarProvider
} from '@/commons/components/ui/sidebar.tsx'
import { AsyncData } from '@/commons/components/async_data.tsx'
import { Member } from '@/data/models/user.ts'
import { Fragment } from 'react'
import { TypedUseQueryHookResult } from '@reduxjs/toolkit/query/react'
import { Params } from 'react-router'
import { TabItem } from '@/pages/member/components/feature/view_dialog/member-view-content-feature.tsx'
import { State } from '@/commons/utils'

type Props = {
  userQuery: TypedUseQueryHookResult<any, void, any, any>
  params: Readonly<Params<string>>
  tabs: TabItem[]
  tabState: State<TabItem>
}

export default function MemberViewContentUi(props: Props) {
  const [currentTab, setCurrentTab] = props.tabState

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
              source={props.userQuery}
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
                  {props.tabs.map((item) => (
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
            source={props.userQuery}
            onData={(member) => (
              <currentTab.component member={member} />
            )}
          />
        </main>
      </SidebarProvider>
    </Fragment>
  )
}
