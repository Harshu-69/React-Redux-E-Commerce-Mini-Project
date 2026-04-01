import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    loadProducts: (state, action) => {
      state.products= action.payload;
    },

    deleteProducts: (state, action) => {
      state.products = [];
    },
  },
});

export const { loadProducts, deleteProducts } = productSlice.actions;
export default productSlice.reducer;