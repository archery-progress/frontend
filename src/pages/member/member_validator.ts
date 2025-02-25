import { z } from 'zod'

export const editMemberRolesValidator = z.object({
  roles: z.array(z.string())
})

export const editMemberPermissionsValidator = z.object({
  permissions: z.number()
})

export type EditMemberRolesFormSchema = z.infer<typeof editMemberRolesValidator>
export type EditMemberPermissionsFormSchema = z.infer<typeof editMemberPermissionsValidator>
