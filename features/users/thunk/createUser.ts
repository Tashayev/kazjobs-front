
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserRgisterTypes } from "../types";
import { Endpoints } from "@/components/shared/Endpoints";
import baseApi from "@/lib/baseApi";

export const registerUser = createAsyncThunk(
  "users/createUser",
  async (user: UserRgisterTypes, { rejectWithValue }) => {
    try {
      const response = await baseApi.post(Endpoints.REGISTER, user)
      return response.data
    } catch (error) {
      return rejectWithValue(error || "register failed")
    }
  },
)