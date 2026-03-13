import { Endpoints } from "@/components/shared/Endpoints";
import baseApi from "@/lib/baseApi";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const refreshToken = createAsyncThunk("users/refreshToken", async (refreshToken: string, { rejectWithValue }) => {    

    try {
        const response = await baseApi.post(Endpoints.REFRESH_TOKEN, { refreshToken })
        return response.data
    } catch (error) {
        return rejectWithValue(error || "refreshToken failed")
    }
})