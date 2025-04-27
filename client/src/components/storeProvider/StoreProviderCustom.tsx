'use client'
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../../store/productSlice";
import activityAmountFilterSliseReducer from '../../store/activityAmountFilterSlise'
import shoppingCartReducer from '../../store/shoppingCartSlice'
import React from 'react'
import { Provider } from "react-redux";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
    reducer: {
        product: productReducer,
        activityFilter: activityAmountFilterSliseReducer,
        shoppingCart: shoppingCartReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false
        })
    }
})

const StoreProvider = ({ children }: any) => {

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default StoreProvider