import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
    title: string;
    description: string;
    price: number;
    image: string;
    category: string;
    characteristics: string;
}

interface ProductState {
    isBtnAdd: boolean
    products: Product[];
}


const initialState: ProductState = {
    isBtnAdd: false,
    products: []
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
        }

    }
})


export const { setBtnAdd, setProducts } = productSlice.actions;

export default productSlice.reducer;