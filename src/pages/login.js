// pages/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import apiConfig from '@/utils/apiConfig';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const Login = () => {
  const loginEndpoint = 'authentication/login/';
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (token) => {
    Cookies.set('authToken', token); // Set the token in a cookie
    let authToken = Cookies.get('authToken');
    alert(authToken);
    router.push('/account/dashboard'); // Redirect to dashboard
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setError('');

      const response = await axios.post(
        `${apiConfig.baseURL}${loginEndpoint}`,
        formData
      );
      const token = response.data.token;
      handleLogin(token);

      console.log(response.data.token);

      // You can redirect the user to another page after successful login if needed
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Inshopper Ecommerce - Login</title>
      </Head>
      <div className="page-container bg-gray">
        <Navbar />
        <section className="login-section section-space-b pt-4 pt-md-5 mt-md-3">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-lg-6 mb-lg-0 d-none d-lg-block">
                <img
                  src="/images/thumb/remote-login.png" // Adjust the image path accordingly
                  alt=""
                  className="img-fluid"
                />
              </div>
              <div className="col-lg-6 col-md-9 bg-white p-4">
                <div className="section-head-sm">
                  <h2 className="mb-3">Login to <span className="text-primary">Inshopper!</span></h2>
                  <p>Enter your credentials to log in</p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-4">
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
                  <div className="form-floating mb-4">
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
                    {isLoading ? 'Logging in...' : 'Login'}
                  </button>
                  <p className="mt-3">
                    Don't have an account?{' '}
                    <a href="/register" className="btn-link">
                      Register
                    </a>
                  </p>
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

export default Login;
