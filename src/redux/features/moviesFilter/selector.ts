import type { StoreState } from '../../store'

export const selectCartModule = (state: StoreState) => state.filter;

export const getName = (state: StoreState): string => {
  return selectCartModule(state).name
};
export const getCinema = (state: StoreState): string => {
  return selectCartModule(state).cinema
};
export const getGenre = (state: StoreState): string => {
  return selectCartModule(state).genre
};
