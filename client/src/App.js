import './App.css';
import { Route } from "react-router-dom";
import React from 'react';
import LandingPage from './containers/LandingPage/LandingPage.jsx';
import Pagination from './containers/Pagination/Pagination';
import NavBar from './components/NavBar/NavBar.js';

function App() {
  return (
    <React.Fragment>
     <Route exact path="/" component={LandingPage}/>
     <Route exact path="/videogames" component={Pagination}/>
     <Route exact path="/videogames" component={NavBar}/>
    </React.Fragment>
  );
}

export default App;
