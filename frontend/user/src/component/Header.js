import React,{useEffect, useState} from 'react'
import {Row, Col, Container } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import { FaSearch, FaBars, FaShoppingCart} from "react-icons/fa";
import Card from '../component/SideNavpage';
import Cart from '../component/Cart';
import "../assets/style.css"
import { API_URL, STATIC_URL, MAIN_ROUTE} from "../helper/api"


export default function Header(props) {

    const [lengthh, setLengthh] = useState([]);

    const getLengthh = async () => {
        const response = await fetch (API_URL+"shop-setting/");
        const data = await response.json();
        if(data.logo){
            let filename_pieces = data.logo.split('/');
            let img_name = filename_pieces[filename_pieces.length - 1];
            data['logo'] = STATIC_URL+"logo/" + img_name;
        }
        setLengthh(data);
    }
    
    useEffect ( () => {
        getLengthh();
    }, [] );
    
    
        return (

      

        <div className="header-main">
            <div className="header p-3">
                <Container fluid>
                    {/* web menu */}
                    <div className="row web-menu">
                        <Col xs="3">
                        <img className="main-logo" src={lengthh.logo} alt="Site Logo"/>
                        </Col>
                        <Col xs="6">
                            <div className="home-menu">
                                <Nav className="justify-content-center" activeKey="/">
                                    <Nav.Item>
                                        <Nav.Link href={"/" + MAIN_ROUTE}  className="pr-4">Home</Nav.Link>
                                    </Nav.Item>

                                    <Nav.Item>
                                        <Nav.Link eventKey="link-1"  className="pr-4">Accessories</Nav.Link>
                                    </Nav.Item>

                                    <Nav.Item>
                                        <Nav.Link eventKey="link-2"  className="pr-4">About</Nav.Link>
                                    </Nav.Item>

                                    <Nav.Item>
                                        <Nav.Link eventKey="link-2">Contact US</Nav.Link>
                                    </Nav.Item>
                                
                                </Nav>
                            </div>
                        </Col>
                        <Col xs="3">
                            <div className="float-right menu-right-icons">
                               <span className="pr-3"><FaSearch/></span> 
                               <span className=""><Card /></span>
                               <span className="cart-main"><Cart/></span>
                            </div> 
                        </Col> 
                        </div> 
                    {/* web menu */}

                    {/* Mobile menu */}
                        <div className="mob-menu">
                        <Row> 
                            {/* web menu */}
                            <div className="web-menu"></div>
                            
                            <Col xs lg="4" xs="4">
                                <div className="home-menu">
                                <Navbar  expand="lg" w-100="true">

                                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                    <Navbar.Collapse id="basic-navbar-nav">
                                        <Nav className="mr-auto border">
                                        <Nav.Link href="#home">Categories</Nav.Link>
                                        <Nav.Link eventKey="link-1">Accessories</Nav.Link>
                                        <Nav.Link eventKey="link-2">About</Nav.Link>
                                        <Nav.Link eventKey="link-2">Contact US</Nav.Link>
                                        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                        </NavDropdown> */}
                                        </Nav>    
                                        
                                    </Navbar.Collapse>
                                    </Navbar>
                                </div>
                            </Col>
                            <Col xs lg="4" xs="3">
                                <div className="brand-name">        
                                    <h2>LOGO</h2>
                                </div>
                                
                            </Col>
                            <Col xs lg="3" xs="5">
                                <div className="float-right menu-mobright-icons">
                                <span className="pr-2"><FaSearch/></span> 
                                <span className=""><FaShoppingCart/></span>
                                
                                </div> 
                            </Col>
                            {/* web menu */}

                        </Row>
                        </div>
                            

                    {/* Mobile menu */}
                </Container>
            </div>
        </div>
    )
}


