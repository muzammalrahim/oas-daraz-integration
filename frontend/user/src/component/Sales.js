import React from 'react'
import {Row, Col, Container } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel'
import Slide1 from '../images/s1.jpg'
import Slide2 from '../images/s2.jpg'
import Slide3 from '../images/s3.jpg'
import Slide4 from '../images/s4.jpg'
import Slide5 from '../images/s5.jpg'
import ImageResponsive from 'react-image-responsive';

function Sales() {
    return (
        <div className="sales-main">
            {/* web div */}
            <div className="sale-web">
                <div className="sales-images">
                    <div className="main-area">
                        <div className="img-1">
                            <div className="overlay ">
                                <div className="diamond"></div>
                                <div className="diamond2"></div>
                                    <div className="inner-text">
                                        <p className="mb-0">Fashion</p>
                                        <h3 className="mb-0">Summer & Autumn</h3>
                                        <p>Winter Collection</p>
                                    </div>   
                            </div>
                        </div>
                    </div>
                    
                    <div className="img-2">
                        <div className="overlay">
                            <div className="diamond"></div>
                            <div className="diamond2"></div>
                            <div className="inner-text">
                                <p className="mb-0">Fashion</p>
                                <h3 className="mb-0">Summer & Autumn</h3>
                                <p>Winter Collection</p>
                            </div>   
                        </div>
                    </div>
                    <div className="img-3">
                        <div className="overlay">
                            <div className="diamond"></div>
                            <div className="diamond2"></div>
                            <div className="inner-text">
                                <p className="mb-0">Fashion</p>
                                <h3 className="mb-0">Summer & Autumn</h3>
                                <p>Winter Collection</p>
                            </div>   
                        </div>
                    </div>
                </div>  
            </div>
            {/* web div */}



            {/* mob div */}
            <div className="sale-mob">
                <Carousel>
                        <Carousel.Item>
                        <div className="img-1">
                            <div className="overlay">
                                <div className="diamond"></div>
                                <div className="diamond2"></div>
                                    <div className="inner-text">
                                        <p className="mb-0">Fashion</p>
                                        <h3 className="mb-0">Summer & Autumn</h3>
                                        <p>Winter Collection</p>
                                    </div>   
                            </div>
                        </div>
                        </Carousel.Item>

                        <Carousel.Item>
                        <div className="img-2">
                            <div className="overlay">
                                <div className="diamond"></div>
                                <div className="diamond2"></div>
                                <div className="inner-text">
                                    <p className="mb-0">Fashion</p>
                                    <h3 className="mb-0">Summer & Autumn</h3>
                                    <p>Winter Collection</p>
                                </div>   
                            </div>
                        </div>
                        </Carousel.Item>
                        <Carousel.Item>
                        <div className="img-3">
                            <div className="overlay">
                                <div className="diamond"></div>
                                <div className="diamond2"></div>
                                <div className="inner-text">
                                    <p className="mb-0">Fashion</p>
                                    <h3 className="mb-0">Summer & Autumn</h3>
                                    <p>Winter Collection</p>
                                </div>   
                            </div>
                        </div>
                        </Carousel.Item>

                        </Carousel>
            </div>
            {/* mob div */}
        </div>
    )
}

export default Sales
