import React, { useState } from 'react';
import { Button, InputGroup, FormControl, Spinner, Modal } from 'react-bootstrap';
import api from "@/utils/api";

const Bargain = ({ product, cart }) => {
  const [bargainMode, setBargainMode] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [bargainAmount, setBargainAmount] = useState('');
  const [totalPrice, setTotalPrice] = useState(product?.product_price);
  const [isBargaining, setIsBargaining] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cartData, setCartData] = useState(cart ?? []);

  const handleBargainButtonClick = () => {
    setBargainMode(true);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
    setTotalPrice(product?.product_price * newQuantity);
  };

  const handleBargainAmountChange = (event) => {
    setBargainAmount(event.target.value);
  };

  const handleContinueClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSendBargain = () => {
    setIsBargaining(true);

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
        setIsBargaining(false);
        setBargainMode(false);
        setBargainAmount('');
        setShowModal(false);
      })
      .catch((error) => {
        console.error('Error sending bargain request:', error);
        setIsBargaining(false);
      });
  };

  return (
    <div className="col-md-12 bargain-container px-4">
      {bargainMode ? (
        <div className="bargain-input">
          <InputGroup>
            <FormControl
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </InputGroup>
          <p>Total Price: {totalPrice}</p>
          <InputGroup>
            <FormControl
              type="number"
              placeholder="Bargain amount"
              value={bargainAmount}
              onChange={handleBargainAmountChange}
            />
          </InputGroup>
          <Button variant="primary-outline" onClick={handleContinueClick}>
            Continue
          </Button>
        </div>
      ) : (
        <Button variant="secondary" className="btn-primary-50 w-100 text-sm" onClick={handleBargainButtonClick}>
          Bargain
        </Button>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Bargain</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to send this bargain request?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSendBargain}>
            Send Bargain
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Bargain;
