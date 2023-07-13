import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser:null,
        isFetching:null,
        error:null
    },
    reducers: {
        loginStart:(state)=>{
            state.isFetching=true;
        },
        loginSuccess:(state,action)=>{
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure:(state)=>{
            state.isFetching = false;
            
            state.error = false;
        },
        logOut:(state)=>{
            state.isFetching=false;
            state.currentUser = null;
            state.error = false;
        }
    }
})

export const {loginStart,loginSuccess,loginFailure,logOut} = userSlice.actions

export default userSlice.reducer;