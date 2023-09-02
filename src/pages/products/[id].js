/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoginModal from '@/components/LoginModal';
import api from '@/utils/api'; // Import `api`
import Image from 'next/image';
import ProductApi from '@/pages/api/products';
import AddToCartButton from '../components/cart/AddToCartButton';
import Bargain from '../components/product/Bargain';


const ProductDetailsPage = () => {
  const productApi = ProductApi();
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Use the productApi module to get product by ID
        const productData = await productApi.getProductById(id);
        console.log("Data",productData);
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product by ID:', error);
      }  
    };

    if (id && !product) {
      fetchProduct();
    }
  }, [id,product,productApi]);

  // if (!product) {
  //   return (
  //     <div>
  //       <p>Loading...</p>
  //     </div>
  //   );
  // }

  return (
    <><Head>
    <title>Product - {product?.product_name} | Inshopper</title>
  </Head>
  <div className="page-container bg-gray">
    <Header />
    <div className="content row mt-4">
      <div className=" card col-lg-10 mx-auto mt-4">
        {product &&(
        <div className="row" style={{padding:"0px", backgroundColor:"#fafafa"}}>
          <div className="col-xl-6 card bg-white pt-4">
            <img className="img-fluid h-400 mb-4" src={product?.image} alt={product?.product_name} />
          </div>
          <div className="col-xl-6 ">
            <h3 className="title font-weight-bold text-dark my-4 mx-2">{product?.product_name}</h3>
            <p className="mx-2 mb-4">{product?.description} <br />
            </p>
            <div className="row card h-200 bg-gray mx-2 mt-4">
              <div className="col-sm-4 pt-2">
                <p className="row mx-2 text-dark">Colors</p>
                <section className="d-flex">
                  <a href="#" className="icon-btn mx-1 bg-success">
                    <i className="fa fa-shar font-sm  p-4" ></i>
                  </a>
                  <a href="#" className="icon-btn mx-1 bg-warning">
                    <i className="fa fa-shar font-sm p-4" ></i>
                  </a>
                  <a href="#" className="icon-btn mx-1 bg-info">
                    <i className="fa fa-shar font-sm p-4" ></i>
                  </a>
                </section>
                
              </div>
              <div className="col-sm-2 pt-2">
                <p>Size</p>
                <input className="form-control" type="number" placeholder="3" style={{backgroundColor:"inherit", border:"1px solid gray", borderRadius:"4px"}} />
              </div>
              <div className="col-2 pt-2">
                <p>Quantity</p>
                <input className="form-control" type="number" placeholder="1" style={{backgroundColor:"inherit", border:"1px solid gray", borderRadius:"4px"}} />
              </div>
            </div>

              
            <p className="pt-2">Seller information</p>
          
            <div className="row" style={{padding:"2px", marginLeft:"0px !important", backgroundColor:"#fafafa"}}>
                <div className="col-12 mx-auto">
                  <h2 className="ml-4 p-0" style={{color:"#fd5a33",fontWeight:"bold"}}>
                    {product?.product_price.toLocaleString("en-NG", { style: "currency", currency: "NGN" })}
                  </h2>
                </div>
                <div className="col-6"></div>
              </div> <p className="pt-2">Seller information</p>
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
