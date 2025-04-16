'use client'
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../../store/productSlice";
import activityAmountFilterSlise from '../../store/activityAmountFilterSlise'
import React from 'react'
import { Provider } from "react-redux";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
    reducer: {
        product: productReducer,
        activityFilter: activityAmountFilterSlise,
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