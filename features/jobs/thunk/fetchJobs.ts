import { Endpoints } from "@/components/shared/Endpoints"
import baseApi from "@/lib/baseApi"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { JobFilters } from "../types"

export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (filters: JobFilters = {}, { rejectWithValue }) => {
    try {
      const res = await baseApi.get(Endpoints.JOBS, { params: filters })
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data?.message || "Get jobs failed",
        )
      }
      return rejectWithValue("Get jobs failed")
    }
  },
)
