import React from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const EmptyPage = () => {
  return (
    <>
    <Head>
        <title>Inshopper Ecommerce - Empty Page</title>
      </Head>
      <div className="page-container bg-gray">
        <Header />
        <div className="content font-sm p-4">
          <div className="row">
            <div className="col-lg-8">
              {/* Your content here */}
            </div>
            <div className="col-lg-4">
              {/* Your content here */}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default EmptyPage;
