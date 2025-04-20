import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Products {
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
    products: Products[];
    filteredProductsByActivity: Products[];
    currentUser: User[];
}


const initialState: ProductState = {
    isBtnAdd: false,
    isAdmin: false,
    products: [],
    filteredProductsByActivity: [],
    currentUser: []
}


export const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {
        setBtnAdd: (state: any) => {
            state.isBtnAdd = !state.isBtnAdd
        },
        setProducts: (state: any, action: PayloadAction<Products[]>) => {
            state.products = action.payload
        },
        setFilteredProductsByActivity: (state: any, action: PayloadAction<Products[]>) => {
            state.filteredProductsByActivity = action.payload
        },
        setIsAdmin: (state: any, action: any) => {
            state.isAdmin = action.payload
        },
        setCurrentUser: (state: any, action: PayloadAction<Products[]>) => {
            state.currentUser = action.payload
        },

    }
})


export const { setBtnAdd, setProducts, setIsAdmin, setCurrentUser, setFilteredProductsByActivity } = productSlice.actions;

export default productSlice.reducer;