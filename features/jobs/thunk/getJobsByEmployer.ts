import { Endpoints } from "@/components/shared/Endpoints"
import baseApi from "@/lib/baseApi"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosError } from "axios"


export const getJobsByEmployer = createAsyncThunk(
  'jobs/getJobsByEmployer', 
  async (_, { rejectWithValue }) => {  
    try {
      const res = await baseApi.get(Endpoints.JOBS_BY_EMPLOYER) 
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data?.message || "Get jobs by employer failed")
      }
      return rejectWithValue("Get jobs by employer failed")
    }
  }
)