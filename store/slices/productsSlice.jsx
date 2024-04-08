import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProductsData = createAsyncThunk(
  "product/fetchProductItems",
  async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      return response.json();
    } catch (err) {
      throw err;
    }
  }
);
console.dir(fetchProductsData);

const slice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    list: [],
    err: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsData.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProductsData.rejected, (state, action) => {
        state.loading = false;
        state.err = action.payload || "something is wrong";
      });
  },
});
export const geaAllProduct = (state) => state.products.list;
export const getProductErrorState = (state) => state.products.err;
export const getProductLoadingState = (state) => state.products.loading;

export default slice.reducer;

// const { updateAllProducts, fetchProduct, fetchProductError } = slice.actions;
// //redux thunk creator
// export const fetchProductsData = () => (dispatch) => {
//   dispatch(fetchProduct());
//   fetch("https://fakestoreapi.com/products")
//     .then((res) => res.json())
//     .then((data) => dispatch(updateAllProducts(data)))
//     .catch(() => dispatch(fetchProductError()));
// };

// fetchProduct(state) {
//   state.loading = true;
// },
// fetchProductError(state, action) {
//   state.loading = false;
//   state.err = action.payload || "something went wrong";
// },
// updateAllProducts(state, action) {
//   state.loading = false;
//   state.list = action.payload;
//   state.err = "";
// },
