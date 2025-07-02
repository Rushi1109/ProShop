import { createSlice } from "@reduxjs/toolkit";

const initialState={
    order:{},
    loading:false,
    error:null,
    success:null,
};

const orderSlice=createSlice({
    name:"order",
    initialState,
    reducers:{
        ordercreaterequest:(state)=>{
          return {
            
            loading:true,
           
            
           };
        },
        ordercreatesuccess(state,action){
            state.loading=false;
            state.success=true
            state.order=action.payload;
        },
        ordercreatefail(state,action){
            state.loading=false;
            state.error=action.payload;
        },
        ordercreatereset(state,action){
            return {}
        },
        
    },
});


export default orderSlice.reducer;

export const {ordercreaterequest,ordercreatesuccess,ordercreatefail,ordercreatereset} = orderSlice.actions