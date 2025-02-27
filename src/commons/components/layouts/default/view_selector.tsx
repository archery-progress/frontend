import { ChevronsUpDown, PlusIcon } from 'lucide-react'
import { useIsMobile, usePermissionBitwise } from '@/commons/utils'
import { Link, useLocation, useNavigate } from 'react-router'
import { User } from '@/data/models/user.ts'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/commons/components/ui/sidebar.tsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/commons/components/ui/dropdown-menu.tsx'
import { PermissionKey } from '@/data/models/permission.ts'
import { useSelector } from 'react-redux'
import { getStructureState } from '@/data/store/structure_store'

type Props = {
  currentView: string
  user: User
}

export default function ViewSelector(props: Props) {
  const {pathname} = useLocation()
  const navigate = useNavigate()
  const {hasOne} = usePermissionBitwise()
  const isMobile = useIsMobile()
  const { structures } = useSelector(getStructureState)

  const manageableStructures = props.user.members.filter((member) => {
    const permissions: PermissionKey[] = ['ADMINISTRATOR', 'MANAGE_ROLES', 'MANAGE_MEMBERS', 'MANAGE_NOTIFICATIONS', 'MANAGE_PRACTICES', 'VIEW_MEMBERS', 'VIEW_LOGS']

    const structure = structures!.find((s) => s.id === member.structureId)
    if (structure && structure.ownerId === member.userId) {
      return true
    }
    return hasOne(member.permissions, permissions)
  })

  const buildViews = [
    {
      id: 'archery',
      label: 'Mon espace',
      logo: props.user.avatar,
      href: '/archery/dashboard'
    },
    ...manageableStructures.map((member) => ({
      id: member.structureId,
      label: member.structure.name,
      logo: member.structure.logo,
      href: `/structures/${member.structureId}/overview`
    }))
  ]

  const currentView = buildViews.find((view) => {
    return pathname.startsWith('/structures')
      ? pathname.includes(view.id)
      : view.id === props.currentView
  })

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div
                className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <img src={props.user.avatar} className="size-8 rounded" alt={props.user.firstname}/>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {props.user.firstname} {props.user.lastname}
                </span>
                <span className="truncate text-xs">{currentView?.label}</span>
              </div>
              <ChevronsUpDown className="ml-auto"/>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Vue actuelle
            </DropdownMenuLabel>
            {buildViews.map((structure) => (
              <DropdownMenuItem
                key={structure.id}
                onClick={() => navigate(structure.href)}
                className="flex items-center gap-2 p-2 cursor-pointer"
              >
                <div className="flex size-8 items-center justify-center rounded-sm border">
                  <img src={structure.logo ?? 'https://placehold.co/32'} className="size-8 object-cover rounded"
                       alt={structure.label}/>
                </div>
                <div className="flex-1">{structure.label}</div>
              </DropdownMenuItem>
            ))}
            {structures && structures.length < 5 && (
              <>
                <DropdownMenuSeparator/>
                  <DropdownMenuItem className="gap-2 p-2">
                    <Link to="/onboarding/structure" className="flex items-center gap-2 p-2 cursor-pointer">
                      <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                        <PlusIcon className="size-4"/>
                    </div>
                    <div className="font-medium text-muted-foreground">Add team</div>
                  </Link>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

// const views = [
//   {
//     id: 'archery',
//     label: 'Mon espace',
//     logo: '/assets/images/logos/archery.svg',
//     href: '/archery/dashboard'
//   },
//   {
//     id: 'manager',
//     label: 'Administrateur',
//     href: import.meta.env.VITE_MANAGER_BASE_URL + '/users/overview'
//   }
// ]
