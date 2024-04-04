import { createSlice, createSelector } from "@reduxjs/toolkit";

const findItemIndex = (state, action) =>
  state.findIndex(
    (cartItem) => cartItem.productId === action.payload.productId
  );

const slice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    list: [],
    error: "",
  },
  reducers: {
    fetchCartitems(state) {
      state.loading = true;
    },
    fetchCartitemError(state, action) {
      state.loading = false;
      state.error = action.payload || "something went wrong";
    },
    LoadCartitems(state, action) {
      state.loading = false;
      state.list = action.payload.products;
    },
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
export const getAllCartItems = createSelector(getCartItems, (state) => state);
export const getCartErrorState = (state) => state.cartItems.err;
export const getCartLoadingState = (state) => state.cartItems.loading;

export const {
  addCartItem,
  removeCartItem,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  LoadCartitems,
  fetchCartitems,
  fetchCartitemError,
} = slice.actions;

export default slice.reducer;
