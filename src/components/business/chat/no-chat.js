import React from "react";

const NoChat = () => {
  return (
    <div className="product-container">
      <div className="no-product-image-container">
        <img src="/assets/images/business/NoMessages.png" alt="" />
      </div>
      <p style={{ textAlign: "center" }}>
        <span style={{ fontWeight: "bolder", fontSize: "20px" }}>Oops!</span>{" "}
        <br /> You have no active chat, you can start a chart when you accept a
        bargain.
      </p>
    </div>
  );
};

export default NoChat;
