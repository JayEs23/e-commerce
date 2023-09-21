import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WishlistButton = ({ product, inWishlist, onToggleWishlist }) => {
  const [isInWishlist, setIsInWishlist] = useState(inWishlist(product?.id));
  const [showModal, setShowModal] = useState(false);

  const handleWishlistToggle = () => {
    // Show confirmation modal when adding or removing from the wishlist
    setShowModal(true);
  };

  const handleConfirm = () => {
    if (isInWishlist) {
      // Remove from wishlist
      onToggleWishlist(product?.id);
      setIsInWishlist(false);
      toast.info('Removed from wishlist');
    } else {
      // Add to wishlist
      onToggleWishlist(product?.id);
      setIsInWishlist(true);
      toast.success('Added to wishlist');
    }

    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        className={`icon-btn wishlist-button ${isInWishlist ? 'active bg-primary' : ''}`}
        onClick={handleWishlistToggle}
        title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
      >
        <em className="ni ni-heart"></em>
      </button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isInWishlist
            ? 'Are you sure you want to remove this item from your wishlist?'
            : 'Are you sure you want to add this item to your wishlist?'}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default WishlistButton;
