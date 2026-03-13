import { Endpoints } from "@/components/shared/Endpoints";
import baseApi from "@/lib/baseApi";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getProfile = createAsyncThunk("users/getProfile", async (id: string, { rejectWithValue }) => {
    try {
        const response = await baseApi.get(Endpoints.PROFILE, { params: { id } })
        return response.data
    } catch (error) {
        return rejectWithValue(error || "getProfile failed")
    }
})