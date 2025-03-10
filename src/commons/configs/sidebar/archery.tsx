import { SidebarBasicItem } from '@/commons/components/layouts/default/settings.ts'
import { CalendarDays, Home } from 'lucide-react'

const baseUrl = `/archery`

export function mySpace(): SidebarBasicItem {
  return {
    title: 'Mon espace',
    items: [
      { icon: Home, title: 'Accueil', url: `${baseUrl}/dashboard`},
    ]
  }
}

export function userPractices(): SidebarBasicItem {
  return {
    title: 'Entrainements',
    items: [
      {icon: Home, title: 'Séances', url: `${baseUrl}/sessions/overview`},
      {icon: CalendarDays, title: 'Entrainements', url: `${baseUrl}/practices/overview`}
    ]
  }
}
