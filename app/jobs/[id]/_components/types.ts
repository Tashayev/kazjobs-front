import { Job } from "@/features/jobs/types"

export type Props = {
  job: Job | null
  isSeeker?: boolean
  isOwner?: boolean
  isAuthenticated?: boolean
}
