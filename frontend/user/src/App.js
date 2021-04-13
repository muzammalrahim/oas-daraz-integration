import React from 'react'
import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <>
    <Router>
    <Switch>
      <Route exact path="/home" component={Home} />
    </Switch>
    </Router>
  </>
  );
}

export default App;
