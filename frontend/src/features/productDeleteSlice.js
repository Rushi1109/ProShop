import { createSlice } from "@reduxjs/toolkit";

const initialState={
   
    loading:false,
    success:null,
    error:null,
};

const productDeleteSlice=createSlice({
    name:"productdelete",
    initialState,
    reducers:{
        productDeleteStart:(state)=>{
          return {
            
            loading:true,
           
            
           };
        },
        productDeleteSuccess(state,action){
            state.loading=false;
            state.success=true;
        },
        productDeleteFailure(state,action){
            state.loading=false;
            state.error=action.payload;
        }

    },
});


export default productDeleteSlice.reducer;

export const {productDeleteStart,productDeleteSuccess,productDeleteFailure} = productDeleteSlice.actions