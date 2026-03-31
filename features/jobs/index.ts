import {
  useAppDispatch,
  useAppSelector,
} from "@/components/hooks/useReduxTypes"
import { useCallback, useEffect } from "react"
import { RootState } from "@/store"
import { fetchJobs } from "./thunk/fetchJobs"
import { fetchJobById } from "./thunk/fetchJobById"
import { jobsActions } from "./slice"
import { getJobsByCategory } from "./thunk/getJobsByCategory"
import { getJobsByEmployer } from "./thunk/getJobsByEmployer"
import { deleteJob } from "./thunk/deleteJob"
import { updateJob } from "./thunk/updateJob"
import { CreateJobPayload, Job, JobFilters } from "./types"
import { createJob } from "./thunk/createJob"

export const useJobs = () => {
  const dispatch = useAppDispatch()

  const { jobs, isLoading, selectedJob, selectedJobLoading } = useAppSelector(
    (state: RootState) => state.job,
  )

  const homeStage = jobs.slice(0, 6)

  const handleFetchJobs = useCallback(
    async (filters: JobFilters = {}) => {
      await dispatch(fetchJobs(filters)).unwrap()
    },
    [dispatch],
  )

  useEffect(() => {
    if (jobs.length === 0) handleFetchJobs()
  }, [jobs.length, handleFetchJobs])

  const handleFetchJobById = useCallback(
    async (id: string) => {
      await dispatch(fetchJobById(id))
    },
    [dispatch],
  )
  const clearSelectedJob = useCallback(() => {
    dispatch(jobsActions.clearSelectedJob())
  }, [dispatch])

  const handleGetJobsByCategory = useCallback(
    async (category: string) => {
      await dispatch(getJobsByCategory(category))
    },
    [dispatch],
  )

  const handleGetJobsByEmployer = useCallback(async () => {
    await dispatch(getJobsByEmployer())
  }, [dispatch])
  const handleDeleteJob = useCallback(
    async (id: string) => {
      await dispatch(deleteJob(id))
    },
    [dispatch],
  )

  const handleUpdateJob = useCallback(
    async (job: Job) => {
      await dispatch(updateJob(job))
    },
    [dispatch],
  )
  const handleCreateJob = useCallback(
    async (job: CreateJobPayload) => {
      await dispatch(createJob(job))
    },
    [dispatch],
  )

  return {
    homeStage,
    isLoading,
    handleFetchJobs,
    jobs,
    handleFetchJobById,
    selectedJob,
    selectedJobLoading,
    clearSelectedJob,
    handleGetJobsByCategory,
    handleGetJobsByEmployer,
    handleDeleteJob,
    handleUpdateJob,
    handleCreateJob
  }
}
// in jobs page
// handleFetchJobs({ category: "it-technology" })
// handleFetchJobs({ type: "remote" })
// handleFetchJobs({ category: "it-technology", type: "remote" })
// handleFetchJobs() // reset — all jobs
