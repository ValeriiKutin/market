import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
    id: string;
    article: string;
    section: string;
    title: string;
    description: string;
    price: number;
    image: string;
    category: string;
    characteristics: string;
    sizeS: string;
    sizeM: string;
    sizeL: string;
    sizeXL: string;
    sizeXXL: string;
    activityLevel: string;
}

interface User {
    displayName: string;
    email: string;
    photoURL: string;
    role: string;
    uid: string;
}

interface ProductState {
    isBtnAdd: boolean;
    isAdmin: boolean;
    products: Product[];
    currentUser: User[];
}


const initialState: ProductState = {
    isBtnAdd: false,
    isAdmin: false,
    products: [],
    currentUser: []
}


export const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {
        setBtnAdd: (state: any) => {
            state.isBtnAdd = !state.isBtnAdd
        },
        setProducts: (state: any, action: PayloadAction<Product[]>) => {
            state.products = action.payload
        },
        setIsAdmin: (state: any, action: any) => {
            state.isAdmin = action.payload
        },
        setCurrentUser: (state: any, action: PayloadAction<Product[]>) => {
            state.currentUser = action.payload
        },

    }
})


export const { setBtnAdd, setProducts, setIsAdmin, setCurrentUser } = productSlice.actions;

export default productSlice.reducer;