import React from "react";
import Image from "next/image";
const CartItem = ({ cart, handleDeleteItem }) => {
  const product = cart.product;
  if (!product) return <p>Loading</p>;

  return (
    <div className="row cart-item bg-light mb-4 p-4">
      <div className="col-md-3">
        <Image
          width={150}
          height={150}
          src={product.images[0]?.image}
          alt={product.product_name}
          className="img-fluid cart-item-image"
        />
      </div>
      <div className="col-md-5 d-flex flex-column justify-content-between cart-item-details">
        <div>
          <h5 className="cart-item-title">{product.product_name}</h5>
          <p className="cart-item-description text-wrap">
            {product.description}
          </p>
        </div>
        <p className="cart-item-amount">₦{cart.price}</p>
      </div>
      <div className="col-md-2 d-flex align-items-center cart-item-quantity">
        <input
          type="number"
          value={cart.quantity}
          min="1"
          className="form-control"
        />
      </div>
      <div className="col-md-2 d-flex flex-column justify-content-right align-items-end cart-item-actions">
        <button
          className="btn text-nowrap mb-2"
          onClick={() => handleDeleteItem(cart.id)}
        >
          <i className="ni ni-trash-empty"></i> Remove
        </button>
        <button className="btn btn-primary mb-4">Bargain</button>
        <button className="btn btn-outline text-nowrap mt-4">
          <i className="ni ni-call"></i> Call Seller
        </button>
      </div>
    </div>
  );
};

export default CartItem;
