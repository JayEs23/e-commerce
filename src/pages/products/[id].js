import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
      <title>Your Ecommerce - {name}</title>
    </Head>
    <div className="page-container bg-gray">
    <Navbar />
    <div className="content font-sm  p-4">
      <div className="row ml-4 mr-4 border-rounded" style={{padding:"10px", backgroundColor:"#fafafa"}}>
        <div className="col-xl-5">
          <Image className="img-fluid w-100 h-400 pr-4" src={image} alt={name} />
        </div>
        <div className="col-xl-6">
          <h3 className="title font-weight-bold">{name}</h3>
          <p className="font-sm" style={{ fontFamily:"Roboto"}}>{description} <br />I recently purchased this laptop and I must say it has exceeded my expectations. The performance is outstanding, allowing me to smoothly run multiple applications simultaneously without any lag or slowdown. The processor and RAM combination really delivers in terms of speed and efficiency.</p>
          <div className="row bg-gray ml-1 pl-2 w-100 h-200">
            
            <div className="col-3 pt-4">
              <p>Colors</p>
              <a href="#" className="notification mr-2 bg-success">
                <i className="fa fa-shar font-sm  p-2" ></i>
              </a>
              <a href="#" className="notification mr-2 bg-warning">
                <i className="fa fa-shar font-sm p-2" ></i>
              </a>
              <a href="#" className="notification mr-2 bg-info">
                <i className="fa fa-shar font-sm p-2" ></i>
              </a>
            </div>
            <div className="col-2 pt-4">
              <p>Size</p>
              <input className="form-control form-control-sm custom-input" type="number" placeholder="3" style={{backgroundColor:"inherit", border:"1px solid gray", borderRadius:"4px"}} />
            </div>
            <div className="col-2 pt-4">
              <p>Quantity</p>
              <input className="form-control form-control-sm custom-input" type="number" placeholder="3" style={{backgroundColor:"inherit", border:"1px solid gray", borderRadius:"4px"}} />
            </div>
            <div className="col-4 pt-4 ml-4 pl-4">
              <p>&nbsp;</p>
              <a href="#" className="notification mr-2">
                <i className="fa fa-share font-sm text-notif p-2" ></i>
              </a>
              <a href="" className="notification ml-2 mr-0">
                <i className="fa fa-heart font-sm text-notif p-2"></i>
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
                  <button className="btn btn-lg btn-success ml-2">Add to Cart</button>
                  <button className="btn btn-lg btn-success ml-2">Add to Cart</button>

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
  const productIds = [1, 2, 3]; // Replace with actual product ids
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
