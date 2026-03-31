import { createAsyncThunk } from "@reduxjs/toolkit"
import baseApi from "@/lib/baseApi"
import { Endpoints } from "@/components/shared/Endpoints"
import { Job } from "../types"
import { AxiosError } from "axios"

export const updateJob = createAsyncThunk(
  "job/updateJob",
  async (job: Job, { rejectWithValue }) => {
    try {
      const response = await baseApi.patch(
        Endpoints.JOB.replace(":id", job._id),
        job,
      )
      return response.data
    } catch (err) {
      if (err instanceof AxiosError) {
        return rejectWithValue(
          err.response?.data?.message || "updateJob failed",
        )
      }
      return rejectWithValue(err || "updateJob failed")
    }
  },
)
