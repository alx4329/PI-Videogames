import React from 'react'; 
import './Home.css';

import Search from '../../components/Search/Search';
import Pagination from '../Pagination/Pagination';
import RightSideBar from '../../components/RightSideBar/RightSideBar'
import { LeftSideBar } from '../../components/LeftSideBar/LeftSideBar';


export function Home(){
    return(
    <>        
        <Search/>
        <RightSideBar/>
        <Pagination/>
        <LeftSideBar/>
    </>
    )
}