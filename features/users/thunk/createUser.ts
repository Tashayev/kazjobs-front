
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserRegisterTypes } from "../types";
import { Endpoints } from "@/components/shared/Endpoints";
import baseApi from "@/lib/baseApi";

import { AxiosError } from "axios"

export const registerUser = createAsyncThunk(
  "users/createUser",
  async (user: UserRegisterTypes, { rejectWithValue }) => {
    try {
      const response = await baseApi.post(Endpoints.REGISTER, user)
      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data?.message || "Register failed")
      }
      return rejectWithValue("Register failed")
    }
  },
)