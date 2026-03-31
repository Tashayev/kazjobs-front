import { Endpoints } from "@/components/shared/Endpoints"
import baseApi from "@/lib/baseApi"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { CreateJobPayload } from "../types"

export const createJob = createAsyncThunk('jobs/createJob', async (job: CreateJobPayload, { rejectWithValue }) => {
  try {
    const res = await baseApi.post(Endpoints.JOBS, job)
    return res.data
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.message)
    }
    return rejectWithValue("Create job failed")
  }
})