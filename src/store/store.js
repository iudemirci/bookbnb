import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice.js";
import authReducer from "./authSlice.js";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: authReducer,
  },
});

export default store;
