import React, { useState } from "react";
import useAuth from "@/hooks/useAuth";
// import { useRouter } from "next/router";
import apiConfig from "@/utils/apiConfig";
import axios from "axios";
import Link from "next/link";
import { signIn } from "next-auth/react";
import RegisterModal from "./RegisterModal";

const LoginModal = ({ showModal, setShowModal }) => {
  const [showRegistration, setShowRegistration] = useState(false);

  const { isAuthenticated, login } = useAuth();
  // const [showModal, setShowModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState("login");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const loginEndpoint = "authentication/login/";

  const loginText = isLoading ? "Logging in" : "Login";

  const contineText = isLoading ? "Loading..." : "Continue";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOtpChange = (e, index) => {
    // if (isNaN(e.value)) return false;

    setOtp([...otp.map((d, i) => (i === index ? e.value : d))]);

    if (e.nextSibling) {
      e.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (showAuthModal === "login") {
      try {
        setIsLoading(true);
        setError("");

        const response = await axios.post(
          `${apiConfig.baseURL}${loginEndpoint}`,
          formData
        );
        const token = response.data.token;
        login(token);
        window.location.reload();
        // You can redirect the user to another page after successful login if needed
      } catch (error) {
        console.log(error);
        setError("Login failed. Please check your credentials.");
      } finally {
        setIsLoading(false);
      }
    } else if (showAuthModal === "forgot") {
      try {
        setIsLoading(true);
        setError("");

        const response = await axios.post(
          `${apiConfig.baseURL}authentication/password_reset/`,
          formData
        );
        if (response?.status === 200) {
          setShowAuthModal("resetOtp");
        }
      } catch (error) {
        setError(
          "Password reset failed. Please ensure you inputed the correct email address."
        );
      } finally {
        setIsLoading(false);
      }
    } else if (showAuthModal === "resetOtp") {
      try {
        setIsLoading(true);
        setError("");

        const response = await axios.post(
          `${apiConfig.baseURL}authentication/password_reset/validate_token/`,
          {
            token: otp.join(""),
          }
        );
        if (response?.status === 200) {
          setShowAuthModal("reset");
        }
      } catch (error) {
        setError("Invalid OTP. Please ensure you inputed the correct token.");
      } finally {
        setIsLoading(false);
      }
    } else if (showAuthModal === "reset") {
      try {
        setIsLoading(true);
        setError("");

        const response = await axios.post(
          `${apiConfig.baseURL}authentication/password_reset/confirm/`,
          {
            password: formData.password,
            token: otp.join(""),
          }
        );
        if (response?.status === 200) {
          setShowAuthModal("success");
        }
      } catch (error) {
        setError("Check your password");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // const handleModalOpen = () => {
  //   setShowModal(true);
  // };

  const handleForgotPassword = () => {
    setShowAuthModal("forgot");
  };

  const handleModalClose = () => {
    setShowModal(false);
    setShowAuthModal("login");
    setError("");
    setOtp(new Array(6).fill(""));
    setFormData("");
  };

  const handleGoogleLogin = () => {
    signIn("google");
  };

  const handleFacebookLogin = () => {
    signIn("facebook");
  };

  return (
    <>
      {/* Button to open the login modal */}
      {/* <button className="icon-btn mx-4" onClick={handleModalOpen}>
        <em className="ni ni-user-c"></em>
      </button> */}

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
              <div className="modal-header pb-0">
                <h3 className="modal-title">
                  {showAuthModal === "login"
                    ? "Login to Inshopper"
                    : showAuthModal === "register"
                    ? "Sign Up to Inshopper"
                    : showAuthModal === "forgot"
                    ? "Forgot Password"
                    : showAuthModal === "reset" || showAuthModal === "resetOtp"
                    ? "Reset Password"
                    : ""}
                </h3>
                <button
                  type="button"
                  className="btn-close icon-btn"
                  onClick={handleModalClose}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {showAuthModal === "forgot" && (
                  <p className="text-black mb-4">
                    Please Enter the email associated with your <br /> account
                  </p>
                )}
                {showAuthModal === "resetOtp" && (
                  <p className="text-black mb-4">
                    Please enter the first digit code sent to <br />
                    {/* TODO:Refactor this to the person's mail */}
                    your email
                  </p>
                )}
                {showAuthModal === "reset" && (
                  <p className="text-black mb-4">
                    Your new password must be different from your <br />
                    previous password.
                  </p>
                )}

                {showAuthModal === "success" && (
                  <div className="text-center success-modal">
                    <div className="d-flex justify-content-center">
                      <div class="tick-container">
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="tick">&#10004;</div>
                      </div>
                    </div>

                    <h4>Successful</h4>
                    <p className="text-black">
                      Your password has been <br /> successfully changed
                    </p>
                    <button
                      className="btn btn-dark w-100 mt-5"
                      onClick={handleModalClose}
                    >
                      Back to Home
                    </button>
                  </div>
                )}

                {showAuthModal !== "success" &&
                  showAuthModal !== "register" && (
                    <form onSubmit={handleSubmit}>
                      {showAuthModal !== "resetOtp" &&
                        showAuthModal !== "reset" && (
                          <div className="form-group form-floating mb-4">
                            <input
                              type="text"
                              className="form-control"
                              id={
                                showAuthModal === "login" ? "username" : "email"
                              }
                              name={
                                showAuthModal === "login" ? "username" : "email"
                              }
                              placeholder="Email"
                              value={
                                showAuthModal === "login"
                                  ? formData.username
                                  : formData.email
                              }
                              onChange={handleChange}
                            />

                            <label
                              htmlFor={
                                showAuthModal === "login" ? "username" : "email"
                              }
                            >
                              Email
                            </label>
                          </div>
                        )}
                      {(showAuthModal === "login" ||
                        showAuthModal === "reset") && (
                        <div className="form-group form-floating mb-2">
                          <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder={
                              showAuthModal === "reset"
                                ? "New Password"
                                : "Password"
                            }
                            value={formData.password}
                            onChange={handleChange}
                          />
                          <label htmlFor="password">Password</label>
                        </div>
                      )}

                      {showAuthModal === "resetOtp" && (
                        <div className="form-floating mb-2 d-flex justify-content-center space-x-2">
                          {otp.map((data, i) => (
                            <input
                              type="text"
                              className="otp-field"
                              key={i}
                              value={data}
                              onChange={(e) => handleOtpChange(e.target, i)}
                              onFocus={(e) => e.target.select()}
                            />
                          ))}
                        </div>
                      )}

                      {/* <p className="text-black text-center">
                        OTP Entered - {otp.join("")}{" "}
                      </p> */}

                      {/* {showAuthModal === "reset" && (
                    <div className="form-group form-floating mb-2">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <label htmlFor="password">Password</label>
                    </div>
                  )} */}

                      {showAuthModal === "login" && (
                        <p
                          className="text-end text-black mb-4 pe-auto"
                          onClick={handleForgotPassword}
                        >
                          Forgot Password?
                        </p>
                      )}

                      {error && <p className="text-danger mb-4">{error}</p>}

                      <button
                        className="btn btn-dark w-100"
                        type="submit"
                        disabled={isLoading}
                      >
                        {showAuthModal === "login" ? loginText : contineText}
                      </button>
                    </form>
                  )}

                {/* Registration */}
                {showAuthModal === "register" && <RegisterModal />}

                {(showAuthModal === "login" ||
                  showAuthModal === "register") && (
                  <>
                    <div className="separator">OR</div>
                    <button
                      className="login-btn outline-btn btn w-100 login-google"
                      onClick={handleGoogleLogin}
                      type=""
                    >
                      <em className="ni ni-google"></em>{" "}
                      {showAuthModal === "login"
                        ? "Login with Google"
                        : "Sign up with Google"}
                    </button>

                    <button
                      className="login-btn outline-btn btn mt-3 w-100 login-facebook "
                      onClick={handleFacebookLogin}
                      type=""
                    >
                      <em className="ni ni-facebook-f"></em>{" "}
                      {showAuthModal === "login"
                        ? "Login with Facebook"
                        : "Sign up with Facebook"}
                    </button>

                    {/* <button
                    className="outline-btn btn mt-5 w-100"
                    onClick={() => signOut()}
                  >
                    Logout
                  </button> */}
                  </>
                )}

                <p className="mt-3 text-center login-text login-primary-text">
                  {showAuthModal === "login"
                    ? "Don't have an account?"
                    : "Already have an account?"}
                  <button
                    className="btn-link border-0 text-decoration-none bg-transparent login-secondary-text"
                    onClick={
                      showAuthModal === "login"
                        ? () => setShowAuthModal("register")
                        : () => setShowAuthModal("login")
                    }
                  >
                    {showAuthModal === "login" ? "Sign Up" : "Login"}
                  </button>
                </p>
              </div>
              {/* <div className="modal-footer">
                <p className="mt-3">
                  {showRegistration
                    ? "Already have an account?"
                    : "Don't have an account?"}
                  <button
                    className="btn-link"
                    onClick={
                      showRegistration
                        ? handleSwitchToLogin
                        : handleSwitchToRegistration
                    }
                    type="button"
                  >
                    {showRegistration ? "Login" : "Register"}
                  </button>
                </p>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
