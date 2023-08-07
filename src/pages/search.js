import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getAllProducts } from '@/pages/api/products';

const SearchPage = ({ allProducts }) => {
    
    const router = useRouter();
    const { search } = router.query;
    const [searchQuery, setSearchQuery] = useState(search || '');
    const [searchResults, setSearchResults] = useState([]);
  

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter products based on the search query
    const results = allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
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

          </section>
          <div className="container mt-4">
            <div className="row bg-light mt-4">
            <div class="col-12 mt-4">
              <div class="section-title d-flex justify-content-between align-center">
<div class=" section-title-left">
  <span class="">{searchResults.length} items Found</span>
    <h2>Search Result - {searchQuery}</h2>
</div>
<div class="section-title-right">
<a href="#">View More <i class="far fa-long-arrow-right"></i></a>
</div>
</div>
</div>
                {/* <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={handleSearch}
                /> */}
                <div className="row">
                  {searchResults.length > 0 ? (
                    searchResults.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))
                  ) : (
                    <p>No results found.</p>
                  )}
                </div>
              </div>
            </div>
          </main>
        <Footer />
      </div>
    </>
  );
};

export async function getStaticProps() {
  const allProducts = getAllProducts();
  return {
    props: {
      allProducts,
    },
  };
}

export default SearchPage;
