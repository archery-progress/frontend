import { Role } from '@/data/models/role.ts'

export type User = {
  id: string
  firstname: string
  lastname: string
  email: string
  status: UserStatus
  permissions: number
  roles?: Role[]
  avatar?: string
}

export enum UserStatus {
  pending = 'pending',
  verified = 'verified',
  disabled = 'disabled',
}
