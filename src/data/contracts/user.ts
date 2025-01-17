import { EditUserFormSchema } from '@/apps/manager/users/validators.ts'

export type UpdateUserRequest = {
  values: EditUserFormSchema
  uid: string
}
