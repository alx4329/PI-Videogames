import React, { useState } from "react";
import { getGames } from "../../actions";
import { useDispatch } from "react-redux";
import { bringGames } from "../../actions";
import './Search.css';


export function Search (props) {
  const [gameToFind, setGameToFind] = useState(['']);
  const dispatch = useDispatch();
  
  function handleChange(event) {
    setGameToFind(event.target.value );
  }
  function handleSubmit(event) {
    event.preventDefault();
    dispatch(getGames(gameToFind));
    
  }
    return (
      <div className= 'bar2'>
        <div className = 'showingOptions'>
                    <button onClick= {()=> dispatch(getGames())}>SHOW ALL GAMES</button>
                    <button onClick= {()=> dispatch(bringGames('api'))}>Show Api Games</button>
                    <button onClick= {()=> dispatch(bringGames('created'))}>Show My Games</button>

                </div>
        <form  onSubmit={(e) =>  handleSubmit(e)}>
                <div className="form-container" >
          
            <input
              type="text"
              className="searchInput"
              autoComplete="off"
              placeholder= "Find a Game"
              value={gameToFind}
              onChange={(e) => handleChange(e)}
            />
          <button className="searchButton" type="submit">Search</button>
          
                </div>
        </form>

        
      </div>
    );
  
}

export default Search;


