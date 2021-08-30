import React from 'react';
import { useDispatch } from 'react-redux';
import { orderByRating, orderByAlphabet } from '../../actions/index';
import './RightSideBar.css'

export function RightSideBar(){
    const dispatch = useDispatch();




    return(
        
        <div className ='orderBy'>
            <h3 id="titleRB">Order By</h3>
            <button className="button" onClick = {()=>dispatch(orderByAlphabet('ascending'))}>A-Z</button>
            <button className="button" onClick = {()=>dispatch(orderByAlphabet('descending'))}>Z-A</button>
            <button className="button" onClick = {()=>dispatch(orderByRating('RA'))}>Lowest Rating</button>
            <button className="button" onClick = {()=>dispatch(orderByRating('RD'))}>Biggest Rating </button>
        </div>
        
    )
}

export default (RightSideBar)