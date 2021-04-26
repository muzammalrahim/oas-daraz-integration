import React,{useEffect, useState} from 'react'
import {Row, Col, Container } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { FaCcVisa, FaCcPaypal,FaCcAmazonPay } from "react-icons/fa"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import { FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram, FaBlog, FaGlobeAsia } from "react-icons/fa";
import "../assets/style.css"
import { API_URL} from "../helper/api"


export default function Header() {

    const [lengthh, setLengthh] = useState([]);

    const getLengthh = async () => {
        const response = await fetch (API_URL+"shop-setting/");
        const data = await response.json();
        setLengthh(data);
    }
    
    useEffect ( () => {
        getLengthh();
    }, [] );
    

    return (
        <div className="footer-main pt-3">


            {/* web links */}
            <div className="web-f-link">
            <div className="footer-links pt-3">
            <Container>
                
                <Row>
                    <Col xs="6" sm="3">
                        <ul>
                            <h4>My account</h4>
                            <li><Link>Sign In</Link></li>
                            <li><Link>Track My Order</Link></li>
                            <li><Link>View Cart</Link></li>
                            <li><Link>My Wishlist</Link></li>
                            <li><Link>Check out</Link></li>
                            <li><Link>CTrack My Order</Link></li>
                        </ul>
                    </Col>
                    <Col xs="6" sm="3">
                        <ul>
                            <h4>Help</h4>
                            <li><Link>FAQ</Link></li>
                            <li><Link>Shipping</Link></li>
                            <li><Link>Contact Us</Link></li>
                            <li><Link>Privacy Policy</Link></li>
                            <li><Link>Check out</Link></li>
                            <li><Link>Track My Order</Link></li>
                        </ul>
                    </Col>
                    <Col xs="6" sm="3">
                        <ul>
                            <h4>Information</h4>
                            <li><Link>Delivery Information</Link></li>
                            <li><Link>Discount</Link></li>
                            <li><Link>My Account</Link></li>
                            <li><Link>About Us</Link></li>
                        </ul>
                    </Col>
                    <Col xs="6" sm="3">
                        <ul>
                            <h4>Contact Info</h4>
                            <li><Link><FaGlobeAsia/><span className="pl-2">{lengthh.address}</span></Link></li>
                            <li><Link><FaPhoneAlt/><span className="pl-2">{lengthh.phone_number}</span></Link></li>
                            <li><Link> <FaEnvelope/><span className="pl-2">{lengthh.email}</span></Link></li>
                        </ul>
                        <ul className="m-0 footer-social-links">
                                {lengthh.facebook_url ? <a href={lengthh.facebook_url}><li className="pr-2"><FaFacebookF/></li></a> : <li className="none"></li> }
                                {lengthh.twitter_url ? <a href={lengthh.twitter_url}><li className="pr-2"><FaTwitter/></li></a> : <li className="none"></li> }
                                {lengthh.instagram_url ? <a href={lengthh.instagram_url}><li className="pr-2"><FaInstagram/></li></a> : <li className="none"></li> }
                                {lengthh.blog_url ? <a href={lengthh.blog_url}><li className="pr-2"><FaBlog/></li></a> : <li className="none"></li> }
                        </ul>
                    </Col>
                </Row>
            </Container>
            </div>
            </div>
            {/* web links */}

            {/* mobile links */}
            <div className="mobile-f-link">
            <div className="footer-links pt-3">
            <Container fluid>
            <Row>
                <Accordion defaultActiveKey="0"> 
                <Card>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <h4>My account</h4> 
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <ul className="pl-0">  
                                    <li><Link>Sign In</Link></li>
                                    <li><Link>Track My Order</Link></li>
                                    <li><Link>View Cart</Link></li>
                                    <li><Link>My Wishlist</Link></li>
                                    <li><Link>Check out</Link></li>
                                    <li><Link>Track My Order</Link></li>
                                </ul>
                        </Card.Body>
                    </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                        <h4>Help</h4>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                        <Card.Body>
                        <ul className="pl-0">
                            <li><Link>FAQ</Link></li>
                            <li><Link>Shipping</Link></li>
                            <li><Link>Contact Us</Link></li>
                            <li><Link>Privacy Policy</Link></li>
                            <li><Link>Check out</Link></li>
                            <li><Link>Track My Order</Link></li>
                        </ul></Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    <Card>
                        <Accordion.Toggle as={Button} variant="link" eventKey="2">
                        <h4>Information</h4>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="2">
                        <Card.Body>
                        <ul className="pl-0"> 
                            <li><Link>Delivery Information</Link></li>
                            <li><Link>Discount</Link></li>
                            <li><Link>My Account</Link></li>
                            <li><Link>About Us</Link></li>
                        </ul>
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    <Card>
                        <Accordion.Toggle as={Button} variant="link" eventKey="3">
                        <h4>Contact Info</h4>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="3">
                        <Card.Body>
                        <ul className="pl-0">
                            
                            <li><Link><FaGlobeAsia/><span className="pl-2">{lengthh.address}</span></Link></li>
                            <li><Link><FaPhoneAlt/><span className="pl-2">{lengthh.phone_number}</span></Link></li>
                            <li><Link> <FaEnvelope/><span className="pl-2">{lengthh.email}</span></Link></li>
                        </ul>
                        <ul className="m-0 footer-social-links pl-0">
                            {lengthh.facebook_url ? <a href={lengthh.facebook_url}><li className="pr-2"><FaFacebookF/></li></a> : <li className="none"></li> }
                            {lengthh.twitter_url ? <a href={lengthh.twitter_url}><li className="pr-2"><FaTwitter/></li></a> : <li className="none"></li> }
                            {lengthh.instagram_url ? <a href={lengthh.instagram_url}><li className="pr-2"><FaInstagram/></li></a> : <li className="none"></li> }
                            {lengthh.blog_url ? <a href={lengthh.blog_url}><li className="pr-2"><FaBlog/></li></a> : <li className="none"></li> }
                        </ul>
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    
                    </Accordion>
                </Row>
            </Container>
            </div>
            </div>
            {/* mobile links */}


            <div className="copy-rigt">
                <Container>
                    <Row className="p-1">
                        <Col xs="12" md="6" className="pl-0">
                            <p className="mt-1 mb-1 pl-5">Copyright 2021 - All right reserved</p>
                        </Col>
                        <Col xs="12" md="6">
                            <ul className="card-icons mb-0">
                                <li className="pr-3"><FaCcVisa/></li>
                                <li className="pr-3"><FaCcPaypal/></li>
                                <li><FaCcAmazonPay/></li>
                            </ul>
                        </Col>
                    </Row>
                </Container>

            </div>
        </div>
    )
}


