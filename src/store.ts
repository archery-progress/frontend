import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './data/api/auth_api'
import { userSlice } from '@/data/store/user_store'

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: (middleware) =>
    middleware().concat(authApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
