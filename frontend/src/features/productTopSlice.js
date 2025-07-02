import { createSlice } from "@reduxjs/toolkit";

const initialState={
    products:[],
    loading:false,
    success:null,
    error:null,
};

const productTopSlice=createSlice({
    name:"producttop",
    initialState,
    reducers:{
       productToprequest:(state)=>{
          return{
            products:[],
            loading:true, 
           };
        },
       productTopsuccess(state,action){
            state.products=action.payload
            state.loading=false;
            state.success=true;
         
        },
       productTopfailure(state,action){
            state.loading=false;
            state.error=action.payload;
        },
   
    },
});


export default productTopSlice.reducer;

export const {productToprequest,productTopsuccess,productTopfailure} = productTopSlice.actions