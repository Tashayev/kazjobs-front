import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserTypes } from "../types";
import { Endpoints } from "@/components/shared/Endpoints";
import baseApi from "@/lib/baseApi";

export const logIn = createAsyncThunk(
  "users/logIn",
  async (user: UserTypes, { rejectWithValue }) => {
    try {
      const response = await baseApi.post(Endpoints.LOGIN, user)
      return response.data
    } catch (error) {
      return rejectWithValue(error || "login failed")
    }
  },
)