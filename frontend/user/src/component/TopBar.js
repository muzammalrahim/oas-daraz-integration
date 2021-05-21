import React,{useEffect, useState} from 'react'
import {Row, Col, Container } from 'react-bootstrap';
import '../assets/style.css'
import { FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram, FaBlog, FaShareAlt } from "react-icons/fa";
import {Link} from 'react-router-dom'
import "../assets/style.css"

export default function TopBar(props) {

    const {setting} = props;

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
                                <p className="m-0"><FaPhoneAlt/> <span className="pl-1"><a href="tel:+92 7654321">{setting.phone_number}</a></span></p>
                                </li>
                                <li>
                                    <p className="m-0"><FaEnvelope/><span className="pl-3"><a href="mailto:info@company.com">{setting.email}</a></span></p>
                                </li>
                            </ul>
                            </Col>
                            <Col xs="6" sm="4" md="6">
                                <ul className="float-right m-0">
                                {setting.facebook_url ? <a href={setting.facebook_url}><li className="pr-2"><FaFacebookF/></li></a> : <li className="none"></li> }
                                {setting.twitter_url ? <a href={setting.twitter_url}><li className="pr-2"><FaTwitter/></li></a> : <li className="none"></li> }
                                {setting.instagram_url ? <a href={setting.instagram_url}><li className="pr-2"><FaInstagram/></li></a> : <li className="none"></li> }
                                {setting.blog_url ? <a href={setting.blog_url}><li className="pr-2"><FaBlog/></li></a> : <li className="none"></li> }
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
                                        <li>{setting.phone_number}</li>
                                    </ul>
                                </div>
                            </span>
                        </Col>
                        <Col><FaEnvelope/></Col>
                        <Col><FaShareAlt/></Col>
                    </Row>
                    </div>
            </Container> 
            </div>
        </div>
    )
}


