// components/Hero.js

import Image from "next/image";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    lazyLoad: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="hero-main h-500 px-4 py-5">
      <Slider {...settings}>
        <div className="d-flex">
          <article className="d-flex justify-content-end">
            <div>
              <h1>
                Flash sale <br /> on all items
              </h1>
              <p>Enjoy 50% Discount on all items </p>

              <button
                className="btn btn-transparent border-white rounded-0 w-100"
                type="submit"
              >
                Get best offers now
              </button>
            </div>
          </article>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
      </Slider>
    </div>
  );
};

export default Hero;
