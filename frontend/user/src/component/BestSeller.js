import React,{useEffect, useState} from 'react'
import {Row, Col, Container } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel'
import 'react-multi-carousel/lib/styles.css';
import Rating from '../component/Rating';
import "../assets/style.css"
import { API_URL} from "../helper/api"
import Slide1 from '../images/s1.jpg'
import Slide2 from '../images/s2.jpg'
import Slide3 from '../images/s3.jpg'
import Slide4 from '../images/s4.jpg'
import Slide5 from '../images/s5.jpg'


export default function BestSeller(props) {

    const [products, setProducts] = useState([]);
    
    
    const getProducts = async () => {
        const response = await fetch (API_URL+"inventory/");
        const data = await response.json();
        setProducts(data.results);
    
    }
    
    useEffect ( () => {
        getProducts();
    }, [] );

    return (
        <div className="seller-main">
            <Container>
                <Row>
                    <div className="title">
                        <h3 className="mb-0">Best sellers</h3>
                        <p className="">We provides the best</p>
                        <p className="description mb-4">
                        Lorem ipsum dolor sit amet, consectetur
                        adipisicing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna
                        aliqua.
                        </p>
                    </div>
                </Row>
            </Container>
            <Container>
                <div className="seller-inner-slider pb-4">
                <Carousel>
                {products.map(product=> 
                        <Carousel.Item>
                        
                        {product.best_seller === true && <div>
                            <ul className="pl-0 mt-3">
                                <li className="">
                                    <div className="img-wrap">
                                        <img src={product.product_images[0].image} alt="slide1"/>
                                    </div>
                                    <div className="text pt-3">
                                        <h5 className="mb-0">{product.product_title}</h5>
                                        <p className="mb-1">{product.unit_price}</p>
                                    </div>
                                    
                                    <Rating
                                    value={3}
                                    max={5}
                                    onChange={(i) => console.log('onChange ' + i)}
                                    />
                                </li>
                            </ul>
                            </div>}
                        </Carousel.Item>)}

                        <Carousel.Item>
                            <ul className="pl-0 mt-3">
                                <li className="">
                                    <div className="img-wrap">
                                        <img src={Slide1 } alt="slide1"/>
                                    </div>
                                    <div className="text pt-3">
                                        <h5 className="mb-0">Cruise Dual Analog</h5>
                                        <p className="mb-1">$250.00</p>
                                    </div>
                                    
                                    <Rating
                                    value={3}
                                    max={5}
                                    onChange={(i) => console.log('onChange ' + i)}
                                    />
                                </li>
                                <li className="">
                                    <div className="img-wrap">
                                        <img src={Slide2 } alt="slide1"/>
                                    </div>
                                    <div className="text pt-3">
                                        <h5 className="mb-0">Cruise Dual Analog</h5>
                                        <p className="mb-1">$250.00</p>
                                    </div>
                                    
                                    <Rating
                                    value={3}
                                    max={5}
                                    onChange={(i) => console.log('onChange ' + i)}
                                    />
                                </li>
                                <li className="">
                                    <div className="img-wrap">
                                        <img src={Slide3 } alt="slide2"/>
                                    </div>
                                    <div className="text pt-3">
                                        <h5 className="mb-0">Cruise Dual Analog</h5>
                                        <p className="mb-1">$250.00</p>
                                    </div>
                                    
                                    <Rating
                                    value={3}
                                    max={5}
                                    onChange={(i) => console.log('onChange ' + i)}
                                    />
                                </li>
                                <li className="">
                                    <div className="img-wrap">
                                        <img src={Slide4 } alt="slide3"/>
                                    </div>
                                    <div className="text pt-3">
                                        <h5 className="mb-0">Cruise Dual Analog</h5>
                                        <p className="mb-1">$250.00</p>
                                    </div>
                                    
                                    <Rating
                                    value={3}
                                    max={5}
                                    onChange={(i) => console.log('onChange ' + i)}
                                    />
                                </li>
                                <li className="">
                                    <div className="img-wrap">
                                        <img src={Slide5 } alt="slide3"/>
                                    </div>
                                    <div className="text pt-3">
                                        <h5 className="mb-0">Cruise Dual Analog</h5>
                                        <p className="mb-1">$250.00</p>
                                    </div>
                                    
                                    <Rating
                                    value={3}
                                    max={5}
                                    onChange={(i) => console.log('onChange ' + i)}
                                    />
                                </li>
                            </ul>
                        </Carousel.Item>

                        </Carousel>
                </div>
                    
            </Container>
        </div>
    )
}


