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
      getUsers.fulfilled,
      logIn.fulfilled,
      registerUser.fulfilled,
      refreshToken.fulfilled,
      getProfile.fulfilled,
      getUser.fulfilled,
    ),
    (state, action) => {
        state.user = action.payload
      state.isAuthenticated = true
    },
  )
}
