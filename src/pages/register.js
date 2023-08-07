import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import axios from 'axios';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    referral_code: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    business_name: '',
    auth_provider: 'string',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true); // Start loading
    try {
        const response = await axios.post(
          'https://inshopper.io/api/v1/authentication/register/',
          formData
        );
  
        if (response.status === 200) {
          setSuccessMessage('Registration successful!'); // Set success message
          // You can redirect the user to another page after successful registration if needed
        } else {
          setError('Registration failed. Please try again.'); // Set error message
        }
      } catch (error) {
        setError('An error occurred. Please try again.'); // Set error message
        console.error('Registration error:', error);
      }finally {
        setIsLoading(false); // Stop loading
      }
  };

  return (
    <>
      <Head>
        <title>Inshopper Ecommerce - Register</title>
      </Head>
      <div className="page-container bg-gray">
        <Navbar />
        <section className="register-section section-space-b pt-4 pt-md-5 mt-md-3">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-lg-6 mb-lg-0 d-none d-lg-block">
                <img
                  src="../../assets/images/thumb/remote.png"
                  alt=""
                  className="img-fluid"
                />
              </div>
              <div className="col-lg-6 col-md-9 bg-white p-4">
                <div className="section-head-sm">
                  <h2 className="mb-3">
                    Sign Up to <span className="text-primary">Inshopper!</span>
                  </h2>
                  <p>Fill up the below fields to create an account</p>
                </div>
                <form className="form-group" onSubmit={handleSubmit}>
                  <div className="form-floating mb-4">
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="first_name"
                      placeholder="First Name"
                      value={formData.first_name}
                      onChange={handleChange}
                    />
                    <label htmlFor="firstName">First name</label>
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      type="text"
                      className="form-control"
                      id="userName"
                      name="last_name"
                      placeholder="Last Name"
                      value={formData.last_name}
                      onChange={handleChange}
                    />
                    <label htmlFor="userName">Last name</label>
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      type="email"
                      className="form-control"
                      id="emailAddress"
                      name="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <label htmlFor="emailAddress">Email address</label>
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      type="password"
                      className="form-control password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <label htmlFor="password">Password</label>
                    {/* Password toggle code */}
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      type="text"
                      className="form-control"
                      id="referralCode"
                      name="referral_code"
                      placeholder="Referral Code"
                      value={formData.referral_code}
                      onChange={handleChange}
                    />
                    <label htmlFor="referralCode">Referral Code</label>
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      type="tel"
                      className="form-control"
                      id="phoneNumber"
                      name="phone_number"
                      placeholder="Phone Number"
                      value={formData.phone_number}
                      onChange={handleChange}
                    />
                    <label htmlFor="phoneNumber">Phone number</label>
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      type="text"
                      className="form-control"
                      id="businessName"
                      name="business_name"
                      placeholder="Business Name"
                      value={formData.business_name}
                      onChange={handleChange}
                    />
                    <label htmlFor="businessName">Business name</label>
                  </div>
                  {/* ... Other input fields */}
                  {error && (
                    <div className="alert alert-danger d-flex  mt-3" role="alert">
                        <svg class="flex-shrink-0 me-3" width="30" height="30" viewBox="0 0 24 24" fill="#ff6a8e"><path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"></path></svg>
                        <p className="fs-14">{error}</p>
                    </div>
                    )}
                    {successMessage && (
                    <div className="alert alert-success mt-3" role="alert">
                        {successMessage}
                    </div>
                    )}
                  <button className="btn btn-dark w-100" type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                        'Create an Account'
                    )}
                    </button>
                  <p className="mb-4 form-text">
                    By signing up, you agree to our Terms and conditions and
                    Privacy Policy
                  </p>
                  <p class="mt-3 form-text">Already have an account ? <a href="/login" class="btn-link">Login</a></p>

                </form>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default RegisterPage;
