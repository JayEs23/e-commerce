import React from "react";
import Link from "next/link";
import Image from "next/image";
import WishlistButton from "./product/WishListButton";

const ProductCard = ({ product, inWishlist, onToggleWishlist }) => {
  if (!product) {
    return null; //
  }

  const { product_name, description, product_price, id, image_one } = product;
  const slug = product.id;

  return (
    <div className="col-lg-3 col-md-2 col-sm-6 pb-1">
      <div className="card product-item border-0 mb-4 p-2">
        <Link href={`/products/${slug}`}>
          <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
            <img
              className="img-fluid w-100 h-300"
              src={`${image_one}`}
              width={100}
              height={100}
              alt=""
              loading="lazy"
            />
          </div>
        </Link>
        <div className="card-body border-left border-right text-left pl-1 pt-4 pb-1">
          <h6 className="text-truncate mb-3">{product_name}</h6>
          <div className="d-flex justify-content-left h-50">
            <p className="truncate-text">{description}</p>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-between bg-white">
          {/* Add the WishlistButton component */}
          <WishlistButton
            product={product}
            inWishlist={inWishlist}
            onToggleWishlist={onToggleWishlist}
          />

          {/* <span className="text-dark p-0">
            {product_price.toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
            })}
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
