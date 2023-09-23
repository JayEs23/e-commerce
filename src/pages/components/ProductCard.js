import React from "react";
import Link from "next/link";
import Image from "next/image";
import WishlistButton from "./product/WishListButton";

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

  return (
    <div className="col-lg-3 col-md-2 col-sm-6 pb-1">
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
        <div className=" d-flex justify-content-between bg-white">
          {/* Add the WishlistButton component */}

          <span className="text-dark p-0">
            {parseFloat(main_price).toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
