/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import { BRING_GAMES, GET_GAMES,TO_DETAIL, ORD_RA, ORD_ALPH, GET_GENRES, FILTER_by_GENRE, SEARCH_GAME, GET_PLATFORMS } from "../actions";


export const initialState = {
    AllGames: [],
    Games:[],
    Genres:[],
    Platforms:[],
    GameToDetail:[],
    created: [],
    changes: false
}

export function rootReducer(state = initialState, action){
    if( action.type === GET_GAMES){
        return {
            ...state,
            AllGames: action.payload,
            Games: action.payload,
            changes: !state.changes
        }
    }
    if (action.type === SEARCH_GAME){
        return {
            ...state,
            AllGames: action.payload,
            Games: action.payload,
            changes: !state.changes
        }
    }
    if(action.type === TO_DETAIL){
        return {
            ...state,
            GameToDetail: action.payload
        }
    }
    if(action.type === BRING_GAMES){
        if(action.payload === 'created') {            
            
        let games = state.AllGames.filter((item)=> (item.creadoPorUsuario))
        return {
            ...state,
            Games: games,
            changes: !state.changes
                };
            } else { 
                let games = state.AllGames.filter((item)=> (!item.creadoPorUsuario))
                return {
                    ...state,
                    Games: games,
                    changes: !state.changes
                        };
        }
    }


    if( action.type === ORD_ALPH){
        let games = state.AllGames;     
        // console.log(games[0].name)
        if (action.payload=== 'ascending'){
            let ordered = orderByString(games,'name',1);
            // console.log(ordered[0])
            
            return {
                ...state,
                AllGames: ordered,
                changes: !state.changes
            }
        } else {
            let ordered = orderByString(games,'name',-1);
            // console.log(ordered[0])
            return {
                ...state,
                AllGames:ordered,
                changes: !state.changes
            }
        }
    }
    
    if (action.type === ORD_RA){        
        let games = state.AllGames;
        if (action.payload === 'RA'){
            orderByNumber(games,'rating',1,true)
            return {
                ...state,
                Games: games,           
                changes: !state.changes
            }}
        else {            
            orderByNumber(games,'rating',-1,true)
            return {
                ...state,
                Games: games,           
                changes: !state.changes
            }
        }
    }

    if(action.type === GET_GENRES){
        return{
            ...state,
            Genres: action.payload
        }
    }
    if(action.type === GET_PLATFORMS){
        return{
            ...state,
            Platforms: action.payload
        }
    }

    if (action.type === FILTER_by_GENRE){
        const games = state.AllGames;        
        let filtered = []; 
        
        let filtering = games.map((game)=>{
            // eslint-disable-next-line array-callback-return
            game.genres.map((gen)=>{
                if(gen.name === action.payload) filtered.push(game)
            })
        })
        
        
        return {
            ...state,
            Games: filtered
        };
    }
    
    return state;
}

function orderByString(array,property,sortOrder,ignoreCase){
    if (sortOrder!==-1 && sortOrder!==1) sortOrder=1;
    return array.sort(function(a,b){
        var stringA=a[property],stringB=b[property];
        // Si un valor es null o undefined, se convierte a cadena vacía.
        if (stringA===null) stringA = '';
        if (stringB===null) stringB = '';
        // Si ignoreCase es true, se convierten ambas variables a minúsculas.
        if (ignoreCase===true){stringA=stringA.toLowerCase();stringB=stringB.toLowerCase()}
        var res = 0;
        if (stringA<stringB) res = -1;
        else if (stringA>stringB) res = 1;
        return res*sortOrder;
    })
}

function orderByNumber (array, property,sortOrder){
    // Primero se verifica que la propiedad sortOrder tenga un dato válido.
    if (sortOrder!==-1 && sortOrder!==1) sortOrder=1;
    array.sort(function(a,b){
        // La función de ordenamiento devuelve la comparación entre property de a y b.
        // El resultado será afectado por sortOrder.
        return (a[property]-b[property])*sortOrder;
    })
}
export default rootReducer;