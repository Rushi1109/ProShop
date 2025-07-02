import { createSlice } from "@reduxjs/toolkit";

const initialState={
    orderd:{ orderItems:[], shippingAddress:{}},
    loading:true,
    error:null,
    
};

const orderDetailSlice=createSlice({
    name:"orderdetail",
    initialState,
    reducers:{
        orderdetailsrequest(state,action){
          return {
            ...state,
            loading:true
          }  
        },
        orderdetailssuccess(state,action){
           return {
            loading:false,
            orderd:action.payload

           }
           
        },
        orderdetailsfail(state,action){
            return {
                loading:false,
                error:action.payload
            }
        }

        
    },
});


export default orderDetailSlice.reducer;

export const {orderdetailsrequest,orderdetailssuccess,orderdetailsfail} = orderDetailSlice.actions