import { Role } from '@/data/models/role.ts'
import { Structure } from '@/data/models/structure.ts'

export type User = {
  id: string
  firstname: string
  lastname: string
  email: string
  status: UserStatus
  permissions: number
  avatar?: string
  members: Member[]
}

export enum UserStatus {
  pending = 'pending',
  verified = 'verified',
  disabled = 'disabled',
}

export type Member = {
  id: string
  userId: string
  structureId: string
  structure: Structure
  roles: Role[]
  createdAt: string
  updatedAt: string | null
}
