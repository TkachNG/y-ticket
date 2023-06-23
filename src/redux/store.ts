import { configureStore } from "@reduxjs/toolkit";
import { cartReducer, Cart } from "./features/cart";
import { movieApi } from "./services/movieApi";

export type StoreState = { cart: Cart };

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        [movieApi.reducerPath]: movieApi.reducer
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([movieApi.middleware])
});

console.log(store.getState());
