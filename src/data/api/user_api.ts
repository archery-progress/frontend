import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './index'
import { Paginated } from '@/commons/utils'
import { User } from '@/data/models/user.ts'
import { CreateUserFormSchema } from '@/apps/manager/users/validators.ts'
import { UpdateUserRequest } from '@/data/contracts/user.ts'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  tagTypes: ['users'],
  endpoints: (builder) => ({
    paginateUsers: builder.query<Paginated<User>, string | undefined>({
      providesTags: ['users'],
      query: (searchParams) => ({
        url: `/v1/users?${searchParams}`,
        method: 'GET',
      })
    }),
    storeUser: builder.mutation<User, CreateUserFormSchema>({
      query(values) {
        const payload = new FormData()

        payload.append('firstname', values.firstname)
        payload.append('lastname', values.lastname)
        payload.append('email', values.email)
        payload.append('password', values.password)
        payload.append('password_confirmation', values.password_confirmation)
        payload.append('type', values.type)
        payload.append('status', values.status)
        payload.append('avatar', values.avatar)

        values.roles.forEach((role) => payload.append('roles[]', role))
        values.structure.forEach((structure) => payload.append('structure[]', structure))

        return {
          url: '/v1/users',
          method: 'POST',
          body: payload
        }
      }
    }),
    updateUser: builder.mutation<User, UpdateUserRequest>({
      invalidatesTags: ['users'],
      query(payload) {
        const formData = new FormData()

        formData.append('firstname', payload.values.firstname)
        formData.append('lastname', payload.values.lastname)
        formData.append('email', payload.values.email)
        formData.append('type', payload.values.type)
        formData.append('status', payload.values.status)

        payload.values.roles.forEach((role) => formData.append('roles[]', role))
        payload.values.structure.forEach((structure) => formData.append('structure[]', structure))

        return {
          url: `/v1/users/${payload.uid}`,
          method: 'PUT',
          body: formData
        }
      }
    }),
  }),
})

export const {
  usePaginateUsersQuery,
  useStoreUserMutation,
  useUpdateUserMutation,
} = userApi
