// pages/account/dashboard.js

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import api from '@/utils/api';
import AccountDashboard from '@/components/AccountDashboard';

const DashboardPage = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('authentication/user_profile/');
        // console.log(response.data);
        // return;
        setUserProfile(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();

    // console.log(userProfile);
  }, [userProfile]);
  return (
    <>
      <Head>
        <title>Inshopper Ecommerce - Account Dashboard</title>
      </Head>
      <div className="page-container bg-gray">
        <Navbar />
        <section className="content section-space-b pt-4 mt-md-3">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-2 card bg-white p-4 ">
                  <div className="row h-500">
                    <h3>Hello {userProfile.first_name}!</h3>
                      {/* <p>Email: {userProfile.email}</p> */}
                  </div>
              </div>
              <div className="col-lg-8">
                {/* <AccountDashboard /> */}
              </div>
              
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default DashboardPage;
