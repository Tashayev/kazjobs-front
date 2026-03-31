import { ActionReducerMapBuilder, isAnyOf } from "@reduxjs/toolkit"
import { UserState } from "../types"
import { getUsers } from "../thunk/getUsers"
import { logIn } from "../thunk/logIn"
import { registerUser } from "../thunk/createUser"
import { refreshToken } from "../thunk/refreshToken"
import { getProfile } from "../thunk/getProfile"
import { getUser } from "../thunk/getUser"

export const extraReducers = (builder: ActionReducerMapBuilder<UserState>) => {

  builder.addMatcher(
    isAnyOf(
      logIn.fulfilled,
      registerUser.fulfilled,
      refreshToken.fulfilled,
      getProfile.fulfilled,
    ),
    (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
  )

  builder.addMatcher(
    isAnyOf(
      getUsers.fulfilled,
      logIn.fulfilled,
      registerUser.fulfilled,
      refreshToken.fulfilled,
      getProfile.fulfilled,
      getUser.fulfilled,
      getUser.rejected,
      getUsers.rejected,
      logIn.rejected,
      registerUser.rejected,
      refreshToken.rejected,
      getProfile.rejected,
    ),
    (state) => {
      state.isLoading = false
    },
  )

  builder.addMatcher(
    isAnyOf(
      getUsers.pending,
      logIn.pending,
      registerUser.pending,
      refreshToken.pending,
      getProfile.pending,
      getUser.pending,
    ),
    (state) => {
      state.isLoading = true
    },
  )
  
  builder.addMatcher(
    isAnyOf(
      logIn.rejected,
      registerUser.rejected,
      refreshToken.rejected,
      getProfile.rejected,
    ),
    (state) => {
      state.user = null
      state.isAuthenticated = false
    },
  )
}
