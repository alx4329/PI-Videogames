import './App.css';
import { Route } from "react-router-dom";
import React from 'react';
import LandingPage from './containers/LandingPage/LandingPage';

function App() {
  return (
    <React.Fragment>
     <Route exact path="/" component={LandingPage}/>
    </React.Fragment>
  );
}

export default App;
