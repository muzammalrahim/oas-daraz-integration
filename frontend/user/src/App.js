import React from 'react'
import './App.css';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import ProductDetail from './pages/ProductDetail'
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';



function App() {
  return (
    <>
  <Router>
  <Switch>
  <Route exact path="/home" component={Home} />
  <Route exact path="/ProductPage" component={ProductPage} />
  <Route exact path="/ProductDetail/:id" component={ProductDetail} />
    <Redirect from='/' to='/home' />      
  </Switch>
  </Router>
</>
  );
}

export default App;
