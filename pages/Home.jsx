import React from "react";
import { useSelector } from "react-redux";
import Product from "../components/Product";
import {
  getProductErrorState,
  getProductLoadingState,
  geaAllProduct,
} from "../store/slices/productsSlice.jsx";
export default function Home() {
  const productsList = useSelector(geaAllProduct);
  const isLoading = useSelector(getProductLoadingState);
  const isError = useSelector(getProductErrorState);

  return isLoading ? (
    <h1>Loading...</h1>
  ) : isError ? (
    <h1>Error fetching data. Please try again later.</h1>
  ) : (
    <div className="products-container">
      {productsList.map(({ id, title, rating, price, image }) => (
        <Product
          key={id}
          productId={id}
          title={title}
          rating={rating.rate}
          price={price}
          imageUrl={image}
        />
      ))}
    </div>
  );
}
