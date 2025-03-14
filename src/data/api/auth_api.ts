import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './index'
import { AuthLoginRequest, AuthLoginResponseRequest } from '../contracts/authentication'
import { User } from '@/data/models/user'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  tagTypes: ['me'],
  endpoints: (builder) => ({
    getAuthenticatedUser: builder.query<User, void>({
      query: () => '/v1/authentication/me',
      providesTags: ['me']
    }),
    login: builder.mutation<AuthLoginResponseRequest, AuthLoginRequest>({
      query: (payload) => ({
        url: '/v1/authentication/login',
        method: 'POST',
        body: payload,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: (payload) => ({
        url: '/v1/authentication/logout',
        method: 'POST',
        body: payload,
      }),
    })
  }),
})

export const {
  useLoginMutation,
  useGetAuthenticatedUserQuery,
  useLogoutMutation,
} = authApi
