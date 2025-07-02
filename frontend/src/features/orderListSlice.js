import { createSlice } from "@reduxjs/toolkit";

const initialState={
    orders:[],
    // success:null,
    loading:true,
    error:null,
    
};

const orderListSlice=createSlice({
    name:"orderlist",
    initialState,
    reducers:{
        orderListrequest(state,action){
          return {
            loading:true
          }  
        },
        orderListssuccess(state,action){
           return {
            loading:false,
            orders:action.payload

           }
           
        },
        orderListfail(state,action){
            return {
                loading:false,
                error:action.payload
            }
        },
        orderListreset(state,action){
            return {orders:[]}
        }

        
    },
});


export default orderListSlice.reducer;

export const {orderListrequest,orderListssuccess,orderListfail,orderListreset} = orderListSlice.actions