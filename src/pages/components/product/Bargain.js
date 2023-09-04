import React, { useState } from 'react';
import api from "@/utils/api";
import AddToCartButton from '../cart/AddToCartButton';
import { Toast } from 'react-bootstrap';

const Bargain = ({ product, cart }) => {
  const [bargainMode, setBargainMode] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [bargainAmount, setBargainAmount] = useState("");
  const [totalPrice, setTotalPrice] = useState(product?.product_price);
  const [showModal, setShowModal] = useState(false);
  const [showAmount, setShowAmount] = useState(null);
  const [cartData, setCartData] = useState(cart ?? []);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('success');

  const handleBargainButtonClick = () => {
    setBargainMode(true);
    setShowAmount(false);

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
    if(id == 1){
      setShowAmount(true);
    }else if(id == 2){
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
        showToast(true);
      })
      .catch((error) => {
        console.error('Error sending bargain request:', error);
      });
  };

  return (
    <><div className="col-md-12">
      {bargainMode ? (
        <div className=" row justify-content-between">
          {showAmount == false ?(<>
          <div className="col-3 mx-2 ">
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
          <div className="col-7 py-4 mx-2 justify-content-end">
            <h4 className="text-primary my-2">{parseFloat(totalPrice).toLocaleString("en-NG", { style: "currency", currency: "NGN" })}</h4>
          </div>
          <div className="col-11 mx-2">
            <button className="btn btn-primary w-100" onClick={() =>handleContinueClick(1)}>
              Continue
            </button>
          </div></>):(
            <>
            <div className="col-11 mx-2">
              <input
                type="number"
                placeholder="Bargain amount"
                className="form-control form-control-md"
                value={bargainAmount}
                onChange={handleBargainAmountChange}

              />
            </div>
            <div className="col-11 mx-2">
              <button className="btn btn-primary w-100"  data-bs-toggle="modal" data-bs-target="#confirmModal"  onClick={() =>handleContinueClick(2)}>
                Continue
              </button>
            </div>
            </>
          )}
          
          
        </div>
      ) : (
        <div className="col-lg-11 mx-0">
          <button className="btn btn-secondary btn-lg w-100 px-4" style={{minWidth:"100%", margin:"4px"}} onClick={handleBargainButtonClick}>
            Bargain
          </button>
        </div>
      )}

      {showModal &&( 
        <div class="modal d-block" id="confirmModal" tabIndex="-1" role="dialog" aria-hidden="true" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-body text-center">
                  <img src="images/thumb/exclamation-circle-solid.svg" alt="" class="mb-3" />
                  <h4 class="modal-title mb-2">Bargain !</h4>
                  <h6 class="modal-text text-danger">Are you sure you want bargain {parseFloat(bargainAmount).toLocaleString("en-NG", { style: "currency", currency: "NGN" })} for {quantity} of this product?</h6>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-info" onClick={handleCloseModal}>Cancel</button>
                <button type="button" class="btn btn-sm btn-success" onClick={handleSendBargain}>Yes, Send Bargain</button></div>
            </div>
          </div>
        </div>

      )}
       
        
    </div>
    {!bargainMode && (
      <AddToCartButton item={product} />
    )}
    
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
