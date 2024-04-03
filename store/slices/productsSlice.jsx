import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    list: [],
    err: "",
  },
  reducers: {
    fetchProduct(state) {
      state.loading = true;
    },
    fetchProductError(state, action) {
      state.loading = false;
      state.err = action.payload || "something went wrong";
    },
    updateAllProducts(state, action) {
      state.loading = false;
      state.list = action.payload;
      state.err = "";
    },
  },
});
export const { updateAllProducts, fetchProduct, fetchProductError } =
  slice.actions;
export default slice.reducer;
