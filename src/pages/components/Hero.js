// components/Hero.js

import Image from "next/image";

const Hero = () => {
  return (
      <div className="row hero-main">
        
        {/* Right Column for Text Content */}
        <div className="col-md-6 d-flex align-items-stretch">
          <div className="text-white py-5">
            <div className="hero-content text-center">
              <h1 className="display-4 text-white font-weight-bold">Flash Sale on all Items.</h1>
              <p className="lead">Enjoy 50% discount on all Items</p>
              <button className="btn btn-outline-light btn-lg btn-rounded">
                Get the best offers now <i className="fa fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Left Column for Sample Products Image */}
        <div className="col-md-6 d-none d-lg-block">
          <div className="hero-image ">
            <Image src="/heroproducts.png" className="img-fluid" width={4000} height={400} alt="Sample Products" loading="lazy"/>
          </div>
        </div>

      </div>
  );
};

export default Hero;
