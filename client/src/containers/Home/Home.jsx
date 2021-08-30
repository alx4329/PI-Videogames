import React from 'react'; 
import './Home.css';
import NavBar from '../../components/NavBar/NavBar';
import Search from '../../components/Search/Search';
import Pagination from '../Pagination/Pagination';
import RightSideBar from '../../components/RightSideBar/RightSideBar'
import { LeftSideBar } from '../../components/LeftSideBar/LeftSideBar';


export function Home(){
    return(
    <>
        <NavBar/>
        <Search/>
        <RightSideBar/>
        <Pagination/>
        <LeftSideBar/>
    </>
    )
}