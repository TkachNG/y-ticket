import { createSlice } from "@reduxjs/toolkit";

export type Cart = Record<number, number>;

const initialState = {

}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        increment: (state: Cart, { payload }) => {
            const count = state[payload] || 0;
            state[payload] = count + 1;
        },
        decrement: (state: Cart, { payload }) => {
            const count = state[payload];
            if (!count) return;
            if (count === 1) {
                delete state[payload];
                return;
            }

            state[payload] = count - 1;
        },
        reset: (state: Cart, { payload }) => {
            if (payload in state) {
                delete state[payload];
            }
        }
    }
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;