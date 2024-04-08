import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";

const findItemIndex = (state, action) =>
  state.findIndex(
    (cartItem) => cartItem.productId === action.payload.productId
  );

export const fetchCartItemsData = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/carts/5");
      return response.json();
    } catch (err) {
      throw err;
    }
  }
);
console.dir(fetchCartItemsData);

const slice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    list: [],
    error: "",
  },
  reducers: {
    addCartItem(state, action) {
      const existingItemIndex = findItemIndex(state.list, action);
      if (existingItemIndex !== -1) state.list[existingItemIndex].quantity += 1;
      else state.list.push({ ...action.payload, quantity: 1 });
    },
    removeCartItem(state, action) {
      const existingItemIndex = findItemIndex(state.list, action);
      state.list.splice(existingItemIndex, 1);
    },
    increaseCartItemQuantity(state, action) {
      const existingItemIndex = findItemIndex(state.list, action);
      state.list[existingItemIndex].quantity += 1;
    },
    decreaseCartItemQuantity(state, action) {
      const existingItemIndex = findItemIndex(state.list, action);
      state.list[existingItemIndex].quantity -= 1;
      if (state.list[existingItemIndex].quantity === 0)
        state.list.splice(existingItemIndex, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItemsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartItemsData.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.products;
      })
      .addCase(fetchCartItemsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "something is wrong";
      });
  },
});

export const getCartItems = ({ products, cartItems }) => {
  return cartItems.list
    .map(({ productId, quantity }) => {
      let cartProduct = products.list.find(
        (product) => product.id === productId
      );
      return { ...cartProduct, quantity };
    })
    .filter(({ title }) => title);
};
export const getAllCartItems = createSelector(
  getCartItems,
  (cartItems) => cartItems
);
export const getCartErrorState = (state) => state.cartItems.error;
export const getCartLoadingState = (state) => state.cartItems.loading;

export const {
  addCartItem,
  removeCartItem,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
} = slice.actions;

export default slice.reducer;

// fetchCartitems(state) {
//   state.loading = true;
// },
// fetchCartitemError(state, action) {
//   state.loading = false;
//   state.error = action.payload || "something went wrong";
// },
// LoadCartitems(state, action) {
//   state.loading = false;
//   state.list = action.payload.products;
// },

// const { fetchCartitems, fetchCartitemError, LoadCartitems } = slice.actions;
// //thunk action creator
// export const fetchCartItemsData = () => (dispatch) => {
//   dispatch(fetchCartitems());
//   fetch("https://fakestoreapi.com/carts/5")
//     .then((res) => res.json())
//     .then((data) => {
//       dispatch(LoadCartitems(data));
//     })
//     .catch(() => {
//       dispatch(fetchCartitemError());
//     });
// };
