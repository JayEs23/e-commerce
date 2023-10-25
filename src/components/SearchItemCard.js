import React from "react";
import Link from "next/link";
import Image from "next/image";
import AddToCartButton from "./cart/AddToCartButton";
import Bargain from "./product/Bargain";
import BargainMain from "./product/BargainMain";

const SearchItemCard = ({ product, cartData, setQuantity }) => {
  if (!product) {
    return <div>No product details available.</div>;
  }
  const variations = product?.variations || [];

  const { product_name, description, images } = product;

  const slug = product.id;
  const primary_image = images[0]?.image;
  const main_price = variations[0]?.price ?? "";

  const colors = variations.reduce((acc, variation) => {
    if (!acc.includes(variation.color_name)) {
      const red = parseInt(variation.color_name.slice(4, 6), 16); // 03 in hexadecimal to decimal
      const green = parseInt(variation.color_name.slice(6, 8), 16); // 2c in hexadecimal to decimal
      const blue = parseInt(variation.color_name.slice(8, 10), 16); // 13 in hexadecimal to decimal

      // Create an RGB color string
      const rgbColor = `rgb(${red}, ${green}, ${blue})`;
      acc.push(rgbColor);
    }
    return acc;
  }, []);

  const prices = variations.reduce((acc, variation) => {
    if (!acc.includes(variation.price)) {
      acc.push(variation.price);
    }
    return acc;
  }, []);

  const ColorCircles = ({ colors }) => {
    return (
      <svg
        width="75"
        height="24"
        viewBox="0 0 75 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Group 1000001535">
          {colors.map((color, index) => (
            <circle
              key={index}
              cx={index * 17 + 12}
              cy="12"
              r="12"
              fill={color}
            />
          ))}
        </g>
      </svg>
    );
  };

  console.log("Colors", colors);
  return (
    <div className="col-xl-4 col-lg-4 col-sm-6 my-2">
      <div className="card card-full shadow">
        {/* Wrap the card header in a Link */}
        <Link href={`/products/${slug}`} className="card-image">
          <div className="card-header position-relative overflow-hidden bg-transparent p-0">
            <Image
              className="card-img-top w-100 border-0"
              style={{ height: "250px", objectFit: "fill" }}
              src={primary_image}
              loading="lazy"
              width={100}
              height={100}
              alt={product_name}
            />
          </div>
        </Link>
        <div className="card-body text-left m-2">
          <h5 className="card-title text-truncate font-sm mb-3">
            {product_name}
          </h5>
          <div className="card-author mb-1 d-flex align-items-center">
            <div className="d-flex justify-content-left">
              <p className="truncate-text">{description}</p>
            </div>
          </div>
          <div className="card-price-wrap d-flex align-items-center justify-content-sm-between mb-3 mt-2">
            <div className="me-5 me-sm-2">
              <ColorCircles colors={colors} />
            </div>
            <div className="text-sm-end">
              <span className="card-price-number">
                {parseFloat(main_price).toLocaleString("en-NG", {
                  style: "currency",
                  currency: "NGN",
                })}
              </span>
            </div>
          </div>
        </div>
        <div className="row ">
          <BargainMain
            product={product}
            cart={cartData}
            setQuantity={setQuantity}
            quantity={cartData.quantity}
            price={prices}
            showAddToCart={true}
            isSearchBargain={true}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchItemCard;
