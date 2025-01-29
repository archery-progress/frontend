
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
