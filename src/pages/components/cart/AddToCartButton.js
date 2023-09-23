import React, { useState } from "react";
import { Button, InputGroup, FormControl, Tooltip } from "react-bootstrap";
import api from "@/utils/api";
import { useSelector } from "react-redux";

const AddToCartButton = ({ item }) => {
  const [showInput, setShowInput] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [carts, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const { cart } = useSelector((state) => state.cart);

  // console.log();

  const handleAddToCart = () => {
    setShowInput(true);
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleConfirm = async () => {
    setIsLoading(true);

    try {
      const response = await api.post("/order/cart_items/", {
        quantity: quantity,
        price: item?.variations[0]?.price,
        cart: cart.id,
        product: item.id,
        negotiated_price: 0,
        negotiation_status: "",
      });

      if (response.status === 200) {
        setShowInput(false);
        setShowTooltip(true);
        setCart([...carts, { ...item, quantity }]);
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
