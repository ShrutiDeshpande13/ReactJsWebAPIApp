import React from 'react';
import './App.css';

//Components 
import {Home} from './components/Home'
import {Department} from './components/Department'
import {Employee} from './components/Employee'
import {Navigation} from './components/Navitgation'
//React dom 
import { BrowserRouter, Route, Switch } from "react-router-dom";
//import { NavLink } from 'react-bootstrap';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <h3 className="m-3 d-flex justify-content-center">React Js with WebAPI demo</h3>
      <h5 className="m-3 d-flex justify-content-center">Employee Managment portal</h5>
      <Navigation/>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/department' component={Department} />
        <Route path='/employee' component={Employee} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}


export default App;
