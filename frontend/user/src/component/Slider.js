import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';



export default function Slider() {
    return (
        <div className="slider-main">
            <Carousel>
              <Carousel.Item>
                <div className="img-wrap">
                  <div className="image"></div>
                  <div className="overlay"></div>
                  
                  {/* <img src={Image1} alt="Logo" /> */}
                </div>
              
                <Carousel.Caption>
                  <div className="headings">
                    <h3 className="heading-1 mb-0"> <b>The Best</b> </h3>
                    <h3 className="heading-2"><b>Shopping Cart Website</b></h3>
                  </div>
                
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <div className="slider-button">
                      <Button variant="outline-secondary">Shop Now</Button>
                    </div>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <div className="img-wrap">
                  <div className="image2"></div>
                  <div className="overlay"></div>
                  {/* <img src={Image1} alt="Logo" /> */}
                </div>

                <Carousel.Caption>
                <h3 className="heading-1"><b>The Best </b></h3>
                <h3 className="heading-2"><b>Shopping Cart Website</b></h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <div className="slider-button">
                      <Button variant="outline-secondary">Shop Now</Button>
                    </div>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
              <div className="img-wrap">
                  <div className="image"></div>
                  <div className="overlay"></div>
                  {/* <img src={Image1} alt="Logo" /> */}
                </div>

              <Carousel.Caption>
              <h3 className="heading-1">The Best </h3>
              <h3 className="heading-2">Shopping Cart Website</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <div className="slider-button">
                      <Button variant="outline-secondary">Shop Now</Button>
                    </div>
              </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
        </div>
    )
}
