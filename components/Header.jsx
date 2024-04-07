import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CartIcon from "../assets/cart-icon.svg";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsData } from "../store/slices/productsSlice.jsx";
import { fetchCartItemsData } from "../store/slices/cartSlice.jsx";
import { fetchData } from "../store/middleware/api.jsx";
export default function Header() {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(
    //   fetchData({
    //     url: "products",
    //     onStart: fetchProduct.type,
    //     onSuccess: updateAllProducts.type,
    //     onError: fetchProductError.type,
    //   })
    // );
    dispatch(fetchProductsData());
    dispatch(fetchCartItemsData());

    // dispatch(
    //   fetchData({
    //     url: "carts/5",
    //     onStart: fetchCartitems.type,
    //     onSuccess: LoadCartitems.type,
    //     onError: fetchCartitemError.type,
    //   })
    // );
  }, []);

  const cartItems = useSelector((state) => state.cartItems.list);
  return (
    <header>
      <div className="header-contents">
        <h1>
          <Link to="/">Shopee</Link>
        </h1>
        <Link className="cart-icon" to="/cart">
          <img src={CartIcon} alt="cart-icon" />
          <div className="cart-items-count">
            {cartItems.reduce(
              (accumulator, currentItem) => accumulator + currentItem.quantity,
              0
            )}
          </div>
        </Link>
      </div>
    </header>
  );
}
