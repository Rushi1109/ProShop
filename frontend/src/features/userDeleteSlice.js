import { createSlice } from "@reduxjs/toolkit";

const initialState={
  
    loading:false,
   success:null,
    error:null,
};

const userDeleteSlice=createSlice({
    name:"userdelete",
    initialState,
    reducers:{
        userDeleteRequest(state){
            return {
                loading:true,
                
            } 
               
            
        },
        userDeleteSuccess(state,action){
            state.loading=false;
            state.success=true;
            
        },
        userDeleteFail(state,action){
            state.loading=false;
            state.error=action.payload;
        },
    
   

    },
});

export default userDeleteSlice.reducer;

export const {userDeleteRequest,userDeleteSuccess, userDeleteFail} = userDeleteSlice.actions