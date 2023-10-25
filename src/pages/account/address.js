import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import useAuth from "@/hooks/useAuth";
import api from "@/utils/api";
import Cookies from "js-cookie";
import Sidebar from "../../components/user/SideBar";
import AddressBox from "../../components/user/AddressBox";

const AddressPage = () => {
  const { isAuthenticated, logout } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    alternate_phone_number: "",
    address_tag: "",
    city: "",
    state: "",
    additional_information: "",
    delivery_address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/customer/shipping-address/", formData);
      // onAdd(response.data); // Call the provided onAdd function to update the list
      handleEdit(false);
      fetchAddresses();
      setFormData({
        first_name: "",
        last_name: "",
        phone_number: "",
        alternate_phone_number: "",
        address_tag: "",
        city: "",
        state: "",
        additional_information: "",
        delivery_address: "",
        billing_address: "",
      });
    } catch (error) {
      console.error("Error adding new address:", error);
    }
  };

  useEffect(() => {
    if (!Cookies.get("authToken")) {
      window.location.href = "/login";
    } else {
      fetchUserProfile();
      fetchAddresses();
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get("authentication/user_profile");
      setUserProfile(response.data);
      console.log("User Profile", response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAddresses = async () => {
    try {
      const response = await api.get("customer/shipping-address");
      setAddresses(response.data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const handleEdit = (status) => {
    if (status) {
      setEditing(true);
    } else {
      setEditing(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <Head>
          <title>Inshopper Ecommerce - Account Address Box</title>
        </Head>
        <div className="page-container bg-gray">
          <Header />
          <section className="content section-space-b pt-4 mt-md-3">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-10 mx-auto align-items-center">
                  <center>
                    <h1 className="justify-content-center">
                      <span
                        className="spinner-border spinner-border-lg"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    </h1>
                  </center>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Inshopper Ecommerce - Account Address Box</title>
      </Head>
      <div className="page-container bg-gray">
        <Header />
        <section className="content section-space-b pt-4 mt-md-3">
          <section className="profile-section">
            <div className="container">
              {!editing ? (
                <>
                  <div className="row">
                    <div className="col-lg-3 bg-white mx-4 mb-4 border-rounded">
                      <Sidebar userProfile={userProfile} />
                    </div>
                    <div className="col-lg-8 bg-white">
                      <div className="row card bg-white">
                        <div className="card-body">
                          <div className="row my-2">
                            <div className="col-lg-8">
                              <h3 className="card-title m-2 mb-4">
                                Address Box
                              </h3>
                            </div>
                            <div className="col-lg-2 mx-auto text-nowrap">
                              <button
                                className="btn btn-primary"
                                onClick={() => handleEdit(true)}
                              >
                                <em className="ni ni-plus"></em>
                                &nbsp; Add Address
                              </button>
                            </div>
                          </div>
                          {userProfile ? (
                            <>
                              <section className="bg-gray card mb-4">
                                <div className="row bg-gray m-2 pt-4">
                                  <div className="col-10">
                                    <p className="title">
                                      Personal Information
                                    </p>
                                  </div>
                                  <div className="col-2">
                                    <button
                                      className="btn"
                                      onClick={() => handleEdit(true)}
                                    >
                                      <em className="ni ni-edit"></em> Edit
                                    </button>
                                  </div>
                                </div>
                                <div className="row m-2">
                                  <div className="col-6">
                                    <p>First Name</p>
                                    <label>
                                      <b>{userProfile?.first_name}</b>
                                    </label>
                                  </div>
                                  <div className="col-6">
                                    <p>Last Name</p>
                                    <label>
                                      <b>{userProfile?.last_name}</b>
                                    </label>
                                  </div>
                                </div>
                                <div className="row m-2 mt-3">
                                  <div className="col-6">
                                    <p>Email Address</p>
                                    <label>
                                      <b>{userProfile?.email}</b>
                                    </label>
                                  </div>
                                  <div className="col-6">
                                    <p>Phone</p>
                                    <label>
                                      <b>{userProfile?.phone_number}</b>
                                    </label>
                                  </div>
                                </div>
                                <div className="row m-2">
                                  <div className="col-6">
                                    <p>Delivery Address</p>
                                    <label>
                                      <b>{userProfile?.address}</b>
                                    </label>
                                  </div>
                                  <div className="col-6">
                                    <p>Billing Address</p>
                                    <label>
                                      <b>{userProfile?.address}</b>
                                    </label>
                                  </div>
                                </div>
                              </section>
                            </>
                          ) : (
                            <>
                              <div
                                className="alert alert-danger d-flex mb-4"
                                role="alert"
                              >
                                <svg
                                  className="flex-shrink-0 me-3"
                                  width="30"
                                  height="30"
                                  viewBox="0 0 24 24"
                                  fill="#ff6a8e"
                                >
                                  <path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"></path>
                                </svg>
                                <p className="fs-14">
                                  No addresses for this user
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <form onSubmit={handleSubmit}>
                    <div className="row bg-white p-4 m-4 border-rounded">
                      <h3>Add New Address</h3>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="first_name" className="form-label">
                            First Name
                          </label>
                          <input
                            type="text"
                            name="first_name"
                            className="form-control form-control-lg"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="last_name" className="form-label">
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="last_name"
                            className="form-control form-control-lg"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label
                            htmlFor="delivery_address"
                            className="form-label"
                          >
                            Delivery Address
                          </label>
                          <textarea
                            name="delivery_address"
                            className="form-control form-control-lg"
                            rows={2}
                            value={formData.delivery_address}
                            style={{ maxHeight: "100px" }}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label
                            htmlFor="billing_address"
                            className="form-label"
                          >
                            Billing Address
                          </label>
                          <textarea
                            name="billing_address"
                            className="form-control form-control-lg"
                            value={formData.billing_address}
                            style={{ maxHeight: "100px" }}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label
                            htmlFor="additional_information"
                            className="form-label"
                          >
                            Additional Information
                          </label>
                          <textarea
                            name="additional_information"
                            className="form-control form-control-lg"
                            value={formData.additional_information}
                            style={{ maxHeight: "100px" }}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="state" className="form-label">
                            Region
                          </label>
                          <input
                            type="text"
                            name="state"
                            className="form-control form-control-lg"
                            value={formData.state}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="city" className="form-label">
                            City
                          </label>
                          <input
                            type="text"
                            name="city"
                            className="form-control form-control-lg"
                            value={formData.city}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="phone_number" className="form-label">
                            Phone Number
                          </label>
                          <input
                            type="text"
                            name="phone_number"
                            className="form-control form-control-lg"
                            value={formData.phone_number}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="alternate_phone_number"
                            className="form-label"
                          >
                            Alternate Phone Number
                          </label>
                          <input
                            type="text"
                            name="alternate_phone_number"
                            className="form-control form-control-lg"
                            value={formData.alternate_phone_number}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-2">
                          <label htmlFor="address_tag" className="form-label">
                            Address Tag
                          </label>
                          <input
                            type="text"
                            name="address_tag"
                            className="form-control form-control-lg"
                            value={formData.address_tag}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-12 text-center justify-content-end">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg p-4 mt-4 w-25"
                        >
                          Save Address
                        </button>
                      </div>
                    </div>
                  </form>
                </>
              )}
            </div>
          </section>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default AddressPage;
