import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import TopBar from '../component/TopBar';
import Header from '../component/Header';
import {Row, Col, Container } from 'react-bootstrap';
import Gallery from '../component/Gallery'
import Rating from '../component/Rating';
import Footer from '../component/Footer';
import GetCoupen from '../component/GetCoupen';
import RelatedProducts from '../component/RelatedProduct';
import ProductDetailTab from '../component/ProductDetailTab';
import { FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaShareAlt } from "react-icons/fa";
import {Link} from 'react-router-dom';
import Imagemain from '../images/m1.jpg'
import Easypesa from '../images/easypesa.png';
import Jazzcash from '../images/jazz.png';





export default class ProductDetail extends Component {

    state = {
        path: this.props.Imagemain,
        mouseOver: false,
      }; 

    static propTypes = {
        prop: PropTypes
    }

    render() {
        const { path, mouseOver } = this.state;
        return (
            <div className="product-detail-main">

                <div className="top-area">
                    <div className="topbar">
                        <TopBar/>
                    </div>
                    <div>
                        <Header/>
                    </div> 
                    <div className="bread-crum">
                        <Breadcrumb>
                        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="#">
                            Produuct
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>Product Detail</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>
                <div className="detail-inner">
                <Container className="c-con">
                    <Row>
                        <Col xs={6}>
                             <Gallery/>

                        </Col>
                        <Col xs={6} className="p-0 border">
                            <div className="product-right">
                                <div class="product-count">
                                    <ul className="pl-1 m-0">
                                        <li>
                                        
                                            <span class="p-counter">37</span>
                                            <span class="lang">orders in last 24 hours</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="right-inner pl-3 pr-3">
                                    <div className="head-title  pt-3">
                                        <h2>Lorem Ipsum Doltt</h2>
                                    </div>
                                    
                                    <h3 class="price-detail ">$32.96 <del>$459.00</del><span>55% off</span></h3>
                                    <div className="rating-section">
                                        <ul className="p-0 rating-list">
                                            <li>
                                                <Rating
                                            value={3}
                                            max={5}
                                            onChange={(i) => console.log('onChange ' + i)}
                                            />
                                            </li>
                                            <li>
                                                <h6>120 ratings</h6>
                                            </li>
                                        </ul>
                                        
                                        
                                    </div>
                                    {/* <ul class="color-variant">
                                    <li class="bg-light0 active"></li>
                                    <li class="bg-light1"></li>
                                    <li class="bg-light2"></li>
                                    </ul> */}
                                    <div className="detail-sizes pt-3">
                                        <h6 class="product-title size-text">select 
                                        
                                        </h6>
                                    </div>
                                    <div class="qty-box pb-5">
                                        <div class="input-group"><span class="input-group-prepend"><button type="button" class="btn quantity-left-minus" data-type="minus" data-field=""><i class="ti-angle-left"></i></button> </span>
                                            <input type="text" name="quantity" class="form-control input-number" value="1"/>
                                            <span class="input-group-prepend"><button type="button" class="btn quantity-right-plus" data-type="plus" data-field=""><i class="ti-angle-right"></i></button></span>
                                        </div>
                                    </div>
                                    
                                
                                    <div class="border-product">
                                        <h6 class="product-title pt-3">shipping info</h6>
                                        <ul class="shipping-info p-0">
                                            <li>100% Original Products</li>
                                            <li>Free Delivery on order above Rs. 799</li>
                                            <li>Pay on delivery is available</li>
                                            <li>Easy 30 days returns and exchanges</li>
                                        </ul>
                                    </div>
                                    <div class="product-buttons mb-4">
                                        <a href="#" id="cartEffect" class="btn btn-solid hover-solid btn-animation mr-1"><i class="fa fa-shopping-cart me-1" aria-hidden="true"></i> add to cart</a> 
                                        <a href="#" class="btn btn-solid"><i class="fa fa-bookmark fz-16 me-2" aria-hidden="true"></i>wishlist</a>
                                    </div>
                                    
                                    <div class="border-product payment-methods">
                                        <h6 className="product-title">100% secure payment</h6>
                                            <ul className="p-0 pt-1">
                                                {/* <li><h6>Payment Method:</h6></li> */}
                                                <li className="pr-3"><Link>COD</Link></li>
                                                <li className="pr-3"><Link><img className="responsive" src={Easypesa} alt="image"/></Link></li>
                                                <li><Link><img className="responsive" src={Jazzcash} alt="image"/></Link></li>
                                            </ul>
                                    </div>
                                    <div className="product-social-icon">
                                        <ul className="p-0 m-0">
                                            <li className="pr-3"><h6>share It:</h6></li> 
                                            <li className="pr-3"><FaFacebookF/></li>
                                            <li className="pr-3"><FaTwitter/></li>
                                            <li className="pr-3"><FaInstagram/></li>
                                            <li><FaLinkedinIn/></li>
                                        
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    
                        <div className="mt-5 mb-5">
                            <ProductDetailTab/>
                        </div>
                    
                    
                    <div class="product-related pt-5">
                        <h2>related products</h2>
                    </div>
                    <div>
                        <RelatedProducts/>
                    </div>
                </Container>
                
                </div>
                
                <div>
                    <GetCoupen/>
                </div>
               <Footer/>
            </div>
        )
    }
}
