import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './index'
import { Paginated } from '@/commons/utils'
import { User } from '@/data/models/user.ts'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  endpoints: (builder) => ({
    paginateUsers: builder.query<Paginated<User>, string | undefined>({
      query: (searchParams) => ({
        url: `/v1/users?${searchParams}`,
        method: 'GET',
      })
    })
  }),
})

export const {
  usePaginateUsersQuery
} = userApi
