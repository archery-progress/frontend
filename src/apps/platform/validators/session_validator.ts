import { z } from 'zod'

export const editSessionValidator = z.object({
  name: z.string().min(2).max(255).optional(),
  description: z.string().max(255).optional(),
  targetDatetime: z.date().optional(),
})

export type EditSessionFormSchema = z.infer<typeof editSessionValidator>
