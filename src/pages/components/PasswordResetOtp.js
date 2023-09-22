import React, { useState } from "react";
import apiConfig from "@/utils/apiConfig";
import axios from "axios";

const PasswordResetOtp = () => {
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setError("");

      const response = await axios.post(
        `${apiConfig.baseURL}authentication/password_reset/validate_token/`,
        formData
      );
      if (response?.status === 200) {
        setError("Valid OTP");
      }
    } catch (error) {
      setError("Invalid OTP. Please ensure you inputed the correct token.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };
  return (
    <>
      {/* Button to open the login modal */}
      <button className="icon-btn mx-4" onClick={handleModalOpen}>
        <em className="ni ni-user-c"></em>
      </button>

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
                <h3 className="modal-title">Reset Password</h3>
                <button
                  type="button"
                  className="btn-close icon-btn"
                  onClick={handleModalClose}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p className="text-black mb-4">
                  Please enter the first digit code sent to <br />{" "}
                  sample@gmail.com
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="form-group form-floating mb-4">
                    <input
                      type="text"
                      className="form-control"
                      id="token"
                      name="token"
                      placeholder="Enter OTP"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <label htmlFor="email">Enter OTP</label>
                  </div>

                  {error && <p className="text-danger mb-4">{error}</p>}
                  <button className="btn btn-dark w-100 my-5" type="submit">
                    Continue
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PasswordResetOtp;
