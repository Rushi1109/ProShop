import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const listProductDetail = createAsyncThunk('productDetails/fetch', async (id) => {
    console.log('here');
    const { data } = await axios.get(`/api/products/${id}`);
    return data;
});

const productDetailSlice = createSlice({
    name: 'productDetailSlice',
    initialState: {
        product: {},
        status: 'idle',
        error: null,
    },
    // reducers: {
    //     loadProductDetail: (state, action) => {
    //         state.products = action.payload;
    //     }
    // },
    extraReducers: function (builder) {
        builder
            .addCase(listProductDetail.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(listProductDetail.fulfilled, (state, action) => {
                state.status = 'success';
                state.product = action.payload;
            })
            .addCase(listProductDetail.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
});

export const { loadProductDetail } = productDetailSlice.actions;
export default productDetailSlice.reducer;