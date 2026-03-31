"use client"
import { useEffect } from "react"
import { localStore } from "../utils/localStore"
import { ACCESS_TOKEN } from "@/lib/baseApi"
import useUser from "@/features/users/useUser"

const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const { get } = localStore
  const token = get(ACCESS_TOKEN)
  const { handleGetProfile } = useUser()

  useEffect(() => {
    if (token) handleGetProfile()
  }, [ token, handleGetProfile])

  return <>{children}</>
}

export default AuthProvider
