import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/commons/components/ui/sidebar'
import { SidebarBasicItem } from '@/commons/components/layouts/default/settings.ts'
import { Link, useLocation } from 'react-router'

type Props = {
  item: SidebarBasicItem
}

export function BasicView(props: Props) {
  const location = useLocation()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{props.item.title}</SidebarGroupLabel>
      <SidebarMenu>
        {props.item.items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              isActive={location.pathname.endsWith(item.url)}
              asChild
            >
              <Link to={item.url}>
                {item.icon && <item.icon/>}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
