import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../img/videogame.png'

import './Navbar.css';

export default function NavBar() {
    return (
        <header className="navbar">
            <div>
                <img id="logoGames" src={Logo} width="40" height="40" alt="" />
            </div>
            <nav>
                <ul className="list">
                    <li className="list-item">
                        <NavLink exact to="/create" >Create</NavLink>
                        </li>
                        <li className="list-item">
                        <NavLink exact to="/" >Home</NavLink>
                    
                    </li>
                </ul>
            </nav>
        </header>
    )
}