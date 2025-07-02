import { createSlice } from "@reduxjs/toolkit";

const initialState={
    users:[],
    loading:false,
   
    error:null,
};

const userListSlice=createSlice({
    name:"userlist",
    initialState,
    reducers:{
        userListRequest(state){
            return {
                loading:true,
                
            } 
               
            
        },
        userListSuccess(state,action){
            state.loading=false;
            state.users=action.payload;
            
        },
        userListFail(state,action){
            state.loading=false;
            state.error=action.payload;
        },
        userListReset(state,action){
            return {users:[]}
        }
   

    },
});

export default userListSlice.reducer;

export const {userListRequest,userListSuccess, userListFail, userListReset} = userListSlice.actions