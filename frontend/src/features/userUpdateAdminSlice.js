import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:{},
    loading:false,
   success:null,
    error:null,
};

const userUpdateAdminSlice=createSlice({
    name:"userupdateadmin",
    initialState,
    reducers:{
        userupdateadminrequest(state){
            return {
                loading:true,
                
            } 
               
            
        },
        userupdateadminsuccess(state,action){
            state.loading=false;
            state.success=true;
            
        },
        userupdateadminfail(state,action){
            state.loading=false;
            state.error=action.payload;
        },
        userupdateadminreset(state,request){
            return { user:{}}
        }
    
   

    },
});

export default userUpdateAdminSlice.reducer;

export const {userupdateadminrequest,userupdateadminsuccess, userupdateadminfail,userupdateadminreset} = userUpdateAdminSlice.actions