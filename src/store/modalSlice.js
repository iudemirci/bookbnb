import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLanguageAndCurrencyOpen: false,
  isSignupOpen: false,
  isLoginOpen: false,
  isBookBnbOpen: false,
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
    setIsLoginOpen: (state) => {
      state.isLoginOpen = !state.isLoginOpen;
    },
    setIsBookBnbOpen: (state) => {
      state.isBookBnbOpen = !state.isBookBnbOpen;
    },
  },
});

export const {
  setIsLanguageAndCurrencyOpen,
  setIsSignupOpen,
  setIsLoginOpen,
  setIsBookBnbOpen,
} = modalSlice.actions;
export default modalSlice.reducer;
