import { createSlice } from "@reduxjs/toolkit";


const initial = {
  listProducts: [],
  loading: false,
  error: null,
};

export const productSlice = createSlice({
  name: "productSlice",
  initialState: initial,
  reducers: {
    getProducts: (state, action) => {
      state.listProducts = action.payload;
      state.loading = false;
    },
    loading: (state) => {
      state.loading = true;
      state.error = false;
    },
    error: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { getProducts, loading, error } = productSlice.actions;
export default productSlice.reducer;
