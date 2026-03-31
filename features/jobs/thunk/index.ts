import { ActionReducerMapBuilder, isAnyOf } from "@reduxjs/toolkit"
import { JobState } from "../types"
import { fetchJobs } from "./fetchJobs"
import { fetchJobById } from "./fetchJobById"
import { createJob } from "./createJob"
import { updateJob } from "./updateJob"
import { deleteJob } from "./deleteJob"
import { getJobsByEmployer } from "./getJobsByEmployer"

export const extraReducers = (builder: ActionReducerMapBuilder<JobState>) => {
  builder.addMatcher(
    isAnyOf(fetchJobs.fulfilled, ),
    (state, action) => {
      state.jobs = action.payload.jobs
    },
  )
  builder.addMatcher(
  isAnyOf(fetchJobs.fulfilled),
  (state, action) => {
    state.jobs = action.payload.jobs  
  },
)

builder.addMatcher(
  isAnyOf(createJob.fulfilled),
  (state, action) => {
    state.jobs = [...state.jobs, action.payload.job] 
  },
)
  builder.addMatcher(
  isAnyOf(getJobsByEmployer.fulfilled),
  (state, action) => {
    state.jobs = action.payload.jobs
  },
)

builder.addMatcher(
  isAnyOf(deleteJob.fulfilled),
  (state, action) => {
    state.jobs = state.jobs.filter((j) => j._id !== action.meta.arg)
  },
)

builder.addMatcher(
  isAnyOf(updateJob.fulfilled),
  (state, action) => {
    const index = state.jobs.findIndex((j) => j._id === action.payload.job._id)
    if (index !== -1) state.jobs[index] = action.payload.job
  },
)
  builder.addMatcher(
    isAnyOf(fetchJobs.pending, createJob.pending, fetchJobById.pending),
    (state) => {
      state.isLoading = true
    },
  )
  builder.addMatcher(
    isAnyOf(
      fetchJobs.rejected,
      fetchJobs.fulfilled,
      createJob.fulfilled,
      createJob.rejected,
      fetchJobById.rejected,
      fetchJobById.fulfilled,
    ),
    (state) => {
      state.isLoading = false
    },
  )

  builder.addMatcher(isAnyOf(fetchJobById.fulfilled), (state, action) => {
    state.selectedJob = action.payload.job
    state.selectedJobLoading = false
  })
  builder.addMatcher(isAnyOf(fetchJobById.pending), (state) => {
    state.selectedJobLoading = true
  })
  builder.addMatcher(isAnyOf(fetchJobById.rejected), (state) => {
    state.selectedJobLoading = false
  })
}
