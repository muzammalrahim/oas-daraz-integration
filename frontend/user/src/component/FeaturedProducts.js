import React,{useEffect, useState} from 'react'
import { Container, Row, Col} from 'react-bootstrap'
import Imagef0 from '../images/f0.jpg';
import Rating from '../component/Rating';
import {FaShoppingCart, FaHeart} from "react-icons/fa";
import { AiOutlineRetweet} from "react-icons/ai";
import ImageResponsive from 'react-image-responsive';
import "../assets/style.css"
import { API_URL} from "../helper/api"

export default function FeaturedProducts(props) {

const [products, setProducts] = useState([]);
const [lengthh, setLengthh] = useState([]);


const getProducts = async () => {
    const response = await fetch (API_URL+"inventory/");
    const data = await response.json();
    setProducts(data.results);
}

const getLengthh = async () => {
    const response = await fetch (API_URL+"shop-setting/");
    const data = await response.json();
    setLengthh(data);
    console.log(data)
}


useEffect ( () => {
    getProducts();
    getLengthh();
}, [] );

console.log("Length",lengthh.featured_product);

    return (
    

        <div className="featured-main">
            <Container>
                <Row>
                    <div className="title pt-5">
                        <h3>Featured Products</h3>
                        <p>Newest trends from top brands</p>
                    </div>
                </Row>
                <Row className="products-grid pt-4 pb-4">
                {
                products.map((product,index)=> 
                  <div>
                      { lengthh.featured_product > index &&
                    <Col>
                    {product.featured_product === true && <div>
                    
                        <div className="inner-content">
                            <div className="img-wrap">
                                <figure class="snip0013">
                                        <img className="responsive-image" src={"http://localhost:8000/static"+product.images[0].image} alt="image"/>
                                    <div>
                                        <ul className="img-hover">
                                            <li><a href="#"><i><FaShoppingCart/></i></a></li>
                                            <li><a href="#"><i><FaHeart/></i></a></li>
                                            <li><a href="#"><i><AiOutlineRetweet/></i></a></li>
                                        </ul>    
                                    </div>			
                                </figure>
                                 
                                </div>
                            <div className="text pt-3">
                            <h5>{product.product_title}</h5>
                            <p className="mb-1">
                                {product.unit_price}
                            </p> 
                            </div>
                            <Rating
                            value={3}
                            max={5}
                            onChange={(i) => console.log('onChange ' + i)}
                            />
                        </div>
                        </div>}
                    </Col>} </div>)
                    }
                    
                   
            </Row>
            
            </Container>
        </div>
        
    )
}

