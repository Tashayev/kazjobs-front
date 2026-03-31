import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserLoginTypes } from "../types";
import { Endpoints } from "@/components/shared/Endpoints";
import baseApi from "@/lib/baseApi";
import { AxiosError } from "axios";
import { localStore } from "@/components/utils/localStore";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/lib/baseApi";

const { set } = localStore

export const logIn = createAsyncThunk(
  "users/logIn",
  async (user: UserLoginTypes, { rejectWithValue }) => {
    try {
      const response = await baseApi.post(Endpoints.LOGIN, user)
      const { accessToken, refreshToken } = response.data
      set(ACCESS_TOKEN, accessToken)
      set(REFRESH_TOKEN, refreshToken)
      return response.data
    } catch (error) {
      if(error instanceof AxiosError) {
        return rejectWithValue(error.response?.data?.message || "Login failed")
      }
      return rejectWithValue("Login failed")
    }
  },
)