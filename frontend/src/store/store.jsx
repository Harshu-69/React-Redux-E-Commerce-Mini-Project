import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userReducer";
import productSlice from "./reducers/productReducer";

export const store = configureStore({
  reducer: {
    userReducer: userSlice,
    productReducer: productSlice,
  },
});
