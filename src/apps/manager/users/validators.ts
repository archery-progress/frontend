import { z } from 'zod'

export enum UserStatus {
  pending = 'pending',
  verified = 'verified',
  disabled = 'disabled',
}

export const createUserValidator = z.object({
  firstname: z.string().min(2).max(50),
  lastname: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(3),
  password_confirmation: z.string().min(3),
  permissions: z.number()
}).refine((data) => data.password === data.password_confirmation, {
  message: 'Passwords do not match',
  path: ['password_confirmation'] // path of error
})

export const editUserProfilValidator = z.object({
  id: z.string(),
  firstname: z.string().min(2).max(50),
  lastname: z.string().min(2).max(50),
  email: z.string().email(),
  status: z.enum([UserStatus.pending, UserStatus.verified, UserStatus.disabled])
})

export const editUserPermissionsValidator = z.object({
  permissions: z.number()
})

export const editUserAssetsValidator = z.object({
  avatar: z.instanceof(File).refine((file) => file.size < 7000000, {
    message: 'Your resume must be less than 7MB.'
  })
})

export type CreateUserFormSchema = z.infer<typeof createUserValidator>
export type EditUserProfilFormSchema = z.infer<typeof editUserProfilValidator>
export type EditUserPermissionsFormSchema = z.infer<typeof editUserPermissionsValidator>
export type EditUserAssetsFormSchema = z.infer<typeof editUserAssetsValidator>
