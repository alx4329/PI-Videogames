import React, {useEffect, useState} from 'react'; 
import {  useDispatch, useSelector } from "react-redux";
import './Pagination.css';
import { getGames } from '../../actions/index';
import { VideoCard } from '../../components/VideoCard/VideoCard';

export function Pagination(props){
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getGames());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    const [state, setState] = useState({
        
        currentPage:(1)
    });
    
    const gamesRedux = useSelector(state => state.Games)
    const changed = useSelector(state=> state.changes)
    
    useEffect(()=>{
        
        setState({   
            currentPage:1
        }) 
        
    },[changed]);
    
    const [gamesPerPage]= useState(15);    
    
    function handleClick(event) {
        setState({
            ...state,
            currentPage:(Number(event.target.id))
        })
        
    }
    const indexOfLastGame = state.currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = gamesRedux.slice(indexOfFirstGame, indexOfLastGame);
    
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(gamesRedux.length / gamesPerPage); i++) {
        pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers.map(number => {
        return (
            <li
                className = {()=> state.currentPage ===number ? "activePage": ""}
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
                    <>{currentGames.length === 0?<p>"No games matching"</p>: currentGames.map((Game)=><VideoCard Game={Game}/>)}</>
                </ul>
            </div>
        </div>
    )

}

export default (Pagination)