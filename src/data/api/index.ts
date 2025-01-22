import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'

export const backendUrl =
  import.meta.env.VITE_PRODUCTION === 'true' ? `https://api.${window.location.hostname}` : import.meta.env.VITE_BACKEND

export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: backendUrl,
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem('token')
      headers.set('Authorization', `Bearer ${token}`)
    },
  })

  const result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    window?.location.replace('/authentication/login');
  }

  return result
}
