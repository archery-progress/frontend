import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from '@/data/store/user_store'
import { memberApi } from '@/data/api/member_api.ts'
import { roleApi } from '@/data/api/role_api.ts'
import { structureApi } from '@/data/api/structure_api.ts'
import { authApi } from '@/data/api/auth_api.ts'
import { sessionApi } from '@/data/api/session_api.ts'

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [memberApi.reducerPath]: memberApi.reducer,
    [roleApi.reducerPath]: roleApi.reducer,
    [structureApi.reducerPath]: structureApi.reducer,
    [sessionApi.reducerPath]: sessionApi.reducer,
  },
  middleware: (middleware) =>
    middleware()
      .concat(authApi.middleware)
      .concat(memberApi.middleware)
      .concat(roleApi.middleware)
      .concat(structureApi.middleware)
      .concat(sessionApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
