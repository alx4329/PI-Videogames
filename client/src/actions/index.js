import fetch from "node-fetch"; 
import axios from 'axios';
export const SEARCH_GAME = 'SEARCH_GAME'
export const GET_GAMES = 'GET_GAMES'
export const TO_DETAIL = 'TO_DETAIL'
export const BRING_GAMES = 'BRING_GAMES'
export const ORD_ALPH = 'ORD_ALPH'
export const ORD_RA = 'ORD_RA'
export const GET_GENRES = 'GET_GENRES'
export const GET_PLATFORMS = 'GET_PLATFORMS'
export const FILTER_by_GENRE = 'FILTER_by_GENRE'
export const CREATE_GAME = 'CREATE_GAME'

export function getGames(game){
    if(game){
        return async function (dispatch){
            return await axios.get(`/videogames?game=${game}`)
            .then(res=>{
                dispatch({
                    type:SEARCH_GAME,
                    payload:res.data
                })
            })
        }
    } else {
        return async function(dispatch){
            return await axios.get(`/videogames?game=${game}`)
            .then(res=>{
                dispatch({
                    type:GET_GAMES,
                    payload:res.data
                })
            })
        }
    }
}

export function bringGameToDetail(id){
    return async function(dispatch){
        return await axios.get(`/videogame/${id}`)
        .then(res=>{
            dispatch({
                type:TO_DETAIL,
                payload:res.data
            })
        })
    }
}

export function bringGames(option){
    return function(dispatch){        
                dispatch({ type: BRING_GAMES,
                payload: option });} 
            }; 
            

export function orderByAlphabet(op){
    return function (dispatch){
        return dispatch({
            type: ORD_ALPH,
            payload:op
        })
        }
    }

export function orderByRating(op){
    return function (dispatch){
        return dispatch({
            type: ORD_RA, 
            payload:op
        })
    }
}

export function getGenres(){
    return async function(dispatch){
        return await axios.get(`/genres`)
        .then(res=>{
            dispatch({
                type:GET_GENRES,
                payload:res.data
            })
        })
    }
}

export function filtByGenre(value){
    return function(dispatch){
        dispatch({ type: FILTER_by_GENRE,
            payload: value
        })
    }
}; 

export function getPlats(){
    return async function(dispatch){
        return await axios.get(`/platforms`)
        .then(res=>{
            dispatch({
                type:GET_PLATFORMS,
                payload:res.data
            })
        })
    }
}

export function postNewGame(state){
    return function(dispatch){
        axios.post(`/videogame`)
        .then(res=>{
            dispatch({ type: CREATE_GAME,
                        payload: res.data  })
        })
        .catch(err => {
            return err
        })
    }

}