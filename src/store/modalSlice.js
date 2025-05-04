import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLanguageAndCurrencyOpen: false,
  languageAndCurrencyTab: '1',
  isSignupOpen: false,
  isLoginOpen: false,
  isBookBnbOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setIsLanguageAndCurrencyOpen: (state, action) => {
      state.isLanguageAndCurrencyOpen = !state.isLanguageAndCurrencyOpen;
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
  },
});

export const { setIsLanguageAndCurrencyOpen, setIsSignupOpen, setIsLoginOpen, setIsBookBnbOpen } = modalSlice.actions;
export default modalSlice.reducer;
