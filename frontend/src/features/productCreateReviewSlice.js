import { createSlice } from "@reduxjs/toolkit";

const initialState={
    
    loading:false,
    success:null,
    error:null,
};

const productCreateReviewSlice=createSlice({
    name:"productcreatereview",
    initialState,
    reducers:{
        productCreateReviewrequest:(state)=>{
          return{
            loading:true, 
           };
        },
        productCreateReviewsuccess(state,action){
            state.loading=false;
            state.success=true;
         
        },
        productCreateReviewfailure(state,action){
            state.loading=false;
            state.error=action.payload;
        },
        productCreateReviewreset(state,action){
            return {}
        }

    },
});


export default productCreateReviewSlice.reducer;

export const {productCreateReviewrequest,productCreateReviewsuccess,productCreateReviewfailure,productCreateReviewreset} = productCreateReviewSlice.actions