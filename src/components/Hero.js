// components/Hero.js

import Image from "next/image";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hero = () => {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    lazyLoad: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 1,
    arrow: false,
    autoplay: true,
    nextArrow: (
      <div>
        <div className="next-slick-arrow"> &gt; </div>
      </div>
    ),
    prevArrow: (
      <div className="">
        <div className="prev-slick-arrow"> &lt; </div>
      </div>
    ),
  };
  return (
    <div className="">
      <Slider {...settings}>
        {productSlider.map((slide, index) => (
          <div
            key={index}
            className={`d-flex hero-main ${slide.background} w-100 h-500 align-items-center`}
          >
            <article className="hero-heading w-full">
              <div className="d-flex justify-content-center align-items-center order-2 order-md-1">
                <div>
                  <h1
                    className="hero-title mb-4"
                    dangerouslySetInnerHTML={{ __html: slide.heading }}
                  ></h1>
                  <p className="hero-text mb-4 pb-1">{slide.subHeading}</p>

                  <button
                    className="btn btn-transparent border-white rounded-0 d-flex"
                    type="submit"
                  >
                    {slide.button}
                    <Image
                      src="/assets/images/arrow-right.svg"
                      width={24}
                      height={24}
                      className="ml-4"
                      alt=""
                    />
                  </button>
                </div>
              </div>

              <Image
                width={664}
                height={625}
                className="hero-heading-image order-1 mt-0 m-md-auto mb-5 mb-md-0 order-md-2"
                src={slide.src}
                alt="shopping"
              />
            </article>
          </div>
        ))}

        {/* <div className="d-flex hero-main w-100 h-500 align-items-center">
          <article className="hero-heading w-full">
            <div>
              <h1 className="hero-title mb-4">
                Flash sale <br /> on all items
              </h1>
              <p className="hero-text mb-4 pb-1">
                Enjoy 50% Discount on all items{" "}
              </p>

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
        <div className="d-flex hero-main w-100 hero-main-last h-500 py-5 align-items-center">
          <article className="hero-heading w-full">
            <div>
              <h1 className="hero-title mb-4">
                Check our <br /> weekly new
                <br />
                deals
              </h1>
              <p className="hero-text mb-4 pb-1">
                Be the first to hear of our promos
              </p>

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
        </div> */}
      </Slider>
    </div>
  );
};

export default Hero;

const productSlider = [
  {
    heading: "One Sale <br /> Many items",
    subHeading: "The biggest sale of the year",
    button: "Discover more",
    src: "/assets/images/bags.png",
    background: "hero-main-first",
  },
  {
    heading: "Flash sale <br /> on all items",
    subHeading: "Enjoy 50% Discount on all items",
    button: "Get best offers now",
    src: "/assets/images/electronics.png",
  },
  {
    heading: "Check our <br /> weekly new <br /> deals",
    subHeading: "Be the first to hear of our promos",
    button: "Discover more",
    src: "/assets/images/shopping-lady.png",
    background: "hero-main-last",
  },
];
