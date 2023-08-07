import Image from "next/image";
import React from "react";

const Navbar = ({ publicKey, truncateKey, handleDisconnect }) => {
  return (
    <header className="header-section has-header-main mb-0">
      <div className="header-main is-sticky bg-white">
        <div className="container">
          <div className="header-wrap">
            <div className="header-logo">
              <a href="/" className="logo-link">
                <Image
                width="150"
                height="100"
                  className="logo-dark logo-img"
                  src="/inshopperlogo-light.png"
                  alt="logo"
                />
                {/* <img
                  src="../../casperlabslogo.png"
                  alt="logo"
                  className="card-media-img flex-shrink-2 casper me-0 mb-3"
                /> */}
                <Image
                width="150"
                height="100"
                  className="logo-light logo-img"
                  src="/inshopperlogo-dark.png"
                  alt="logo"
                />
              </a>
            </div>
            <div className="header-mobile-action">
              <div className="header-search-mobile dropdown me-2">
                <a className="icon-btn" href="#" data-bs-toggle="dropdown">
                  <em className="ni ni-search"></em>
                </a>
                <div className="dropdown-menu dropdown-menu-end card-generic">
                  <div className="input-group">
                    <input
                      type="search"
                      className="form-control form-control-s1"
                      placeholder="Search item here..."
                    />
                    <a
                      href="#"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      <em className="ni ni-search"></em>
                    </a>
                  </div>
                </div>
              </div>
              <div className="header-mobile-user-menu dropdown me-2">
                <button
                  type="button"
                  className="icon-btn"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <em className="ni ni-user"></em>
                </button>
                <ul className="dropdown-menu card-generic card-generic-s3 dropdown-menu-end mt-2">
                  <li>
                    <h6 className="dropdown-header">Hello !</h6>
                  </li>
                  <li>
                    <a
                      className="dropdown-item card-generic-item"
                      href="user/profile"
                    >
                      <em className="ni ni-user me-2"></em> Profile
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item card-generic-item"
                      href="user/dashboard"
                    >
                      <em className="ni ni-dashboard me-2"></em> Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="dropdown-item card-generic-item theme-toggler"
                      title="Toggle Dark/Light mode"
                    >
                      <em className="ni ni-moon me-2"></em> Dark Mode
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a
                      className="dropdown-item card-generic-item"
                      href="index.html"
                    >
                      <em className="ni ni-power me-2"></em> Logout
                    </a>
                  </li>
                </ul>
              </div>
              <div className="header-toggle">
                <button className="menu-toggler">
                  <em className="menu-on menu-icon ni ni-menu"></em>
                  <em className="menu-off menu-icon ni ni-cross"></em>
                </button>
              </div>
            </div>
            <div className="header-search-form">
              <input
                type="search"
                className="form-control form-control-s1"
                placeholder="Search item here..."
              />
            </div>
            <nav className="header-menu menu nav">
              
              <ul className="menu-btns">
                <li>
                  <a
                    href="../../walletConnect"
                    className="btn btn-default"
                  >
                    My account
                  </a>
                </li>
                <li>
                  <a
                    href="../../profile"
                    className="btn btn-default"
                  >
                    More 
                  </a>
                </li>
                
              </ul>
              <ul className="menu-btns menu-btns-2">
                <li className="d-none d-lg-inline-block dropdown">
                  <button
                    type="button"
                    className="icon-btn icon-btn-s1"
                    data-bs-toggle="dropdown"
                  >
                    <em className="ni ni-user"></em>
                  </button>
                  <ul className="dropdown-menu card-generic card-generic-s3 dropdown-menu-end mt-2">
                    <li>
                      <h6 className="dropdown-header">Hello !</h6>
                    </li>
                    <li>
                      <a
                        className="dropdown-item card-generic-item"
                        href="../user/profile"
                      >
                        <em className="ni ni-user me-2"></em> Profile
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item card-generic-item"
                        href="../../user/dashboard"
                      >
                        <em className="ni ni-dashboard me-2"></em> Dashboard
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a
                        className="dropdown-item card-generic-item"
                        
                      >
                        <em className="ni ni-power me-2"></em> Disconnect
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="d-lg-none">
                  <a href="../../WalletConnect" className="btn btn-lg btn-dark">
                    Connect Wallet
                  </a>
                </li>
              </ul>
            </nav>
            <div className="header-overlay"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
