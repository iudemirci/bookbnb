import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  session: null,
  isPending: true,
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.session = action.payload.session;
      state.isPending = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.session = null;
      state.isPending = false;
    },
    setPending: (state, action) => {
      state.isPending = action.payload;
    },
  },
});

export const { setUser, clearUser, setPending } = authSlice.actions;
export default authSlice.reducer;
