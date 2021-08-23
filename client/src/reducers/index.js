import { GET_GAMES,TO_DETAIL } from "../actions";


export const initialState = {
    AllGames: [],
    Games:[],
    Genres:[],
    Platforms:[],
    GameToDetail:[],
    created: [],
}

export function rootReducer(state = initialState, action){
    if( action.type === GET_GAMES){
        return {
            ...state,
            AllGames: action.payload,
            Games: action.payload
        }
    }
    if(action.type === TO_DETAIL){
        return {
            ...state,
            GameToDetail: action.payload
        }
    }
    return state;
}

export default rootReducer;