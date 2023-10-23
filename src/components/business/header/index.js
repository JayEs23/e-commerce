import React from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
const BusinessHeader = () => {
  return (
    <div className="business-header">
      <div className="business-header-inner">
        <div className="logo-container">
          <img src="/assets/images/business/Group 1000001784.png" alt="" />
          <h2>Inshopper</h2>
        </div>
        <div className="profile-container">
          <div className="notification-container">
            <IoIosNotificationsOutline />
          </div>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default BusinessHeader;
