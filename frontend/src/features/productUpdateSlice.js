import { createSlice } from "@reduxjs/toolkit";

const initialState={
    product:{},
    loading:false,
    success:null,
    error:null,
};

const productUpdateSlice=createSlice({
    name:"productupdate",
    initialState,
    reducers:{
        productUpdaterequest:(state)=>{
          return{
            loading:true, 
           };
        },
        productUpdatesuccess(state,action){
            state.loading=false;
            state.success=true;
            state.product=action.payload;
        },
        productUpdatefailure(state,action){
            state.loading=false;
            state.error=action.payload;
        },
        productUpdatereset(state,action){
            return {product:{}}
        }

    },
});


export default productUpdateSlice.reducer;

export const {productUpdaterequest,productUpdatesuccess,productUpdatefailure,productUpdatereset} = productUpdateSlice.actions