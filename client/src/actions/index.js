import fetch from "node-fetch"; 

export const SEARCH_GAME = 'SEARCH_GAME'
export const GET_GAMES = 'GET_GAMES'
export const TO_DETAIL = 'TO_DETAIL'



export function getGames(game){
    if(game){
        return async function(dispatch){
            return fetch(`http://localhost:3001/videogames?name=${game}`)
            .then(response => response.json())
                    .then(json => {                        
                        dispatch({ type: SEARCH_GAME,
                        payload: json  });
                        });
        }
    } else {
        return async function(dispatch){
            return fetch("http://localhost:3001/videogames")
                .then(response => response.json())
                .then(json => {
                    dispatch({ type: GET_GAMES,
                    payload: json  });
                    });
        }
    }
}

export function bringGameToDetail(id){
    return function(dispatch){
        return fetch(`http://localhost:3001/videogames/${id}`)
            .then(response => response.json())
                        .then(json => {
                            dispatch({ type: TO_DETAIL,
                            payload: json  });
                            });
    }
}