import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './HomePage.css';

function HomePage() {

    return(
        <div>
            <div className="splashBgImg">
                <div className="navBar">
                    <div className="splashLogo"></div>
                    <div className="homeLink"><NavLink className="homeLink" to="/">Fishcord</NavLink> </div>
                    <NavLink className="githubLink" to="/">Github</NavLink>
                    <NavLink className="linkedinLink" to="/">LinkedIn</NavLink>
                </div>
            </div>
        </div>
    )
}

export default HomePage;