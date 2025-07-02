import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userInfo:null,
    loading:false,
    error:null,
};

const userRegisterSlice=createSlice({
    name:"userregister",
    initialState,
    reducers:{
        userRegisterStart(state){
            state.loading=true;
            
        },
        userRegisterSuccess(state,action){
            state.loading=false;
            state.userInfo=action.payload;
            localStorage.setItem('userInfo',JSON.stringify(action.payload))
        },
        userRegisterFail(state,action){
            state.loading=false;
            state.error=action.payload;
        },
        userLogout(state,action){
            localStorage.removeItem('userInfo')
            return {}
        }

    },
});

export default userRegisterSlice.reducer;

export const {userRegisterStart,userRegisterSuccess,userRegisterFail,userLogout} = userRegisterSlice.actions