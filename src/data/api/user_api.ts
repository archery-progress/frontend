import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './index'
import { Paginated } from '@/commons/utils'
import { User } from '@/data/models/user.ts'
import { CreateUserFormSchema } from '@/apps/manager/users/validators.ts'
import { UpdateUserAssetsRequest, UpdateUserRequest } from '@/data/contracts/user.ts'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  tagTypes: ['users', 'user'],
  endpoints: (builder) => ({
    paginateUsers: builder.query<Paginated<User>, string | undefined>({
      providesTags: ['users'],
      query: (searchParams) => ({
        url: `/v1/users?${searchParams}`,
        method: 'GET',
      })
    }),
    getUser: builder.query<User, string | undefined>({
      providesTags: ['user'],
      query: (id) => ({
        url: `/v1/users/${id}`,
        method: 'GET',
      })
    }),
    storeUser: builder.mutation<User, CreateUserFormSchema>({
      invalidatesTags: ['users'],
      query(values) {
        return ({
          url: '/v1/users',
          method: 'POST',
          body: values,
        })
      }
    }),
    updateUser: builder.mutation<User, UpdateUserRequest>({
      invalidatesTags: ['users'],
      query(payload) {
        const formData = new FormData()

        Object.entries(payload.values).forEach(([key, value]) => {
          if (value !== undefined) formData.append(key, value)
        })

        return {
          url: `/v1/users/${payload.id}`,
          method: 'PUT',
          body: formData
        }
      }
    }),
    updateUserAssets: builder.mutation<User, UpdateUserAssetsRequest>({
      invalidatesTags: ['users', 'user'],
      query(payload) {
        const formData = new FormData()

        if (payload.values.avatar) {
          formData.append('avatar', payload.values.avatar)
        }

        return {
          url: `/v1/users/${payload.id}`,
          method: 'PUT',
          body: formData
        }
      }
    }),
    deleteUser: builder.mutation<void, string>({
      invalidatesTags: ['users'],
      query: (id: string) => ({
        url: `/v1/users/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  usePaginateUsersQuery,
  useGetUserQuery,
  useStoreUserMutation,
  useUpdateUserMutation,
  useUpdateUserAssetsMutation,
  useDeleteUserMutation,
} = userApi
