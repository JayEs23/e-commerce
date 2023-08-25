import Image from 'next/image';
import React from 'react';

const ListCard = ({ product, showBuyButton }) => {
  if (!product) {
    return <div>No product details available.</div>;
  }
  return (
    <div className="row cart-item bg-gray">
      <div className="col-md-2">
        <Image width={150} height={150} src={product.image} alt={product.name} className="img-fluid cart-item-image border-rounded" style={{objectFit:"fill !important"}} />
      </div>
      <div className="col-md-5 d-flex flex-column justify-content-between cart-item-details mt-4">
        <div>
          <h5 className="cart-item-title">{product.name}</h5>
          <p className="cart-item-description text-wrap">{product.description}</p>
        </div>
      </div>
      <div className="col-md-2 d-flex flex-column justify-content-between align-items-end cart-item-actions">
        <button className="btn mb-2"><i className="ni ni-trash-empty"></i> <small> Remove</small></button>
        {showBuyButton ? (
          <button className="btn mb-2 btn-primary btn-sm text-nowrap"><i className="ni ni-cart"></i> Buy Now</button>
        ) : (
          <a href={`../../products/${product.id}`} className="btn text-nowrap text-right btn-outline"><i className="ni ni-eye"></i> View Item</a>
        )}
      </div>
    </div>
  );
};

export default ListCard;
