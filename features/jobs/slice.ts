import { createSlice } from "@reduxjs/toolkit"
import { JobState } from "./types"
import { extraReducers } from "./thunk"
import * as reducers from "./reducers"

const initialState: JobState = {
    jobs: [],
    isLoading: false,
    selectedJob: null,
    selectedJobLoading: false,  
}


export const jobsSlice = createSlice({
    name: "job",
    initialState,
    reducers,
    extraReducers,
})

export const jobsActions = jobsSlice.actions
export default jobsSlice.reducer
