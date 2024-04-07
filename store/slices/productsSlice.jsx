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
export const geaAllProduct = (state) => state.products.list;
export const getProductErrorState = (state) => state.products.err;
export const getProductLoadingState = (state) => state.products.loading;

const { updateAllProducts, fetchProduct, fetchProductError } = slice.actions;
//redux thunk creator
export const fetchProductsData = () => (dispatch) => {
  dispatch(fetchProduct());
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => dispatch(updateAllProducts(data)))
    .catch(() => dispatch(fetchProductError()));
};

export default slice.reducer;
