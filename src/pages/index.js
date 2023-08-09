import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '@/styles/Home.module.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import api from '@/utils/api';
import HeroSidebar from '@/components/HeroSidebar';
import ProductApi from '@/pages/api/products';


export default function Home() {
  const productApi = ProductApi();

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      const products = await productApi.getFeaturedProducts();
      setFeaturedProducts(products);
    };
    
    fetchFeaturedProducts();
  }, []);

  return (
    <>
      <Head>
        <title>Inshopper Ecommerce</title>
      </Head>
      <div className="page">
        <Navbar />
        <main className="bg-main">
        <div className="row ml-2 mr-2 bg-light">
            <div className="col-xl-3 d-none d-xl-block">
              <HeroSidebar />
            </div>
            <div className="col-xl-9 col-lg-12 h-400">
              <Hero />
            </div>
          </div>
          <div className="container-fluid pt-5">
            <div className="mb-4">
              <h2 className="px-5">Discounted Products</h2>
            </div>
            <div className="row px-xl-5 pb-3">
              {featuredProducts.map((product, index) => (
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
