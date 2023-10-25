// components/Reviews.js

import React, { useState, useEffect } from "react";
import api from "@/utils/api";
import Link from "next/link";
import Cookies from "js-cookie";
import LoginModal from "./auth/LoginModal";

const Reviews = ({ profile, handleEdit }) => {
  const [userProfile, setUserProfile] = useState(profile);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (userProfile) return;
      try {
        const response = await api.get("authentication/user_profile/");
        setUserProfile(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userProfile]);

  const handleLogout = () => {
    Cookies.remove("authToken");
    // Redirect to the login page after logging out
    window.location.href = "/login";
  };

  return (
    <div className="row card bg-white">
      <div className="card-body">
        {userProfile ? (
          <>
            <h3 className="card-title m-2 mb-4 ">Rate and reviews</h3>
            <section className="bg-gray card mb-4">
              <div className="row m-2">
                <div className="col-6">
                  <p>First Name</p>
                  <label>
                    <b>{userProfile?.first_name}</b>
                  </label>
                </div>
                <div className="col-6">
                  <p>Last Name</p>
                  <label>
                    <b>{userProfile?.last_name}</b>
                  </label>
                </div>
              </div>
              <div className="row m-2 mt-3">
                <div className="col-6">
                  <p>Email Address</p>
                  <label>
                    <b>{userProfile?.email}</b>
                  </label>
                </div>
                <div className="col-6">
                  <p>Phone</p>
                  <label>
                    <b>{userProfile?.phone_number}</b>
                  </label>
                </div>
              </div>
            </section>
            <section className="bg-gray card my-4">
              <div className="row bg-gray m-2 pt-4">
                <div className="col-10">
                  <p className="title">Personal Information</p>
                </div>
                <div className="col-2">
                  <button
                    className="btn"
                    type="button"
                    onClick={() => handleEdit(true)}
                  >
                    <em className="ni ni-edit"></em> Edit
                  </button>
                </div>
              </div>
              <div className="row m-2">
                <div className="col-6">
                  <p>Country</p>
                  <label>
                    <b>{userProfile?.country}</b>
                  </label>
                </div>
                <div className="col-6">
                  <p>State</p>
                  <label>
                    <b>{userProfile?.state} State</b>
                  </label>
                </div>
              </div>
              <div className="row m-2 mt-3">
                <div className="col-6">
                  <p>Street Address</p>
                  <label>
                    <b>{userProfile?.email}</b>
                  </label>
                </div>
                <div className="col-6">
                  <p>Postal Code</p>
                  <label>
                    <b>{userProfile?.postal_code}</b>
                  </label>
                </div>
              </div>
            </section>
          </>
        ) : (
          <div className="alert alert-danger d-flex mb-4" role="alert">
            <svg
              className="flex-shrink-0 me-3"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="#ff6a8e"
            >
              <path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"></path>
            </svg>
            <p className="fs-14">
              Please Login to View your Profile <LoginModal />
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
