/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import LoginModal from "./LoginModal";
import { useSession } from "next-auth/react";
import NotificationModal from "./NotificationModal";
import { fetchCartItems } from "@/hooks/redux/reducers/cart/cartReducer";
import { useDispatch, useSelector } from "react-redux";

const Header = ({ handleSearch, searchQuery }) => {
  const { isAuthenticated, logout } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const router = useRouter();
  const { data } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchuserProfileData = async () => {
      try {
        const response = await api.get("authentication/user_profile");
        console.log("Profile", response.data);
        setUserProfile(response.data);
      } catch (error) {
        console.error(error);
        setUserProfile([]);
      }
    };

    // fetchuserProfileData();
  }, [userProfile]);
  useEffect(() => {
    // if(isAuthenticated) return;
    const fetchRegister = async () => {
      api
        .post("authentication/register/", {
          email: data?.user?.email,
          password: data?.user?.email + data?.user?.id,
          auth_provider: "google",
        })
        .then((response) => response.json)
        .then((response) => {
          if (
            response.status === 400 ||
            response.message ==
              "custom user with this email address already exists."
          ) {
            const response = api.post("authentication/login/", {
              email: data?.user?.email,
              password: data?.user?.email + data?.user?.id,
            });
            console.log(response);
          }
        })
        .catch(() => {
          const response = api.post("authentication/login/", {
            email: data?.user?.email,
            password: data?.user?.email + data?.user?.id,
          });
          console.log(response);
        });
    };
  });

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const cart = useSelector((state) => state.cart);

  // useEffect(() => {
  //   const fetchRegister = async () => {
  //     api
  //       .post("authentication/register/", {
  //         email: data?.user?.email,
  //         password: data?.user?.email + data?.user?.id,
  //         auth_provider: "google",
  //       })
  //       .then((response) => response.json)
  //       .then((response) => {
  //         if (
  //           response.status === 400 ||
  //           response.message ==
  //             "custom user with this email address already exists."
  //         ) {
  //           const response = api.post("authentication/login/", {
  //             email: data?.user?.email,
  //             password: data?.user?.email + data?.user?.id,
  //           });
  //           console.log(response);
  //         }
  //       })
  //       .catch(() => {
  //         const response = api.post("authentication/login/", {
  //           email: data?.user?.email,
  //           password: data?.user?.email + data?.user?.id,
  //         });
  //         console.log(response);
  //       });
  //   };

  //   fetchRegister();
  // }, [data]);

  // console.log(isAuthenticated);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchQuery = formData.get("search");
    router.push(`/search?search=${searchQuery}`);
  };

  return (
    <>
      <header className="header-section has-header-main mb-0">
        <div className="header-main is-sticky bg-white text-dark shadow ">
          <div className="container">
            <div className="header-wrap">
              <div className="header-logo ">
                <a href="/" className="logo-link">
                  <Image
                    width={140}
                    height={250}
                    className="img-fluid logo-dark logo-img"
                    src="/inshopperlogo-light.png"
                    alt="logo"
                  />

                  <Image
                    width={170}
                    height={200}
                    className="img-fluid logo-light logo-img"
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
                    <form action="/search" onSubmit={handleSearchSubmit}>
                      <div className="input-group">
                        <input
                          type="search"
                          name="search"
                          className="form-control form-control-s1"
                          placeholder="Search Products here..."
                        />
                        <button
                          type="submit"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          <em className="ni ni-search"></em>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                {isAuthenticated && (
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

                      {/* <li>
                        <a
                          href="#"
                          className="dropdown-item card-generic-item "
                          title="Toggle Dark/Light mode"
                        >
                          <em className="ni ni-cart me-2"></em> Dark Mode
                        </a>
                      </li> */}
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a className="dropdown-item card-generic-item" href="#">
                          <em className="ni ni-power me-2"></em> Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
                <div className="header-toggle">
                  <button className="menu-toggler">
                    <em className="menu-on menu-icon ni ni-menu"></em>
                    <em className="menu-off menu-icon ni ni-cross"></em>
                  </button>
                </div>
              </div>

              <div className="header-search-form border-2 d-none d-lg-flex d-flex">
                <form
                  action="/search"
                  value={searchQuery}
                  onChange={handleSearch}
                  onSubmit={handleSearchSubmit}
                  className="d-flex w-100"
                >
                  <input
                    type="search"
                    name="search"
                    className="form-control-lg border-0 w-100"
                    placeholder="Search for a product here....."
                  />
                  <button type="submit" className="btn btn-sm ">
                    <em className="ni ni-search font-lg text-white"></em>
                  </button>
                </form>
              </div>
              <nav className="header-menu menu nav mobile-menu">
                <ul className="menu-btns">
                  <li>
                    <NotificationModal />
                  </li>
                  <li>
                    <a href="/cart" className="icon-btn" title="">
                      <span>
                        <em className="ni ni-cart icon"></em>
                        <span
                          class="badge bg-primary"
                          style={{
                            position: "absolute",
                            top: "20px",
                          }}
                        >
                          {cart?.items?.length || 0}
                        </span>
                      </span>
                    </a>
                  </li>
                </ul>
                {isAuthenticated && (
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
                          <h6 className="dropdown-header">
                            Hello {userProfile?.first_name || ""} !
                          </h6>
                        </li>
                        <li>
                          <a
                            className="dropdown-item card-generic-item"
                            href="../account/profile"
                          >
                            <em className="ni ni-user me-2"></em> Profile
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item card-generic-item"
                            href="../../account/dashboard"
                          >
                            <em className="ni ni-dashboard me-2"></em> Dashboard
                          </a>
                        </li>

                        <li>
                          <a
                            href="../../account/orders"
                            className="dropdown-item card-generic-item"
                            title="Orders"
                          >
                            <em className="ni ni-cart me-2"></em> Orders
                          </a>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <a
                            className="dropdown-item card-generic-item"
                            onClick={logout}
                          >
                            <em className="ni ni-power me-2"></em> logout
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                )}
                <ul className="menu-list ms-lg-auto">
                  {isAuthenticated ? (
                    <>
                      <li className="menu-item has-sub">
                        <a
                          href="#"
                          className="menu-link menu-toggle outline-btn py-1"
                        >
                          My Account
                        </a>
                        <div className="menu-sub">
                          <ul className="menu-list">
                            <li className="menu-item">
                              <a href="" className="menu-link">
                                <em className="ni ni-user-fill icon"></em>{" "}
                                &nbsp; Profile
                              </a>
                            </li>
                            <li className="menu-item">
                              <a href="" className="menu-link">
                                <em className="ni ni-list-fill icon"></em>{" "}
                                &nbsp; Orders
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </>
                  ) : (
                    <>
                      <div className="header-mobile-user-menu dropdown me-2">
                        <LoginModal />
                      </div>
                      {/* <li className="menu-item" onClick={handleLoginModalOpen}>
                        <a
                          href="#"
                          className="btn menu-link menu-toggle text-nowrap outline-btn py-2 mx-2"
                        >
                          Sign up
                        </a>
                      </li> */}
                    </>
                  )}
                  <li className="menu-item has-sub">
                    <a
                      href="#"
                      className="btn menu-link menu-toggle text-nowrap outline-btn py-2 mx-2"
                      data-bs-toggle="modal"
                      data-bs-target="#moreModal"
                    >
                      More
                    </a>
                  </li>
                </ul>
              </nav>
              <div className="header-overlay"></div>
            </div>
          </div>
        </div>
      </header>
      <div className="modal" id="moreModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-top">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title mx-4">More</h3>
              <button
                type="button"
                className="btn-close icon-btn"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <em className="ni ni-cross"></em>
              </button>
            </div>
            <div className="modal-body">
              <div className="row card m-2">
                <a href="" className="btn btn-primary text-nowrap">
                  Start a live chat
                </a>
                <div className="col-lg-10 mt-2 ">
                  <div className="header-item">
                    <p className="my-2">ABOUT INSHOPPER</p>
                    <ul className="list-item list-item-s1 text-dark">
                      <li>
                        <a
                          className="text-dark"
                          href="https://www.inshopper.io"
                        >
                          <b>Inshopper Services</b>
                        </a>
                      </li>
                      <li>
                        <a className="text-dark" href="#">
                          <b>FAQs</b>
                        </a>
                      </li>
                      <li>
                        <a className="text-dark" href="#">
                          <b>Privacy Policy</b>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="header-item">
                    <p className="my-2">MY SETTINGS</p>
                    <ul className="list-item list-item-s1 text-dark">
                      <li>
                        <a
                          className="text-dark"
                          href="https://www.inshopper.io"
                        >
                          <b>Push Notification</b>
                        </a>
                      </li>
                      <li className="history-panel">
                        <span className="history-panel-left text-dark">
                          <b>Country</b>{" "}
                        </span>
                        <span className=" history-panel-right badge text-primary">
                          Nigeria
                        </span>
                      </li>
                      <li className="history-panel">
                        <span className="history-panel-left text-dark">
                          <b>Language</b>{" "}
                        </span>
                        <span className=" history-panel-right badge text-primary">
                          English
                        </span>
                      </li>
                    </ul>
                  </div>
                  <p className="my-4">App version 1.0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
