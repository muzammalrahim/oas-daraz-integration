import React, { useState, useEffect} from 'react'
import { Switch, Route, Redirect} from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import ProductDetail from './pages/ProductDetail'
import { MAIN_ROUTE } from './helper/api';
import Footer from './component/Footer';
import TopBar from './component/TopBar';
import Header from './component/Header';
import {API_URL} from "./helper/api";

function App() {
  const [setting, setSetting] = useState({})
  
  const getSetting = async () =>{
    const response = await fetch(API_URL+"shop-setting/");
    const data = await response.json();
    setSetting(data);
  } 
  useEffect(()=>{
    getSetting()
  },[])

  return (
  <>
    <div className="home-main">
      <div className="topbar">
          <TopBar setting={setting} />
      </div>
        <Header setting={setting}/>
      
      <Switch>
        <Route exact path={"/" + MAIN_ROUTE} component={Home} />
        <Route exact path={"/" + MAIN_ROUTE +"/ProductPage"} component={ProductPage} />
        <Route exact path={"/"+ MAIN_ROUTE +"/ProductDetail/:id"} component={ProductDetail} />
          <Redirect from='/' to={'/'+ MAIN_ROUTE} />      
      </Switch>

      <Footer setting={setting} /> 
    </div>
  </>
  );
}

export default App;
