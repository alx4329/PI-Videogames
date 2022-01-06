import React from 'react';
import { useDispatch } from 'react-redux';
import { orderByRating, orderByAlphabet } from '../../actions/index';
import './RightSideBar.css'

export function RightSideBar(){
    const dispatch = useDispatch();




    return(
        
        <div className ='orderBy'>
            <div className="dropbtn">
                
                Sort By
                
            </div>
            <button className="buttonrb" onClick = {()=>dispatch(orderByAlphabet('ascending'))}>A-Z</button>
            <button className="buttonrb" onClick = {()=>dispatch(orderByAlphabet('descending'))}>Z-A</button>
            <button className="buttonrb" onClick = {()=>dispatch(orderByRating('RA'))}>Lowest Rating</button>
            <button className="buttonrb" onClick = {()=>dispatch(orderByRating('RD'))}>Biggest Rating </button>
        </div>
        
    )
}

export default (RightSideBar)