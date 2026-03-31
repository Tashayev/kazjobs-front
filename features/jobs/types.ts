
export type Job = {
  _id: string
  title: string
  description: string
  location?: string
  salary?: string
  category?: string
  type?: string
  skills?: string[]
  deadline?: string
  employer?: { username: string; email: string },
  createdAt?: string
  updatedAt?: string
}

export type JobState = {
  jobs: Job[]
  selectedJob: Job | null
  isLoading: boolean
  selectedJobLoading?: boolean
}

export type JobFilters = {
  category?: string
  type?: string
  location?: string
}
export type CreateJobPayload = {
  title: string
  description: string
  salary?: string
  location?: string
  skills?: string[]
  type?: string
  deadline?: string
  category?: string
}
        