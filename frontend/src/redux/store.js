import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import productDetailReducer from './slices/productDetailSlice';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';

export default configureStore({
    reducer: {
        productReducer,
        productDetailReducer,
        cartReducer,
        userReducer,
    }
})