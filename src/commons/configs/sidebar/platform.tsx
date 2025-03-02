import { SidebarBasicItem, SidebarGroupItems } from '@/commons/components/layouts/default/settings.ts'
import { Building2, CalendarDays, Copyright, GitCompare } from 'lucide-react'

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
        {title: 'Documents partagés', url: `${baseUrl}/documents/transfert`}
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
    }
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
