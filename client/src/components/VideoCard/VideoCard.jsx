import React from 'react'; 
import { Link } from 'react-router-dom';


export function VideoCard(Properties){
    
    
    return (
        <div className ='card'>
                        <Link to = {`/videogame/${Properties.Game.id}`}>
                            <h4 className= "card-title">{Properties.Game.name}</h4>
                        </Link>
                    <div>
                        <img className='image' src={Properties.Game.img} alt ="Not  found"></img>
                        <h5>Genres: {stringyfyGenres(Properties.Game.genres)}</h5>
                    </div>
            </div>


    )
}

function stringyfyGenres(array){
    // console.log(array)
    let genreString = array.map((item)=> item.name)
    return genreString.join(', ')
}

export default (VideoCard); 