import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLanguageAndCurrencyOpen: false,
  isSignupOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIsLanguageAndCurrencyOpen: (state) => {
      state.isLanguageAndCurrencyOpen = !state.isLanguageAndCurrencyOpen;
    },
    setIsSignupOpen: (state) => {
      state.isSignupOpen = !state.isSignupOpen;
    },
  },
});

export const { setIsLanguageAndCurrencyOpen, setIsSignupOpen } =
  modalSlice.actions;
export default modalSlice.reducer;
