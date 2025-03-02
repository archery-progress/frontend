import { SidebarBasicItem } from '@/commons/components/layouts/default/settings.ts'

const baseUrl = `/archery`

export function userPractices(): SidebarBasicItem {
  return {
    title: 'Entrainements',
    items: [
      {title: 'Séances', url: `${baseUrl}/sessions/overview`},
      {title: 'Entrainements', url: `${baseUrl}/practices/overview`}
    ]
  }
}
