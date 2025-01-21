import { createSlice } from '@reduxjs/toolkit'

const userKey = 'user'

export const userSlice = createSlice({
  name: userKey,
  initialState: {
    isLoading: true,
    user: null,
    token: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.isLoading = false
      state.user = action.payload.user
      state.token = action.payload.token
    },
    logout: (state) => {
      state.isLoading = false
      state.user = null
      state.token = null
    }
  },
})
