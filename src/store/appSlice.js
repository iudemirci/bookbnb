import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expanded: false,
  currency: localStorage.getItem('currency') || 'USD',
  dateRange: null,
  guests: null,
  finalForm: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setExpanded: (state, action) => {
      state.expanded = action.payload;
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
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

export const { setExpanded, setCurrency, setDateRange, setFinalForm, setGuests } = appSlice.actions;
export default appSlice.reducer;
