import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './data/api/auth_api'
import { userSlice } from '@/data/store/user_store'
import { userApi } from '@/data/api/user_api.ts'

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer
  },
  middleware: (middleware) =>
    middleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
