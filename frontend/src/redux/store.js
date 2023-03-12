import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import productDetailReducer from './slices/productDetailSlice';

export default configureStore({
    reducer: {
        productReducer,
        productDetailReducer,
    }
})