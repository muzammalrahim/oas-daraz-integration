import React from 'react'
import {Row, Col, Container } from 'react-bootstrap';
import {FaRegGem, FaPaperPlane} from "react-icons/fa";
import { AiOutlineRetweet, AiFillRocket } from "react-icons/ai";
import { SiSketch } from "react-icons/si";
import "../assets/style.css"



function Services() {
    return (
        <div className="services-main p-4">
            <Container>
                <Row>
                    <Col>
                        <div className="service-inner">
                            {/* <FaRegGem/> */}
                            <SiSketch/>
                            <div className="content mt-2">
                                <h3 className="mb-0">Special offers</h3>
                                <p className="mb-0">Shop Big Save Big</p>
                            </div>
                        </div>
                        
                    </Col>
                    <Col>
                        <div className="service-inner">
                            <FaPaperPlane/>
                            <div className="content mt-2">
                                <h3 className="mb-0">Free delivery</h3>
                                <p className="mb-0">On Orders Above $99</p>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className="service-inner">
                                <AiOutlineRetweet/>
                                <div className="content mt-2">
                                    <h3 className="mb-0">30 Days Return</h3>
                                    <p className="mb-0">Policy We Offers</p>
                                </div>
                        </div>
                    </Col>
                    <Col>
                        <div className="service-inner">
                            <AiFillRocket/>
                            <div className="content mt-2">
                                <h3 className="mb-0">Fastest Shipping</h3>
                                <p className="mb-0">2 Days Express</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Services
