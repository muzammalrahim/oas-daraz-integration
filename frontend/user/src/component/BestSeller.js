import React from 'react'
import {Row, Col, Container } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel'
import Slide1 from '../images/s1.jpg'
import Slide2 from '../images/s2.jpg'
import Slide3 from '../images/s3.jpg'
import Slide4 from '../images/s4.jpg'
import Slide5 from '../images/s5.jpg'
// import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Rating from '../component/Rating';



function BestSeller() {
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

export default BestSeller
