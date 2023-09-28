import React from "react";

const CartSummary = ({ cartData }) => {
  if (!cartData || cartData.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  console.log(cartData, "nbjkkjbkj");

  const total = cartData.reduce((acc, item) => acc + item.cart_item.price, 0);
  const discount = 0; // You can calculate the discount here
  const subtotal = total - discount;

  return (
    <div className="cart-summary card bg-white">
      <div className="row mb-3">
        <div className="col-md-6">Sub Total:</div>
        <div className="col-md-6 text-md-end">
          {total.toLocaleString("en-NG", {
            style: "currency",
            currency: "NGN",
          })}
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">Discount:</div>
        <div className="col-md-6 text-md-end">
          {discount.toLocaleString("en-NG", {
            style: "currency",
            currency: "NGN",
          })}
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">Total:</div>
        <div className="col-md-6 text-md-end">
          {subtotal.toLocaleString("en-NG", {
            style: "currency",
            currency: "NGN",
          })}
        </div>
      </div>
      <div className="row">
        <button className="btn btn-primary">Checkout</button>
        <div className="col-md-12 text-md-end">
          {/* Additional content can be added here */}
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
