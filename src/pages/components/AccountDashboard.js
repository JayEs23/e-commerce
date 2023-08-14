// components/AccountDashboard.js

import React, { useState, useEffect } from 'react';
import api from '@/utils/api';
import Link from 'next/link';
import Cookies from 'js-cookie';

const AccountDashboard = ({profile}) => {
  const [userProfile, setUserProfile] = useState(profile?? []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if(userProfile) return;
      try {
        const response = await api.get('authentication/user_profile/');
        // setUserProfile(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [userProfile]);

  const handleLogout = () => {
    Cookies.remove('authToken');
    // Redirect to the login page after logging out
    window.location.href = '/login';
  };

  return (
    <div className="row card bg-white">
      <div className="card-body">
        {userProfile &&(
          <><h3 className="card-title m-2 mb-4 ">My Account</h3>
            <section className="bg-gray card mb-4">
              <div className="row bg-gray m-2 pt-4">
                  <div className="col-10"><p className="title">Personal Information</p></div>
                  <div className="col-2"><button className="btn"><em className="ni ni-edit"></em> Edit</button></div>
                </div>
                <div className="row m-2">
                  <div className="col-6">
                    <p>First Name</p>
                    <label><b>{userProfile.first_name}</b></label>
                  </div>
                  <div className="col-6">
                    <p>Last Name</p>
                    <label><b>{userProfile.last_name}</b></label>
                  </div>
                </div>
                <div className="row m-2 mt-3">
                  <div className="col-6">
                    <p>Email Address</p>
                    <label><b>{userProfile.email}</b></label>
                  </div>
                  <div className="col-6">
                    <p>Phone</p>
                    <label><b>{userProfile.phone_number}</b></label>
                  </div>
                </div>
            </section>
            <section className="bg-gray card my-4">
              <div className="row bg-gray m-2 pt-4">
                  <div className="col-10"><p className="title">Personal Information</p></div>
                  <div className="col-2"><button className="btn"><em className="ni ni-edit"></em> Edit</button></div>
                </div>
                <div className="row m-2">
                  <div className="col-6">
                    <p>First Name</p>
                    <label><b>{userProfile.first_name}</b></label>
                  </div>
                  <div className="col-6">
                    <p>Last Name</p>
                    <label><b>{userProfile.last_name}</b></label>
                  </div>
                </div>
                <div className="row m-2 mt-3">
                  <div className="col-6">
                    <p>Email Address</p>
                    <label><b>{userProfile.email}</b></label>
                  </div>
                  <div className="col-6">
                    <p>Phone</p>
                    <label><b>{userProfile.phone_number}</b></label>
                  </div>
                </div>
            </section></>
        )}
        
      </div>
    </div>
  );
};

export default AccountDashboard;
