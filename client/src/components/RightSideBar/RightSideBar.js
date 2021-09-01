import React from 'react';
import { useDispatch } from 'react-redux';
import { orderByRating, orderByAlphabet } from '../../actions/index';
import './RightSideBar.css'

export function RightSideBar(){
    const dispatch = useDispatch();




    return(
        
        <div className ='orderBy'>
            <div className="dropbtn">Order By</div>
            <button className="buttonlb" onClick = {()=>dispatch(orderByAlphabet('ascending'))}>A-Z</button>
            <button className="buttonlb" onClick = {()=>dispatch(orderByAlphabet('descending'))}>Z-A</button>
            <button className="buttonlb" onClick = {()=>dispatch(orderByRating('RA'))}>Lowest Rating</button>
            <button className="buttonlb" onClick = {()=>dispatch(orderByRating('RD'))}>Biggest Rating </button>
        </div>
        
    )
}

export default (RightSideBar)