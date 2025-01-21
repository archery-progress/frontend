import { EditUserPermissionsFormSchema, EditUserProfilFormSchema } from '@/apps/manager/users/validators.ts'

export type UpdateUserRequest = {
  id: string
  values: EditUserProfilFormSchema | EditUserPermissionsFormSchema
}

export type UpdateUserAssetsRequest = {
  id: string
  values: {
    avatar?: File
  }
}
