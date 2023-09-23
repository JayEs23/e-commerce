import React, { useState } from 'react';
import { Toast, Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '@/hooks/useAuth';

const WishlistButton = ({ product, inWishlist, onToggleWishlist }) => {
  const [isInWishlist, setIsInWishlist] = useState(inWishlist(product?.id));
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);


  const handleWishlistToggle = () => {
    
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
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
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
        data-bs-toggle="tooltip" data-bs-placement="left" title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        
      >
        <em className="ni ni-heart"></em>
        
      </button><Toast 
        className="bg-secondary-outline dropdown-menu show" 
        style={{
          position: 'absolute',
          inset: 'auto auto 0px 0px',
          margin: '0px',
          transform: 'translate(0px, -48px)',
        }}        
        show={showToast} 
        onClose={() => setShowToast(false)} 
        delay={3000} 
        autohide>
        <Toast.Body className="text-primary text-nowrap text-success">Added to wishlist successfully.<em className="ni ni-check-circle-cut 2x"></em></Toast.Body>
      </Toast>
     
      

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
