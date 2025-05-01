import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  session: null,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.session = action.payload.session;
    },
    clearUser: (state) => {
      state.user = null;
      state.session = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
