import React from 'react'
import { Container, Row, Col} from 'react-bootstrap'
import Imagef0 from '../images/f0.jpg';
import Imagef1 from '../images/f1.jpg';
import Imagef2 from '../images/f2.jpg';
import Imagef3 from '../images/f3.jpg';
import Imagef4 from '../images/f4.jpg';
import Imagef5 from '../images/f5.jpg';
import Imagef6 from '../images/f6.jpg';
import Imagef7 from '../images/f7.jpg';
import Imagef8 from '../images/f8.jpg';
import Imagef9 from '../images/f9.jpg';
import Rating from '../component/Rating';
import {FaShoppingCart, FaHeart} from "react-icons/fa";
import { AiOutlineRetweet} from "react-icons/ai";
import ImageResponsive from 'react-image-responsive';



function FeaturedProducts() {
    return (
        <div className="featured-main">
            <Container>
                <Row>
                    <div className="title pt-5">
                        <h3>Featured Products</h3>
                        <p>Newest trends from top brands</p>
                    </div>

                </Row>
                <Row className="pt-4 pb-4">
                    <Col>
                        <div className="inner-content">
                            <div className="img-wrap
                            ">
                                {/* <div className="img-f1"></div> */}
                                {/* <img className="responsive" src={Imagef0} alt="image"/> */}
                                <figure class="snip0013">
                                    <img className="responsive" src={Imagef0} alt="image"/>
                                    <div>
                                        <ul className="img-hover">
                                            <li><a href="#"><i><FaShoppingCart/></i></a></li>
                                            <li><a href="#"><i><FaHeart/></i></a></li>
                                            <li><a href="#"><i><AiOutlineRetweet/></i></a></li>
                                        </ul>
                                    </div>
                                </figure>
                                {/* <div className="img-hover">
                                    <ul className="float-right hover-icon">
                                        <li className="pr-3 pt-3 pb-2"><FaShoppingCart/></li>
                                        <li className="pb-2"><FaHeart/></li>
                                        <li><AiOutlineRetweet/></li>
                                    </ul>
                                </div> */}
                            </div>
                            <div className="text pt-3">
                                <h5>Crown Summit Backpack</h5>
                                <p className="mb-1">$250.00</p>
                            </div>

                            <Rating
                            value={3}
                            max={5}
                            onChange={(i) => console.log('onChange ' + i)}
                            />

                        </div>
                    </Col>
                    <Col>
                        <div className="inner-content">
                            <div className="img-wrap">


                                <figure class="snip0013">
                                    <img src={Imagef1} alt="image"/>
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
                                <h5>Crown Summit Backpack</h5>
                                <p className="mb-1">$250.00</p>
                            </div>
                            <Rating
                            value={3}
                            max={5}
                            onChange={(i) => console.log('onChange ' + i)}
                            />
                        </div>
                    </Col>
                    <Col>
                        <div className="inner-content">
                            <div className="img-wrap">
                                <figure class="snip0013">
                                    <img src={Imagef2} alt="image"/>
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
                                <h5>Crown Summit Backpack</h5>
                                <p className="mb-1">$250.00</p>
                            </div>
                            <Rating
                            value={3}
                            max={5}
                            onChange={(i) => console.log('onChange ' + i)}
                            />
                        </div>
                    </Col>
                    <Col>
                        <div className="inner-content">
                            <div className="img-wrap">
                            <figure class="snip0013">
                                    <img src={Imagef3} alt="image"/>
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
                                <h5>Crown Summit Backpack</h5>
                                <p className="mb-1">$250.00</p>
                            </div>
                            <Rating
                            value={3}
                            max={5}
                            onChange={(i) => console.log('onChange ' + i)}
                            />
                        </div>
                    </Col>
                    <Col>
                        <div className="inner-content">
                            <div className="img-wrap">
                                <figure class="snip0013">
                                        <img src={Imagef4} alt="image"/>
                                        <div>
                                            <ul className="img-hover">
                                                <li><a href="#"><i><FaShoppingCart/></i></a></li>
                                                <li><a href="#"><i><FaHeart/></i></a></li>
                                                <li><a href="#"><i><AiOutlineRetweet/></i></a></li>
                                            </ul>
                                        </div>
                                    </figure>
                                {/* <div className="img-hover">
                                    <ul className="float-right hover-icon">
                                        <li className="pr-3 pt-3 pb-2"><FaShoppingCart/></li>
                                        <li className="pb-2"><FaHeart/></li>
                                        <li><AiOutlineRetweet/></li>
                                    </ul>
                                </div> */}
                            </div>

                            <div className="text pt-3">
                                <h5>Crown Summit Backpack</h5>
                                <p className="mb-1">$250.00</p>
                            </div>
                            <Rating
                            value={3}
                            max={5}
                            onChange={(i) => console.log('onChange ' + i)}
                            />
                        </div>
                    </Col>
            </Row>

            <Row className="pt-2 pb-5">
                    <Col>
                        <div className="inner-content">
                            <div className="img-wrap">
                                <figure class="snip0013">
                                        <img src={Imagef5} alt="image"/>
                                        <div>
                                            <ul className="img-hover">
                                                <li><a href="#"><i><FaShoppingCart/></i></a></li>
                                                <li><a href="#"><i><FaHeart/></i></a></li>
                                                <li><a href="#"><i><AiOutlineRetweet/></i></a></li>
                                            </ul>
                                        </div>
                                    </figure>
                                {/* <div className="img-hover">
                                    <ul className="float-right hover-icon">
                                        <li className="pr-3 pt-3 pb-2"><FaShoppingCart/></li>
                                        <li className="pb-2"><FaHeart/></li>
                                        <li><AiOutlineRetweet/></li>
                                    </ul>
                                </div> */}
                            </div>
                            <div className="text pt-3">
                                <h5>Cruise Dual Analog</h5>
                                <p className="mb-1">$250.00</p>
                            </div>

                            <Rating
                            value={3}
                            max={5}
                            onChange={(i) => console.log('onChange ' + i)}
                            />

                        </div>
                    </Col>
                    <Col>
                        <div className="inner-content">
                            <div className="img-wrap">
                                <figure class="snip0013">
                                        <img src={Imagef6} alt="image"/>
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
                                <h5>Crown Summit Backpack</h5>
                                <p className="mb-1">$250.00</p>
                            </div>
                            <Rating
                            value={3}
                            max={5}
                            onChange={(i) => console.log('onChange ' + i)}
                            />
                        </div>
                    </Col>
                    <Col>
                        <div className="inner-content">
                            <div className="img-wrap">
                                <figure class="snip0013">
                                        <img src={Imagef7} alt="image"/>
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
                                <h5>Crown Summit Backpack</h5>
                                <p className="mb-1">$250.00</p>
                            </div>
                            <Rating
                            value={3}
                            max={5}
                            onChange={(i) => console.log('onChange ' + i)}
                            />
                        </div>
                    </Col>
                    <Col>
                        <div className="inner-content">
                            <div className="img-wrap">
                                <figure class="snip0013">
                                        <img src={Imagef8} alt="image"/>
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
                                <h5>Crown Summit Backpack</h5>
                                <p className="mb-1">$250.00</p>
                            </div>
                            <Rating
                            value={3}
                            max={5}
                            onChange={(i) => console.log('onChange ' + i)}
                            />
                        </div>
                    </Col>
                    <Col>
                        <div className="inner-content">
                            <div className="img-wrap">
                                <figure class="snip0013">
                                        <img src={Imagef9} alt="image"/>
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
                                <h5>Crown Summit Backpack</h5>
                                <p className="mb-1">$250.00</p>
                            </div>
                            <Rating
                            value={3}
                            max={5}
                            onChange={(i) => console.log('onChange ' + i)}
                            />
                        </div>
                    </Col>
            </Row>
            
            </Container>
        </div>
        
    )
}

export default FeaturedProducts
