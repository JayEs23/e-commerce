import Head from "next/head";
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Image from "next/image";
import mobileImg from "../../public/assets/images/mobile-img.png";

const SellerStore = () => {
  return (
    <>
      <Head>
        <title>Inshopper Ecommerce - Seller Store</title>
      </Head>
      <div className="page-container bg-gray">
        <Header />

        {/*  <div className="store-background">
          <div className="gadget-image">
            <Image src={mobileImg} width={500} height={500} alt="Gadget" />
            <div className="d-flex mt-5 pt-5 w-100 justify-content-between px-5">
              <div>
                <h2>Adereal gadgets</h2>
                <p>Lagos, Nigeria</p>
              </div>
              <div>
                <button className="store-btn">Contact</button>
              </div>
            </div>
            <div className="w-100">
              <p>
                {" "}
                Your one-stop destination for all things gadgets! We are
                committed to bringing you the latest and gadgets and keep you
                connected to the digital world.{" "}
              </p>
            </div>
          </div>
        </div> */}

        <div className="seller-details">
          <div className="store-background"></div>
          <div className="store-info">
            <Image
              src={mobileImg}
              width={100}
              height={100}
              alt="Gadget"
              className="gadget-image"
            />

            <div className="d-flex store-text w-100 justify-content-between">
              <div>
                <h2>Adereal gadgets</h2>
                <p>Lagos, Nigeria</p>
              </div>
              <div>
                <button className="store-btn">Contact</button>
              </div>
            </div>
            <div className="w-100">
              <p>
                {" "}
                Your one-stop destination for all things gadgets! We are
                committed to bringing you the latest and gadgets and keep you
                connected to the digital world.{" "}
              </p>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default SellerStore;
