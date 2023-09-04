import React, { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import apiConfig from "@/utils/apiConfig";
import axios from "axios";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const LoginModal = () => {
  const { isAuthenticated, login } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const data = useSession();

  const router = useRouter();
  const loginEndpoint = "authentication/login/";

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const loginText = isLoading ? "Logging in" : "Login";

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
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleGoogleLogin = () => {
    signIn("google");
    console.log(data);
  };

  const handleFacebookLogin = () => {
    signIn("facebook");
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
                <h3 className="modal-title">Login to Inshopper</h3>
                <button
                  type="button"
                  className="btn-close icon-btn"
                  onClick={handleModalClose}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group form-floating mb-4">
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      placeholder="Username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                    <label htmlFor="username">Username</label>
                  </div>
                  <div className="form-group form-floating mb-4">
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
                  {error && <p className="text-danger mb-4">{error}</p>}
                  <button
                    className="btn btn-dark w-100"
                    type="submit"
                    disabled={isLoading}
                  >
                    {loginText}
                  </button>

                  <button
                    className="outline-btn btn mt-5 w-100"
                    onClick={handleGoogleLogin}
                    type=""
                  >
                    Login with Google
                  </button>

                  <button
                    className="outline-btn btn mt-5 w-100"
                    onClick={handleFacebookLogin}
                    type=""
                  >
                    Login with Facebook
                  </button>

                  {/* <button
                    className="outline-btn btn mt-5 w-100"
                    onClick={() => signOut()}
                  >
                    Logout
                  </button> */}
                  <p className="mt-3">
                    Don`&lsquo;`t have an account?
                    <Link href="/register" className="btn-link">
                      Register
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
