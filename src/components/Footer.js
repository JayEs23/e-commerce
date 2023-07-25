import Image from "next/image";
import DownloadStore from "./DownloadStore";
const Footer = () => {
    return (
      <>
      <footer className=" d-flex flex-column mt-0 pt-2 footer-main">
        <div >
            <div className="row px-xl-5 pt-5">
                <div className="col-lg-2 col-md-12 mb-5 pr-3 pr-xl-5">
                    <h1 className="mb-2 display-0 font-weight-semi-bold">
                        <span className="">
                            <Image src="/inshopperlogo-dark.png" width="160" height="40" loading="lazy" alt="Inshopper Logo" />
                        </span>
                    </h1>
                    <p className="ml-4 text-white">Follow us on:</p>
                    <p className="ml-4">
                        <i className="font-weight-bold fa fa-facebook-f text-info mr-3"></i>
                        <i className="font-weight-bold fa fa-instagram text-warning mr-3"></i>
                        <i className="font-weight-bold fa fa-twitter text-white mr-3"></i>
                    </p>
                </div>
                <div className="col-lg-10 col-md-12">
                    <div className="row">
                        <div className="col-md-2 mb-5">
                            <h5 className="font-weight-bold text-white mb-4">Information</h5>
                            <div className="d-flex flex-column justify-content-start">
                                <a className="text-white mb-2" href="#">About Us</a>
                                <a className="text-white mb-2" href="#">Terms and Services</a>
                                <a className="text-white mb-2" href="#">Pricing</a>
                                <a className="text-white mb-2" href="#">Privacy Policy</a>
                            </div>
                        </div>
                        <div className="col-md-3 mb-5">
                            <h5 className="font-weight-bold text-white mb-4">My Account</h5>
                            <div className="d-flex flex-column justify-content-start">
                                <a className="text-white mb-2" href="#">My Orders</a>
                                <a className="text-white mb-2" href="#">Ratings and review</a>
                                <a className="text-white mb-2" href="#">Saved Items</a>
                                <a className="text-white mb-2" href="#">Recently viewed</a>
                                <a className="text-white mb-2" href="#">Recently searched</a>
                                <a className="text-white mb-2" href="#">Saved Cards</a>
                            </div>
                        </div>
                        <div className="col-md-3 mb-5">
                            <h5 className="font-weight-bold text-white mb-4">Help Center</h5>
                            <div className="d-flex flex-column justify-content-start">
                                <a className="text-white mb-2" href="#">Support@inshopper.com</a>
                                <a className="text-white mb-2" href="#">Help Center</a>
                                <a className="text-white mb-2" href="#">Contact Us</a>
                                <a className="text-white mb-2" href="#">FAQs</a>
                            </div>
                        </div>
                        <div className="col-md-3 mb-5">
                            <p className=" text-white mb-4">Download our mobile app</p>
                            <div className="d-flex flex-column justify-content-start">
                                <a className="text-white mb-2" href="#"> <DownloadStore playstore="Google Play" /></a>
                                <a className="text-white mb-2" href="#"> <DownloadStore applestore="apple" /></a>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </footer>
    </> 
    );
};
export default Footer;
