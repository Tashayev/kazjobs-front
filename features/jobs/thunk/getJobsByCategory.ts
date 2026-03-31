import { Endpoints } from "@/components/shared/Endpoints"
import baseApi from "@/lib/baseApi"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosError } from "axios"

export const getJobsByCategory = createAsyncThunk('jobs/getJobsByCategory', async (category: string, { rejectWithValue }) => {
  try {
    const res = await baseApi.get(`${Endpoints.JOBS_BY_CATEGORY.replace(':category', category)}`)
    return res.data
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.message)
    }
    return rejectWithValue("Get jobs by category failed")
  }
})