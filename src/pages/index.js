/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
//src/page/index.js
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
              <div className="row">
                {products?.items?.length === 0 ? (
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
