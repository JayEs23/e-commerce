import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AddToCartButton from './cart/AddToCartButton';
import Bargain from './product/Bargain';

const SearchItemCard = ({ product, cartData }) => {
  if (!product) {
    return <div>No product details available.</div>;
  }
  
  const {
    product_name,
    description,
    product_price,
    primary_image,
    id,
  } = product;

  const slug = id;

  return (
    <div className="col-md-4 mb-4">
      <div className="card card-full border-0 mb-4">
        {/* Wrap the card header in a Link */}
        <Link href={`/products/${slug}`} className="card-image">
          <div className="card-header position-relative overflow-hidden bg-transparent p-0">
            <Image className="card-img-top w-100 border-0" style={{height:"210px",objectFit:"contain"}} src={primary_image} loading="lazy" width={100} height={100} alt={product_name} />
          </div>
        </Link>
        <div className="card-body text-left p-4">
          <h5 className="card-title text-truncate font-sm mb-3">{product_name}</h5>
          <div className="card-author mb-1 d-flex align-items-center">
              <div className="d-flex justify-content-left">
                <p className="text-truncate">{description}</p>
              </div>
          </div>
          <div className="row d-flex justify-content-between mt-4 d-flex">
            <div className="col-3">
              <svg width="75" height="24" viewBox="0 0 75 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Group 1000001535">
                  <circle id="Ellipse 130" cx="12" cy="12" r="12" fill="blue" />
                  <circle id="Ellipse 131" cx="29" cy="12" r="12" fill="#C62020" />
                  <circle id="Ellipse 132" cx="46" cy="12" r="12" fill="#D67F3B" />
                  <circle id="Ellipse 133" cx="63" cy="12" r="12" fill="#626A41" />
                </g>
              </svg>
            </div>
            <div className="col-7">
              <span className="text-primary justify-content-end font-sm p-0 text-nowrap">
                {parseFloat(product_price).toLocaleString("en-NG", { style: "currency", currency: "NGN" })}
              </span>
            </div>
            
           
          </div>
          
          
        </div>
        <div className="row mt-4">
        <Bargain product={product} cart={cartData}/>
        {/* <AddToCartButton item={product} /> */}
         
        </div>
      </div>
    </div>
  );
};

export default SearchItemCard;
