import React, { Component } from 'react'
import TopBar from '../component/TopBar';
import Header from '../component/Header';
import SideBar from '../component/SideBar'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import {Row, Col, Container } from 'react-bootstrap';
import RangeSlider from '../component/RangeSlider';






export default class ProductPage extends Component {
    render() {
        return (
            <div className="product-listing">
                <div className="topbar">
                <TopBar/>
                </div>
                <div>
                    <Header/>
                </div>
                <div className="bread-crum">
                    <Breadcrumb>
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                        Library
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Data</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="main-wrapper">
                    <Container className="c-con">
                        <Row >
                            <Col xs={2} className="border">
                                <SideBar/> 
                                <RangeSlider/>
                            </Col>
                            <Col xs={10}>
                            </Col>
                        </Row>
                    </Container>
                </div>
                
            </div>
        )
    }
}
