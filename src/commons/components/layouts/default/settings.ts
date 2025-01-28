import { Building2, CalendarDays, Copyright, GitCompare, type LucideIcon } from 'lucide-react'

export type SidebarBasicItem = {
  title: string
  items: {
    title: string
    icon?: LucideIcon
    url: string
  }[]
}

export type SidebarGroupItems = {
  title: string
  icon?: LucideIcon
  items: {
    title: string
    url: string
  }[]
}

export function archeryLinks(): Record<string, SidebarGroupItems> {
  return {
    follow: {
      title: 'Mon suivis d\'archer',
      items: [
        {title: 'Mes séances', url: '/archery/sessions/overview'},
        {title: 'Mes entrainements', url: '/archery/practices/overview'}
      ]
    }
  }
}

export function platformLinks(id?: string): Record<string, SidebarGroupItems> {
  const baseUrl = `/structures/${id}`
  return {
    association: {
      title: 'Association',
      icon: Building2,
      items: [
        {title: 'Licenciés', url: `${baseUrl}/members/overview`},
        {title: 'Encadrants', url: `${baseUrl}/supervisors/overview`},
        {title: 'Équipe administrative', url: `${baseUrl}/staff/overview`},
        {title: 'Documents partagés', url: `${baseUrl}/documents/transfert`},
      ]
    },
    practices: {
      title: 'Entrainements',
      icon: CalendarDays,
      items: [
        {title: 'Planning', url: `${baseUrl}/members/overview`},
        {title: 'Séances', url: `${baseUrl}/sessions/overview`},
        {title: 'Entrainements', url: `${baseUrl}/practices/overview`}
      ]
    },
  }
}

export function platformSettingLinks(id?: string): SidebarBasicItem {
  const baseUrl = `/structures/${id}`
  return {
    title: 'Paramètres',
    items: [
      {icon: Building2, title: 'Club', url: `${baseUrl}/settings`},
      {icon: Copyright, title: 'Licences', url: `${baseUrl}/members/transfert`},
      {icon: GitCompare, title: 'Transfert interclub', url: `${baseUrl}/members/transfert`}
    ]
  }
}

export function managerLinks(): Record<string, SidebarGroupItems> {
  return {
    account: {
      title: 'Manage accounts',
      items: [
        {title: 'Users', url: '/manager/users/overview'},
        {title: 'Roles', url: '/manager/roles/overview'},
        {title: 'Permissions', url: '/manager/permissions/overview'}
      ]
    },
    structure: {
      title: 'Manage clubs',
      items: [{title: 'Clubs', url: '/manager/guilds/overview'}]
    }
  }
}

export type ViewMode = 'manager' | 'archery' | 'platform'

export function sidebarLinks(id?: string) {
  return {
    manager: managerLinks(),
    archery: archeryLinks(),
    platform: platformLinks(id)
  }
}
