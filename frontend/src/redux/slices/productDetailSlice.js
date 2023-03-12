import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const listProductDetail = createAsyncThunk('productDetails/fetch', async (id) => {
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

export default productDetailSlice.reducer;