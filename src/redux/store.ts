import { configureStore } from "@reduxjs/toolkit";
import { Cart, cartReducer } from "./features/cart";
import { movieApi } from "./services/movieApi";
import { Filter, filterReducer } from "@/redux/features/moviesFilter";

export type StoreState = { cart: Cart, filter: Filter };

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    filter: filterReducer,
    [movieApi.reducerPath]: movieApi.reducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([movieApi.middleware])
});
