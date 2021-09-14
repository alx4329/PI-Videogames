import React, { useEffect, useState } from 'react';
import { bringGameToDetail } from '../../actions';
import './GameDetail.css'

import { useDispatch, useSelector } from 'react-redux';


export function GameDetail (props){
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
    console.log(game)
        // if(game) setLoading(false);
        if(loading) {return (<p>Loading...</p>)}
        else{
            return (
                
                <div className="cardDetail">                    
                    <p className="gameTitle">{game.name}</p>

                    <div className="imageContainer">
                        <img className="imageDetail" src={game.img} width="" height="500" alt="" />
                        <img className="imageDetail" src={game.img2} width="" height="500" alt="" />

                    </div>
                
                    <div className="details">
                        <p>Genres: {stringyfyArray(game.genres)}</p>
                        <p>Platforms: {stringyfyArray(game.platforms)}</p>
                        {game.description? <p>Description: {game.description}</p> : <span></span>}
                        <p>Released: {game.released}</p>
                        <p>Rating: {game.rating}</p>
                        
                    </div>
                    
                </div>
            )

        }

    
}
function stringyfyArray(array){
    

    let String = array.map((item)=> item.name)
    return String.join(', ')
}
export default (GameDetail)