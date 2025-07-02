import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:{},
    loading:false,
    error:null,
};

const userDetailSlice=createSlice({
    name:"userdetails",
    initialState,
    reducers:{
        userDetailStart(state){
            return {
                ...state,
                loading:true,
                error:null,
                
               }
            
        },
        userDetailSuccess(state,action){
            state.loading=false;
            state.user=action.payload;
            
        },
        userDetailFail(state,action){
            state.loading=false;
            state.error=action.payload;
        },
        userDetailReset(state,action){
            return { user:{ } }
        }
   

    },
});

export default userDetailSlice.reducer;

export const {userDetailStart,userDetailSuccess,userDetailFail,userDetailReset} = userDetailSlice.actions