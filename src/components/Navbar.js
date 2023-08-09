import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = ({ publicKey, truncateKey, handleDisconnect }) => {
  return (
    <header className="header-section has-header-main mb-0">
      <div className="header-main is-sticky bg-white">
        <div className="container">
          <div className="header-wrap">
            <div className="header-logo">
              <Link href="/" className="logo-link">
                <Image
                width="150"
                height="100"
                  className="logo-dark logo-img"
                  src="/inshopperlogo-light.png"
                  alt="logo"
                />
                
                <Image
                width="150"
                height="100"
                  className="logo-light logo-img"
                  src="/inshopperlogo-dark.png"
                  alt="logo"
                />
              </Link>
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
              
              <ul className="menu-list ms-lg-auto">
                <li className="d-none d-lg-inline-block dropdown">
                  <button
                    type="button"
                    className="icon-btn icon-btn-s1"
                    data-bs-toggle="dropdown"
                  >
                    <em className="ni ni-users"></em>
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
                <li className="d-none d-lg-inline-block dropdown">
                  <button
                    type="button"
                    className="icon-btn icon-btn-s1"
                    data-bs-toggle="dropdown"
                  ><span className="badge badge-primary text-primary notif p-2 py-2 mx-4">1</span>
                    <em className="ni ni-bell"></em>
                  </button>
                  
                </li>
                <li className="d-none d-lg-inline-block dropdown">
                  <button
                    type="button"
                    className="icon-btn icon-btn-s1"
                    data-bs-toggle="dropdown"
                  >
                    <em className="ni ni-cart"></em>
                  </button>
                  
                </li>
                <li className="menu-item has-sub">
                    <a href="#" className="menu-link menu-toggle">My Account</a>
                    <div className="menu-sub">
                        <ul className="menu-list">
                            <li className="menu-item"><a href="#" className="menu-link">Account</a></li>
                            <li className="menu-item">
                                <a href="#" className="menu-link">Explore v2 <span className="badge text-primary bg-primary-50">New</span></a>
                            </li>
                            
                        </ul>
                    </div>
                </li>
                <li className="menu-item has-sub">
                    <a href="#" className="menu-link menu-toggle">More</a>
                    <div className="menu-sub">
                        <ul className="menu-list">
                          <li className="menu-item">
                            <a href="#" className="menu-link">Account</a>
                          </li>
                          <li className="menu-item">
                              <a href="#" className="menu-link">Explore </a>
                          </li>
                          
                        </ul>
                    </div>
                </li>
              </ul>
              
              
              {/* <ul className="menu-btns menu-btns-2">
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
                
              </ul> */}
            </nav>
            <div className="header-overlay"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
