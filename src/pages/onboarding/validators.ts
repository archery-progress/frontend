import { z } from 'zod'

export const createStructureIdentity = z.object({
  name: z.string().nonempty('Le nom est obligatoire'),
  description: z.string().optional(),
  members: z.array(z.string()).optional(),
})


export type CreateStructureFormSchema = z.infer<typeof createStructureIdentity>
