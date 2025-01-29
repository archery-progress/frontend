import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './index'
import { Paginated } from '@/commons/utils'
import { User } from '@/data/models/user.ts'
import { Role } from '@/data/models/role.ts'
import { GetRolesRequest } from '@/data/contracts/role.ts'

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
    getStructureRoles: builder.query<Paginated<Role>, GetRolesRequest>({
      query: (payload) => ({
        url: `/v1/structures/${payload.structureId}/roles?${payload.queryParams}`,
        method: 'GET',
      })
    }),
  }),
})

export const {
  usePaginateRolesQuery,
  useGetStructureRolesQuery,
} = roleApi
