import React, { useState } from "react";
import {
  Button,
  InputGroup,
  FormControl,
  Tooltip,
  Modal,
} from "react-bootstrap";
import api from "@/utils/api";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "@/hooks/useAuth";
import {
  addCartItem,
  fetchCartItems,
} from "@/hooks/redux/reducers/cart/cartReducer";

const AddToCartButton = ({ item, setQuantity, quantity, price }) => {
  const [showInput, setShowInput] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [carts, setCart] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const { isAuthenticated } = useAuth();

  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.cart);

  // console.log(cart);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return false;
    }
    setShowInput(true);
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleConfirm = async () => {
    setIsLoading(true);

    try {
      const data = {
        quantity: quantity,
        price: price,
        cart: cart?.id,
        product: item?.id,
        negotiated_price: 0,
        negotiation_status: "None",
        varient: item?.variations[0]?.id,
      };
      dispatch(addCartItem(data));

      // setShowInput(false);
      // setShowTooltip(true);

      // window.location.reload();
      // setCart([...carts, { ...item, quantity }]);
      // } else {
      //   setShowTooltip(true);
      // }
    } catch (error) {
      setShowTooltip(true);
    }

    setIsLoading(false);

    setTimeout(() => {
      setShowTooltip(false);
    }, 2000);
  };

  return (
    <div className="  add-to-cart-button p-4">
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
    </div>
  );
};

export default AddToCartButton;
