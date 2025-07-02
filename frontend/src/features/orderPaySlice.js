import { createSlice } from "@reduxjs/toolkit";

const initialState={
    success:null,
    loading:true,
    error:null,
    
};

const orderPaySlice=createSlice({
    name:"orderpay",
    initialState,
    reducers:{
        orderpayrequest(state,action){
          return {
            loading:true
          }  
        },
        orderpayssuccess(state,action){
           return {
            loading:false,
            success:true

           }
           
        },
        orderpayfail(state,action){
            return {
                loading:false,
                error:action.payload
            }
        },
        orderpayreset(state,action){
            return {}
        }

        
    },
});


export default orderPaySlice.reducer;

export const {orderpayrequest,orderpayssuccess,orderpayfail,orderpayreset} = orderPaySlice.actions