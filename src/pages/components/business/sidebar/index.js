import React from "react";
import {
  RiHomeLine,
  RiDatabase2Line,
  RiTable2,
  RiMessage2Line,
} from "react-icons/ri";
import { MdOutlineDashboardCustomize, MdErrorOutline } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import Link from "next/link";
// import "./style.css";
const BusinessSideBar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-container-inner">
        <div className="first-group-links">
          <Link href="/business" activeClassName="active">
            <MdOutlineDashboardCustomize /> Dashboard
          </Link>
          <Link href="/business/store" activeClassName="active">
            <RiHomeLine /> Store
          </Link>
          <Link href="/business/product" activeClassName="active">
            <RiDatabase2Line /> Products
          </Link>
          <Link href="#" activeClassName="active">
            <RiTable2 /> Orders
          </Link>
          <Link href="/business/chat" activeClassName="active">
            <RiMessage2Line /> Chats
          </Link>
        </div>
        <div className="bottom-group-links">
          <Link href="#" activeClassName="active">
            <MdErrorOutline /> Get help
          </Link>
          <Link href="#" activeClassName="active">
            <HiOutlineLogout /> Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BusinessSideBar;
