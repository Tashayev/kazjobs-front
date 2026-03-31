
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserRegisterTypes } from "../types";
import { Endpoints } from "@/components/shared/Endpoints";
import baseApi from "@/lib/baseApi";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/lib/baseApi";
import { localStore } from "@/components/utils/localStore";

import { AxiosError } from "axios"

const { set } = localStore
export const registerUser = createAsyncThunk(
  "users/createUser",
  async (user: UserRegisterTypes, { rejectWithValue }) => {
    try {
      const response = await baseApi.post(Endpoints.REGISTER, user)
      const { accessToken, refreshToken } = response.data
      set(ACCESS_TOKEN, accessToken)
      set(REFRESH_TOKEN, refreshToken)
      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data?.message || "Register failed")
      }
      return rejectWithValue("Register failed")
    }
  },
)