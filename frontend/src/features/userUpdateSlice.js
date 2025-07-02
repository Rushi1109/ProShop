import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userInfo:{},
    loading:false,
    success:null,
    error:null,
};

const userUpdateSlice=createSlice({
    name:"userupdate",
    initialState,
    reducers:{
        updateProfileStart(state){
            return {
                loading:true,
                error:null,
            } 
               
            
        },
        updateProfileSuccess(state,action){
            state.loading=false;
            state.success=true;
            state.userInfo=action.payload;
            
        },
        updateProfileFail(state,action){
            state.loading=false;
            state.error=action.payload;
        },
        updateProfileReset(state,action){
            return {}
        }
   

    },
});

export default userUpdateSlice.reducer;

export const {updateProfileStart,updateProfileSuccess, updateProfileFail, updateProfileReset} = userUpdateSlice.actions