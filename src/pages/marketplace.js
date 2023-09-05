import Head from "next/head";
import { Inter } from "next/font/google";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import api from "@/utils/api";
import ProductApi from "@/pages/api/products";
import HeroSidebar from "./components/HeroSidebar";
import Hero from "./components/Hero";

const inter = Inter({ subsets: ["latin"] });

export default function Markeplace() {
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
        // alert("uwee");
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
        <div className="content bg-gray">
          <div className="hero-wrap">
            <div className="hero-content text-start py-0">
              <div className="row bg-gray">
                <div className="col-xl-3 d-none d-xl-block">
                  <HeroSidebar />
                </div>
                <div className="col-xl-9 col-lg-12 h-500">{/* <Hero /> */}</div>
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
        </div>
      </div>

      <Footer />
    </>
  );
}
