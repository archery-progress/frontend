import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './index'
import { Paginated } from '@/commons/utils'
import { User } from '@/data/models/user.ts'
import { CreateUserFormSchema } from '@/apps/manager/users/validators.ts'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  endpoints: (builder) => ({
    paginateUsers: builder.query<Paginated<User>, string | undefined>({
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
  }),
})

export const {
  usePaginateUsersQuery,
  useStoreUserMutation,
} = userApi
