import React, { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import apiConfig from "@/utils/apiConfig";
import api from "@/utils/api";
import axios from "axios";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const NotificationModal = () => {
  const { isAuthenticated, login } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const data = useSession();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");


  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const fetchNotification = async() => {
    if(!isAuthenticated) return false;
    try {
      const response = await api.get(`notification/user_notifications/`);
      const data = await response.data;
      console.log("Notification", data);
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }


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
        <span 
          class="badge bg-primary"
          style={{
            position:"absolute",
            top:"20px",
            borderRadius:"30%"
          }}
        >0</span>
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
                <div class="card-follow d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center">
                        <a href="#" class="avatar flex-shrink-0 me-2 bg-danger-light">
                          <em className="ni ni-check-thick text-danger p-4"></em>
                        </a>
                        <div class="flex-grow-1">
                            <p class="fw-semibold fs-14 lh"><a href="#" class="text-black">Order Cancelled</a></p>
                            <span class="d-block fw-medium fs-15">Order has been Cancelled</span>
                        </div>
                    </div>
                    <button type="button" class="btn ">Now</button>
                </div>
                <div class="card-follow d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center">
                        <a href="#" class="avatar flex-shrink-0 me-2 bg-success-light">
                          <em className="ni ni-check-thick text-success p-4"></em>
                        </a>
                        <div class="flex-grow-1">
                            <p class="fw-semibold fs-14 lh"><a href="#" class="text-black">Bargain Accepted</a></p>
                            <span class="d-block fw-medium fs-15">Order has been Cancelled</span>
                        </div>
                    </div>
                    <button type="button" class="btn ">Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationModal;
