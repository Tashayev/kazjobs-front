import { createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "@/lib/baseApi";
import { Endpoints } from "@/components/shared/Endpoints";
import { AxiosError } from "axios";


export const deleteJob =  createAsyncThunk("job/deleteJob", async(id:string, { rejectWithValue }) => {
    try {
        await baseApi.delete(`${Endpoints.JOB}/${id}`)
    } catch (error) {
        if (error instanceof AxiosError) {
            return rejectWithValue(error.response?.data?.message || "deleteJob failed")
        }
        return rejectWithValue(error || "deleteJob failed")
    }
})