import { Endpoints } from "@/components/shared/Endpoints";
import baseApi from "@/lib/baseApi";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getUser = createAsyncThunk("users/getUser", async (id: string, { rejectWithValue }) => {
    try {
        const response = await baseApi.get(Endpoints.GET_USERS, { params: { id } })
        return response.data
    } catch (error) {
        return rejectWithValue(error || "getUser failed")
    }
})