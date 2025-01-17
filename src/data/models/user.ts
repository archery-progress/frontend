import { Permission } from '@/data/models/permission.ts'
import { Role } from '@/data/models/role.ts'

export type User = {
  id: number
  uid: string
  firstname: string
  lastname: string
  email: string
  status: UserStatus
  type: UserType
  permissions?: Permission[]
  roles?: Role[]
}

export enum UserStatus {
  pending = 'pending',
  verified = 'verified',
  disabled = 'disabled',
}

export enum UserType {
  user = 'user',
  club = 'club',
  staff = 'staff',
}

export const userAccountType = {
  [UserType.user]: 'User',
  [UserType.club]: 'Club',
  [UserType.staff]: 'Staff',
} as const
