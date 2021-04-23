import React from 'react'
import {Row, Col, Container } from 'react-bootstrap';
import '../assets/style.css';
import { FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaShareAlt } from "react-icons/fa";

import {Link} from 'react-router-dom'


function TopBar() {
    return (
        <div className="topbar-main">
            <div className="top-bar text-white">
            <Container fluid>
                    {/* web bar */}
                    <div className="web-topbar">
                        <Row className="pr-4 pl-4 pt-1 pb-1">
                            <Col xs="6">
                            <ul className="pl-0 m-0">
                                <li className="pr-4">
                                <p className="m-0"><FaPhoneAlt/> <span className="pl-1"><Link href="tel:+92 7654321">+92 7654321</Link></span></p>
                                </li>
                                <li>
                                    <p className="m-0"><FaEnvelope/><span className="pl-3"><Link href="mailto:info@company.com">info@company.com</Link></span></p>
                                </li>
                            </ul>
                            </Col>
                            <Col xs="6" sm="4" md="6">
                                <ul className="float-right m-0">
                                    <li className="pr-3"><FaFacebookF/></li>
                                    <li className="pr-3"><FaTwitter/></li>
                                    <li className="pr-3"><FaInstagram/></li>
                                    <li><FaLinkedinIn/></li>
                                
                                </ul>
                            </Col>
                    </Row>
                    </div>
                    
                    {/* web bar */}

                    {/* mobile bar */}
                    <div className="mob-topbar">
                    <Row className="pr-4 pl-4 pt-1 pb-1">
                        <Col>
                            <span className="phone-mob"><FaPhoneAlt/>
                                <div className="m-phone">
                                    <ul>
                                        <li>+92 7654321</li>
                                    </ul>
                                </div>
                            </span>


                        </Col>
                        <Col><FaEnvelope/></Col>
                        <Col><FaShareAlt/></Col>
                        {/* <ul>
                            <li><FaPhoneAlt/> </li>
                            <li><FaEnvelope/></li>
                            <li><FaShareAlt/></li>
                        </ul> */}
                        {/* <ul className="pl-0 m-0">
                            <li className="pr-4">
                            <p className="m-0"><FaPhoneAlt/> <span className="pl-1">+92 7654321</span></p>
                            </li>
                            <li>
                                <p className="m-0"><FaEnvelope/><span className="pl-3">info@company.com</span></p>
                            </li>
                        </ul> */}
                      
                        {/* <Col xs="6" sm="4" md="6">
                            <div><FaShareAlt/></div>
                            {/* <ul className="float-right m-0">
                                <li className="pr-3"><FaFacebookF/></li>
                                <li className="pr-3"><FaTwitter/></li>
                                <li className="pr-3"><FaInstagram/></li>
                                <li><FaLinkedinIn/></li>
                            
                            </ul> */}
                    </Row>
                    </div>
                    

                    {/* mobile bar */}
            </Container> 
            </div>
        </div>
    )
}

export default TopBar
