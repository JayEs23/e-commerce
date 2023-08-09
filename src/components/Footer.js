/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */

import Image from "next/image";

const Footer = () => {
    return (
      <>
        <footer className="footer-section bg-dark on-dark">
          <div className="container">
            <div className="section-space-sm">
              <div className="row">
                <div className="col-lg-2 col-md-9 me-auto">
                  <div className="footer-item mb-5 mb-lg-0">
                    <a href="../../../" className="footer-logo-link logo-link">
                      <img
                        className="logo-dark logo-img"
                        src="../../inshopperlogo-dark.png"
                        alt="logo"
                      />
                      <img
                        className="logo-light logo-img"
                        src="../../inshopperlogo-dark.png"
                        alt="logo"
                      />
                    </a>
                    <p className="my-4 footer-para">
                      Follow us on:
                    </p>
                    <ul className="styled-icon">
                      <li>
                        <a href="#">
                          <em className="icon ni ni-facebook-f"></em>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <em className="icon ni ni-instagram"></em>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <em className="icon ni ni-twitter"></em>
                        </a>
                      </li>
                     
                    </ul>
                  </div>
                </div>
                <div className="col-lg-10">
                  <div className="row g-gs">
                    <div className="col-lg-3 col-md-3 col-sm-3">
                      <div className="footer-item">
                        <h5 className="mb-4">Information</h5>
                        <ul className="list-item list-item-s1">
                          <li>
                            <a href="https://www.inshopper.io">About Us</a>
                          </li>
                          <li>
                            <a href="#">Terms and services</a>
                          </li>
                          <li>
                            <a href="#">Pricing</a>
                          </li>
                          <li>
                            <a href="#">Privacy Policy</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3">
                      <div className="footer-item">
                        <h5 className="mb-4">My Account</h5>
                        <ul className="list-item list-item-s1">
                          <li>
                            <a href="../../cart"> My Orders</a>
                          </li>
                          <li>
                            <a href="#">Ratings and Reviews</a>
                          </li>
                          <li>
                            <a href="../../products/saved">Saved Items</a>
                          </li>
                          <li>
                            <a href="../../products/viewed">Recently Viewed</a>
                          </li>
                          <li>
                            <a href="../../products/searched">Recently searched</a>
                          </li>
                          <li>
                            <a href="#">Saved Cards</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3">
                      <div className="footer-item">
                        <h5 className="mb-4">Help Center</h5>
                        <ul className="list-item list-item-s1">
                          <li>
                            <a href="https://www.inshopper.io">Support</a>
                          </li>
                          <li>
                            <a href="#">Help Center</a>
                          </li>
                          <li>
                            <a href="#">Contact Us</a>
                          </li>
                          <li>
                            <a href="#">FAQs</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3">
                      <div className="footer-item">
                        <h5 className="mb-4">Download our Mobile app</h5>
                        <ul className="list-item list-item-s1">
                          <li>
                            <a href="https://www.inshopper.io"><Image alt="download" width="180" height="80" src="/assets/images/thumb/app-store.png" /></a>
                          </li>
                          <li>
                            <a href="#"><Image alt="download" width="180" height="80" src="/assets/images/thumb/google-play.png" /></a>
                          </li>
                          
                        </ul>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
           
          </div>
        </footer>
      </>
    );
  };
  
  export default Footer;
  