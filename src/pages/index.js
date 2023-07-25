import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '@/styles/Home.module.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import HeroSidebar from '@/components/HeroSidebar';
import { getFeaturedProducts } from '@/pages/api/products';


export default function Home() {
  const [products, setProducts] = useState([]);
  

  useEffect(() => {
    async function fetchProducts() {
      const featuredProducts = await getFeaturedProducts();
      setProducts(featuredProducts);
    }

    if (products.length < 1) {
      fetchProducts();
    }
  }, [products]);

  return (
    <>
      <Head>
      <title>Inshopper Ecommerce</title>
      <meta name="description" content="" />
      <meta name="viewport" content="width=device-width, initial-scale=2.0" />
      <link rel="icon" href="/favicon.ico" />

      </Head>
      <div className="page-container">
        <Navbar />
        <main className="bg-main">
          <div className="row ml-2 mr-2 bg-light">
            <div className="col-xl-3 d-none d-xl-block">
              <HeroSidebar />
            </div>
            {/* Hero Column */}
            <div className="col-xl-9 col-lg-12 h-400">
              <Hero />
            </div>
          </div>
          <div className="container-fluid pt-5">
            <div className="mb-4">
              <h2 className="px-5">Discounted Products</h2>
            </div>
            <div className="row px-xl-5 pb-3">
              {/* Map through the products and pass the details to ProductCard */}
              {products.map((product, index) => (
                // <pre>{product}</pre>
                <ProductCard key={index} product={product} />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
