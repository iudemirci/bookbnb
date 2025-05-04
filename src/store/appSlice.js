import { createSlice } from '@reduxjs/toolkit';
import { categories } from '../data/categories.js';
import dayjs from 'dayjs';

const initialState = {
  currency: localStorage.getItem('currency') || 'USD',
  category: categories[0].key,
  dateRange: null,
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
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
  },
});

export const { setCurrency, setCategory, setDateRange } = appSlice.actions;
export default appSlice.reducer;
