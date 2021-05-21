import React, { useState, useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import { API_URL, STATIC_URL, MAIN_ROUTE } from "../helper/api";

export default function Slider() {

  const [sliders, setSliders ] = useState([])
  
  const getSliders = async () =>{
    const response = await fetch(API_URL + "sliders/");
    const data = await response.json();
    setSliders(data.results);
  }

  const getImagePath = (image) => {
    if(image){
      let filename_pieces = image.split('/');
      let img_name = filename_pieces[filename_pieces.length - 1];
      return STATIC_URL + "sliders_img/"+ img_name;
    }
    return null;
  }

  const chooseLink = (slider) =>{
    let link = "";
    
    if(slider.external_link){
      link = <a style={{color: 'inherit' }} href={slider.external_link}>{slider.btn_title}</a>
    }
    else{
      link = <Link style={{color: 'inherit' }} to={`/${MAIN_ROUTE}/ProductDetail/${slider.product[0]?.id}`}>{slider.btn_title}</Link>
    }
    return link;
  }

  useEffect(()=>{
    getSliders()
  }, [])

  return (
        <div className="slider-main">
            <Carousel>
            {sliders && sliders.map((slider, index) => (
              <Carousel.Item key={index}>
                <div className="img-wrap">
                  <div className="" ><img className="w-100" src={getImagePath(slider.image)} alt="No Image found" /></div>
                  <div className="overlay"></div>
                </div>
              
                <Carousel.Caption>
                  <div className="headings">
                    <h3 className="heading-1 mb-0"> <b>{slider.title}</b></h3>
                    {/* <h3 className="heading-2"><b>{Shopping Cart Website}</b></h3> */}
                  </div>
                
                  <p>{slider.description}</p>
                    <div className="slider-button">
                      <Button variant="outline-secondary">
                        {chooseLink(slider)}
                      </Button>
                    </div>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
  {/* 
              <Carousel.Item>
                <div className="img-wrap">
                  <div className="image2"></div>
                  <div className="overlay"></div>
                  * <img src={Image1} alt="Logo" /> *
                </div>

                <Carousel.Caption>
                <h3 className="heading-1"><b>The Best 2</b></h3>
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
                    {/* <img src={Image1} alt="Logo" /> 
                  </div>

                <Carousel.Caption>
                  <h3 className="heading-1">The Best 3</h3>
                  <h3 className="heading-2">Shopping Cart Website</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <div className="slider-button">
                          <Button variant="outline-secondary">Shop Now</Button>
                        </div>
                </Carousel.Caption>
              </Carousel.Item>
               */}
            </Carousel>
        </div>
    )
}
