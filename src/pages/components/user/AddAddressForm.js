import React, { useState } from 'react';
import api from '@/utils/api';

const AddAddressForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    alternate_phone_number: '',
    address_tag: '',
    city: '',
    state: '',
    additional_information: '',
    delivery_address: '',
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
      const response = await api.post('/addresses', formData);
      onAdd(response.data); // Call the provided onAdd function to add the new address to the list
      // Clear the form data after successful submission
      setFormData({
        first_name: '',
        last_name: '',
        phone_number: '',
        alternate_phone_number: '',
        address_tag: '',
        city: '',
        state: '',
        additional_information: '',
        delivery_address: '',
      });
    } catch (error) {
      console.error('Error adding new address:', error);
    }
  };

  return (
    <div className="add-address-form">
      <h2>Add New Address</h2>
      <form onSubmit={handleSubmit}>
        {/* Add input fields for each property */}
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        {/* Repeat for other properties */}
        <button type="submit" className="btn btn-primary">
          Add Address
        </button>
      </form>
    </div>
  );
};

export default AddAddressForm;
