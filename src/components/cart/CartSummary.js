import api from "@/utils/api";
import React from "react";

const CartSummary = ({ cartData, isConfirm }) => {
  if (!cartData || cartData.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  console.log(cartData, "nbjkkjbkj");

  const handleCheckout = () => {
    // const requestData = {
    //   "order_items": [
    //     {
    //       quantity: 2147483647,
    //       price: 0,
    //       created_on: "2023-09-29T07:41:20.360Z",
    //       order: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       product: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       varient: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    //     }
    //   ],
    //   total_price: 0,
    //   order_date: "2023-09-29T07:41:20.360Z",
    //   status: "DELIVERED",
    //   created_on: "2023-09-29T07:41:20.360Z",
    //   user: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //   cart: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    // };

    api
      .post("/order/orders/")
      .then(() => {
        console.log("working");
      })
      .catch((error) => {
        console.error("Error sending bargain request:", error);
      });
  };

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
      {isConfirm && (
        <div className="row">
          <button className="btn btn-primary" onClick={handleCheckout}>
            Checkout
          </button>
          <div className="col-md-12 text-md-end">
            {/* Additional content can be added here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSummary;
