import React from "react";
import BusinessDashboardWrapper from "../components/business/dasboard-content-wrapper";
import BusinessChatIndex from "../components/business/chat";
// import BusinessProductIndex from "../components/business/product";

const Chat = () => {
  return (
    <div>
      <BusinessDashboardWrapper child={<BusinessChatIndex />} />
    </div>
  );
};

export default Chat;
