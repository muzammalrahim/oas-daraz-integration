import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import {Row, Col, Container } from 'react-bootstrap';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Gallery from '../component/Gallery'
import NumberFormat from 'react-number-format';
// import Rating from '../component/Rating';
import GetCoupen from '../component/GetCoupen';
import RelatedProducts from '../component/RelatedProduct';
import ProductDetailTab from '../component/ProductDetailTab';
import { FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaShareAlt } from "react-icons/fa";
import {Link, useParams} from 'react-router-dom';
import Imagemain from '../images/m1.jpg'
import Easypesa from '../images/easypesa.png';
import Jazzcash from '../images/jazz.png';
import {list} from '../helper/api'
export default class ProductDetail extends Component {
    state = {
        product: {},
      }; 

    getProductDetail = (id) => {
        console.log("id ", id)
        list('inventory/' + id).then(response => {
            // console.log(response.data)
            this.setState({product: response.data})
        })
    }

    handleProduct = (id) => {
        if(id){
            this.props.match.params.id = id;
            this.getProductDetail(id)
        }
    }

    componentDidMount() {
        const id = this.props.match.params?.id;
        this.getProductDetail(id)
    }

    render() {
        const { product } = this.state;
        // console.log("product ", product)
        return (
            <>
                <div className="top-area">
                    <div className="bread-crum">
                        <Breadcrumb>
                        <Link className="breadcrumb-item" to="/" role="button">Home</Link>
                        {/* <Breadcrumb.Item to="/">Home</Breadcrumb.Item> */}
                        <Breadcrumb.Item href="#">
                            Products
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>Product Detail</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>
                <div className="detail-inner">
                <Container className="c-con">
                    <Row>
                        <Col xs={6}>
                             <Gallery images={product.images} />

                        </Col>
                        <Col xs={6} className="p-0 border">
                            <div className="product-right">
                                <div className="product-count">
                                    <ul className="pl-1 m-0">
                                        <li>
                                        
                                            <span className="p-counter">37</span>
                                            <span className="lang">orders in last 24 hours</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="right-inner pl-3 pr-3">
                                    <div className="head-title  pt-3">
                                        <h2>{product.title ? product.title : product.part_number}</h2>
                                    </div>
                                    
                                    <h3 className="price-detail "><NumberFormat value={product.unit_price} displayType={'text'} thousandSeparator={true} prefix={'$'} /> <del> $459.00</del> <span>55% off</span></h3>
                                    <div className="rating-section">
                                        <ul className="p-0 rating-list">
                                            <li>
                                                <Rating name="read-only" value={product.product_rating ? product.product_rating : 0} readOnly emptyIcon={<StarBorderIcon fontSize="inherit" />}/>
                                            </li>
                                            <li>
                                                <h6 className="ml-2">{product.product_rating ? product.product_rating : 0} ratings</h6>
                                            </li>
                                        </ul>
                                        
                                        
                                    </div>
                                    {/* <ul class="color-variant">
                                    <li class="bg-light0 active"></li>
                                    <li class="bg-light1"></li>
                                    <li class="bg-light2"></li>
                                    </ul> */}
                                    <div className="detail-sizes pt-3">
                                        <h6 className="product-title size-text">select 
                                        
                                        </h6>
                                    </div>
                                    <div className="qty-box pb-5">
                                        <div className="input-group"><span className="input-group-prepend"><button type="button" className="btn quantity-left-minus" data-type="minus" data-field=""><i className="ti-angle-left"></i></button> </span>
                                            <input type="text" name="quantity" onChange={()=>{}} className="form-control input-number" value="1" />
                                            <span className="input-group-prepend"><button type="button" className="btn quantity-right-plus" data-type="plus" data-field=""><i className="ti-angle-right"></i></button></span>
                                        </div>
                                    </div>
                                    
                                
                                    <div className="border-product">
                                        <h6 className="product-title pt-3">shipping info</h6>
                                        <ul className="shipping-info p-0">
                                            <li>100% Original Products</li>
                                            <li>Free Delivery on order above Rs. 799</li>
                                            <li>Pay on delivery is available</li>
                                            <li>Easy 30 days returns and exchanges</li>
                                        </ul>
                                    </div>
                                    <div className="product-buttons mb-4">
                                        <a href="#" id="cartEffect" className="btn btn-solid hover-solid btn-animation mr-1"><i className="fa fa-shopping-cart me-1" aria-hidden="true"></i> add to cart</a> 
                                        <a href="#" className="btn btn-solid"><i className="fa fa-bookmark fz-16 me-2" aria-hidden="true"></i>wishlist</a>
                                    </div>
                                    
                                    <div className="border-product payment-methods">
                                        <h6 className="product-title">100% secure payment</h6>
                                            <ul className="p-0 pt-1">
                                                {/* <li><h6>Payment Method:</h6></li> */}
                                                <li className="pr-3"><Link to="#">COD</Link></li>
                                                <li className="pr-3"><Link to="#" ><img className="responsive" src={Easypesa} alt="image"/></Link></li>
                                                <li><Link to="#"><img className="responsive" src={Jazzcash} alt="image"/></Link></li>
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
                    
                    
                    <div className="product-related mb-5">
                        <h2>related products</h2>
                        {product.hasOwnProperty("related_products") && <RelatedProducts products={product.related_products} handleProduct={this.handleProduct} />}
                    </div>
                </Container>
                
                </div>
                
                <div>
                    <GetCoupen/>
                </div>
            </>
        )
    }
}
