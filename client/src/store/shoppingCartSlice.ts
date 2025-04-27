import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Products } from "./productSlice";

interface ShoppingCart {
    popupIsOpen: boolean
    cartProducts: Products[]
}


const initialState: ShoppingCart = {
    popupIsOpen: false,
    cartProducts: []
}

export const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState: initialState,
    reducers: {
        setPopupIsOpen: (state: any) => {
            state.popupIsOpen = !state.popupIsOpen;
        },
        setCartProducts: (state: any, action: PayloadAction<Products[]>) => {
            state.cartProducts = action.payload
        }
    }

})


export const { setPopupIsOpen, setCartProducts } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;



/* 
    1) Creating store where user can add item to the shopping cart     +
    2) 



    How It Works? :
    1) Click on needed item
    2) This item adding to localestorage and to the shoppingCart store
    3) When i click on icon of shopping cart i moving to the single page of shopping cart
    4) On shopoping cart page i fetching added items (and i show items only for needed user, identify by UID)
    ....
    ....

*/