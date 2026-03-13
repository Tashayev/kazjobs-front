import { JobTypes } from "../jobs/types"
import { UserTypes } from "../users/types"

export type ApplicationType = {
  _id: string
  job: JobTypes
  applicant: UserTypes
  status: "pending" | "accepted" | "rejected"
  CV?: string
  createdAt: string
  updatedAt: string
}