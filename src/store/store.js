import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalSlice.js';
import authReducer from './authSlice.js';
import appReducer from './appSlice.js';
import bookbnbReducer from './bookbnbSlice.js';

const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: authReducer,
    app: appReducer,
    bookbnb: bookbnbReducer,
  },
});

export default store;
