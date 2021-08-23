import React, {useEffect, useState} from 'react'; 
import { useDispatch, useSelector } from "react-redux";
import './Pagination.css';
import {Link} from 'react-router-dom';
import { getGames, bringGameToDetail } from '../../actions/index';

export function Pagination(props){
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getGames());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
        let gamesRedux = useSelector(state => state.Games)
    

    useEffect(()=>{
        setGames(gamesRedux);
        setCurrentPage(1);
    },[gamesRedux]);
    const [games, setGames] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage]= useState(15);


    function handleClick(event) {
        setCurrentPage(Number(event.target.id));
    }
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

    const renderGames = currentGames.map((Game)=>{
        return(
            <div className ='card'>
                <Link to = {`/videogames/${Game.id}`} onClick ={()=> dispatch(bringGameToDetail(Game.id))}>
                    <h4 className= "card-title">{Game.name}</h4>
                </Link>
            <div>
                <img className='image' src={Game.img} alt ="Not  found"></img>
                <h5>Genres: {stringyfyGenres(Game.genres)}</h5>
            </div>

            </div>
        )
    })
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(games.length / gamesPerPage); i++) {
        pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers.map(number => {
        return (
            <li
                className = {currentPage ===number ? "activePage": ""}
                key={number}
                id={number}
                onClick={handleClick}
                >
                {number}
            </li>
        );
    });
    return (
        <div id ='bac'>
            <ul className='page-numbers'>
                {renderPageNumbers}
            </ul>
            <div className='container'>
                <ul className="cards">
                    <>{renderGames}</>
                </ul>
            </div>
        </div>
    )

}


function stringyfyGenres(array){
    let genreString = array.map((item)=> item.name)
    return genreString.join(', ')
}

export default (Pagination)