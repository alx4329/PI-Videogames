import './App.css';
import { Route } from "react-router-dom";
import React from 'react';
import LandingPage from './containers/LandingPage/LandingPage.jsx';
import Navbar from './components/NavBar/NavBar'
import { Home } from './containers/Home/Home';
import {GameDetail} from './components/GameDetail/GameDetail.jsx'
import {Create} from './components/Create/Create';

function App() {
  return (
    <React.Fragment>
    <Route path ={["/videogames",'/create','7videogame']} component={Navbar}/>
     <Route exact path="/" component={LandingPage}/>
     <Route exact path="/videogames" component={Home}/>
     <Route exact path="/create" component={Create}/>
     <Route exact path="/videogame/:id" component={GameDetail}/>
    </React.Fragment>
  );
}

export default App;
