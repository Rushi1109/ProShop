import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    cartItems: [],
    shippingAddress:{},
    paymentMethod:''

};


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        cartAddItem(state, action) {
            const items = action.payload

            const existItem = state.cartItems.find(x => x.product == items.product)

            if (existItem) {

                const updatedCartItems = state.cartItems.map(x => x.product === existItem.product ? items : x)
                localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

                return {
                    ...state,
                    cartItems: updatedCartItems
                }

            } else {

                const newCartItems = [...state.cartItems, items];
                localStorage.setItem('cartItems', JSON.stringify(newCartItems));

                return {
                    ...state,
                    cartItems: newCartItems
                }
            }


        },
        cartRemoveItem(state, action) {
            const filtredItems=state.cartItems.filter(x => x.product !== action.payload)
            localStorage.setItem('cartItems', JSON.stringify(filtredItems));
            return {
                ...state,
                cartItems: filtredItems
            }

        },
        cartClearItem(state,action){
            localStorage.removeItem('cartItems')
            return{
                ...state,
                cartItems:[]
            }

        },
        saveShippingAddress(state,action){
            localStorage.setItem('shippingAddress',JSON.stringify(action.payload))
          return{
            ...state,
            shippingAddress:action.payload
          }  
        },
        savePaymentMethod(state,action){
            localStorage.setItem('paymentMethod',JSON.stringify(action.payload))
            return{
                ...state,
                paymentMethod:action.payload
            }
        }
    }


});

export default cartSlice.reducer;

export const { cartAddItem, cartRemoveItem ,saveShippingAddress,savePaymentMethod,cartClearItem} = cartSlice.actions
