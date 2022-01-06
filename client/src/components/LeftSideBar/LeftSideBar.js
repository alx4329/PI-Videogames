import React, { useEffect} from 'react'; 
import { useDispatch, useSelector } from 'react-redux';

import { filtByGenre, getGenres } from '../../actions';
import './LeftSideBar.css';

export function LeftSideBar(){
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getGenres())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    function handleClick(value){
        dispatch(filtByGenre(value))
    }
    
    const genres = useSelector(state => state.Genres); 
    
    const renderGenres = genres.map((gen,index)=>{
        return (
            
            <button
                key = {index}
                onClick = {()=>handleClick(gen.name)}
                className="buttonlb"
            >
            
            {gen.name}
            
            </button>
            
        )
    })
    return (
        <div class= 'contLB'>
        <div class="dropbtn">Genres</div>
        <div class="dropdown-content">        
            {renderGenres}
        </div>
        </div>
    )
}

export default (LeftSideBar)