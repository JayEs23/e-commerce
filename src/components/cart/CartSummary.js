import React from 'react';

const CartSummary = ({ cartData }) => {
  // Calculate total, discount, and subtotal here based on cartData
  const total = cartData.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discount = 0; // You can calculate the discount here
  const subtotal = total - discount;

  return (
    <div className="cart-summary card bg-white">
      {/* <div className="row mb-3 card-body">
        <div className="col-md-6">Total Items:</div>
        <div className="col-md-6 text-md-end">{cartData.length}</div>
      </div> */}
      <div className="row mb-3">
        <div className="col-md-6">Sub Total:</div>
        <div className="col-md-6 text-md-end">{total.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">Discount:</div>
        <div className="col-md-6 text-md-end">{discount.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">Total:</div>
        <div className="col-md-6 text-md-end">{subtotal.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</div>
      </div>
      <div className="row"><button className="btn btn-primary">Checkout</button>
        <div className="col-md-12 text-md-end">
          
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
