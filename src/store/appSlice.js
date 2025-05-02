import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currency: localStorage.getItem('currency') || 'USD',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});

export const { setCurrency } = appSlice.actions;
export default appSlice.reducer;
