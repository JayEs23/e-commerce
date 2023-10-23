import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { Inter } from "next/font/google";
import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Sidebar from "../../components/user/SideBar";
import AccountDashboard from "../../components/AccountDashboard";
import ProfileForm from "../../components/user/ProfileForm";
import Cookies from "js-cookie";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const storedAuthToken = Cookies.get("authToken");

  useEffect(() => {
    const getUserData = async () => {
      if (!storedAuthToken) return;

      try {
        const response = await api.get("authentication/user_profile");
        console.log("userData", response);
        setUserData(response.data);
      } catch (error) {}
    };

    getUserData(); // Call the function to fetch data
  }, [storedAuthToken]);

  const updateProfile = async (data) => {
    if (!profileData) return;

    return profileData;
  };

  const handleEdit = (status) => {
    if (status) {
      setEditing(true);
    } else {
      setEditing(false);
    }
  };
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
                  <Sidebar userProfile={userData} />
                </div>
                <div className="col-lg-8 bg-white">
                  {!editing && userData ? (
                    <AccountDashboard
                      profile={userData}
                      handleEdit={handleEdit}
                    />
                  ) : (
                    <ProfileForm
                      userProfile={userData}
                      updateProfileFunction={updateProfile}
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
        </section>
        <Footer />
      </div>
    </>
  );
}
