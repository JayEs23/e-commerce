import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const ContactSellerModal = () => {
  const [showModal, setShowModal] = useState(false);

  const data = useSession();

  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <>
      {/* Button to open the login modal */}
      <button className="btn  mx-4" onClick={handleModalOpen}>
        <em className="ni ni-telephone"></em>
        Contact Seller
      </button>

      {/* Login Modal */}
      {showModal && (
        <div
          className="modal d-sm-block pt-70 "
          tabIndex="-1"
          role="dialog"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-md pt-4" role="document">
            <div className="modal-content p-2" style={{borderRadius:"50px !important"}}>
                <button
                  type="button"
                  className="btn-close align-item-left"
                  onClick={handleModalClose}
                >
                  <span>&times;</span>
                </button>
              {/* <div className="modal-header">
                
              </div> */}
              <div className="modal-body">
                <h5 className="modal-title w-100">Contact</h5>
                
                <p className="normal-text mt-2 mb-4">Do you want to hasten your bargain process?</p>
                  <button
                    className="btn btn-primary w-100 h-75"
                    type="button"
                  >
                    Chat Seller
                  </button>

                  <button
                    className="outline-btn btn mt-5 w-100 h-75"
                    type="button"
                  >
                    Call Seller
                  </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactSellerModal;
