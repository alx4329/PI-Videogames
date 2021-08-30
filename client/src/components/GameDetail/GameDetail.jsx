import React, { useEffect, useState } from 'react';
import { bringGameToDetail } from '../../actions';
import './GameDetail.css'

import { useDispatch, useSelector } from 'react-redux';


export  function GameDetail (props){
    const id= props.match.params.id;
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        setLoading(true)
        dispatch(bringGameToDetail(id))
        .then(()=>setLoading(false))
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    let game = useSelector( state => state.GameToDetail);
    
    
        if(loading) return (<p>Loading...</p>)
        else{
            return (
                
                <div className="card">
                    
                    <h4 className="card-title">{game.name}</h4>
                    <img className="iconoClima" src={game.img} width="" height="500" alt="" />
                
                    <div>
                    <h5>Genres: {stringyfyArray(game.genres)}</h5>
                    <h5>Platforms: {stringyfyArray(game.platforms)}</h5>
                    {game.description? <h5>{game.description}</h5> : <span></span>}
                    <h5>Released: {game.released}</h5>
                    <h5>Rating: {game.rating}</h5>
                        
                    </div>
                    
                    <img className="iconoClima" src={game.img2} width="" height="500" alt="" />
                </div>
            )

        }

    
}
function stringyfyArray(array){
    // console.log(array)
    let String = array.map((item)=> item.name)
    return String.join(', ')
}
export default (GameDetail)