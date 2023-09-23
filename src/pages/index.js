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
import { useDispatch } from "react-redux";
import { setCategories } from "./redux/reducers/categoriesReducer";
// import { setProduct } from "./redux/reducers/productReducers";
import useAuth from "@/hooks/useAuth";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const productApi = ProductApi();
  const [products, setProducts] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [categories, setCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Add loading state
  const itemsPerPage = 3; // Number of items to show per page
  const [totalProducts, setTotalProducts] = useState(0);
  const scrollToTop = () => {
    // Scroll to the top of the page
    window.scrollTo({ top: 4, behavior: "smooth" });
  };

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

  const fetchProducts = async () => {
    if (products) return;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    try {
      const response = await api.get("product/all_products/");
      const data = await response.data;
      setTotalProducts(data.count);
      let items = data?.results[0]?.data;
      setProducts(items.slice(startIndex, endIndex));
      setLoading(false);
      scrollToTop();
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [products]);

  useEffect(() => {
    fetchProducts(); // Fetch NFTs on component mount
  }, [currentPage]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const initialWishlist = await getWishlistFromApi();
      console.log("Initial Wishlist", initialWishlist);
      setWishlist(initialWishlist);
    };

    fetchWishlist();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("product/categories/");
        const data = await response.data.data;
        dispatch(setCategories(data));
        setCategory(data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCategories();
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
      await api.post("product/wishlist/", { products: updatedWishlist }); // Replace with your API endpoint and data structure
      setWishlist(updatedWishlist);
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  const inWishList = (productId) => {
    let isPresent = wishlist.includes(productId);
    console.log("Product ", productId, " is Present ", isPresent);
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

  return (
    <>
      <div className="page-container">
        <Header />
        <div className="content bg-gray">
          <div className="hero-wrap">
            <div className="hero-content text-start py-0">
              <div className="row bg-gray">
                <div className="col-xl-3 d-none d-xl-block">
                  <HeroSidebar categories={categories} />
                </div>
                <div className="col-xl-9 col-lg-12 h-500 justify-content-between">
                  <Hero />
                </div>
              </div>
            </div>
          </div>
          <section
            className="explore-section bg-gray mb-4"
            style={{ minHeight: "700px" }}
          >
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
                    <ProductCard
                      key={product.id}
                      product={product}
                      inWishlist={inWishList}
                      onToggleWishlist={toggleWishlist}
                    />
                  ))
                )}
              </div>
            </div>
          </section>
          {!loading && products?.length > 0 && (
            <div className="pagination-wrap">
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center mt-5 pagination-s1">
                  <li
                    className={`page-item ${currentPage === 1 && "disabled"}`}
                  >
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
                  {generatePageNumbers().map((page) => (
                    <li
                      key={page}
                      className={`page-item ${
                        currentPage === page && "active"
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      currentPage === totalPages && "disabled"
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage + 1)}
                      aria-disabled={currentPage === totalPages}
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
                {Math.min((currentPage - 1) * itemsPerPage + 1, totalProducts)}{" "}
                to {Math.min(currentPage * itemsPerPage, totalProducts)} of{" "}
                {totalProducts} records
              </p>
            </div>
          )}
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
