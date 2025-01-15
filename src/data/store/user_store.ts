import { createSlice } from '@reduxjs/toolkit'

const userKey = 'user'

export const userSlice = createSlice({
  name: userKey,
  initialState: {
    isLoading: true,
    isAuthenticated: false,
    user: null,
    token: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.isLoading = false
      state.isAuthenticated = !!action.payload.user
      state.user = action.payload.user
      state.token = action.payload.token
    },
  },
})
