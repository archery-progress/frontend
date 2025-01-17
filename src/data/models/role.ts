import { Permission } from '@/data/models/permission.ts'

export type Role = {
  id: number
  uid: string
  name: string
  description: string | null
  createdAt: string
  updatedAt: string | null

  permissions?: Permission[]
}
