/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import useAuth from "@/hooks/useAuth";
import api from "@/utils/api";
import Cookies from "js-cookie";
import AccountDashboard from "../../components/AccountDashboard";
import Sidebar from "../../components/user/SideBar";
import Orders from "../../components/Orders";

const OrdersPage = () => {
  const { isAuthenticated, logout } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!Cookies.get("authToken")) {
      window.location.href = "/login";
    } else {
      fetchUserProfile();
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get("authentication/user_profile");
      setUserProfile(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <Head>
          <title>Inshopper Ecommerce - Account Orders</title>
        </Head>
        <div className="page-container bg-gray">
          <Header />
          <section className="content section-space-b pt-4 mt-md-3">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-10 mx-auto align-items-center">
                  <h1 className="justify-content-center">
                    <span
                      className="spinner-border spinner-border-lg"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  </h1>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Inshopper Ecommerce - Account Dashboard</title>
      </Head>
      <div className="page-container bg-gray">
        <Header />
        <section className="content section-space-b pt-4 mt-md-3">
          <section className="profile-section">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 bg-white mx-4 mb-4 border-rounded">
                  <Sidebar userProfile={userProfile} />
                </div>
                <div className="col-lg-8 bg-white">
                  <Orders profile={userProfile} />
                </div>
              </div>
            </div>
          </section>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default OrdersPage;
