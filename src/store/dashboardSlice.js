import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedKeys: [],
  editingKey: '',
  isMenuOpen: false,
  isSidebarCollapsed: true,
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
    setMenuOpen: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    setSidebarCollapsed: (state) => {
      state.isSidebarCollapsed = !state.isSidebarCollapsed;
    },
  },
});

export const { setSelectedKeys, setEditingKey, setMenuOpen, setSidebarCollapsed } = dashboardSlice.actions;
export default dashboardSlice.reducer;
