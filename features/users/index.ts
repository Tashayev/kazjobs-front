"use client"
import { useAppDispatch, useAppSelector } from "@/components/hooks/useReduxTypes"
import  { registerUser } from "./thunk/createUser"
import { useCallback } from "react"
import { UserLoginTypes, UserRegisterTypes, UserUpdateTypes } from "./types"
import { logIn } from "./thunk/logIn"
import { getProfile } from "./thunk/getProfile"
import { changePassword } from "./thunk/changePassword"
import { updateProfile } from "./thunk/updateProfile"

const useUser = () => {
  const dispatch = useAppDispatch()
  const { user, isLoading, isAuthenticated } = useAppSelector((state) => state.user)

  const handleRegister = useCallback(
    (data: UserRegisterTypes) => dispatch(registerUser(data)),
    [dispatch],
  )

  const handleLogIn = useCallback(
    (data: UserLoginTypes) => dispatch(logIn(data)),
    
    [dispatch],
  )

  const handleGetProfile = useCallback(
    async () => await dispatch(getProfile()),
    [dispatch],
  )

  const handleChangePassword = useCallback(
    async (data: { oldPassword: string, newPassword: string }) => await dispatch(changePassword(data)),
    [dispatch],
  )

  const handleUpdateProfile = useCallback(
    async (data: UserUpdateTypes) => await dispatch(updateProfile(data)),
    [dispatch],
  )
  return {
    user,
    isLoading,
    isAuthenticated,
    handleRegister,
    handleLogIn,
    handleGetProfile,
    handleChangePassword,
    handleUpdateProfile
  }
}

export default useUser
