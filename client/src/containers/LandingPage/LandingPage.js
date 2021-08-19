import React, { Component } from "react";

import { Link } from 'react-router-dom';
import './LandingPage.css';


export class LandingPage extends Component {
  
  render() {
    
    return (
      <div className ='backLP'>
      
        <div id="welcome" >Welcome to Henry - Videogames</div>
            <Link to= '/videogames' >
                  <button id ="start">
                    <span id ='letra'>START</span>
                  </button>
            </Link>
        
     
      </div>
    );
  }
}



export default (LandingPage);
// function mapStateToProps(state) {
//   return {
//     favoriteMovies: state.moviesFavourites}
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     // removeMovieFavorite: (imdbID) => dispatch(removeMovieFavorite(imdbID)),
    
//   };
// }

// export default connect(  mapStateToProps,  mapDispatchToProps
// )(ConnectedList);
