import React, { useState } from 'react';
import api from "@/utils/api";
import AddToCartButton from '../cart/AddToCartButton';
import { Toast } from 'react-bootstrap';

const Bargain = ({ product, cart }) => {
  const [bargainMode, setBargainMode] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [bargainAmount, setBargainAmount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(product?.product_price);
  const [showModal, setShowModal] = useState(false);
  const [showAmount, setShowAmount] = useState(null);
  const [cartData, setCartData] = useState(cart ?? []);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('success');

  const handleBargainButtonClick = () => {
    setBargainMode(true);
    setShowAmount(false);
    setShowToast(true);
    setToastType('success');


    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
    setTotalPrice(product?.product_price * newQuantity);
  };

  const handleBargainAmountChange = (event) => {
    setBargainAmount(event.target.value);
  };

  const handleContinueClick = (id) => {
    alert(id);
    if(id == 1){
      setShowAmount(true);
    }else if(id == 2){
      setShowModal(true);
    }
    
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSendBargain = () => {
    // Replace with your actual API call logic
    const requestData = {
      quantity: quantity,
      price: product?.product_price,
      negotiated_price: bargainAmount,
      negotiation_status: 'A',
      cart: cartData?.id, // Replace with actual cart ID
      product: product?.id, // Replace with actual product ID
    };

    api.post("/order/cart_items/", requestData)
      .then(() => {
        setBargainMode(false);
        setShowModal(false);
        setQuantity(1);
        setBargainAmount('');
      })
      .catch((error) => {
        console.error('Error sending bargain request:', error);
      });
  };

  return (
    <><div className="col-12 bargain-container px-4">
      {bargainMode ? (
        <div className=" row justify-content-between">
          {showAmount == false ?(<>
          <div className="col-3 mx-2 py-4">
            <input
              type="number"
              placeholder="Enter quantity"
              className="form-control form-control-md"
              value={quantity}
              inputMode="numeric"
              style={{
                appearance: 'textfield', // For Safari support
                '-moz-appearance': 'textfield', // For Firefox support
                width: '100%',
                padding: '8px',
                background: 'red !important', // Set the background color
                border: '1px solid #ccc', // Set the border style
                borderRadius: '4px', // Set the border radius
                fontSize: '14px', // Set the font size
              }}
              onChange={handleQuantityChange}
            />
          </div>
          <div className="col-7 py-4 mx-2 justify-content-end"><h4 className="text-primary my-2">{parseFloat(totalPrice).toLocaleString("en-NG", { style: "currency", currency: "NGN" })}</h4></div>
          <div className="col-11 mx-2">
            <button className="btn btn-primary w-100" onClick={() =>handleContinueClick(1)}>
              Continue
            </button>
          </div></>):(
            <>
            <div className="col-11 mx-2 my-2">
            <input
              type="number"
              placeholder="Bargain amount"
              className="form-control form-control-md"
              value={bargainAmount}
              onChange={handleBargainAmountChange}

            />
          </div>
          <div className="col-11 mx-2">
            <button className="btn btn-primary w-100" onClick={() =>handleContinueClick(2)}>
              Continue
            </button>
          </div>
            </>
          )}
          
          
        </div>
      ) : (
        <button className="btn btn-secondary btn-lg w-100 px-0 mr-4" onClick={handleBargainButtonClick}>
          Bargain
        </button>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Confirm Bargain</h4>
              <span className="close" onClick={handleCloseModal}>&times;</span>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to send this bargain request?</p>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={handleCloseModal}>Cancel</button>
              <button className="btn-send" onClick={handleSendBargain}>Send Bargain</button>
            </div>
          </div>
        </div>
      )}
    </div>
    <div className="col-12 bargain-container ">
    {showAmount == null && (
      <AddToCartButton item={product} />
    )}
    </div>
    <Toast show={showToast} className="" onClose={() => setShowToast(false)} delay={3000} autohide>
    <Toast.Header>
      <strong className="me-auto">Bargain Placed</strong>
      <button type="button" className="btn-close" onClick={() => setShowToast(false)}></button>
    </Toast.Header>
    <Toast.Body>Your bargain has been placed successfully.</Toast.Body>
  </Toast>
    </>
    
  );
};

export default Bargain;
