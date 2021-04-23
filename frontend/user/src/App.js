import React from 'react'
import './App.css';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import ProductDetail from './pages/ProductDetail'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';



function App() {
  return (
    <>
  <Router>
  <Switch>
  <Route exact path="/home" component={Home} />
  <Route exact path="/ProductPage" component={ProductPage} />
  <Route exact path="/ProductDetail" component={ProductDetail} />
  </Switch>
  </Router>
</>
  );
}

export default App;
