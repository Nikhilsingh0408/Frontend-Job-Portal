import { createSlice } from "@reduxjs/toolkit";

const appliedJobsSlice = createSlice({
    name:"applied",
    initialState:{
        allAppliedJobs:[],
    },
    reducers:{
        // actions
        setAllAppliedJobs:(state,action) => {
            state.allAppliedJobs = action.payload;
        },
    }
});
export const {setAllAppliedJobs} = appliedJobsSlice.actions;
export default appliedJobsSlice.reducer;