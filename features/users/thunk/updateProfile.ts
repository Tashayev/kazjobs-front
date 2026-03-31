import { createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import baseApi from "@/lib/baseApi"
import { Endpoints } from "@/components/shared/Endpoints"
import { UserUpdateTypes } from "../types"

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (user: UserUpdateTypes, { rejectWithValue }) => {
    try {
      const response = await baseApi.patch(Endpoints.USERS  , user)
      return response.data
    } catch (err) {
      if (err instanceof AxiosError) {
        return rejectWithValue(
          err.response?.data?.message || "updateProfile failed",
        )
      }
      return rejectWithValue(err || "updateProfile failed")
    }
  },
)
