import type { StoreState } from '../../store'

export const selectCartModule = (state: StoreState) => state.cart;

export const selectProductAmount = (state: StoreState, id: string): number => {
  return selectCartModule(state)[id] || 0
};

export const selectTotalProductAmount = (state: StoreState): number => {

  let sum = 0;

  for (const productId in selectCartModule(state)) {
    sum += selectCartModule(state)[productId];
  }

  return sum;
};

export const selectProductsIds = (state: StoreState): string[] => {
  return Object.keys(selectCartModule(state));
};
