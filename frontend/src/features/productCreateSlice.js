import { createSlice } from "@reduxjs/toolkit";

const initialState={
    product:{},
    loading:false,
    success:null,
    error:null,
};

const productCreateSlice=createSlice({
    name:"productcreate",
    initialState,
    reducers:{
        productcreaterequest:(state)=>{
          return{
            loading:true, 
           };
        },
        productcreatesuccess(state,action){
            state.loading=false;
            state.success=true;
            state.product=action.payload;
        },
        productcreatefailure(state,action){
            state.loading=false;
            state.error=action.payload;
        },
        productcreatereset(state,action){
            return {}
        }

    },
});


export default productCreateSlice.reducer;

export const {productcreaterequest,productcreatesuccess,productcreatefailure,productcreatereset} = productCreateSlice.actions