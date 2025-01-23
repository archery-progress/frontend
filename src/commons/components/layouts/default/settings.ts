export type SidebarLink = {
  title: string
  url?: string
  items?: { title: string; url: string }[]
}

export function archeryLinks(): SidebarLink[] {
  return [
    {
      title: "Mon suivis d'archer",
      items: [
        { title: 'Mes séances', url: '/archery/sessions/overview' },
        { title: 'Mes entrainements', url: '/archery/practices/overview' },
      ],
    },
  ]
}

export function platformLinks(id?: string): SidebarLink[] {
  const baseUrl = `/platform/${id}`
  return [
    {
      title: 'Association',
      items: [
        { title: 'Licenciés', url: `${baseUrl}/members/overview` },
        { title: 'Encadrants', url: `${baseUrl}/supervisors/overview` },
        { title: 'Équipe administrative', url: `${baseUrl}/staff/overview` },
      ],
    },
    {
      title: 'Entrainements',
      items: [
        { title: 'Planning', url: `${baseUrl}/members/overview` },
        { title: 'Séances', url: `${baseUrl}/sessions/overview` },
        { title: 'Entrainements', url: `${baseUrl}/practices/overview` },
      ],
    },
    {
      title: 'Paramètres',
      items: [
        { title: 'Club', url: `${baseUrl}/settings` },
        { title: 'Licences', url: `${baseUrl}/members/transfert` },
        { title: 'Documents partagés', url: `${baseUrl}/documents/transfert` },
        { title: 'Transfert interclub', url: `${baseUrl}/members/transfert` },
      ],
    },
  ]
}

export function managerLinks() {
  return [
    {
      title: 'Manage accounts',
      items: [
        { title: 'Users', url: '/manager/users/overview' },
        { title: 'Roles', url: '/manager/roles/overview' },
        { title: 'Permissions', url: '/manager/permissions/overview' },
      ],
    },
    {
      title: 'Manage clubs',
      items: [{ title: 'Clubs', url: '/manager/guilds/overview' }],
    },
  ]
}

export function sidebarLinks(id?: string): Record<string, SidebarLink[]> {
  return {
    manager: managerLinks(),
    archery: archeryLinks(),
    platform: platformLinks(id),
  }
}
