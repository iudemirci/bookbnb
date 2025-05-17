import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedKeys: [],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setSelectedKeys: (state, action) => {
      state.selectedKeys = action.payload;
    },
  },
});

export const { setSelectedKeys } = dashboardSlice.actions;
export default dashboardSlice.reducer;
