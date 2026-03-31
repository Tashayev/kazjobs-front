import { createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import baseApi from "@/lib/baseApi"
import { Endpoints } from "@/components/shared/Endpoints"

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (
    data: { oldPassword: string; newPassword: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await baseApi.post(Endpoints.CHANGE_PASSWORD, data)
      return response.data
    } catch (err) {
      if (err instanceof AxiosError) {
        return rejectWithValue(
          err.response?.data?.message || "changePassword failed",
        )
      }
      return rejectWithValue(err || "changePassword failed")
    }
  },
)
