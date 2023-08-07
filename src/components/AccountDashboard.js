// components/AccountDashboard.js

import React, { useState, useEffect } from 'react';
import api from '@/utils/api';
import Link from 'next/link';
import Cookies from 'js-cookie';

const AccountDashboard = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('authentication/user_profile/');
        setUserProfile(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    Cookies.remove('authToken');
    // Redirect to the login page after logging out
    window.location.href = '/login';
  };

  return (
    <div>
      <h2>Account Dashboard</h2>
      {userProfile ? (
        <div>
          <p>Name: {userProfile.first_name} {userProfile.last_name}</p>
          <p>Email: {userProfile.email}</p>
          {/* ... Other profile information */}
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default AccountDashboard;
