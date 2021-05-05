import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Imagef0 from "../images/f0.jpg";
import Rating from "../component/Rating";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";
import ImageResponsive from "react-image-responsive";
import "../assets/style.css";
import { API_URL, STATIC_URL } from "../helper/api";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import {MAIN_ROUTE} from "../helper/api";

export default function FeaturedProducts(props) {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  const getFeaturedProducts = async () => {
    const response = await fetch(API_URL + "featured-products/");
    const data = await response.json();
    setFeaturedProducts(data.results);
  };

  useEffect(() => {
    getFeaturedProducts();
  }, []);

  const handleDetail = (id) => {
    console.log(id)
    window.location.assign("/ProductDetail/"+ id);
  }

  const getImagePath = (image) => {
    if(image){
      let filename_pieces = image.split('/');
      let img_name = filename_pieces[filename_pieces.length - 1];
      return STATIC_URL + img_name;
    }
    return null;
  }

  return (
    <div className="featured-main">
      <Container>
        <Row>
          <div className="title pt-5">
            <h3>Featured Products</h3>
            <p>Newest trends from top brands</p>
          </div>
        </Row>
        <Row className="products-grid pt-4 pb-4">
          {featuredProducts.map((product, index) => (
                <Col key={index}>
                      <div className="inner-content">
                        <div className="img-wrap">
                          <Nav.Link href={`/${MAIN_ROUTE}/ProductDetail/${product.id}`}>
                            <figure className="snip0013">
                              <img
                                className="responsive-image"
                                src={
                                  getImagePath(product.images[0]?.image)
                                }
                                alt="No image is found."
                              />

                              <div>
                                <ul className="img-hover">
                                  <li>
                                    <a href="#">
                                      <i>
                                        <FaShoppingCart />
                                      </i>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <i>
                                        <FaHeart />
                                      </i>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <i>
                                        <AiOutlineRetweet />
                                      </i>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </figure>
                          </Nav.Link>
                        </div>
                        <div className="text pt-3">
                          <h5>{product.product_title}</h5>
                          <p className="mb-1">{product.unit_price}</p>
                        </div>
                        <Rating
                          value={product.product_rating}
                          max={5}
                          editing="false"
                          // onStarHover="false"
                        />
                      </div>
                </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
