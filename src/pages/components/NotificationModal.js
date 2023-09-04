import React, { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import apiConfig from "@/utils/apiConfig";
import axios from "axios";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const NotificationModal = () => {
  const { isAuthenticated, login } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const data = useSession();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");


  const handleModalOpen = () => {
    alert("nna");
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };


  return (
    <>
      {/* Button to open the login modal */}
    <a
        href="#"
        className="icon-btn"
        title=""
        onClick={handleModalOpen}
    >
        <span>
        <em className="ni ni-bell icon"></em>
        </span>
    </a>

      {/* Login Modal */}
      {showModal && (
        <div
          className="modal d-sm-block"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">Notification</h3>
                <button
                  type="button"
                  className="btn-close icon-btn"
                  onClick={handleModalClose}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationModal;
