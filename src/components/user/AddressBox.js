import React, { useState } from 'react';
import api from '@/utils/api';
import LoginModal from '../auth/LoginModal';
const AddressBox = ({ address, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAddress, setEditedAddress] = useState(address);

  const handleDeleteAddress = async () => {
    try {
      await api.delete(`/addresses/${address?.id}`);
      onDelete(address?.id);
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const handleEditAddress = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    try {
      setIsEditing(false);
      // Make API call to update the address here
      await api.put(`/addresses/${address?.id}`, editedAddress);
      // Call the provided onUpdate function to refresh the address list
      onUpdate();
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedAddress(address);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  <div className="row card bg-white">
      <div className="card-body">
        <h3 className="card-title m-2 mb-4 ">Address Box</h3>
        
        
      </div>
    </div>

//   return (
//     <div className="address-box">
//       {isEditing ? (
//         <div className="address-edit-form">
//           <input
//             type="text"
//             name="line1"
//             value={editedaddress?.line1}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="line2"
//             value={editedaddress?.line2}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="city"
//             value={editedaddress?.city}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="state"
//             value={editedaddress?.state}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="zip"
//             value={editedaddress?.zip}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="country"
//             value={editedaddress?.country}
//             onChange={handleChange}
//           />
//           <div className="edit-actions">
//             <button className="btn btn-primary" onClick={handleSaveEdit}>
//               Save
//             </button>
//             <button className="btn btn-secondary" onClick={handleCancelEdit}>
//               Cancel
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="address-details">
//           <p className="address-line">{address?.line1}</p>
//           <p className="address-line">{address?.line2}</p>
//           <p className="address-line">{address?.city}, {address?.state} {address?.zip}</p>
//           <p className="address-country">{address?.country}</p>
//           <div className="address-actions">
//             <button className="btn btn-primary" onClick={handleEditAddress}>
//               Edit
//             </button>
//             <button className="btn btn-danger" onClick={handleDeleteAddress}>
//               Delete
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
    
//   );
};

export default AddressBox;
