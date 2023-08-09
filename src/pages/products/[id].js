import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoginModal from '@/components/LoginModal';
import ProductApi from '@/pages/api/products';
import api from '@/utils/api'; // Don't forget to import `api`

import Image from 'next/image';

const ProductDetailsPage = ({ product }) => {
  if (!product) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  const { name, description, price, image } = product;

  return (
    <>
      <Head>
        <title>Product - {name} | Inshopper</title>
      </Head>
      <div className="page-container">
        <Navbar />
        <div className="content row mt-4">
          <div className=" card col-lg-11 mx-auto">
            {/* Rest of your component */}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export async function getServerSideProps({ params }) {
  const productId = params.id;

  try {
    const response = await api.get(`product/${productId}/`);
    const product = await response.data;
    return { props: { product } };
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return { notFound: true };
  }
}

export default ProductDetailsPage;
