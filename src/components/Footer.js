import Image from "next/image";
import DownloadStore from "./DownloadStore";
const Footer = () => {
    return (
      <>
        <div class="container-fluid bg-secondary text-dark mt-5 pt-5 fixed-bottom footer-main">
            <div class="row px-xl-5 pt-5">
                <div class="col-lg-2 col-md-12 mb-5 pr-3 pr-xl-5">
                    <h1 class="mb-2 display-0 font-weight-semi-bold">
                        <span className="">
                            <Image src="/inshopperlogo-dark.png" width="160" height="40" />
                        </span>
                    </h1>
                    <p class="ml-4 text-white">Follow us on:</p>
                    <p class="ml-4">
                        <i class="font-weight-bold fa fa-facebook-f text-info mr-3"></i>
                        <i class="font-weight-bold fa fa-instagram text-warning mr-3"></i>
                        <i class="font-weight-bold fa fa-twitter text-white mr-3"></i>
                    </p>
                </div>
                <div class="col-lg-10 col-md-12">
                    <div class="row">
                        <div class="col-md-2 mb-5">
                            <h5 class="font-weight-bold text-white mb-4">Information</h5>
                            <div class="d-flex flex-column justify-content-start">
                                <a class="text-white mb-2" href="#">About Us</a>
                                <a class="text-white mb-2" href="#">Terms and Services</a>
                                <a class="text-white mb-2" href="#">Pricing</a>
                                <a class="text-white mb-2" href="#">Privacy Policy</a>
                            </div>
                        </div>
                        <div class="col-md-3 mb-5">
                            <h5 class="font-weight-bold text-white mb-4">My Account</h5>
                            <div class="d-flex flex-column justify-content-start">
                                <a class="text-white mb-2" href="#">My Orders</a>
                                <a class="text-white mb-2" href="#">Ratings and review</a>
                                <a class="text-white mb-2" href="#">Saved Items</a>
                                <a class="text-white mb-2" href="#">Recently viewed</a>
                                <a class="text-white mb-2" href="#">Recently searched</a>
                                <a class="text-white mb-2" href="#">Saved Cards</a>
                            </div>
                        </div>
                        <div class="col-md-3 mb-5">
                            <h5 class="font-weight-bold text-white mb-4">Help Center</h5>
                            <div class="d-flex flex-column justify-content-start">
                                <a class="text-white mb-2" href="#">Support@inshopper.com</a>
                                <a class="text-white mb-2" href="#">Help Center</a>
                                <a class="text-white mb-2" href="#">Contact Us</a>
                                <a class="text-white mb-2" href="#">FAQs</a>
                            </div>
                        </div>
                        <div class="col-md-4 mb-5">
                            <p class=" text-white mb-4">Download our mobile app</p>
                            <div class="d-flex flex-column justify-content-start">
                                <a class="text-white mb-2" href="#"> <DownloadStore playstore="Google Play" /></a>
                                <a class="text-white mb-2" href="#"> <DownloadStore applestore="apple" /></a>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div></>
    );
};
export default Footer;
