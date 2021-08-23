import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import './LandingPage.css';
import { getGames } from "../../actions";

export function LandingPage(){
  
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getGames())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
    return (
      <div className ='backLP'>
      <div className='inline'>
        <div id='welcome' >Welcome to Henry - Videogames</div>
            <Link to= '/videogames' >
                  <button id ="start" >START</button>
            </Link>

      </div>
        
     
      </div>
    );
  
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
