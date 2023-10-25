import React from "react";
import Link from "next/link";
import Image from "next/image";
import WishlistButton from "./WishListButton";
import { ColorCircles } from "./product/ColorVarient";

const ProductCard = ({
  product,
  inWishlist,
  onToggleWishlist,
  handleLoginModalOpen,
  isAuthenticated,
}) => {
  if (!product) {
    return null; //
  }

  const { product_name, description, images, variations } = product;
  const slug = product.id;
  const primary_image = images[0]?.image ?? "../product.png";
  const main_price = variations[0]?.price ?? "";

  // const colors = variations.reduce((acc, variation) => {
  //   if (!acc.includes(variation.color_name)) {
  //     const red = parseInt(variation.color_name.slice(4, 6), 16); // 03 in hexadecimal to decimal
  //     const green = parseInt(variation.color_name.slice(6, 8), 16); // 2c in hexadecimal to decimal
  //     const blue = parseInt(variation.color_name.slice(8, 10), 16); // 13 in hexadecimal to decimal

  //     // Create an RGB color string
  //     const rgbColor = `rgb(${red}, ${green}, ${blue})`;
  //     acc.push(rgbColor);
  //   }
  //   return acc;
  // }, []);

  // const ColorCircles = ({ colors }) => {
  //   return (
  //     <svg
  //       width="75"
  //       height="24"
  //       viewBox="0 0 75 24"
  //       fill="none"
  //       xmlns="http://www.w3.org/2000/svg"
  //     >
  //       <g id="Group 1000001535">
  //         {colors.map((color, index) => (
  //           <circle
  //             key={index}
  //             cx={index * 17 + 12}
  //             cy="12"
  //             r="12"
  //             fill={color}
  //           />
  //         ))}
  //       </g>
  //     </svg>
  //   );
  // };

  return (
    <div className="product-card pb-1">
      <div className="card product-item border-0 mb-4 p-2">
        <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
          <WishlistButton
            product={product}
            inWishlist={inWishlist}
            onToggleWishlist={onToggleWishlist}
            handleLoginModalOpen={handleLoginModalOpen}
          />
          {/* TODO: Refactor this section */}

          <Link href={`/products/${slug}`}>
            <img
              className="img-fluid w-100 h-300"
              src={`${primary_image}`}
              width={100}
              height={100}
              alt=""
              loading="lazy"
            />
          </Link>
        </div>

        <div className="card-body border-left border-right text-left pl-1 pt-4 pb-1">
          <h6 className="text-truncate mb-3">{product_name}</h6>
          <div className="d-flex justify-content-left h-50">
            <p className="truncate-text">{description}</p>
          </div>
        </div>
        <div className="d-flex justify-content-between bg-white mx-2 my-2">
          <div className="card-price-wrap d-flex align-items-center justify-content-sm-between mb-3 mt-2 w-100">
            <div className="me-5 me-sm-2">
              <ColorCircles variations={variations} />
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
      </div>
    </div>
  );
};

export default ProductCard;
