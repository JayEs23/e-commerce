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

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const router = useRouter();
  const { data } = useSession();

  useEffect(() => {
    const fetchuserProfileData = async () => {
      try {
        const response = await api.get("authentication/user_profile");
        setUserProfile(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchuserProfileData();
  }, []);

  console.log(data);

  useEffect(() => {
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

    fetchRegister();
  }, [data]);

  console.log(isAuthenticated);

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
              <div className="header-logo mx-4">
                <a href="/" className="logo-link">
                  <Image
                    width={200}
                    height={200}
                    className="img-fluid logo-dark logo-img"
                    src="/inshopperlogo-light.png"
                    alt="logo"
                  />

                  <Image
                    width={200}
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
                {isAuthenticated ? (
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
                          href="#"
                        >
                          <em className="ni ni-power me-2"></em> Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div className="header-mobile-user-menu dropdown me-2">
                    <LoginModal />
                  </div>
                )}
                <div className="header-toggle">
                  <button className="menu-toggler">
                    <em className="menu-on menu-icon ni ni-menu"></em>
                    <em className="menu-off menu-icon ni ni-cross"></em>
                  </button>
                </div>
              </div>

              <div className="header-search-form border-2 mx-4 d-none d-lg-flex d-flex justify-content-end">
                <form
                  action="/search"
                  onSubmit={handleSearchSubmit}
                  className="d-flex"
                >
                  <input
                    type="search"
                    name="search"
                    className="form-control-lg border-0"
                    placeholder="Search Products here"
                  />
                  <button type="submit" className="btn btn-sm ">
                    <em className="ni ni-search font-sm"></em>
                  </button>
                </form>
              </div>
              <nav className="header-menu menu nav mobile-menu">
                <ul className="menu-btns">
                  <li>
                    <a
                      href="#"
                      className="theme-toggler"
                      title="Toggle Dark/Light mode"
                    >
                      <span>
                        <em className="ni ni-moon icon theme-toggler-show"></em>
                        <em className="ni ni-sun icon theme-toggler-hide"></em>
                      </span>
                      <span className="theme-toggler-text">Dark Mode</span>
                    </a>
                  </li>
                </ul>
                {isAuthenticated ? (
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
                            onClick={logout}
                          >
                            <em className="ni ni-power me-2"></em> Disconnect
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                ) : (
                  <LoginModal />
                )}
                <ul className="menu-list ms-lg-auto">
                  <li className="menu-item has-sub">
                    <a href="#" className="menu-link menu-toggle text-nowrap">
                      My Account
                    </a>
                    <div className="menu-sub">
                      <ul className="menu-list">
                        <li className="menu-item">
                          <a href="index.html" className="menu-link">
                            Home Page 1
                          </a>
                        </li>
                        <li className="menu-item">
                          <a href="index-2.html" className="menu-link">
                            Home Page 2
                          </a>
                        </li>
                        <li className="menu-item">
                          <a href="index-3.html" className="menu-link">
                            Home Page 3
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="menu-item has-sub">
                    <a
                      href="#"
                      className="btn menu-link menu-toggle"
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
      <div className="modal fade" id="moreModal" tabIndex="-1" aria-hidden="true">
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
                      <li>
                        <p className="text-dark">
                          <b>Country</b>{" "}
                          <span className="badge text-primary justify-content-end">
                            Nigeria
                          </span>
                        </p>
                      </li>
                      <li>
                        <p className="text-dark">
                          <b>Language</b>{" "}
                          <span className="badge text-primary justify-content-end">
                            English
                          </span>
                        </p>
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
