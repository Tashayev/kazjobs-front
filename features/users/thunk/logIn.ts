import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserLoginTypes } from "../types";
import { Endpoints } from "@/components/shared/Endpoints";
import baseApi from "@/lib/baseApi";
import { AxiosError } from "axios";

export const logIn = createAsyncThunk(
  "users/logIn",
  async (user: UserLoginTypes, { rejectWithValue }) => {
    try {
      const response = await baseApi.post(Endpoints.LOGIN, user)
      return response.data
    } catch (error) {
      if(error instanceof AxiosError) {
        return rejectWithValue(error.response?.data?.message || "Login failed")
      }
      return rejectWithValue("Login failed")
    }
  },
)