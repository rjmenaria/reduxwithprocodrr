import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CartIcon from "../assets/cart-icon.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  updateAllProducts,
  fetchProduct,
  fetchProductError,
} from "../store/slices/productsSlice.jsx";
import {
  LoadCartitems,
  fetchCartitems,
  fetchCartitemError,
} from "../store/slices/cartSlice.jsx";
export default function Header() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProduct());

    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((res) => dispatch(updateAllProducts(res)))
      .catch((error) => dispatch(fetchProductError()));

    dispatch(fetchCartitems());
    fetch("https://fakestoreapi.com/cabrts/5")
      .then((res) => res.json())
      .then((res) => dispatch(LoadCartitems(res)))
      .catch((error) => dispatch(fetchCartitemError(error)));
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
