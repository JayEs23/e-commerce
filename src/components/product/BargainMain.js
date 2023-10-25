import React, { useState } from "react";
import api from "@/utils/api";
import AddToCartButton from "../cart/AddToCartButton";
import { Toast, ToastContainer, Modal, Button } from "react-bootstrap";
import useAuth from "@/hooks/useAuth";
import { useSelector } from "react-redux";

const BargainMain = ({
  product,
  quantity,
  setQuantity,
  price,
  totalPrice,
  showAddToCart,
  negotiation,
  isSearchBargain,
  index,
}) => {
  const { isAuthenticated } = useAuth();
  const [bargainMode, setBargainMode] = useState(false);
  // const [quantity, setQuantity] = useState(1);
  const [bargainAmount, setBargainAmount] = useState("");
  // const [totalPrice, setTotalPrice] = useState(
  //   product?.variations[index]?.price
  // );
  const [showModal, setShowModal] = useState(false);
  const [showAmount, setShowAmount] = useState(null);
  const [cartData, setCartData] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("success");
  const [showAuthModal, setShowAuthModal] = useState(false); // State for authentication modal

  const cart = useSelector((state) => state.cart);

  const cardId = cart?.cart?.id;

  const handleBargainButtonClick = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return false;
    }
    setBargainMode(true);
    setShowAmount(false);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleBargainAmountChange = (event) => {
    setBargainAmount(event.target.value);
  };

  const handleContinueClick = (id) => {
    // if (id == 1) {
    //   setShowAmount(true);
    // } else

    if (id == 2) {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setBargainMode(false);
  };

  const handleSendBargain = () => {
    // Replace with your actual API call logic
    const requestData = {
      quantity: quantity,
      price: totalPrice,
      negotiated_price: bargainAmount,
      negotiation_status: parseInt(bargainAmount) > 0 ? "Pending" : "None",
      cart: cardId, // Replace with actual cart ID
      product: product?.id, // Replace with actual product ID
      varient: product?.variations[index]?.id,
    };

    api
      .post("/order/cart_items/", requestData)
      .then(() => {
        setBargainMode(false);
        setShowModal(false);
        setQuantity(1);
        setBargainAmount("");
        setShowToast(true);
      })
      .catch((error) => {
        console.error("Error sending bargain request:", error);
      });
  };

  return (
    <>
      <div className={`col-lg-12 mx-2 ${isSearchBargain ? "" : "d-flex"}`}>
        {bargainMode ? (
          <div className=" row justify-content-between">
            <div className="col-11 mx-2 my-2">
              <input
                type="number"
                placeholder="Bargain amount"
                className="form-control form-control-md"
                value={bargainAmount}
                onChange={handleBargainAmountChange}
              />
            </div>
            <div className="col-11 mx-2 my-2">
              <button
                className="btn btn-primary w-100"
                // data-bs-toggle="modal"
                // data-bs-target="#confirmModal"
                onClick={() => handleContinueClick(2)}
              >
                Continue
              </button>
            </div>
          </div>
        ) : (
          <div
            className={`${
              isSearchBargain ? "col-lg-11" : showAddToCart && "col-lg-6"
            } mx-0`}
          >
            <button
              className="btn btn-secondary btn-lg w-100 px-4"
              style={{ minWidth: "100%" }}
              onClick={handleBargainButtonClick}
              disabled={negotiation === "Pending" || negotiation === "Accepted"}
            >
              Bargain
            </button>
          </div>
        )}

        {showModal && (
          <div
            className="modal d-block"
            // id="confirmModal"
            // tabIndex="-1"
            // role="dialog"
            // aria-hidden="true"
            style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body text-center">
                  <img
                    src="/images/thumb/exclamation-circle-solid.svg"
                    alt=""
                    className="mb-3"
                  />
                  <h4 className="modal-title mb-2 text-primary">Bargain !</h4>
                  <h6 className="modal-text text-dark">
                    Bargain{" "}
                    {parseFloat(bargainAmount)?.toLocaleString("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    })}{" "}
                    for {quantity} {product?.product_name}?
                  </h6>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-primary text-light"
                    onClick={handleSendBargain}
                  >
                    Yes, Send Bargain
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {showAddToCart && !bargainMode && (
          <div
            className={`${isSearchBargain ? "col-lg-11" : "col-lg-6"}  mx-0`}
          >
            <AddToCartButton
              item={product}
              quantity={quantity}
              setQuantity={setQuantity}
              price={price}
              totalPrice={totalPrice}
              setShowToast={setShowToast}
              isSearchBargain={isSearchBargain}
              index={index}
            />
          </div>
        )}
      </div>

      <ToastContainer position={"middle-center"}>
        <Toast
          show={showToast}
          className="success-bg"
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
        >
          <Toast.Body className="text-white">
            {!bargainMode
              ? "Your cart has been successfully updated"
              : "Your bargain has been placed successfully."}
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <Modal show={showAuthModal} onHide={() => setShowAuthModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Authentication Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-primary">
            Please log in to continue the bargain process.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowAuthModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BargainMain;
