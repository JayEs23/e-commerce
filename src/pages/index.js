/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
//src/page/index.js
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import api from "@/utils/api";
import ProductApi from "@/pages/api/products";
import HeroSidebar from "./components/HeroSidebar";
import Hero from "./components/Hero";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const productApi = ProductApi();
  const [products, setProducts] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  const getWishlistFromApi = async () => {
    try {
      const response = await api.get("product/wishlist"); // Replace with your API endpoint
      const wishlistData = await response.data;
      return wishlistData;
    } catch (error) {
      console.error("Error fetching wishlist data:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      if (products) return;
      try {
        alert("uwee");
        const response = await api.get("product/all_products/");
        const data = await response.data;
        console.log("products", data);
        setProducts(data?.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [products]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const initialWishlist = await getWishlistFromApi();
      setWishlist(initialWishlist);
    };

    fetchWishlist();
  }, []);

  const toggleWishlist = async (productId) => {
    let updatedWishlist;
    if (wishlist.includes(productId)) {
      updatedWishlist = wishlist.filter((id) => id !== productId);
    } else {
      updatedWishlist = [...wishlist, productId];
    }

    try {
      // Send an API request to update the wishlist data
      await api.post("product/wishlist", { wishlist: productId }); // Replace with your API endpoint and data structure
      setWishlist(updatedWishlist);
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };
  return (
    <>
      <div className="page-container">
        <Header />
        {/* <div className="hero-wrap hero-wrap-4">
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
                    <div className="card-body"></div>
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
              
                <h1 className="hero-title text-primary">
                  The Online sales & shopping platform
                </h1>
                <p className="mb-4">
                  Embrace the Joy of online shopping and indulge in our
                  exclusive deals. Start your retail journey today.
                </p>
                <ul className="btns-group hero-btns">
                  <li>
                    <a href="../marketplace" className="btn btn-lg btn-primary">
                      Get Started
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section class="fun-fact-section bg-gray section-space">
        <div class="container">
          <div class="row g-gs">
            <div class="col-md-4 col-lg-4 col-sm-6">
              <div class="card card-counter text-center">
                <div class="card-body card-body-s1">
                  <img
                    src="images/thumb/icon-employees.svg"
                    alt=""
                    class="mb-3"
                  />
                  <h3 class="mb-1">Over 400+</h3>
                  <p>Total Members</p>
                </div>
              </div>
            </div>
            <div class="col-md-4 col-lg-4 col-sm-6">
              <div class="card card-counter text-center">
                <div class="card-body card-body-s1">
                  <img src="images/thumb/icon-users.svg" alt="" class="mb-3" />
                  <h3 class="mb-1">Over 40+</h3>
                  <p>Total Countries</p>
                </div>
              </div>
            </div>
            <div class="col-md-4 col-lg-4 col-sm-12">
              <div class="card card-counter text-center">
                <div class="card-body card-body-s1">
                  <img src="images/thumb/icon-nfts.svg" alt="" class="mb-3" />
                  <h3 class="mb-1">Over 1000+</h3>
                  <p>Total NFTs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
        <div className="content bg-gray">
          <div className="hero-wrap">
            <div className="hero-content text-start py-0">
              <div className="row bg-gray">
                <div className="col-xl-3 d-none d-xl-block">
                  <HeroSidebar />
                </div>
                <div className="col-xl-9 col-lg-12 h-500">
                  <Hero />
                </div>
              </div>
            </div>
          </div>
          <section className="explore-section bg-gray mb-4">
            <div className="container">
              <div className="filter-box">
                <div className="mb-4">
                  <h2 className="px-5"> Products</h2>
                </div>
              </div>
              <div className="gap-2x"></div>
              <div className=" row g-gs">
                {products?.length === 0 ? (
                  <div className="col-md-12">
                    <h4 className="text-danger text-center">
                      No Products available
                    </h4>
                  </div>
                ) : (
                  products?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                )}
              </div>
            </div>
          </section>
          {/* <section className="explore-section bg-gray mb-4">
            <div className="container">
              <div className="filter-box">
                <div className="mb-4">
                  <h2 className="px-5"> Products</h2>
                </div>
              </div>
              <div className="gap-2x"></div>
              <div className=" row g-gs">
                {products?.length === 0 ? (
                  <div className="col-md-12">
                    <h4 className="text-danger text-center">
                      No Products available
                    </h4>
                  </div>
                ) : (
                  products?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                )}
              </div>
            </div>
          </section> */}
        </div>
      </div>
      <Footer />
    </>
  );
}
