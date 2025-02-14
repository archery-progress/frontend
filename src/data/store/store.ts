import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { userReducer } from '@/data/store/user_store'
import { memberApi } from '@/data/api/member_api.ts'
import { roleApi } from '@/data/api/role_api.ts'
import { structureApi } from '@/data/api/structure_api.ts'
import { authApi } from '@/data/api/auth_api.ts'
import { structureReducer } from './structure_store'

export const rootReducer = combineReducers({
  user: userReducer,
  structure: structureReducer,
  [authApi.reducerPath]: authApi.reducer,
  [memberApi.reducerPath]: memberApi.reducer,
  [roleApi.reducerPath]: roleApi.reducer,
  [structureApi.reducerPath]: structureApi.reducer,
})

export function setupStore(preloadedState?: never) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (middleware) =>
      middleware()
        .concat(authApi.middleware)
        .concat(memberApi.middleware)
        .concat(roleApi.middleware)
        .concat(structureApi.middleware),
  })

}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
