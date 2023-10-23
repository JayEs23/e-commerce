import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "@/utils/api";
import SearchItemCard from "../components/SearchItemCard";
import { getAllProducts } from "@/pages/api/products";
import { fetchProductsByFilter } from "@/hooks/redux/reducers/product/productReducers";
import { categories } from "@/utils/categoriesEnum";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

const SearchPage = () => {
  const router = useRouter();
  const query = router.query.search;
  const [searchQuery, setSearchQuery] = useState(query || "");
  const [searchResults, setSearchResults] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [cart, setCart] = useState([]);
  const [brands, setBrands] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minRating, setMinRating] = useState(0);

  const dispatch = useDispatch();

  const scrollToTop = () => {
    // Scroll to the top of the page
    window.scrollTo({ top: 4, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `product/all_products/?product_name=${searchQuery}&description=${searchQuery}`
        );
        const data = await response.data.results[0].data;
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    const fetchBrands = async () => {
      try {
        const response = await api.get(`product/categories/`);
        const data = await response.data;
        console.log(data);
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [searchQuery]);

  useEffect(() => {
    let filter = "";
    if (searchQuery)
      filter += `product_name=${searchQuery}&description=${searchQuery}`;
    if (category) filter += `category=${category}`;
    // if (brand) endpoint += `brand=${brand}&`;
    // if (minRating) endpoint += `min_rating=${minRating}&`;
    // if (minPrice) endpoint += `min_price=${minPrice}&`;
    // if (maxPrice) endpoint += `max_price=${maxPrice}&`;
    dispatch(fetchProductsByFilter(filter));
    scrollToTop();
  }, [dispatch, searchQuery, category]);

  const { filteredProducts } = useSelector((state) => state.products);

  console.log(filteredProducts?.results, "ghjgbjkbnjksnbhjb");

  const searchedProducts = filteredProducts?.results;

  useEffect(() => {
    const fetchCart = async () => {
      if (!Cookies.get("authToken")) return;
      try {
        const response = await api.get("order/cart/");
        const data = await response.data.data;
        console.log("VCart Data", data);
        setCart(data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    setSortBy(selectedSort);

    let sortedResults = [...searchResults];

    if (selectedSort === "LowestPrice") {
      sortedResults.sort((a, b) => a.product_price - b.product_price);
    } else if (selectedSort === "HighestPrice") {
      sortedResults.sort((a, b) => b.product_price - a.product_price);
    }

    setSearchResults(sortedResults);
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter products based on the search query
    const results = searchResults.filter((product) => {
      if (product.name && product.description) {
        return (
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
        );
      }
      return false;
    });

    setSearchResults(results);
  };

  return (
    <>
      <Head>
        <title>Inshopper Ecommerce - Search</title>
      </Head>
      <div className="page">
        <Header searchQuery={searchQuery} handleSearch={handleSearch} />
        <main className="bg-main bg-light">
          <section className="product-area shop-sidebar shop section">
            {/* Sidebar code here */}
          </section>
          <div className="container mt-1">
            <div className="row mt-4">
              <div className="col-12 mt-4">
                <div className="section-title d-flex justify-content-between align-center">
                  <div className="section-title-left">
                    {/* <span>{searchResults.length || 0} products Found</span> */}
                    <h2>Search Result - {searchQuery}</h2>
                  </div>
                  <div className="section-title-right d-flex flex-column card pt-2 px-2 text-dark ">
                    <div className="d-flex m-0">
                      <label className="text-nowrap p-2">Sort By </label>
                      <select
                        className="form-select"
                        value={sortBy}
                        defaultValue={"BestIn"}
                        onChange={handleSortChange}
                      >
                        <option value="Popularity">Popularity</option>
                        <option value="BestIn">Best In</option>
                        <option value="Best Rating">Best Rating</option>
                        <option value="LowestPrice">Lowest Price</option>
                        <option value="HighestPrice">Highest Price</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              {/* <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={handleSearch}
              /> */}
              <div className="row mt-3">
                <div className="col-md-3 bg-white mx-0 vh-100 d-none d-md-block">
                  <div className="card">
                    <div className="accordion pt-4" id="sideAccordion">
                      <div className="accordion-item border-0">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button bg-white border-0"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#category"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            Category
                          </button>
                        </h2>
                        <div
                          id="category"
                          className="accordion-collapse collapse show border-0"
                          data-bs-parent="#sideAccordion"
                        >
                          <div className="accordion-body border-0">
                            {categories.map((category, index) => (
                              <div className="form-check" key={index}>
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="categoryChoice"
                                  value={category.name}
                                  onChange={(e) => setCategory(e.target.value)}
                                  id={`categoryChoice${index}`}
                                />
                                <label
                                  className="form-check-label text-black"
                                  htmlFor={`categoryChoice${index}`}
                                >
                                  {category.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Add the "Brand" section with checkboxes */}
                      <div className="accordion-item border-0">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button bg-white border-0"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#brand"
                            aria-expanded="true"
                            aria-controls="brand"
                          >
                            Brand
                          </button>
                        </h2>
                        <div
                          id="brand"
                          className="accordion-collapse collapse show"
                          data-bs-parent="#sideAccordion"
                        >
                          <div className="accordion-body">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="brand1"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="brand1"
                              >
                                Brand 1
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="brand2"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="brand2"
                              >
                                Brand 2
                              </label>
                            </div>
                            {/* Add more brand options as needed */}
                          </div>
                        </div>
                      </div>

                      {/* Continue with other accordion sections */}
                      {/* Took out the "Colors" section */}

                      {/* Add the "Price" section */}
                      <div className="accordion-item border-0">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button bg-white border-0"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#price"
                            aria-expanded="false"
                            aria-controls="price"
                          >
                            Price
                          </button>
                        </h2>
                        <div
                          id="price"
                          className="accordion-collapse collapse show"
                          data-bs-parent="#sideAccordion"
                        >
                          <div className="accordion-body">
                            <input
                              type="range"
                              min="0"
                              value={50}
                              max="100"
                              className="w-100"
                            />
                            <label>Max. $100.00</label>
                          </div>
                        </div>
                      </div>

                      {/* Add the "Reviews" section */}
                      <div className="accordion-item border-0">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button bg-white border-0"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#reviews"
                            aria-expanded="false"
                            aria-controls="reviews"
                          >
                            Reviews
                          </button>
                        </h2>
                        <div
                          id="reviews"
                          className="accordion-collapse collapse show"
                          data-bs-parent="#sideAccordion"
                        >
                          <div className="accordion-body">
                            {/* Add review filters with checkboxes */}
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="review5"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="review5"
                              >
                                5 Stars
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="review4"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="review4"
                              >
                                4 Stars & Up
                              </label>
                            </div>
                            {/* Add more review options as needed */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-9 rounded d-block">
                  <div className="row ">
                    {filteredProducts?.count > 0 ? (
                      searchedProducts[0]?.data?.map((product) => (
                        <SearchItemCard
                          key={product.id}
                          product={product}
                          cartData={cart}
                        />
                      ))
                    ) : (
                      <p className="text-black">No results found.</p>
                    )}
                    {categories?.map((category) => {
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="categoryChoice"
                          id="categoryChoice1"
                        />
                        <label
                          className="form-check-label"
                          for="categoryChoice1"
                        >
                          {/* {category} */} Test
                        </label>
                      </div>;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default SearchPage;
