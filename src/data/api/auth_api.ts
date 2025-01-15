import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './index'
import { AuthLoginRequest } from '../contracts/authentication'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<void, AuthLoginRequest>({
      query: (payload) => ({
        url: '/v1/authentication/login',
        method: 'POST',
        body: payload,
      }),
    })
  }),
})

export const {
  useLoginMutation
} = authApi
