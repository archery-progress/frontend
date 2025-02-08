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
import { Cog, LucideIcon, User2 } from 'lucide-react'
import { Fragment, ReactElement, useState } from 'react'
import { AsyncData } from '@/commons/components/async_data.tsx'
import { Session } from '@/data/models/session.ts'
import { useGetSessionQuery } from '@/data/api/session_api.ts'
import SessionView from '@/apps/platform/components/sessions/view_dialog/views/session_view.tsx'
import SessionParticipantView from '@/apps/platform/components/sessions/view_dialog/views/session_participant_view.tsx'

type Props = {
  structureId?: string
  sessionId?: string
}

type TabItem = {
  name: string
  icon: LucideIcon
  component: (props: {session: Session}) => ReactElement
}

export default function SessionViewContent(props: Props) {
  const tabs: TabItem[] = [
    {name: 'Configuration', icon: Cog, component: SessionView},
    {name: 'Participants', icon: User2, component: SessionParticipantView},
  ]

  const [currentTab, setCurrentTab] = useState<TabItem>(tabs[0])
  const sessionQuery = useGetSessionQuery(props, {
    skip: !props.structureId || !props.sessionId
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
            <AsyncData<Session>
              source={sessionQuery}
              onData={(session) => (
                <Fragment>
                  <p className="truncate font-semibold">
                    {session.name}
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
          <AsyncData<Session>
            source={sessionQuery}
            onData={(session) => (
              <currentTab.component session={session} />
            )}
          />
        </main>
      </SidebarProvider>
    </Fragment>
  )
}
