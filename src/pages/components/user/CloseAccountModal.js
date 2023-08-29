import React, { useState } from 'react';
import api from '@/utils/api';

const CloseAccountModal = ({ onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCloseAccount = async () => {
    try {
      setIsSubmitting(true);
      await api.post('/authentication/close_account');
      onClose();
    } catch (error) {
      console.error('Error closing account:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal fade" id="closeAccountModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Close Account</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to close your account?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              No
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleCloseAccount}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Closing...' : 'Yes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CloseAccountModal;
