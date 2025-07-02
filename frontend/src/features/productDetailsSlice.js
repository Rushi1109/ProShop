import { createSlice } from "@reduxjs/toolkit";

const initialState={
    product:{reviews:[]},
    loading:false,
    error:null,
};

const productDetailsSlice=createSlice({
    name:"productDetails",
    initialState,
    reducers:{
        fetchProductDetailsStart:(state)=>{
          return {
            ...state,
            loading:true,
            error:null,
            
           };
        },
        fetchProductDetailsSuccess(state,action){
            state.loading=false;
            state.product=action.payload;
        },
        fetchProductDetailsFailure(state,action){
            state.loading=false;
            state.error=action.payload;
        }

    },
});


export default productDetailsSlice.reducer;

export const {fetchProductDetailsStart,fetchProductDetailsSuccess,fetchProductDetailsFailure} = productDetailsSlice.actions