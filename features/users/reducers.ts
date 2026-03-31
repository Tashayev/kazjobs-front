import { PayloadAction } from "@reduxjs/toolkit"
import { UserState, UserTypes } from "./types"


export const setIsAuthenticated = (state: UserState, action: PayloadAction<boolean>) => {
  state.isAuthenticated = action.payload
}

export const setUser = (state: UserState, action: PayloadAction<UserTypes>) => {
  state.user = action.payload
}