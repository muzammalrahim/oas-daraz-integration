import React, { Component } from 'react'
import TopBar from '../component/TopBar';
import Header from '../component/Header';
import Slider from '../component/Slider';
import Services from '../component/Services';
import BestSeller from '../component/BestSeller';
import Footer from '../component/Footer';
import Sales from '../component/Sales';
import FeaturedProducts from '../component/FeaturedProducts';
import GetCoupen from '../component/GetCoupen';


export default class Home extends Component {
    render() {
        return (
            <div className="home-main">
                <div className="topbar">
                <TopBar/>
                </div>
                <div>
                    <Header/>
                </div>
                <div>
                    <Slider/>
                </div>
                <div className="mt-5">
                    <BestSeller/>
                </div> 

                
                <div>
                    <Services/>
                </div>
                <div>
                    <Sales/>
                </div>
                
                <div>
                    <FeaturedProducts/>
                </div>
                <div>
                    <GetCoupen/>
                </div>
                <Footer/> 
            </div>
            
        )
    }
}
