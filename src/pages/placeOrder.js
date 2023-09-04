import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartSummary from '@/components/cart/CartSummary';
import api from '@/utils/api';
import Cookies from 'js-cookie';
import ContactSellerModal from '@/components/ContactSellerModal';
const CartPage = () => {
  const [cartData, setCartData] = useState([]);
  const [address,setAddress] = useState("27 dedamola Crescent, Olodi Apapa, Amosun, Oyo, Lagos State, Nigeria");

  useEffect(() =>{
    const fetchAddresses = async () =>{
      if(!Cookies.get("authToken")) return;
      try {
        response = await api.get("customer/shipping-address");
        setAddress(reponse.data);
      } catch (error) {
        console.error("error getting customer addresses",error);
      }
    }
  },[]);
  useEffect(() => {
    // Fetch cart data from your API
    // Example: Fetch from '/api/cart'
    fetch('/api/cart')
      .then((response) => response.json())
      .then((data) => setCartData(data))
      .catch((error) => console.error('Error fetching cart data:', error));
  }, []);

  return (
    <>
    <Head>
        <title>Inshopper Ecommerce - Place Order</title>
      </Head>
      <div className="page-container bg-gray">
        <Header />
        <div className="content font-sm p-4">
          <div className="row mt-4 p-4">
            <div className="col-lg-9 card p-4">
              <div className="card-title text-dark"><h3>Place Order </h3></div>
              <div className="card-body">
                <div className="row bg-gray h-200 mb-4">
                  <div className="col-md-12 my-2"><p>Payment method</p></div>
                  <div className="col-md-3 m-2 h-100">
                    <div class="form-check mb-2 ">
                      <input class="form-check-input justify-content-between" style={{marginTop:"40px", bottom:"50"}} type="checkbox" id="masterCard" checked="" />
                      <label class="form-check-label form-check-label-s1 w-100 gap-4x" style={{backgroundColor:"#70308d",borderRadius:"8px"}} for="masterCard"></label>
                    </div>
                  </div>
                  <div className="col-md-3 m-2 h-100" >
                  <div class="form-check mb-2 ">
                      <input class="form-check-input justify-content-between" style={{marginTop:"40px", bottom:"50"}} type="checkbox" id="flutter" checked="" />
                      <label class="form-check-label form-check-label-s1 w-100 gap-4x" style={{backgroundColor:"#fff",borderRadius:"8px"}} for="flutter"></label>
                    </div>
                  </div>
                  <div className="col-md-3 m-2 bg-white h-100" >
                    <center className="p-4">
                      <em className="justify-content-between ni ni-plus outline-btn mt-4"></em>
                      <p className="normal-text">Add New Payment</p>
                    </center>
                    
                  </div>
                </div>
                <div className="row bg-gray h-200 mb-4">
                  <div className="row py-2">
                    <div className="col-9">
                      <p className="bold-text mt-2">Address info</p>
                    </div>
                    <div className="col-3 justify-content-end">
                      <button className="btn text-primary text-nowrap" style={{position:'relative', left:0,marginLeft:"100px"}}><i className="ni ni-pen"></i> Edit</button>
                    </div>
                  </div>
                  <div className="row my-2 mt-2">
                    <div className="col-md-10">
                      <p className="normal-text">Delivery Addesss</p>
                      <b className="bold-text">{address}</b>
                    </div>
                    <div className="col-md-10">
                      <p className="normal-text">Billing Addesss</p>
                      <b className="bold-text">{address}</b>
                    </div>
                  </div>
                </div>
                <div className="row bg-gray h-300 mb-4">
                  <div className="row py-2">
                    <div className="col-9">
                      <p className="normal-text mt-2 mx-2">Delivery Method</p>
                    </div>
                    <div className="col-3 justify-content-end">
                      <button className="btn text-primary text-nowrap" style={{position:'relative', left:0,marginLeft:"100px"}}><i className="ni ni-pen"></i> Edit</button>
                    </div>
                  </div>
                  <div className="row my-2 mt-2">
                    <div className="col-md-10 mx-2">
                      <div class="form-check mb-2 ">
                        <input class="form-check-input mt-16" type="checkbox" id="delivery1" checked="" />
                        <label class="form-check-label form-check-label-s1 w-100" for="delivery1">Free Delivery</label>
                        <p className="normal-text">7 -30 Business Days</p>
                      </div>
                    </div>
                    <div className="col-md-10 mx-4">
                      <div class="form-check mb-2 ">
                        <input class="form-check-input justify-content-between" style={{marginTop:"20px", bottom:"50"}} type="checkbox" id="delivery2" checked="" />
                        <label class="form-check-label form-check-label-s1 w-100" for="delivery2">Regular Delivery</label>
                        <p className="normal-text">7 -30 Business Days</p>
                      </div>
                    </div>
                    <div className="col-md-10 mx-4">
                      <div class="form-check mb-2">
                        <input class="form-check-input justify-content-between" style={{marginTop:"40px", bottom:"50"}} type="checkbox" id="delivery3" checked="" />
                        <label class="form-check-label form-check-label-s1 w-100" for="delivery3">Regular Delivery</label>
                        <p className="normal-text">7 -30 Business Days</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div className="col-lg-3">
              <CartSummary cartData={cartData} />
              <ContactSellerModal />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default CartPage;
