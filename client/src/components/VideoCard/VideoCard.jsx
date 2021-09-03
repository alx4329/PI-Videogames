import React from 'react'; 
import { Link } from 'react-router-dom';
import './VideoCard.css'


export function VideoCard(Properties){
    
    
    return (
        <div className ='card'>
                        <Link to = {`/videogame/${Properties.Game.id}`}>
                            <p className= "card-title">{Properties.Game.name}</p>
                        </Link>
                    
                        <img className='image' src={Properties.Game.img} alt ="Not  found"></img>
                        <p>Genres: {stringyfyGenres(Properties.Game.genres)}</p>
                    
            </div>


    )
}

function stringyfyGenres(array){
    // console.log(array)
    let genreString = array.map((item)=> item.name)
    return genreString.join(', ')
}

export default (VideoCard); 