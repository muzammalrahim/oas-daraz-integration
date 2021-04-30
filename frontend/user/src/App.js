import React from 'react'
import './App.css';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import ProductDetail from './pages/ProductDetail'
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { MAIN_ROUTE } from './helper/api';


function App() {
  return (
    <>
  <Router>
  <Switch>
  <Route exact path={"/" + MAIN_ROUTE} component={Home} />
  <Route exact path={"/" + MAIN_ROUTE +"/ProductPage"} component={ProductPage} />
  <Route exact path={"/"+ MAIN_ROUTE +"/ProductDetail/:id"} component={ProductDetail} />
    <Redirect from='/' to={'/'+ MAIN_ROUTE} />      
  </Switch>
  </Router>
</>
  );
}

export default App;
