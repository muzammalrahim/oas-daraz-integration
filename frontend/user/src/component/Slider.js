import React,{useEffect, useState} from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import "../assets/style.css"
import { API_URL} from "../helper/api"

export default function Slider() {

const [sliders,setSliders] = useState([]);

const getSliders = async () =>{
  const response = await fetch (API_URL+"sliders/");
  const data = await response.json();
  setSliders(data.results);
  console.log("sliders")
}

useEffect( ()=> {
  getSliders();
}, [] );

    return (
        <div className="slider-main">
            <Carousel>
              {sliders.map((slider) =>
              <Carousel.Item>
                <div className="img-wrap">
                  <div className="image" style={{backgroundImage: `url('${slider.image}')`}}></div>
                  <div className="overlay"></div>
                </div>
              
                <Carousel.Caption>
                  <div className="headings">
                    <h3 className="heading-1 mb-0"> <b>{slider.title}</b> </h3>
                  </div>
                
                  <p>{slider.description}</p>
                    <div className="slider-button">
                      <Button variant="outline-light" href={slider.external_link}>{slider.btn_title}</Button>
                    </div>
                </Carousel.Caption>
              </Carousel.Item>
              )}
            </Carousel>
        </div>
    )
}
