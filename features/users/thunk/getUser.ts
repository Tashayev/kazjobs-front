import { Endpoints } from "@/components/shared/Endpoints";
import baseApi from "@/lib/baseApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";


export const getUser = createAsyncThunk("users/getUser", async (id: string, { rejectWithValue }) => {
    try {
        const response = await baseApi.get(Endpoints.GET_USERS, { params: { id } })
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) {
            return rejectWithValue(error.message)
        }
        return rejectWithValue("Get user failed")
    }
})