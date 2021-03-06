import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Carousel from "react-elastic-carousel";
import Slider from "react-slick";
import "react-multi-carousel/lib/styles.css";
import Rating from "../component/Rating";
import "../assets/style.css";
import { API_URL, STATIC_URL } from "../helper/api";

export default function BestSeller() {
  const [bestSellerProducts, setBestSellerProducts] = useState([]);

  const getBestSellerProducts = async () => {
    const response = await fetch(API_URL + "bestSeller-products/");
    const data = await response.json();
    setBestSellerProducts(data.results);
  };

  const getImagePath = (image) => {
    if(image){
      let filename_pieces = image.split('/');
      let img_name = filename_pieces[filename_pieces.length - 1];
      return STATIC_URL + img_name;
    }
    return null;
  }

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: true,
  };

  useEffect(() => {
    getBestSellerProducts();
  }, []);

  return (
    <div className="seller-main">
      <Container>
        <Row>
          <div className="title">
            <h3 className="mb-0">Best sellers</h3>
            <p className="">We provide the best</p>
            <p className="description mb-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </Row>
      </Container>
      <Container>
        <div className="seller-inner-slider pb-4">
          <Slider {...settings}>
          
             {bestSellerProducts.map((product) => (
                <div key={product.id}>
                        <div className="responsivee-image">
                          <img
                            src={
                                getImagePath(product.images[0]?.image)
                            }
                            alt="No image is found."
                          />
                        </div>
                          <div className="text pt-3">
                            <h5>{product.product_title}</h5>
                            <p className="mb-1">{product.unit_price}</p>
                          </div>
                          <Rating
                            value={product.product_rating}
                            max={5}
                            editing="false"
                            // onStarHover={false}
                            onChange={(i) => console.log("onChange " + i)}
                          />
                  </div>
            ))} 
          </Slider>
        </div>
      </Container>
    </div>
  );
}
