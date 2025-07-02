import { createSlice } from "@reduxjs/toolkit";

const initialState={
    orders:[],
    // success:null,
    loading:true,
    error:null,
    
};

const orderAdminSlice=createSlice({
    name:"orderadmin",
    initialState,
    reducers:{
        orderAdminrequest(state,action){
          return {
            loading:true
          }  
        },
        orderAdminssuccess(state,action){
           return {
            loading:false,
            orders:action.payload

           }
           
        },
        orderAdminfail(state,action){
            return {
                loading:false,
                error:action.payload
            }
        },
        

        
    },
});


export default orderAdminSlice.reducer;

export const {orderAdminrequest,orderAdminssuccess,orderAdminfail,orderAdminreset} = orderAdminSlice.actions