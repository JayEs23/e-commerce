/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import api from "@/utils/api"; // Import `api`
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "@/hooks/redux/reducers/product/productReducers";
import BargainMain from "../../components/product/BargainMain";
import { fetchCart } from "@/hooks/redux/reducers/cart/cartReducer";
import { ColorCircles } from "@/components/product/ColorVarient";

const ProductDetailsPage = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [index, setIndex] = useState(0);
  const [totalPrice, setTotalPrice] = useState(
    product?.variations[index]?.price
  );

  const router = useRouter();
  // const { id } = router.query;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);
  const { cart } = useSelector((state) => state.cart);

  // useEffect(() => {
  //   dispatch(fetchProductById(id));
  // }, [dispatch, id]);

  // const product = useSelector((state) => state.products?.singleProduct?.data);

  // console.log("Checking products", cart);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
    setTotalPrice(product?.variations[index]?.price * newQuantity);
  };

  const price = product?.variations[index]?.price * quantity;

  console.log(totalPrice, quantity);

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
                      src={product?.images[index]?.image}
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
                          <div className="me-5 me-sm-2">
                            <ColorCircles
                              variations={product?.variations}
                              setIndex={setIndex}
                              setTotalPrice={setTotalPrice}
                              setQuantity={setQuantity}
                              price={parseFloat(
                                product?.variations[index]?.price
                              )}
                            />
                          </div>
                        </div>
                        <div className="col-sm-2 pt-2">
                          <p>Size</p>
                          <input
                            className="form-control"
                            type="text"
                            placeholder={product?.variations[index]?.size}
                            readOnly
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
                            min={1}
                            style={{
                              backgroundColor: "inherit",
                              border: "1px solid gray",
                              borderRadius: "4px",
                            }}
                            value={quantity}
                            inputMode="numeric"
                            onChange={handleQuantityChange}
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
                            {parseFloat(price).toLocaleString("en-NG", {
                              style: "currency",
                              currency: "NGN",
                            })}
                          </h2>
                        </div>
                        <div className="col-sm-6">
                          <BargainMain
                            product={product}
                            setQuantity={setQuantity}
                            quantity={quantity}
                            price={price}
                            totalPrice={totalPrice}
                            showAddToCart={true}
                            index={index}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl-12 col-lg-10">
                        <p className="pt-2">Seller information</p>
                        <div className="card-creator-v card-creator-v-wbg">
                          <div className="card-body">
                            <div className="card-creator-info">
                              <a
                                href="#"
                                className="avatar flex-shrink-0 bg-dark py-4 px-3 align-content-center"
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
                              <div className="flex-grow-1">
                                <a href="#" className="card-title">
                                  {product?.store_id}
                                </a>
                                {/* <div className="flex-grow-1">
                                  <a href="#" className="card-title">
                                    {product?.store_id}
                                  </a>
                                </div> */}
                              </div>
                            </div>
                          </div>
                          <div className=""></div>
                        </div>
                        {/* <div className="mt-4 ">
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
                        </div> */}
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
                          <div className="row g-gs mb-4 pb-4">
                            <p>
                              The first step for this tool is to give it some
                              code. You can do this in one of four ways. You can
                              hit the BROWSE button to upload a file from your
                              computer. Alternatively, you could drag and drop a
                              file onto the code field or just paste some code
                              you previously copied. Finally, you could also hit
                              the LOAD URL button to select a web page to
                              upload. However, for that to work, the page in
                              question needs to support cross-origin requests.
                            </p>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="reviews"
                          role="tabpanel"
                          aria-labelledby="reviews-tab"
                        >
                          <div className="row g-gs mb-4 py-4">
                            <div
                              className="col-xl-7 col-lg-12 col-sm-12 comment-wrapper mt-5"
                              id="comments"
                            >
                              <ul className="comments mb-5">
                                <li>
                                  <div className="comment">
                                    <div className="comment-body">
                                      <div className="comment-stars d-flex align-items-center">
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
                                      <p className="comment-desc mt-2">
                                        It is a long established fact that a
                                        reader will be distracted by the
                                        readable content of a page when looking
                                        at its layout.
                                      </p>
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex py-2">
                                          <span className="comment-title font-sm">
                                            Greatness Marshall
                                          </span>{" "}
                                          &nbsp; | &nbsp;
                                          <span className="comment-meta">
                                            22 Jun 2020
                                          </span>
                                        </div>
                                        <p className="comment-replay-btn">
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
                                              className="ni ni-thumbs-up"
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
                                  <div className="comment">
                                    <div className="comment-body">
                                      <div className="comment-stars d-flex align-items-center">
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
                                      <p className="comment-desc mt-2">
                                        It is a long established fact that a
                                        reader will be distracted by the
                                        readable content of a page when looking
                                        at its layout.
                                      </p>
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex py-2">
                                          <span className="comment-title font-sm">
                                            Greatness Marshall
                                          </span>{" "}
                                          &nbsp; | &nbsp;
                                          <span className="comment-meta">
                                            22 Jun 2020
                                          </span>
                                        </div>
                                        <p className="comment-replay-btn">
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
                                              className="ni ni-thumbs-up"
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
                              {/* <div className="add-comment-wrap">
                                    <h4 className="mb-1">Leave a review</h4>
                                    <p className="comment-desc">Your email address will not be published. Required fields are marked *</p>
                                    <form action="#" className="mt-4">
                                        <div className="row g-gs">
                                            <div className="col-lg-6">
                                                <div className="form-floating"><input type="text" className="form-control" id="floatingInputName" placeholder="Name" /><label for="floatingInputName">Name</label></div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-floating"><input type="email" className="form-control" id="floatingInputEmail" placeholder="name@example.com" /><label for="floatingInputEmail">Email</label></div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-floating"><textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea><label for="floatingTextarea">Comments</label></div>
                                            </div>
                                            <div className="col-lg-12"><button type="submit" className="btn btn-dark">Post Comment</button></div>
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
