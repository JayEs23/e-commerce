import React from "react";
import {
  RiHomeLine,
  RiDatabase2Line,
  RiTable2,
  RiMessage2Line,
} from "react-icons/ri";
import { MdOutlineDashboardCustomize, MdErrorOutline } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { NavLink } from "react-bootstrap";
// import "./style.css";

const BusinessSideBar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-container-inner">
        <div className="first-group-links">
          <NavLink to="#" activeClassName="active">
            <MdOutlineDashboardCustomize /> Dashboard
          </NavLink>
          <NavLink to="#" activeClassName="active">
            <RiHomeLine /> Store
          </NavLink>
          <NavLink to="#" activeClassName="active">
            <RiDatabase2Line /> Products
          </NavLink>
          <NavLink to="#" activeClassName="active">
            {" "}
            <RiTable2 /> Orders
          </NavLink>
          <NavLink to="#" activeClassName="active">
            <RiMessage2Line /> Chats
          </NavLink>
        </div>
        <div className="bottom-group-links">
          <NavLink to="#" activeClassName="active">
            <MdErrorOutline /> Get help
          </NavLink>
          <NavLink to="#" activeClassName="active">
            <HiOutlineLogout /> Logout
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default BusinessSideBar;
