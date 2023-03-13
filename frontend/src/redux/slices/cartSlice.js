import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const addProductToCart = createAsyncThunk('addProductToCart', async (args) => {
    const { data } = await axios.get(`/api/products/${args.id}`);

    const item = {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty: args.qty,
    }

    return item;
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: {
        cart: cartItemsFromStorage,
        status: 'idle',
        error: null,
    },
    reducers: {
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(x => x.product !== action.payload);
            window.localStorage.setItem('cartItems', JSON.stringify(state.cart));
        }
    },
    extraReducers: function (builder) {
        builder
            .addCase(addProductToCart.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(addProductToCart.fulfilled, (state, action) => {
                state.status = "success";
                const item = action.payload;

                const existItem = state.cart.find(x => x.product === item.product);

                if (existItem) {
                    state.cart.forEach(x => {
                        if(x.product === item.product){
                            x.qty = item.qty;
                        }
                    });
                } else {
                    state.cart.push(item);
                }
                window.localStorage.setItem('cartItems', JSON.stringify(state.cart));
            })
    .addCase(addProductToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
    })
    }
});

export const { removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;


// Cart Structure
// {
//     productId,
//     name,
//     image,
//     price,
//     countInStock,
//     qty
// }