import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'
import { UserState } from '../contracts/states.interface'

const USER_KEY = 'user'

export const initialUserState: UserState = {
  isLoading: true,
  token: null,
  user: null
}

export const userSlice = createSlice({
  name: USER_KEY,
  initialState: initialUserState,
  reducers: {
    setUser: (state, action) => {
      state.isLoading = false
      state.user = action.payload.user
      state.token = action.payload.token
    },
    switchIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    logout: (state) => {
      state.isLoading = false
      state.user = null
      state.token = null
    },
    updateUser: (state, action) => {
      state.user = action.payload
    }
  },
})

export const userReducer = userSlice.reducer
export const userActions = userSlice.actions

export const getUserState = (root: RootState) => root[USER_KEY]