import React from "react";
import CartItem from "../components/CartItem";
import { useSelector } from "react-redux";

export default function Cart() {
  const cartItems = useSelector(({ products, cartItems }) => {
    return cartItems.list
      .map(({ productId, quantity }) => {
        let cartProduct = products.list.find(
          (product) => product.id === productId
        );
        return { ...cartProduct, quantity };
      })
      .filter(({ title }) => title);
  });
  let isLoading = useSelector((state) => state.cartItems.loading);
  let isError = useSelector((state) => state.cartItems.error);
  console.log(isError);

  return isError ? (
    <h1>Error fetching data. Please try again later.</h1>
  ) : (
    <div className="cart-container">
      <h2>Items in Your Cart</h2>
      <div className="cart-items-container">
        <div className="cart-header cart-item-container">
          <div className="cart-item">Item</div>
          <div className="item-price">Price</div>
          <div className="quantity">Quantity</div>
          <div className="total">Total</div>
        </div>
        {isLoading ? (
          <h1>Loading....</h1>
        ) : (
          cartItems.map((cartItem) => {
            if (!cartItem) return null;

            const { id, title, rating, price, image, quantity } = cartItem;
            return (
              <CartItem
                key={id}
                productId={id}
                title={title}
                price={price}
                quantity={quantity}
                imageUrl={image}
                rating={rating.rate}
              />
            );
          })
        )}
        <div className="cart-header cart-item-container">
          <div></div>
          <div></div>
          <div></div>
          <div className="total">
            $
            {cartItems.reduce(
              (accumulator, currentItem) =>
                accumulator +
                (currentItem?.quantity || 0) * (currentItem?.price || 0), // Safely access quantity and price
              0
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
