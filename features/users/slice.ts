import { extraReducers } from "./thunk"
import { createSlice } from "@reduxjs/toolkit"
import { UserState, UserTypes } from "./types"

const initialState: UserState = {
  user: {} as UserTypes,
  isAuthenticated: false,
  isLoading: false,
}

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers,
})

export const userActions = userSlice.actions
export default userSlice.reducer

