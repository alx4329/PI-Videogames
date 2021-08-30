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
                    <button onClick= {()=> dispatch(getGames())}>Show All Games</button>
                    <button onClick= {()=> dispatch(bringGames('api'))}>Show Api Games</button>
                    <button onClick= {()=> dispatch(bringGames('created'))}>Show My Games</button>

                </div>
        <form className="form-container" onSubmit={(e) =>  handleSubmit(e)}>
          <div >
            <input
              type="text"
              className="input"
              autoComplete="off"
              placeholder= "Who are you looking for?"
              value={gameToFind}
              onChange={(e) => handleChange(e)}
            />
          <button id="namanyay-search-btn" type="submit">Search</button>
          </div>
        </form>
        
      </div>
    );
  
}

export default Search;


