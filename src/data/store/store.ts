import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from '@/data/store/user_store'
import { userApi } from '@/data/api/user_api.ts'
import { roleApi } from '@/data/api/role_api.ts'
import { structureApi } from '@/data/api/structure_api.ts'
import { authApi } from '@/data/api/auth_api.ts'

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [roleApi.reducerPath]: roleApi.reducer,
    [structureApi.reducerPath]: structureApi.reducer,
  },
  middleware: (middleware) =>
    middleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(roleApi.middleware)
      .concat(structureApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
