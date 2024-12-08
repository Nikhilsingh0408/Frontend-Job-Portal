import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name:"search",
    initialState:{
        searchedQuery:""
    },
    reducers:{
        // actions
        setSearchedQuery:(state, action) => {
            state.searchedQuery = action.payload;
        }
    }
});
export const {setSearchedQuery } = searchSlice.actions;
export default searchSlice.reducer;