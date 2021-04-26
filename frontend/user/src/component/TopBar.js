import React,{useEffect, useState} from 'react'
import {Row, Col, Container } from 'react-bootstrap';
import '../assets/style.css'
import { FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram, FaBlog, FaShareAlt } from "react-icons/fa";
import {Link} from 'react-router-dom'
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
        <div className="topbar-main">
            <div className="top-bar text-white">
            <Container fluid>
                    {/* web bar */}
                    <div className="web-topbar">
                        <Row className="pr-4 pl-4 pt-1 pb-1">
                            <Col xs="6">
                            <ul className="pl-0 m-0">
                                <li className="pr-4">
                                <p className="m-0"><FaPhoneAlt/> <span className="pl-1"><Link href="tel:+92 7654321">{lengthh.phone_number}</Link></span></p>
                                </li>
                                <li>
                                    <p className="m-0"><FaEnvelope/><span className="pl-3"><Link href="mailto:info@company.com">{lengthh.email}</Link></span></p>
                                </li>
                            </ul>
                            </Col>
                            <Col xs="6" sm="4" md="6">
                                <ul className="float-right m-0">
                                {lengthh.facebook_url ? <a href={lengthh.facebook_url}><li className="pr-2"><FaFacebookF/></li></a> : <li className="none"></li> }
                                {lengthh.twitter_url ? <a href={lengthh.twitter_url}><li className="pr-2"><FaTwitter/></li></a> : <li className="none"></li> }
                                {lengthh.instagram_url ? <a href={lengthh.instagram_url}><li className="pr-2"><FaInstagram/></li></a> : <li className="none"></li> }
                                {lengthh.blog_url ? <a href={lengthh.blog_url}><li className="pr-2"><FaBlog/></li></a> : <li className="none"></li> }
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
                                        <li>{lengthh.phone_number}</li>
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


