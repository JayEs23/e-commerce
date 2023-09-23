import React, { useState } from "react";
import { Button, InputGroup, FormControl, Tooltip } from "react-bootstrap";
import api from "@/utils/api";

const AddToCartButton = ({ item }) => {
  const [showInput, setShowInput] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = () => {
    setShowInput(true);
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleConfirm = async () => {
    setIsLoading(true);

    try {
      const response = await api.post("/order/cart/", {
        productId: item.id,
        quantity: quantity,
      });

      if (response.status === 200) {
        setShowInput(false);
        setShowTooltip(true);
        setCart([...cart, { ...item, quantity }]);
      } else {
        setShowTooltip(true);
      }
    } catch (error) {
      setShowTooltip(true);
    }

    setIsLoading(false);

    setTimeout(() => {
      setShowTooltip(false);
    }, 2000);
  };

  return (
    <div className="col-md-12 add-to-cart-button p-4">
      {showInput ? (
        <div className="d-flex">
          <InputGroup>
            <FormControl
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
            />
            <Button
              className="btn btn-success"
              onClick={handleConfirm}
              variant="success"
            >
              {isLoading ? "Adding..." : "Confirm"}
            </Button>
          </InputGroup>
        </div>
      ) : (
        <Button
          className="btn btn-primary btn-lg w-100 px-2"
          onClick={handleAddToCart}
          variant="primary"
        >
          Add to Cart
        </Button>
      )}
      <Tooltip show={showTooltip} placement="bottom">
        {showTooltip
          ? isLoading
            ? "Adding..."
            : "Error adding item to cart!"
          : "Item added to cart!"}
      </Tooltip>
    </div>
  );
};

export default AddToCartButton;
