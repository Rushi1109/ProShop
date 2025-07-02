import { createSlice } from "@reduxjs/toolkit";
const initialState={
    userInfo:{},
    loading:false,
    error:null,
};

const userLoginSlice=createSlice({
    name:"userlogin",
    initialState,
    reducers:{
        userLoginStart(state){
            state.loading=true;
            
        },
        userLoginSuccess(state,action){
            state.loading=false;
            state.userInfo=action.payload;
            localStorage.setItem('userInfo',JSON.stringify(action.payload))
        },
        userLoginFail(state,action){
            state.loading=false;
            state.error=action.payload;
        },
        userLogout(state,action){
            localStorage.removeItem('userInfo')
            return {}
        }

    },
});

export default userLoginSlice.reducer;

export const {userLoginStart,userLoginSuccess,userLoginFail,userLogout} = userLoginSlice.actions