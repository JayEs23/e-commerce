import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AddToCartButton from './cart/AddToCartButton';
import Bargain from './product/Bargain';

const SearchItemCard = ({ product }) => {
  const {
    product_name,
    description,
    product_price,
    primary_image,
    id,
  } = product;

  const slug = id;

  return (
    <div className="col-lg-4 col-md-6 col-sm-6">
      <div className="card product-item border-0 mb-4">
        {/* Wrap the card header in a Link */}
        <Link href={`/products/${slug}`}>
          <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
            <Image className="img-fluid w-100 h-200" src={primary_image} width={100} height={100} alt={product_name} loading="lazy" />
          </div>
        </Link>
        <div className="card-body border-left border-right text-left pl-1 pt-4 pb-1">
          <div className="row">
              <h6 className="text-truncate mb-3">{product_name}</h6>
              <div className="d-flex justify-content-left">
                <p className="text-truncate">{description}</p>
              </div>
          </div>
          <div className="row d-flex justify-content-between mt-4 d-flex">
            <div className="col-3">
              <svg width="75" height="24" viewBox="0 0 75 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Group 1000001535">
                  <circle id="Ellipse 130" cx="12" cy="12" r="12" fill="#58C1D5" />
                  <circle id="Ellipse 131" cx="29" cy="12" r="12" fill="#C62020" />
                  <circle id="Ellipse 132" cx="46" cy="12" r="12" fill="#D67F3B" />
                  <circle id="Ellipse 133" cx="63" cy="12" r="12" fill="#626A41" />
                </g>
              </svg>
            </div>
            <div className="col-8">
              <span className="text-primary justify-content-right p-0 text-nowrap">
                {parseFloat(product_price).toLocaleString("en-NG", { style: "currency", currency: "NGN" })}
              </span>
            </div>
            
           
          </div>
          
          
        </div>
        <div className="row mt-4">
        <Bargain product={product} />
        <AddToCartButton item={product} />
          {/* <div className="row mt-2 p-0 mx-auto">
            <AddToCartButton item={product} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SearchItemCard;
