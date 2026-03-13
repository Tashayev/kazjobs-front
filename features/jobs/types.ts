import { UserTypes } from "../users/types"

export type JobTypes = {
  _id: string
  title: string
  description: string
  salary?: number
  location?: string
  type?: "full-time" | "part-time" | "remote"
  skills?: string[]
  deadline?: string
  employer: UserTypes
  createdAt: string
  updatedAt: string
}