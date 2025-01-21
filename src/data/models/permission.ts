export const Permission = {
  INTERNAL_PLATFORM: {
    label: 'Internal Platform',
    description: 'Access to the internal platform.',
    value: 1 << 0
  },
  INTERNAL_MANAGER: {
    label: 'Internal Manager',
    description: 'Access to the internal manager.',
    value: 1 << 1
  },

  ADMINISTRATOR: {
    label: 'Administrator',
    description: 'Access to the administrator.',
    value: 1 << 10
  },
  MANAGE_SETTINGS: {
    label: 'Manage Settings',
    description: 'Access to the settings management.',
    value: 1 << 11
  },
  MANAGE_ROLES: {
    label: 'Manage Roles',
    description: 'Access to the roles management.',
    value: 1 << 12
  },
  MANAGE_MEMBERS: {
    label: 'Manage Members',
    description: 'Access to the members management.',
    value: 1 << 13
  },
  VIEW_MEMBERS: {
    label: 'View Members',
    description: 'Access to the members view.',
    value: 1 << 14
  },
  MANAGE_PRACTICES: {
    label: 'Manage Practices',
    description: 'Access to the practices management.',
    value: 1 << 15
  },
  VIEW_LOGS: {
    label: 'View Logs',
    description: 'Access to the logs view.',
    value: 1 << 16
  },
  MANAGE_NOTIFICATIONS: {
    label: 'Manage Notifications',
    description: 'Access to the notifications management.',
    value: 1 << 17
  },
} as const

export type PermissionValue = {
  label: string
  description: string
  value: number
}

export type PermissionKey = keyof typeof Permission
