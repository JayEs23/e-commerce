import React, { useState } from 'react';
import { Button, InputGroup, FormControl, Spinner } from 'react-bootstrap';

const Bargain = ({ product }) => {
  const [bargainMode, setBargainMode] = useState(false);
  const [bargainAmount, setBargainAmount] = useState('');
  const [isBargaining, setIsBargaining] = useState(false);

  const handleBargainButtonClick = () => {
    setBargainMode(true);
  };

  const handleBargainAmountChange = (event) => {
    setBargainAmount(event.target.value);
  };

  const handleSendBargain = () => {
    setIsBargaining(true);

    // Simulate API call delay
    setTimeout(() => {
      // Replace this with your actual API call logic
      sendBargainRequest(product.id, bargainAmount)
        .then(() => {
          setIsBargaining(false);
          setBargainMode(false);
          setBargainAmount('');
        })
        .catch((error) => {
          console.error('Error sending bargain request:', error);
          setIsBargaining(false);
        });
    }, 2000);
  };

  return (
    <div className="col-md-12 bargain-container px-4">
      {bargainMode ? (
        <div className="bargain-input">
          {isBargaining ? (
            <Button variant="secondary-outline" disabled>
              Bargaining <Spinner animation="border" size="sm" />
            </Button>
          ) : (
            <>
              <InputGroup>
                <FormControl
                  type="number"
                  placeholder="Bargain amount"
                  value={bargainAmount}
                  onChange={handleBargainAmountChange}
                />
                <Button variant="primary-outline" onClick={handleSendBargain}>
                  Send
                </Button>
              </InputGroup>
            </>
          )}
        </div>
      ) : (
        <Button variant="secondary" className="btn-primary-50 w-100 text-sm" onClick={handleBargainButtonClick}>
          Bargain
        </Button>
      )}
    </div>
  );
};

export default Bargain;

const sendBargainRequest = (productId, amount) => {
  return new Promise((resolve, reject) => {
    // Replace this with your actual API call logic
    setTimeout(() => {
      // Simulate success response
      const success = Math.random() < 0.8; // 80% success rate
      if (success) {
        resolve();
      } else {
        reject(new Error('Failed to send bargain request.'));
      }
    }, 1500);
  });
};
