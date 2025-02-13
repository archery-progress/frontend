import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './index'
import { Paginated } from '@/commons/utils'
import { Structure } from '@/data/models/structure.ts'

export const structureApi = createApi({
  reducerPath: 'structureApi',
  baseQuery,
  endpoints: (builder) => ({
    paginateStructures: builder.query<Paginated<Structure>, string | undefined>({
      query: (searchParams) => ({
        url: `/v1/structures?${searchParams}`,
        method: 'GET',
      })
    }),
    getUserStructures: builder.query<Structure[], void>({
      query: () => ({
        url: `/v1/users/@me/structures`,
        method: 'GET'
      })
    })
  }),
})

export const {
  usePaginateStructuresQuery,
  useGetUserStructuresQuery,
} = structureApi
