import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    referral_code: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    business_name: '',
  });

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
      const response = await axios.post(
        'https://inshopper.io/api/v1/authentication/register/',
        formData
      );
      console.log('Registration successful:', response.data);
      // You can handle success here, maybe redirect to a login page
    } catch (error) {
      console.error('Registration failed:', error);
      // You can display an error message to the user
    }
  };

  return (
    <div>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="text"
          name="referral_code"
          placeholder="Referral Code"
          value={formData.referral_code}
          onChange={handleChange}
        />
        {/* ... other input fields ... */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
