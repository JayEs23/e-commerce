/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import api from "@/utils/api"; // Import `api`
import Image from "next/image";
import ProductApi from "@/pages/api/products";
import AddToCartButton from "../components/cart/AddToCartButton";
import Bargain from "../components/product/Bargain";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "@/hooks/redux/reducers/product/productReducers";
import BargainMain from "../components/product/BargainMain";

const ProductDetailsPage = ({ product }) => {
  const router = useRouter();
  // const { id } = router.query;

  // const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  // useEffect(() => {
  //   dispatch(fetchProductById(id));
  // }, [dispatch, id]);

  // const product = useSelector((state) => state.products?.singleProduct?.data);

  console.log("Checking products", product);

  const colors = product?.variations?.reduce((acc, variation) => {
    if (!acc.includes(variation.color_name)) {
      const red = parseInt(variation.color_name.slice(4, 6), 16); // 03 in hexadecimal to decimal
      const green = parseInt(variation.color_name.slice(6, 8), 16); // 2c in hexadecimal to decimal
      const blue = parseInt(variation.color_name.slice(8, 10), 16); // 13 in hexadecimal to decimal

      // Create an RGB color string
      const rgbColor = `rgb(${red}, ${green}, ${blue})`;
      acc.push(rgbColor);
    }
    return acc;
  }, []);

  const ColorCircles = ({ colors }) => {
    return (
      <svg
        width="75"
        height="24"
        viewBox="0 0 75 24"
        className="avatar"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Group 1000001535">
          {colors.map((color, index) => (
            <circle
              key={index}
              cx={index * 17 + 12}
              cy="12"
              r="12"
              fill={color}
            />
          ))}
        </g>
      </svg>
    );
  };

  return (
    <>
      <Head>
        <title>Product - {product?.product_name} | Inshopper</title>
      </Head>
      <div className="page-container bg-gray">
        <Header />
        <div className="content row mt-4">
          <div className=" card col-lg-11 border-rounded bg-light mx-auto mt-4">
            {product && (
              <>
                <div
                  className="row shadow border-rounded"
                  style={{ padding: "0px", backgroundColor: "#fafafa" }}
                >
                  <div className="col-xl-6 card bg-white pt-4">
                    <img
                      className="img-fluid h-400 mb-4 rounded-3"
                      style={{ objectFit: "contain" }}
                      src={product?.images[0].image}
                      alt={product?.product_name}
                    />

                    <div className="d-flex mb-5">
                      {product?.images?.slice(1).map((url, index) => (
                        <img
                          key={index}
                          src={url?.image}
                          className="w-25 h-100 mx-3 rounded-3"
                          alt={`image-${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="col-xl-6 ">
                    <h3 className="title font-weight-bold text-dark my-4 mx-2">
                      {product?.product_name}
                    </h3>
                    <p className="mx-2 mb-4 text-dark">
                      {product?.description} <br />
                    </p>
                    <div className="card py-2 px-2 bg-gray mx-2 mt-4 align-items-center justify-content-between">
                      <div className="row align-items-center">
                        <div className="col-sm-4 pt-2">
                          <p className="row mx-2 ">Colors</p>
                          <div class="me-5 me-sm-2">
                            <ColorCircles colors={colors} />
                          </div>
                        </div>
                        <div className="col-sm-2 pt-2">
                          <p>Size</p>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="L"
                            style={{
                              backgroundColor: "inherit",
                              border: "1px solid gray",
                              borderRadius: "4px",
                            }}
                          />
                        </div>

                        <div className="col-sm-2 pt-2">
                          <p>Quantity</p>
                          <input
                            className="form-control"
                            type="number"
                            placeholder="1"
                            style={{
                              backgroundColor: "inherit",
                              border: "1px solid gray",
                              borderRadius: "4px",
                            }}
                          />
                        </div>

                        <div className="col-2 pt-2 justify-content-center d-flex">
                          <button
                            className={`icon-btn ${"bg-transparent"}`}
                            data-bs-toggle="tooltip"
                            data-bs-placement="left"
                          >
                            <em className="ni ni-share"></em>
                          </button>
                        </div>
                        <div className="col-2 pt-2">
                          <button
                            className={`icon-btn ${"bg-transparent"}`}
                            data-bs-toggle="tooltip"
                            data-bs-placement="left"
                          >
                            <em className="ni ni-heart"></em>
                          </button>
                        </div>
                      </div>
                      <hr />
                      <div className="row my-2 w-100">
                        <div className="col-sm-6">
                          <h2
                            className="p-0"
                            style={{ color: "#fd5a33", fontWeight: "bold" }}
                          >
                            {parseFloat(
                              product?.variations[0]?.price
                            ).toLocaleString("en-NG", {
                              style: "currency",
                              currency: "NGN",
                            })}
                          </h2>
                        </div>
                        <div className="col-sm-6">
                          <BargainMain product={product} cart={cart} />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl-12 col-lg-10">
                        <p className="pt-2">Seller information</p>
                        <div class="card-creator-v card-creator-v-wbg">
                          <div class="card-body">
                            <div class="card-creator-info">
                              <a
                                href="#"
                                class="avatar flex-shrink-0 bg-dark py-4 px-3 align-content-center"
                                style={{ minHeight: "65px", minWidth: "65px" }}
                              >
                                {/* <img src="" alt="avatar" /> */}
                                <h5 className="text-white mx-1 py-1 text-nowrap">
                                  {product?.store_id
                                    .split(" ")
                                    .slice(0, 2)
                                    .map((word) => word.charAt(0).toUpperCase())
                                    .join("")}
                                </h5>
                              </a>
                              <div class="flex-grow-1">
                                <a href="#" class="card-title">
                                  {product?.store_id}
                                </a>
                                <div class="flex-grow-1">
                                  <a href="#" class="card-title">
                                    {product?.store_id}
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className=""></div>
                        </div>
                        <div className="mt-4 ">
                          <h6>About</h6>
                          <p>
                            The first step for this tool is to give it some
                            code. You can do this in one of four ways. You can
                            hit the BROWSE button to upload a file from your
                            computer. Alternatively, you could drag and drop a
                            file onto the code field or just paste some code you
                            previously copied. Finally, you could also hit the
                            LOAD URL button to select a web page to upload.
                            However, for that to work, the page in question
                            needs to support cross-origin requests.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="row bg-light shadow mb-4 pt-4"
                  style={{ minHeight: "200px" }}
                >
                  <div className="col-xl-11 ps-xl-4 mx-auto">
                    <div className="author-items-wrap">
                      <ul
                        className="nav nav-tabs nav-tabs-s1"
                        id="myTab"
                        role="tablist"
                      >
                        <li className="nav-item mx-4" role="presentation">
                          <button
                            className="nav-link active"
                            id="about-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#about"
                            type="button"
                            role="tab"
                            aria-controls="about"
                            aria-selected="true"
                          >
                            About Item
                          </button>
                        </li>
                        <li className="nav-item mx-4" role="presentation">
                          <button
                            className="nav-link"
                            id="reviews-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#reviews"
                            type="button"
                            role="tab"
                            aria-controls="reviews"
                            aria-selected="false"
                          >
                            Reviews
                          </button>
                        </li>
                      </ul>
                      <div className="gap-2x"></div>
                      <div className="tab-content" id="myTabContent">
                        <div
                          className="tab-pane fade show active"
                          id="about"
                          role="tabpanel"
                          aria-labelledby="about-tab"
                        >
                          <div className="row g-gs mb-4 pb-4"></div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="reviews"
                          role="tabpanel"
                          aria-labelledby="reviews-tab"
                        >
                          <div className="row g-gs mb-4 py-4">
                            <div
                              class="col-xl-7 col-lg-12 col-sm-12 comment-wrapper mt-5"
                              id="comments"
                            >
                              <ul class="comments mb-5">
                                <li>
                                  <div class="comment">
                                    <div class="comment-body">
                                      <div class="comment-stars d-flex align-items-center">
                                        <svg
                                          width="16"
                                          height="16"
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="#FFC107"
                                          viewBox="0 0 16 16"
                                        >
                                          <path d="M8 0l2.074 5.227h5.926l-4.782 3.662 1.853 5.425L8 12.854l-4.071 1.46 1.853-5.425L0 5.227h5.926z" />
                                        </svg>
                                        <svg
                                          width="16"
                                          height="16"
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="#FFC107"
                                          viewBox="0 0 16 16"
                                        >
                                          <path d="M8 0l2.074 5.227h5.926l-4.782 3.662 1.853 5.425L8 12.854l-4.071 1.46 1.853-5.425L0 5.227h5.926z" />
                                        </svg>
                                        <svg
                                          width="16"
                                          height="16"
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="#FFC107"
                                          viewBox="0 0 16 16"
                                        >
                                          <path d="M8 0l2.074 5.227h5.926l-4.782 3.662 1.853 5.425L8 12.854l-4.071 1.46 1.853-5.425L0 5.227h5.926z" />
                                        </svg>
                                        <svg
                                          width="16"
                                          height="16"
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="gray"
                                          viewBox="0 0 16 16"
                                        >
                                          <path d="M8 0l2.074 5.227h5.926l-4.782 3.662 1.853 5.425L8 12.854l-4.071 1.46 1.853-5.425L0 5.227h5.926z" />
                                        </svg>
                                        <svg
                                          width="16"
                                          height="16"
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="gray"
                                          viewBox="0 0 16 16"
                                        >
                                          <path d="M8 0l2.074 5.227h5.926l-4.782 3.662 1.853 5.425L8 12.854l-4.071 1.46 1.853-5.425L0 5.227h5.926z" />
                                        </svg>
                                      </div>
                                      <p class="comment-desc mt-2">
                                        It is a long established fact that a
                                        reader will be distracted by the
                                        readable content of a page when looking
                                        at its layout.
                                      </p>
                                      <div class="d-flex align-items-center justify-content-between">
                                        <div class="d-flex py-2">
                                          <span class="comment-title font-sm">
                                            Greatness Marshall
                                          </span>{" "}
                                          &nbsp; | &nbsp;
                                          <span class="comment-meta">
                                            22 Jun 2020
                                          </span>
                                        </div>
                                        <p class="comment-replay-btn">
                                          {" "}
                                          Was this review helpful ? &nbsp;
                                          &nbsp;{" "}
                                          <span
                                            className="p-4 bg-gray shadow-0"
                                            style={{
                                              borderRadius: "20px",
                                              background: "light-gray",
                                            }}
                                          >
                                            <em
                                              class="ni ni-thumbs-up"
                                              style={{ fontSize: "20px" }}
                                            >
                                              {" "}
                                              2{" "}
                                            </em>
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <div class="comment">
                                    <div class="comment-body">
                                      <div class="comment-stars d-flex align-items-center">
                                        <svg
                                          width="16"
                                          height="16"
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="#FFC107"
                                          viewBox="0 0 16 16"
                                        >
                                          <path d="M8 0l2.074 5.227h5.926l-4.782 3.662 1.853 5.425L8 12.854l-4.071 1.46 1.853-5.425L0 5.227h5.926z" />
                                        </svg>
                                        <svg
                                          width="16"
                                          height="16"
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="#FFC107"
                                          viewBox="0 0 16 16"
                                        >
                                          <path d="M8 0l2.074 5.227h5.926l-4.782 3.662 1.853 5.425L8 12.854l-4.071 1.46 1.853-5.425L0 5.227h5.926z" />
                                        </svg>
                                        <svg
                                          width="16"
                                          height="16"
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="#FFC107"
                                          viewBox="0 0 16 16"
                                        >
                                          <path d="M8 0l2.074 5.227h5.926l-4.782 3.662 1.853 5.425L8 12.854l-4.071 1.46 1.853-5.425L0 5.227h5.926z" />
                                        </svg>
                                        <svg
                                          width="16"
                                          height="16"
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="gray"
                                          viewBox="0 0 16 16"
                                        >
                                          <path d="M8 0l2.074 5.227h5.926l-4.782 3.662 1.853 5.425L8 12.854l-4.071 1.46 1.853-5.425L0 5.227h5.926z" />
                                        </svg>
                                        <svg
                                          width="16"
                                          height="16"
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="gray"
                                          viewBox="0 0 16 16"
                                        >
                                          <path d="M8 0l2.074 5.227h5.926l-4.782 3.662 1.853 5.425L8 12.854l-4.071 1.46 1.853-5.425L0 5.227h5.926z" />
                                        </svg>
                                      </div>
                                      <p class="comment-desc mt-2">
                                        It is a long established fact that a
                                        reader will be distracted by the
                                        readable content of a page when looking
                                        at its layout.
                                      </p>
                                      <div class="d-flex align-items-center justify-content-between">
                                        <div class="d-flex py-2">
                                          <span class="comment-title font-sm">
                                            Greatness Marshall
                                          </span>{" "}
                                          &nbsp; | &nbsp;
                                          <span class="comment-meta">
                                            22 Jun 2020
                                          </span>
                                        </div>
                                        <p class="comment-replay-btn">
                                          {" "}
                                          Was this review helpful ? &nbsp;
                                          &nbsp;{" "}
                                          <span
                                            className="p-4 bg-gray shadow-0"
                                            style={{
                                              borderRadius: "20px",
                                              background: "light-gray",
                                            }}
                                          >
                                            <em
                                              class="ni ni-thumbs-up"
                                              style={{ fontSize: "20px" }}
                                            >
                                              {" "}
                                              2{" "}
                                            </em>
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                              {/* <div class="add-comment-wrap">
                                    <h4 class="mb-1">Leave a review</h4>
                                    <p class="comment-desc">Your email address will not be published. Required fields are marked *</p>
                                    <form action="#" class="mt-4">
                                        <div class="row g-gs">
                                            <div class="col-lg-6">
                                                <div class="form-floating"><input type="text" class="form-control" id="floatingInputName" placeholder="Name" /><label for="floatingInputName">Name</label></div>
                                            </div>
                                            <div class="col-lg-6">
                                                <div class="form-floating"><input type="email" class="form-control" id="floatingInputEmail" placeholder="name@example.com" /><label for="floatingInputEmail">Email</label></div>
                                            </div>
                                            <div class="col-lg-12">
                                                <div class="form-floating"><textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea><label for="floatingTextarea">Comments</label></div>
                                            </div>
                                            <div class="col-lg-12"><button type="submit" class="btn btn-dark">Post Comment</button></div>
                                        </div>
                                    </form>
                                </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export async function getServerSideProps({ params }) {
  const getProductById = async (id) => {
    try {
      const response = await api.get(`product/${id}/`);
      const data = await response.data;
      return data;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      return null;
    }
  };
  const productData = await getProductById(params.id);

  return {
    props: {
      product: productData?.data || null,
    },
  };
}

export default ProductDetailsPage;
