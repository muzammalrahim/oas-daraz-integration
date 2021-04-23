import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {FaShoppingCart, FaHeart} from "react-icons/fa";
import { AiOutlineRetweet} from "react-icons/ai";
import Imager1 from '../images/r1.jpg';
import Imager2 from '../images/r2.jpg';
import Imager3 from '../images/r3.jpg';
import Imager4 from '../images/r4.jpg';
import Imager5 from '../images/r5.jpg';
import Imager6 from '../images/r6.jpg';
import Imager7 from '../images/r7.jpg';
import Imager8 from '../images/r8.jpg';




export default class RelatedProducts extends Component {
  state = {
    display: true,
    width: 300,
  };
  render() {
    
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      initialSlide: 0,
      autoplaySpeed: 2000,
      cssEase: "linear",
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    
    return (
      <div>
        
        <Slider {...settings}>
          <div>
          <figure class="snip0013">
                <img className="responsive" src={Imager1} alt="image"/>
                <div>
                    <ul className="img-hover">
                        <li><a href="#"><i><FaShoppingCart/></i></a></li>
                        <li><a href="#"><i><FaHeart/></i></a></li>
                        <li><a href="#"><i><AiOutlineRetweet/></i></a></li>
                    </ul>    
                </div>			
            </figure>
          </div>
          <div>
          <figure class="snip0013">
                <img className="responsive" src={Imager2} alt="image"/>
                <div>
                    <ul className="img-hover">
                        <li><a href="#"><i><FaShoppingCart/></i></a></li>
                        <li><a href="#"><i><FaHeart/></i></a></li>
                        <li><a href="#"><i><AiOutlineRetweet/></i></a></li>
                    </ul>    
                </div>			
            </figure>
          </div>
          <div>
          <figure class="snip0013">
                <img className="responsive" src={Imager3} alt="image"/>
                <div>
                    <ul className="img-hover">
                        <li><a href="#"><i><FaShoppingCart/></i></a></li>
                        <li><a href="#"><i><FaHeart/></i></a></li>
                        <li><a href="#"><i><AiOutlineRetweet/></i></a></li>
                    </ul>    
                </div>			
            </figure>
          </div>
          <div>
          <figure class="snip0013">
                <img className="responsive" src={Imager4} alt="image"/>
                <div>
                    <ul className="img-hover">
                        <li><a href="#"><i><FaShoppingCart/></i></a></li>
                        <li><a href="#"><i><FaHeart/></i></a></li>
                        <li><a href="#"><i><AiOutlineRetweet/></i></a></li>
                    </ul>    
                </div>			
            </figure>
          </div>
          <div>
          <figure class="snip0013">
                <img className="responsive" src={Imager5} alt="image"/>
                <div>
                    <ul className="img-hover">
                        <li><a href="#"><i><FaShoppingCart/></i></a></li>
                        <li><a href="#"><i><FaHeart/></i></a></li>
                        <li><a href="#"><i><AiOutlineRetweet/></i></a></li>
                    </ul>    
                </div>			
            </figure>
          </div>
          <div>
          <figure class="snip0013">
                <img className="responsive" src={Imager6} alt="image"/>
                <div>
                    <ul className="img-hover">
                        <li><a href="#"><i><FaShoppingCart/></i></a></li>
                        <li><a href="#"><i><FaHeart/></i></a></li>
                        <li><a href="#"><i><AiOutlineRetweet/></i></a></li>
                    </ul>    
                </div>			
            </figure>
          </div>
          <div>
          <figure class="snip0013">
                <img className="responsive" src={Imager7} alt="image"/>
                <div>
                    <ul className="img-hover">
                        <li><a href="#"><i><FaShoppingCart/></i></a></li>
                        <li><a href="#"><i><FaHeart/></i></a></li>
                        <li><a href="#"><i><AiOutlineRetweet/></i></a></li>
                    </ul>    
                </div>			
            </figure>
          </div>
          <div>
          <figure class="snip0013">
                <img className="responsive" src={Imager8} alt="image"/>
                <div>
                    <ul className="img-hover">
                        <li><a href="#"><i><FaShoppingCart/></i></a></li>
                        <li><a href="#"><i><FaHeart/></i></a></li>
                        <li><a href="#"><i><AiOutlineRetweet/></i></a></li>
                    </ul>    
                </div>			
            </figure>
          </div>
          <div>
          
          </div>
        </Slider>
      </div>
    );
  }
}