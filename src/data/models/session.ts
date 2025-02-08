import { MemberSession } from '@/data/models/user.ts'

export type Session = {
  id: string
  memberId: string
  structureId: string
  name: string | null
  description: string | null
  targetDatetime: string
  participants: MemberSession[]
  createdAt: string
  updatedAt: string
}
