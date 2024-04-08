import productsReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";
import wishListReducer from "./slices/wishListSlice";
import { configureStore } from "@reduxjs/toolkit";
import { apiMiddleware } from "./middleware/api";
import { func } from "./middleware/func.jsx";
import { logger } from "./middleware/logger.jsx";
export const store = configureStore({
  reducer: {
    products: productsReducer,
    cartItems: cartReducer,
    wishList: wishListReducer,
  },
  //this how can we use default middleware and our coutom middle at the one time
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
});
