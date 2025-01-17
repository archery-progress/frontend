import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const backendUrl =
  import.meta.env.VITE_PRODUCTION === 'true' ? `https://api.${window.location.hostname}` : import.meta.env.VITE_BACKEND

export const baseQuery = fetchBaseQuery({
  baseUrl: backendUrl,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = sessionStorage.getItem('token')
    headers.set('Authorization', `Bearer ${token}`)
  },
})
