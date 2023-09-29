import React from "react";
import Image from "next/image";
import BargainMain from "../product/BargainMain";
import { Toast } from "react-bootstrap";
const CartItem = ({
  cart,
  handleDeleteItem,
  setQuantity,
  quantity,
  showAddToCart,
}) => {
  const product = cart?.product;
  if (!product) return <p>Loading</p>;

  // console.log(cart);
  const negotiation = cart?.negotiation_status;
  const price = cart?.price;

  return (
    <div className="row cart-item bg-light mb-4 p-4">
      <div className="col-md-3 image-bargain-container">
        <Image
          width={150}
          height={150}
          src={product?.images[0]?.image}
          alt={product?.product_name}
          className="img-fluid cart-item-image"
        />
        <Toast
          className="alert-bargain"
          style={{
            width: "auto",
            backgroundColor:
              negotiation === "Pending"
                ? "#F0E1DB"
                : negotiation === "Accepted"
                ? "#DFEDE3"
                : "#F2D7DC",
          }}
          show={negotiation !== "None"}
          // onClose={() => setShowToast(false)}
          // delay={3000}
          autohide
        >
          <Toast.Body
            className={` text-nowrap p-1 ${
              negotiation === "Pending"
                ? "alert-bargain-pending"
                : negotiation === "Accepted"
                ? "alert-bargain-accept"
                : "alert-bargain-decline"
            }`}
          >
            {negotiation === "Pending"
              ? "Pending"
              : negotiation === "Accepted"
              ? "Accepted"
              : "Declined"}
          </Toast.Body>
        </Toast>

        {/* {negotiation === "Pending" ? (
          <div className="alert-bargain">Pending</div>
        ) : negotiation === "Accepted" ? (
          <div className="alert-bargain alert-bargain-accept">Accepted</div>
        ) : (
          negotiation === "Declined" && (
            <div className="alert-bargain alert-bargain-decline">Rejected</div>
          )
        )} */}
      </div>
      <div className="col-md-5 d-flex flex-column justify-content-between cart-item-details">
        <div>
          <h5 className="cart-item-title">{product?.product_name}</h5>
          <p className="cart-item-description text-wrap">
            {product?.description}
          </p>
        </div>
        <p className="cart-item-amount">₦{cart?.price}</p>
      </div>
      <div className="col-md-2 d-flex align-items-center cart-item-quantity">
        <input
          type="number"
          value={cart?.quantity}
          min="1"
          className="form-control"
        />
      </div>
      <div className="col-md-2 d-flex flex-column justify-content-right align-items-end cart-item-actions">
        <button
          className="btn text-nowrap mb-2"
          onClick={() => handleDeleteItem(cart?.id)}
        >
          <i className="ni ni-trash-empty"></i> Remove
        </button>
        {/* <button
          className="btn btn-primary mb-4"
          disabled={negotiation === "Pending" || negotiation === "Accepted"}
        > */}
        <BargainMain
          product={product}
          setQuantity={setQuantity}
          quantity={cart.quantity}
          price={price}
          showAddToCart={false}
          negotiation={negotiation}
        />
        {/* </button> */}
        <button className="btn btn-outline text-nowrap mt-4">
          <i className="ni ni-call"></i> Call Seller
        </button>
      </div>
    </div>
  );
};

export default CartItem;
