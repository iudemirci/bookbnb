import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLanguageAndCurrencyOpen: false,
  languageAndCurrencyTab: '1',
  isSignupOpen: false,
  isLoginOpen: false,
  isBookBnbOpen: false,
  isConfirmationOpen: false,
  isMobileSearchOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setIsLanguageAndCurrencyOpen: (state, action) => {
      state.isLanguageAndCurrencyOpen = !state.isLanguageAndCurrencyOpen;
      state.languageAndCurrencyTab = action.payload;
    },
    setLanguageAndCurrencyTab: (state, action) => {
      state.languageAndCurrencyTab = action.payload;
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
    setIsConfirmationOpen: (state) => {
      state.isConfirmationOpen = !state.isConfirmationOpen;
    },
    setIsMobileSearchOpen: (state) => {
      state.isMobileSearchOpen = !state.isMobileSearchOpen;
    },
  },
});

export const {
  setIsLanguageAndCurrencyOpen,
  setLanguageAndCurrencyTab,
  setIsSignupOpen,
  setIsLoginOpen,
  setIsBookBnbOpen,
  setIsConfirmationOpen,
  setIsMobileSearchOpen,
} = modalSlice.actions;
export default modalSlice.reducer;
