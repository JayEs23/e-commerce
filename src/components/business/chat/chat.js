import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import { RiSendPlane2Fill } from "react-icons/ri";

const ChatComp = () => {
  return (
    <div className="chat-container">
      <div className="chat-list-container">
        <div className="chat-display">
          <div className="profile-image">
            <h3>a</h3>
          </div>
          <div className="name-chat-details">
            <h4>Adereal gadgets</h4>
            <p>we can’t accept the amount...</p>
          </div>
          <div className="chat-time">
            <h6
              style={{
                fontSize: "11px",
              }}
            >
              1:47PM
            </h6>
            <span
              style={{
                backgroundColor: "#9881B8",
                padding: "1px 5px",
                color: "#FFFFFF",
                borderRadius: "50%",
                fontSize: "11px",
                fontWeight: "bold",
              }}
            >
              2
            </span>
          </div>
        </div>
      </div>
      <div className="message-section">
        <div className="message-display">
          <div className="message-header">
            <div className="profile-details">
              <div className="profile-image">
                <h3>a</h3>
              </div>
              <div className="user-name">
                <h4>Favour</h4>
                <p>Active 23 minutes ago</p>
              </div>
            </div>
            <HiDotsVertical className="dot-icon" />
          </div>
          <div className="message-content">
            <div className="recieved-message"></div>
            <div className="sent-message">
              <div className="sent-message-inner">
                <div className="text-image-container">
                  <img
                    src="/assets/images/business/Rectangle 3463536.png"
                    alt=""
                  />
                  <div className="image-description">
                    <h3>Cartier men wrist watch</h3>
                    <p>
                      proposed price: <span>₦ 900,000.00</span>
                    </p>
                    <p>
                      Selling price: <span>₦ 900,000.00</span>
                    </p>
                  </div>
                </div>
                {/* <div className="msg-text"> */}
                <p className="msg-text">
                  Hello, i have accepted your bargain price. the amount you are
                  offering doesn’t meet the item.
                </p>
              </div>
            </div>
          </div>
          <div className="message-input">
            <input type="text" placeholder="Start a new message" />
            <button>
              <RiSendPlane2Fill />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComp;
