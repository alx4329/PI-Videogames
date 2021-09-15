import React, { useEffect, useState } from 'react';
import { bringGameToDetail } from '../../actions';
import './GameDetail.css';
import Loading from '../../img/LoadingCar.gif'
import defImg from '../../img/defaultImg.jpg'

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
        
    // eslint-disable-next-line jsx-a11y/alt-text
    if(loading) {return (
            <div className="cardDetail">
                {/*  eslint-disable-next-line jsx-a11y/alt-text */}
                <img className="Loading" src={Loading}/>

            </div>
            )}
    else{
        return (
            
            <div className="cardDetail">                    
                <p className="gameTitle">{game.name}</p>
                <div className="details">
                    <div className="subtitle">
                        <p>Released: {game.released}</p>
                        <p>Rating: {game.rating}</p>
                    </div>
                    <p >Genres: {stringyfyArray(game.genres)}</p>
                    <p >To play on: {stringyfyArray(game.platforms)}</p>

                </div>
                <div className="description">
                    {game.description? <p>Description: {game.description}</p> : <span></span>}
                    
                </div>

                <div className="imageContainer">
                    <img className="imageDetail" src={game.img? game.img:defImg}  alt="" />
                    
                    {game.img2?<img className="imageDetail" src={game.img2}  alt="" />:""}

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