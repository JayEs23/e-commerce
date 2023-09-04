import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import api from '@/utils/api';
import SearchItemCard from './components/SearchItemCard';
import { getAllProducts } from '@/pages/api/products';

const SearchPage = () => {
  const router = useRouter();
  const { search } = router.query;
  const [searchQuery, setSearchQuery] = useState(search || '');
  const [searchResults, setSearchResults] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [cart,setCart]= useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('product/all_products/');
        const data = await response.data;
        console.log(data);
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);
  
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await api.get('order/cart/');
        const data = await response.data;
        console.log("VCart Data",data);
        setCart(data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []);

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    setSortBy(selectedSort);
  
    let sortedResults = [...searchResults];
  
    if (selectedSort === 'LowestPrice') {
      sortedResults.sort((a, b) => a.product_price - b.product_price);
    } else if (selectedSort === 'HighestPrice') {
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
        <Header />
        <main className="bg-main bg-light">
          <section className="product-area shop-sidebar shop section">
            {/* Sidebar code here */}
          </section>
          <div className="container mt-1">
            <div className="row mt-4">
              <div className="col-12 mt-4">
                <div className="section-title d-flex justify-content-between align-center">
                  <div className="section-title-left">
                    <span>{searchResults.length} items Found</span>
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
                    <div class="accordion pt-4" id="sideAccordion">
                      <div class="accordion-item border-0">
                        <h2 class="accordion-header">
                          <button class="accordion-button bg-white border-0" type="button" data-bs-toggle="collapse" data-bs-target="#category" aria-expanded="true" aria-controls="collapseOne">
                            Category
                          </button>
                        </h2>
                        <div id="category" class="accordion-collapse collapse show border-0" data-bs-parent="#sideAccordion">
                          <div class="accordion-body border-0">
                          </div>
                        </div>
                      </div>
                        <div class="accordion-item border-0">
                          <h2 class="accordion-header">
                            <button class="accordion-button bg-white border-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                              Brand
                            </button>
                          </h2>
                          <div id="collapseTwo" class="accordion-collapse collapse show" data-bs-parent="#sideAccordion">
                            <div class="accordion-body">
                            </div>
                          </div>
                        </div>
                        <div class="accordion-item border-0">
                          <h2 class="accordion-header">
                            <button class="accordion-button bg-white border-0" type="button" data-bs-toggle="collapse" data-bs-target="#colors" aria-expanded="false" aria-controls="collapseThree">
                              Colors
                            </button>
                          </h2>
                          <div id="colors" class="accordion-collapse collapse show" data-bs-parent="#sideAccordion">
                            <div class="accordion-body">
                            </div>
                          </div>
                        </div>
                        <div class="accordion-item">
                          <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#price" aria-expanded="false" aria-controls="collapseThree">
                              Price
                            </button>
                          </h2>
                          <div id="price" class="accordion-collapse collapse show" data-bs-parent="#sideAccordion">
                            <div class="accordion-body">
                            </div>
                          </div>
                        </div>
                        <div class="accordion-item">
                          <h2 class="accordion-header">
                            <button class="accordion-button bg-white border-0" type="button" data-bs-toggle="collapse" data-bs-target="#reviews" aria-expanded="false" aria-controls="collapseThree">
                              Reviews
                            </button>
                          </h2>
                          <div id="reviews" class="accordion-collapse collapse show" data-bs-parent="#sideAccordion">
                            <div class="accordion-body">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-9 rounded d-block">
                    <div className="row ">
                    {searchResults.length > 0 ? (
                      searchResults.map((product) => (
                        <SearchItemCard key={product.id} product={product} cartData={cart} />
                      ))
                    ) : (

                      <p>No results found.</p>
                    )}</div>
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
