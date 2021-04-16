
    import React,{useEffect, useState, useRef} from 'react'
    import {Row, Col, Container } from 'react-bootstrap';
    // import Carousel from 'react-bootstrap/Carousel'
    import Carousel from "react-elastic-carousel";

    import 'react-multi-carousel/lib/styles.css';
    import Rating from '../component/Rating';
    import "../assets/style.css"
    import { API_URL} from "../helper/api"
    import Slide1 from '../images/s1.jpg'
    import Slide2 from '../images/s2.jpg'
    import Slide3 from '../images/s3.jpg'
    import Slide4 from '../images/s4.jpg'
    import Slide5 from '../images/s5.jpg'
    
    
    export default function BestSeller(props) {
    
        const [products, setProducts] = useState([]);
        
        
        const getProducts = async () => {
            const response = await fetch (API_URL+"inventory/");
            const data = await response.json();
            setProducts(data.results);
        
        }

   
       
        useEffect ( () => {
            getProducts();
        }, [] );
    
        return (
      
           

            <div className="seller-main">
                <Container>
                    <Row>
                        <div className="title">
                            <h3 className="mb-0">Best sellers</h3>
                            <p className="">We provides the best</p>
                            <p className="description mb-4">
                            Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna
                            aliqua.
                            </p>
                        </div>
                    </Row>
                </Container>
                <Container>
                    <div className="seller-inner-slider pb-4">
                    <Carousel itemsToScroll={1} itemsToShow={5} pagination={false} enableAutoPlay={true} autoPlaySpeed={3000}   >
                            {products.map((product)=>
                            <div>
                            {product.best_seller === true && <div className="responsivee-image">
                                
                                            <img src={"http://localhost:8000/static"+product.images[0].image} alt="slide1"/>
                                            
                                            <div className="text pt-3">
                            <h5>{product.product_title}</h5>
                            <p className="mb-1">
                                {product.unit_price}
                            </p> 
                            <Rating
                            value={3}
                            max={5}
                            onChange={(i) => console.log('onChange ' + i)}
                            />
                            </div>
                                        
                                
                            </div>}
                            </div> )}
                    </Carousel>
                    </div>
                        
                </Container>
            </div>
        )
    }
    
    
    