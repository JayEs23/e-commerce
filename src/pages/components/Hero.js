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
    arrow: false,
    autoplay: true,
  };
  return (
    <Slider {...settings}>
      <div className="d-flex hero-main hero-main-first h-500 py-5 align-items-center">
        <article className="d-flex hero-heading w-full">
          <div>
            <h1>
              One Sale <br /> Many items
            </h1>
            <p>The biggest sale of the year </p>

            <button
              className="btn btn-transparent border-white rounded-0"
              type="submit"
            >
              Discover more
            </button>
          </div>
          <div>
            <Image
              width={666}
              height={375}
              className=""
              src="/assets/images/bags.png"
              alt="shopping"
            />
          </div>
        </article>
      </div>
      <div className="d-flex hero-main h-500 py-5 align-items-center">
        <article className="d-flex hero-heading w-full">
          <div>
            <h1>
              Flash sale <br /> on all items
            </h1>
            <p>Enjoy 50% Discount on all items </p>

            <button
              className="btn btn-transparent border-white rounded-0"
              type="submit"
            >
              Get best offers now
            </button>
          </div>
          <div>
            <Image
              width={679}
              height={437}
              className=""
              src="/assets/images/electronics.png"
              alt="shopping"
            />
          </div>
        </article>
      </div>
      <div className="d-flex hero-main hero-main-last h-500 py-5 align-items-center">
        <article className="d-flex hero-heading w-full">
          <div>
            <h1>
              Check our <br /> weekly new
              <br />
              deals
            </h1>
            <p>Be the first to hear of our promos</p>

            <button
              className="btn btn-transparent border-white rounded-0"
              type="submit"
            >
              Discover more
            </button>
          </div>

          <Image
            width={564}
            height={626}
            className=""
            src="/assets/images/shopping-lady.png"
            alt="shopping"
          />
        </article>
      </div>
    </Slider>
  );
};

export default Hero;
