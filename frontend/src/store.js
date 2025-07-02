import {configureStore} from '@reduxjs/toolkit'
import {thunk} from 'redux-thunk'
// import productSlice from './features/productSlice'
import productSliceReducer from './features/productSlice'
import productDetailsReducer from './features/productDetailsSlice'
import cartSliceReducer from './features/cartSlice'
import userLoginSliceReducer from './features/userLoginSlice'
import userRegisterSliceReducer from './features/userRegisterSlice'
import userDetailSliceReducer from './features/userDetailSlice'
import userUpdateSliceReducer from './features/userUpdateSlice'
import orderSliceReducer from './features/orderSlice'
import orderDetailSliceReducer from './features/orderDetailSlice'
import orderPaySliceReducer from './features/orderPaySlice'
import orderListSliceReducer from './features/orderListSlice'
import userListSliceReducer from './features/userListSlice'
import userDeleteSliceReducer from './features/userDeleteSlice'
import userUpdateAdminSliceReducer from './features/userUpdateAdminSlice'
import productDeleteSliceReducer from './features/productDeleteSlice'
import productCreateSliceReducer from './features/productCreateSlice'
import productUpdateSliceReducer from './features/productUpdateSlice'
import orderAdminSliceReducer from './features/orderAdminSlice'
import orderDeliverSliceReducer from './features/orderDeliverSlice'
import productCreateReviewSliceReducer from './features/productCreateReviewSlice'
import productTopSliceReducer from './features/productTopSlice'

const cartItemsFromStorage=localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')): []
const userInfoFromStorage=localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')): null
const shippingAddressFromStorage=localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')): {}
const paymentMethodFromStorage=localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')):''
//console.log('STORAGE',cartItemsFromStorage);

const initialCartState = {
    cartItems: cartItemsFromStorage,
    shippingAddress:shippingAddressFromStorage,
    paymentMethod:paymentMethodFromStorage
  };

const initalUserState={
    userInfo:userInfoFromStorage,
}
// const initalShippingState={
//     shippingAddress:shippingAddressFromStorage
// }


const store=configureStore({
    reducer:{
        productList:productSliceReducer,
        productDetails:productDetailsReducer,
        productDelete:productDeleteSliceReducer,
        productCreate:productCreateSliceReducer,
        productUpdate:productUpdateSliceReducer,
        productCreateReview:productCreateReviewSliceReducer,
        productTopRated:productTopSliceReducer,
        
        cart:cartSliceReducer,
        
        userLogin:userLoginSliceReducer,
        userRegister:userRegisterSliceReducer,
        userDetail:userDetailSliceReducer,
        userUpdateProfile:userUpdateSliceReducer,
        userUpdateAdmin:userUpdateAdminSliceReducer,
        userList:userListSliceReducer,
        userDelete:userDeleteSliceReducer,
        
        orderCreate:orderSliceReducer,
        orderDetails:orderDetailSliceReducer,
        orderPay:orderPaySliceReducer,
        orderList:orderListSliceReducer,
        orderAdminList:orderAdminSliceReducer,
        orderDeliver:orderDeliverSliceReducer,
    },
    preloadedState:{ 
        cart:initialCartState,
        userLogin:initalUserState,
        // cart:initalShippingState,

    },
    middleware:(getDefaultMiddleware)=>[...getDefaultMiddleware(), thunk],

    
})

export default store