import React, { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import axios from "axios";

const RegisterModal = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setError("Invalid email format.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post("/authentication/register/", {
        email: formData.email,
        password: formData.password,
      });

      // Registration successful, you can handle further actions here
      onRegister(response.data); // Pass registration data to the parent component

      // Clear the form fields
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const validateEmail = (email) => {
    // Simple email format validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <div>
      <h2>Register</h2>
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <FormControl
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <FormControl
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <FormControl
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </Form.Group>
        {error && <p className="text-danger mb-4">{error}</p>}
        <Button variant="primary" type="submit" disabled={isLoading}>
          Register
        </Button>
      </Form>
    </div>
  );
};

export default RegisterModal;
