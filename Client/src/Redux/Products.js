import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
const initial = {
  listProducts: [],
  loading: false,
  error: [],
};

export const productSlice = createSlice({
  name: "productSlice",
  initialState: initial,
  reducers: {
    getProducts: (state, action) => {
      state.listProducts = action.payload;
      state.loading = false;
    },
    createProduct: (state, action) => {
      state.loading = false;
      state.listProducts.push(action.payload);
    },
    deleteProduct: (state, action) => {
      state.listProducts = state.listProducts.filter(
        (del) => del._id !== action.payload,
      );
    },
    loading: (state) => {
      state.loading = true;
    },
    error: (state, action) => {
      state.error.push({
        id: nanoid(),
        message: action.payload,
      });
      state.loading = false;
    },
    removeError: (state, action) => {
      state.error = state.error.filter((err) => err.id !== action.payload);
    },
  },
});

export const {
  getProducts,
  loading,
  error,
  removeError,
  createProduct,
  deleteProduct,
} = productSlice.actions;
export default productSlice.reducer;
