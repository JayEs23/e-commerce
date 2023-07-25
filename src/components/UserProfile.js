import Image from 'next/image';
import { useState } from 'react';

const UserProfile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    // Implement API call to update user profile
    setIsEditing(false);
  };

  return (
    <div className="user-profile">
      <Image src={user.avatar} alt={user.name} />
      <h2>{isEditing ? <input type="text" value={name} onChange={(e) => setName(e.target.value)} /> : name}</h2>
      <p>{isEditing ? <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /> : email}</p>
      {isEditing ? (
        <button onClick={handleSaveProfile}>Save</button>
      ) : (
        <button onClick={handleEditProfile}>Edit Profile</button>
      )}
    </div>
  );
};

export default UserProfile;
