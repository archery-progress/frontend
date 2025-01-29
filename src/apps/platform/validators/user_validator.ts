import { z } from 'zod'

export const editMemberRolesValidator = z.object({
  roles: z.array(z.string())
})

export type EditMemberRolesFormSchema = z.infer<typeof editMemberRolesValidator>
