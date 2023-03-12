import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchData = createAsyncThunk('products/fetch', async () => {
    const {data} = await axios.get('/api/products');
    return data;
});

const productSlice = createSlice({
    name: 'productSlice',
    initialState: {
        products: [],
        status: 'idle',
        error: null,
    },
    // reducers: {
    //     loadProducts: (state, action) => {
    //         state.products = action.payload;
    //     }
    // }
    extraReducers: function(builder) {
        builder
            .addCase(fetchData.pending, (state,action) => {
                state.status = 'loading';
            })
            .addCase(fetchData.fulfilled, (state,action) => {
                state.status = 'success';
                state.products = action.payload;
            })
            .addCase(fetchData.rejected, (state,action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
});

export const { loadProducts } = productSlice.actions;
export default productSlice.reducer;