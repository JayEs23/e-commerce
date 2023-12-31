import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import api from '@/utils/api';
import SearchItemCard from '@/components/SearchItemCard';
import { getAllProducts } from '@/pages/api/products';

const SearchPage = () => {
  const router = useRouter();
  const { search } = router.query;
  const [searchQuery, setSearchQuery] = useState(search || '');
  const [searchResults, setSearchResults] = useState([]);
  const [sortBy, setSortBy] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await await api.get('product/all_products/');
        const data = await response.data;
        console.log(data);
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    let sortedResults = [...searchResults];

    if (sortBy === 'price-low-to-high') {
      sortedResults.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high-to-low') {
      sortedResults.sort((a, b) => b.price - a.price);
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
        <Navbar />
        <main className="bg-main">
          <section className="product-area shop-sidebar shop section">
            {/* Sidebar code here */}
          </section>
          <div className="container mt-4">
            <div className="row bg-light mt-4">
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
                    search sidebar goes here
                  </div>
                  <div className="col-md-9 rounded d-block">
                    <div className="row ">
                    {searchResults.length > 0 ? (
                      searchResults.map((product) => (
                        <SearchItemCard key={product.id} product={product} />
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
