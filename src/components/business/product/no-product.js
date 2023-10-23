import React from "react";

const NoProduct = () => {
  return (
    <div className="product-container">
      <div className="no-product-image-container">
        <img src="/assets/images/business/NoItemsCart.png" alt="" />
      </div>
      <p>Oops! You do not have any product on display.</p>
      <button>+ Add product</button>
    </div>
  );
};

export default NoProduct;
