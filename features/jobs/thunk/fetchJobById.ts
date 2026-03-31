import { Endpoints } from "@/components/shared/Endpoints"
import baseApi from "@/lib/baseApi"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosError } from "axios"


export const fetchJobById = createAsyncThunk('jobs/fetchJobById', async (id: string, { rejectWithValue }) => {
  try {
    const res = await baseApi.get(`${Endpoints.JOB.replace(':id', id)}`)
    return res.data
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.message)
    }
    return rejectWithValue("Get job failed")
  }
})