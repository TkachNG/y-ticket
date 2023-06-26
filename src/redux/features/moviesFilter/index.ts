import { createSlice } from "@reduxjs/toolkit";

export interface Filter {
  name: string,
  genre: string,
  cinema: string,
}

const initialState = {
  name: '',
  genre: '',
  cinema: '',
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    setName: (state: Filter, { payload }) => {
      state.name = payload;
    },
    setGenre: (state: Filter, { payload }) => {
      state.genre = payload;
    },
    setCinema: (state: Filter, { payload }) => {
      state.cinema = payload;
    },
  }
});

export const filterReducer = filterSlice.reducer;
export const filterActions = filterSlice.actions;
