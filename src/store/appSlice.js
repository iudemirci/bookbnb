import { createSlice } from '@reduxjs/toolkit';
import { categories } from '../data/categories.js';

const initialState = {
  currency: localStorage.getItem('currency') || 'USD',
  category: categories[0].key,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { setCurrency, setCategory } = appSlice.actions;
export default appSlice.reducer;
