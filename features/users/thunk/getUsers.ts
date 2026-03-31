import { Endpoints } from "@/components/shared/Endpoints";
import baseApi from "@/lib/baseApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getUsers = createAsyncThunk(
  "users/getUsers", 
  async (role: string | undefined, { rejectWithValue }) => {
    try {
      const response = await baseApi.get(Endpoints.USERS, {
        params: role ? { role } : {}
      })
      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data?.message || "getUsers failed")
      }
      return rejectWithValue("getUsers failed")
    }
  }
) 