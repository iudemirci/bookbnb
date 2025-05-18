import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedKeys: [],
  editingKey: '',
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setSelectedKeys: (state, action) => {
      state.selectedKeys = action.payload;
    },
    setEditingKey: (state, action) => {
      state.editingKey = action.payload;
    },
  },
});

export const { setSelectedKeys, setEditingKey } = dashboardSlice.actions;
export default dashboardSlice.reducer;
