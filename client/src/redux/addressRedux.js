import { createSlice } from '@reduxjs/toolkit';

const addressSlice = createSlice({
    name: "address",
    initialState: {
        details:{}
    },
    reducers: {
        addAddress: (state, action) => {
            state.details = action.payload
        },
    }
})

export const {addAddress} = addressSlice.actions

export default addressSlice.reducer;