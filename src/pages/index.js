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
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../hooks/redux/reducers/categoriesReducer";
// import { setProduct } from "./redux/reducers/productReducers";
import useAuth from "@/hooks/useAuth";
import LoginModal from "./components/LoginModal";
import { fetchCart } from "../hooks/redux/reducers/cart/cartReducer";
import Cookies from "js-cookie";
import { fetchProducts } from "@/hooks/redux/reducers/product/productReducers";
import { productsSelector } from "@/hooks/redux/reducers/product/productReducers";
import LoadingSkeleton from "./components/loading/LoadingSkeleton";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Add loading state
  const [itemsPerPage] = useState(24); // Number of items to show per page
  const [totalProducts, setTotalProducts] = useState(0);

  const scrollToTop = () => {
    // Scroll to the top of the page
    window.scrollTo({ top: 4, behavior: "smooth" });
  };

  const { isAuthenticated, logout } = useAuth();
  const dispatch = useDispatch();

  const getWishlistFromApi = async () => {
    try {
      const response = await api.get("product/wishlist"); // Replace with your API endpoint
      const wishlistData = await response.data.data[0].products;
      return wishlistData;
    } catch (error) {
      console.error("Error fetching wishlist data:", error);
      return [];
    }
  };

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const initialWishlist = await getWishlistFromApi();
      console.log("Initial Wishlist", initialWishlist);
      setWishlist(initialWishlist);
    };

    fetchWishlist();
  }, []);

  useEffect(() => {
    dispatch(fetchProducts(currentPage));
    scrollToTop();
  }, [dispatch, currentPage]);

  const products = useSelector((state) => state.products);
  // const cart = useSelector((state) => state.cart);

  // console.log(products.status, "fdfdd");

  const toggleWishlist = async (productId) => {
    let updatedWishlist;
    if (wishlist.includes(productId)) {
      updatedWishlist = wishlist.filter((id) => id !== productId);
    } else {
      updatedWishlist = [...wishlist, productId];
    }

    try {
      // Send an API request to update the wishlist data
      await api.post("product/wishlist/", { products: updatedWishlist }); // Replace with your API endpoint and data structure
      setWishlist(updatedWishlist);
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  const inWishList = (productId) => {
    let isPresent = wishlist.includes(productId);
    // console.log("Product ", productId, " is Present ", isPresent);
    return isPresent;
  };

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const generatePageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleLoginModalOpen = () => {
    setShowModal(true);
  };

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
                {/* <h6 className="hero-meta text-uppercase text-primary mb-3">
                  largest nft marketplace
                </h6> */}
                <h1 className="hero-title text-primary">
                  The Online sales and shopping platform
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
                  {/* <li>
                    <a href="../create" className="btn btn-lg btn-outline-dark">
                      Create
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
          <section
            className="explore-section bg-gray mb-4"
            style={{ minHeight: "700px" }}
          >
            <div className="container">
              <div className="filter-box">
                <div className="mb-4 mt-4">
                  <div className="section-head text-center py-4">
                    <h2>Popular Products</h2>
                  </div>
                </div>
              </div>
              <div className="gap-2x"></div>
              <div className="row product-main">
                {products?.status === "pending" ? (
                  <LoadingSkeleton type="product" />
                ) : products?.items?.length === 0 ? (
                  <div className="col-md-12">
                    <h4 className="text-danger text-center">
                      No Products available
                    </h4>
                  </div>
                ) : (
                  products?.items?.results[0]?.data.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      inWishlist={inWishList}
                      onToggleWishlist={toggleWishlist}
                      handleLoginModalOpen={handleLoginModalOpen}
                      isAuthenticated={isAuthenticated}
                    />
                  ))
                )}
              </div>
            </div>
          </section>

          <div className="pagination-wrap">
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center mt-5 pagination-s1">
                <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                    aria-disabled={currentPage === 1}
                  >
                    <span
                      aria-hidden="true"
                      className="ni ni-chevron-left"
                    ></span>
                  </button>
                </li>

                <li
                  className={`page-item ${
                    currentPage === products?.items?.num_pages && "active"
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(products?.items?.num_pages)}
                  >
                    {currentPage}
                  </button>
                </li>

                <li
                  className={`page-item ${
                    currentPage === products?.items?.num_pages && "disabled"
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                    aria-disabled={currentPage === products?.items?.num_pages}
                  >
                    <span
                      aria-hidden="true"
                      className="ni ni-chevron-right"
                    ></span>
                  </button>
                </li>
              </ul>
            </nav>
            <p className="text-center mt-3 text-primary text-bold page-result-text">
              Showing{" "}
              {Math.min(
                (currentPage - 1) * itemsPerPage + 1,
                products?.items?.count
              )}{" "}
              to {Math.min(currentPage * itemsPerPage, products?.items?.count)}{" "}
              of {products?.items?.count} records
            </p>
          </div>

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
