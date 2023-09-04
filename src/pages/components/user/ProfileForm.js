import React,{useState} from "react";

const ProfileForm = ({ userProfile, updateProfileFunction }) => {
  if (!userProfile) {
    return <div>Loading...</div>; 
  }
  const {
    email,
    password,
    referral_code,
    first_name,
    last_name,
    phone_number,
    auth_provider,
    state,
    postal_code,
    country,
    address,
  } = userProfile;
  const [formData, setFormData] = useState(userProfile);
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      updateProfileFunction(formData);
    }
  };



  return (
    <>
    <form className="form-group card mx-4 my-4 p-4" onSubmit={handleSubmit}>
          <h2>Edit Profile</h2>
          <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" defaultValue={email} disabled />
          </div>
          <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" defaultValue={password} />
          </div>
          <div className="mb-3">
              <label className="form-label">Referral Code</label>
              <input type="text" className="form-control" defaultValue={referral_code} />
          </div>
          <div className="mb-3">
              <label className="form-label">First Name</label>
              <input type="text" className="form-control" defaultValue={first_name} />
          </div>
          <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input type="text" className="form-control" defaultValue={last_name} />
          </div>
          <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input type="text" className="form-control" defaultValue={phone_number} />
          </div>
          <div className="mb-3">
              <label className="form-label">Auth Provider</label>
              <input type="text" className="form-control" defaultValue={auth_provider} />
          </div>
          <div className="mb-3">
              <label className="form-label">State</label>
              <input type="text" className="form-control" defaultValue={state} />
          </div>
          <div className="mb-3">
              <label className="form-label">Postal Code</label>
              <input type="text" className="form-control" defaultValue={postal_code} />
          </div>
          <div className="mb-3">
              <label className="form-label">Country</label>
              <input type="text" className="form-control" defaultValue={country} />
          </div>
          <div className="mb-3">
              <label className="form-label">Address</label>
              <textarea className="form-control" defaultValue={address}></textarea>
          </div>
          {Object.keys(errors).map((key) => (
                <div key={key} className="text-danger">{errors[key]}</div>
            ))}
          <button type="submit" className="btn btn-primary">
              Update Profile
          </button>
      </form></>
  );
};

export default ProfileForm;
