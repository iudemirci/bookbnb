import { createSlice } from '@reduxjs/toolkit';
import { categories } from '../data/categories.js';

const initialState = {
  currency: localStorage.getItem('currency') || 'USD',
  category: categories[0].key,
  dateRange: null,
  guests: null,
  finalForm: null,
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
    setFinalForm: (state, action) => {
      state.finalForm = action.payload;
    },
    setGuests: (state, action) => {
      state.guests = action.payload;
    },
  },
});

export const { setCurrency, setCategory, setDateRange, setFinalForm, setGuests } = appSlice.actions;
export default appSlice.reducer;
