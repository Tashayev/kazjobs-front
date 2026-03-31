
export type UserTypes = {
  _id: string
  username: string
  email: string
  role: "seeker" | "employer"
  createdAt: string
  updatedAt: string
}

export type UserRegisterTypes = {
  username: string
  email: string
  password: string
  role: "seeker" | "employer"
}

export type UserState = {
  user: UserTypes | null;
  isAuthenticated: boolean
  isLoading: boolean
}

export type UserLoginTypes = {
  email: string
  password: string
}

export type UserUpdateTypes = {
  username: string
  role: "seeker" | "employer"
}