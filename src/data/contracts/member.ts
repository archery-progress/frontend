import { EditMemberPermissionsFormSchema } from '@/pages/member/member_validator.ts'

export type GetMembersRequest = {
  structureId?: string
  queryParams: string
}

export type GetMemberRequest = {
  structureId?: string
  memberId?: string
}

export type MutateRoleMemberRequest = {
  structureId?: string
  userId?: string
  roleId?: string
}

export type MutateMemberRequest = {
  structureId?: string
  memberId?: string
  data: EditMemberPermissionsFormSchema
}

