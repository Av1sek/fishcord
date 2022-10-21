import React from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import './SplashPage.css';

function SplashPage() {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const btnTxt = sessionUser ? "Logout" : "Login"

    const handleLogout = e => {
        dispatch(sessionActions.logout())
    }

    return(
        <div className="splash-container">
            <div className="splash-bg">
                <div className="nav-bar">
                    <div className="nav-home">
                        <div className="logo-img">

                        </div>
                       <NavLink className="nav-home-text" to="/">Fishcord</NavLink>
                    </div>
                    <div className="secondary-nav">
                        <Link to={{ pathname: "https://github.com/Av1sek/fishcord" }} target="_blank" className="other-website">Github</Link>
                        <Link to={{ pathname: "https://www.linkedin.com/in/avisek-pandit-374096247/" }} target="_blank" className="other-website">LinkedIn</Link>
                        <Link to={{ pathname: "https://angel.co/u/avisek-pandit" }} target="_blank" className="other-website">AngelList</Link>
                    </div>
                    <div className="nav-login">
                        {sessionUser ? <NavLink onClick={handleLogout} className="nav-login-text" to="/">{btnTxt}</NavLink> : <NavLink className="nav-login-text" to="/login">{btnTxt}</NavLink> }
                    </div>
                </div>
                <div className="splash-text">
                    <h1>IMAGINE A PLACE...</h1>
                    <p>...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</p>
                </div>
                <div className="nav-open-fishcord">
                        {sessionUser ? <NavLink className="nav-open-fishcord-text" to="/servers/1">Open Fishcord</NavLink> : <NavLink className="nav-open-fishcord-text" to="/login">Open Fishcord</NavLink> }
                </div>
            </div>
            <div className='splash-blue-line'></div>
            <div className="splash-invite-only">
                <div className="splash-invite-img">

                </div>
                <div className="splash-invite-text">
                    <h1>
                        Create an
                    </h1>
                    <h1>
                        invite-only
                    </h1>
                    <h1>
                        place where you
                    </h1>
                    <h1>
                        belong
                    </h1>
                    <p>Fishcord servers are organized into topic-based channels where you can collaborate, share,
                        and just talk about your day without clogging up a group chat.</p>
                </div>
            </div>
        </div>
    )
}

export default SplashPage;

<div className="container">
    <div className="text">
        <h1>TEXT</h1>
        <button></button>
    </div>
    <div className="img">
        <img></img>
    </div>
</div>