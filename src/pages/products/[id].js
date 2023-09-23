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
import { useSelector } from "react-redux";

const ProductDetailsPage = () => {
  const productApi = ProductApi();
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  const { cart } = useSelector((state) => state.cart);

  // console.log(cart);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Use the productApi module to get product by ID
        const productData = await productApi.getProductById(id);
        console.log("Data", productData.data);
        setProduct(productData?.data);
      } catch (error) {
        console.error("Error fetching product by ID:", error);
      }
    };

    if (id && !product) {
      fetchProduct();
    }
  }, [id, product, productApi]);

  // if (!product) {
  //   return (
  //     <div>
  //       <p>Loading...</p>
  //     </div>
  //   );
  // }

  return (
    <>
      <Head>
        <title>Product - {product?.product_name} | Inshopper</title>
      </Head>
      <div className="page-container bg-gray">
        <Header />
        <div className="content row mt-4">
          <div className=" card col-lg-10 mx-auto mt-4">
            {product && (
              <div
                className="row"
                style={{ padding: "0px", backgroundColor: "#fafafa" }}
              >
                <div className="col-xl-6 card bg-white pt-4">
                  <img
                    className="img-fluid h-400 mb-4 rounded-3"
                    src={product?.images[0].image}
                    alt={product?.product_name}
                  />

                  <div className="d-flex mb-5">
                    {product?.images?.slice(1).map((url, index) => (
                      <img
                        key={index}
                        src={url?.image}
                        className="w-25 mx-3 rounded-3"
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
                  <div className="card py-2 px-2 bg-gray mx-2 mt-4">
                    <div className="row align-items-center">
                      <div className="col-sm-4 pt-2">
                        <p className="row mx-2 text-dark">Colors</p>
                        <section className="d-flex">
                          <a href="#" className="icon-btn mx-1 bg-success">
                            <i className="fa fa-shar font-sm  p-4"></i>
                          </a>
                          <a href="#" className="icon-btn mx-1 bg-warning">
                            <i className="fa fa-shar font-sm p-4"></i>
                          </a>
                          <a href="#" className="icon-btn mx-1 bg-info">
                            <i className="fa fa-shar font-sm p-4"></i>
                          </a>
                        </section>
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
                          {product?.variations[0]?.price.toLocaleString(
                            "en-NG",
                            {
                              style: "currency",
                              currency: "NGN",
                            }
                          )}
                        </h2>
                      </div>
                      <div className="col-sm-6">
                        <Bargain product={product} cart={cart} />
                      </div>
                    </div>
                  </div>
                  <p className="pt-2">Seller information</p>
                  <div
                    className="row"
                    style={{
                      padding: "2px",
                      marginLeft: "0px !important",
                      backgroundColor: "#fafafa",
                    }}
                  >
                    <div className="col-12 mx-auto">
                      <h2
                        className="ml-4 p-0"
                        style={{ color: "#1B0C2E", fontWeight: "bold" }}
                      >
                        {product?.store_id}
                      </h2>
                    </div>
                    <div className="col-6"></div>
                  </div>{" "}
                  {/* <p className="pt-2">Seller information</p> */}
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ProductDetailsPage;
