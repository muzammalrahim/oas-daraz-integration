import React from 'react'
import {Row, Col, Container } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { FaCcVisa, FaCcPaypal,FaCcAmazonPay } from "react-icons/fa"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../assets/style.css"


function GetCoupen() {
    return (
        <div className="coupen">
            <div className="discount-coupen p-4">
                <div id="color-overlay"></div>
                <div className="subs-form">
                    <Container>
                        <Row>
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <h3>Get Out Special Discount</h3>
                                        <p className="pl-4 pr-4">Donec eu tristique felis. Duis augue mi, auctor ut purus et, dignissim aliquet quam. 
                                            register your email for news and special offers</p>
                                        
                                    <Form.Control type="email" placeholder="E-mail address ..." />
                                        <Button variant="primary" type="submit">
                                        GET COUPON NOW
                                    </Button>
                                </Form.Group>
                                
                            </Form>
                        </Row>
                    </Container>
                
                </div>
            </div>
        </div>
    )
}

export default GetCoupen
