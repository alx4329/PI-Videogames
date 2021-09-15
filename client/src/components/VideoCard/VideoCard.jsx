import React from 'react'; 
import { Link } from 'react-router-dom';
import './VideoCard.css'
import defImg from '../../img/defaultImg.jpg'

export function VideoCard(Properties){
    
    
    return (
        <div className ='card'>
                        <Link className= "card-title" to = {`/videogame/${Properties.Game.id}`}>
                            <p >{Properties.Game.name}</p>
                        </Link>
                         {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                        <img className='image' src={Properties.Game.img?Properties.Game.img:defImg} alt="No image"/>
                        <div className="rating">{Properties.Game.rating}</div> 
                        <p>{stringyfyGenres(Properties.Game.genres)}</p>
                    
            </div>


    )
}

function stringyfyGenres(array){
    // console.log(array)
    let genreString = array.map((item)=> item.name)
    return genreString.join(', ')
}

export default (VideoCard); 