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
            <ul>
            <button
                key = {index}
                onClick = {()=>handleClick(gen.name)}
                className="buttonlb"
            ><strong>

            {gen.name}
            </strong>
            </button>
            </ul>
        )
    })
    return (
        <div className= 'contLB'>
            {renderGenres}
        </div>
    )
}

export default (LeftSideBar)