import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ProductCard = ({ product }) => {
  // Check if the product is defined before destructuring its properties
  if (!product) {
    return null; // You can render a placeholder or loading state here if needed
  }

  const { name, description, price, id } = product;
  const slug = product.id;
  return (
    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
      <div className="card product-item border-0 mb-4">
        {/* Wrap the card header in a Link */}
        <Link href={`/products/${slug}`}>
          <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
            <Image className="img-fluid w-100 h-300" src="/product.png" width={100} height={100} alt="" loading="lazy" />
          </div>
        </Link>
        <div className="card-body border-left border-right text-left pl-1 pt-4 pb-1">
          <h6 className="text-truncate mb-3">{name}</h6>
          <div className="d-flex justify-content-left">
            <p>{description}</p>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-between bg-white">
          {/* Replace this SVG with your specific logic */}
          <svg width="75" height="24" viewBox="0 0 75 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Group 1000001535">
              <circle id="Ellipse 130" cx="12" cy="12" r="12" fill="#58C1D5" />
              <circle id="Ellipse 131" cx="29" cy="12" r="12" fill="#C62020" />
              <circle id="Ellipse 132" cx="46" cy="12" r="12" fill="#D67F3B" />
              <circle id="Ellipse 133" cx="63" cy="12" r="12" fill="#626A41" />
            </g>
          </svg>

          {/* Display the price with the Naira symbol using toLocaleString */}
          <span className="text-dark p-0">
            {price.toLocaleString("en-NG", { style: "currency", currency: "NGN" })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
