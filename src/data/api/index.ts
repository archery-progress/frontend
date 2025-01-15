import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '@/store'

export const backendUrl =
  import.meta.env.VITE_PRODUCTION === 'true' ? `https://api.${window.location.hostname}` : import.meta.env.VITE_BACKEND

export const baseQuery = fetchBaseQuery({
  baseUrl: backendUrl,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const { user } = getState() as RootState
    headers.set('Authorization', `Bearer ${user.token}`)
  },
})
