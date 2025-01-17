import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './index'
import { Paginated } from '@/commons/utils'
import { User } from '@/data/models/user.ts'

export const roleApi = createApi({
  reducerPath: 'roleApi',
  baseQuery,
  endpoints: (builder) => ({
    paginateRoles: builder.query<Paginated<User>, string | undefined>({
      query: (searchParams) => ({
        url: `/v1/roles?${searchParams}`,
        method: 'GET',
      })
    }),
  }),
})

export const {
  usePaginateRolesQuery,
} = roleApi
