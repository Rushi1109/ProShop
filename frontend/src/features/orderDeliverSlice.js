import { createSlice } from "@reduxjs/toolkit";

const initialState={
    success:null,
    loading:true,
    error:null,
    
};

const orderDeliverSlice=createSlice({
    name:"orderdeliver",
    initialState,
    reducers:{
        orderdeliverrequest(state,action){
          return {
            loading:true
          }  
        },
        orderdeliverssuccess(state,action){
           return {
            loading:false,
            success:true

           }
           
        },
        orderdeliverfail(state,action){
            return {
                loading:false,
                error:action.payload
            }
        },
        orderdeliverreset(state,action){
            return {}
        }

        
    },
});


export default orderDeliverSlice.reducer;

export const {orderdeliverrequest,orderdeliverssuccess,orderdeliverfail,orderdeliverreset} = orderDeliverSlice.actions