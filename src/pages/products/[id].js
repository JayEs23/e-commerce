import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoginModal from '@/components/LoginModal';
import { getProductById } from '@/pages/api/products';
import Image from 'next/image';

const ProductDetailsPage = ({ product }) => {
  // Check if the product is defined before accessing its properties
  if (!product) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  const { name, description, price, image } = product;

  return (
      <><Head>
        <title>Product - {name} | Inshopper</title>
      </Head>
      <div className="page-container">
        <Navbar />
        <div className="content row mt-4">
          <div className=" card col-lg-11 mx-auto">
            <div className="row" style={{padding:"0px", backgroundColor:"#fafafa"}}>
              <div className="col-xl-5 card bg-white pt-4">
                <img className="img-fluid h-400 mb-4" src={image} alt={name} />
              </div>
              {/* <div className="col-xl-6">
                <h3 className="title font-weight-bold">{name}</h3>
                <p className="font-sm">{description} <br />
                </p>
                <div className="row bg-gray ml-1 pl-2 w-100 h-200">
                  
                  <div className="col-4 pt-4">
                    <p>Colors</p>
                    <a href="#" className="notification bg-success">
                      <i className="fa fa-shar font-sm  p-4" ></i>
                    </a>
                    <a href="#" className="notification bg-warning">
                      <i className="fa fa-shar font-sm p-4" ></i>
                    </a>
                    <a href="#" className="notification bg-info">
                      <i className="fa fa-shar font-sm p-4" ></i>
                    </a>
                  </div>
                  <div className="col-2 pt-4">
                    <p>Size</p>
                    <input className="form-control" type="number" placeholder="3" style={{backgroundColor:"inherit", border:"1px solid gray", borderRadius:"4px"}} />
                  </div>
                  <div className="col-2 pt-4">
                    <p>Quantity</p>
                    <input className="form-control" type="number" placeholder="3" style={{backgroundColor:"inherit", border:"1px solid gray", borderRadius:"4px"}} />
                  </div>
                  <div className="col-6 justify-content-end">
                    <p>&nbsp;</p>
                    <a href="#" className="notification mr-2 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
                      </svg>
                    </a>
                    <a href="" className="notification ml-2 mr-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="black">
                        <path d="M12 21.35l-1.45-1.32C5.4 16.03 2 12.58 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 4.08-3.4 7.53-8.55 11.54L12 21.35z"/>
                    </svg>
                    </a>
                
                  </div>
                  <hr style={{ backgroundColor:"gray"}} />
                  <div className="row" >
                    <div className="col-6">
                      <h2 className="ml-4 p-0" style={{color:"#fd5a33",fontWeight:"bold"}}>
                        {price.toLocaleString("en-NG", { style: "currency", currency: "NGN" })}
                      </h2>
                    </div>
                    <div className="col-6 d-flex">
                        {/* <LoginModal /> }
                        <button className="btn text-nowrap btn-primary-outline">Add to Cart</button>
                        <button className="btn text-nowrap">Add to Cart</button>

                    </div>
                  </div>

                </div>

                  
                <p className="pt-2">Seller information</p>
              
                <div className="row" style={{padding:"2px", marginLeft:"0px !important", backgroundColor:"#fafafa"}}>
                    <div className="col-12 mx-auto">
                      <h2 className="ml-4 p-0" style={{color:"#fd5a33",fontWeight:"bold"}}>
                        {price.toLocaleString("en-NG", { style: "currency", currency: "NGN" })}
                      </h2>
                    </div>
                    <div className="col-6"></div>
                  </div> <p className="pt-2">Seller information</p>
              </div> */}
            </div>
          </div>
        </div>
      <Footer />
    </div>
    </>
  );
};

export async function getStaticPaths() {
  // Implement API call to fetch all product ids
  const productIds = [1, 2, 3,4,5,6,7,8,9,10]; // Replace with actual product ids
  const paths = productIds.map((id) => ({ params: { id: id.toString() } }));
  return { paths, fallback: false };
}
export async function getStaticProps({ params }) {
  const productId = parseInt(params.id, 10); // Convert id to an integer
  const product = await getProductById(productId); // Implement API call to fetch product by id

  if (!product) {
    // If the product is not found, return a 404 page
    return { notFound: true };
  }

  return { props: { product } };
}

export default ProductDetailsPage;
