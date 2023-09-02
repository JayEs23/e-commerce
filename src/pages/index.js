/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
//src/page/index.js
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
 
  return (
    <>
      <Header />
      <div className="hero-wrap hero-wrap-4">
        <div className="container">
          <div className="row align-items-center flex-lg-row-reverse justify-lg-content-center">
            <div className="col-lg-6 col-sm-9">
              <div className="row gx-4">
                <div className="col-xl-8">
                  <div className="card card-s2">
                    <div className="card-image">
                      <img
                        src="../assets/images/thumb/nft-lg4.jpg"
                        alt=""
                        className="card-img-top"
                      />
                    </div>
                    <div className="card-body">
                      
                      
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 d-xl-block d-none">
                  <div className="card card-s2">
                    <div className="card-image">
                      <img
                        src="../assets/images/thumb/nft20.jpg"
                        alt=""
                        className="card-img-top"
                      />
                    </div>
                  </div>
                  <div className="card card-s2">
                    <div className="card-image">
                      <img
                        src="../assets/images/thumb/nft21.jpg"
                        alt=""
                        className="card-img-top"
                      />
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-sm-9">
              <div className="hero-content pt-lg-0 pb-0 mt-lg-n4">
                {/* <h6 className="hero-meta text-uppercase text-primary mb-3">
                  largest nft marketplace
                </h6> */}
                <h1 className="hero-title text-primary">
                  The Online sales & shopping platform
                </h1>
                <p className="mb-4">
                  Embrace the Joy of online shopping and indulge in our exclusive deals. Start your retail journey today.
                </p>
                <ul className="btns-group hero-btns">
                  <li>
                    <a href="../marketplace" className="btn btn-lg btn-primary">
                      Get Started
                    </a>
                  </li>
                  {/* <li>
                    <a href="../create" className="btn btn-lg btn-outline-dark">
                      Create
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Mint /> */}
      <Footer />
    </>
  );
}
