
export type UserTypes = {
  _id: string
  username: string
  email: string
  role: "seeker" | "employer"
  createdAt: string
  updatedAt: string
}

export type UserRgisterTypes = {
  username: string
  email: string
  password: string
  role: "seeker" | "employer"
}

export type UserState = {
  user: UserTypes
  isAuthenticated: boolean
  isLoading: boolean
}