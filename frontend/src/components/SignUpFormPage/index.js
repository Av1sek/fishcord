import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import './SignUpForm.css';


function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
  
    if (sessionUser) return <Redirect to="/" />;
  
    const handleSubmit = (e) => {
      e.preventDefault();
        return dispatch(sessionActions.signup({ email, username, password }))
          .catch(async (res) => {
          let data;
          try {
            data = await res.clone().json();
          } catch {
            data = await res.text(); 
          }
          if (data?.errors) setErrors(data.errors);
          else if (data) setErrors([data]);
          else setErrors([res.statusText]);
        });
    };

    const handleDemoLogin = (e) => {
        e.preventDefault()
        const demoUser = {email: 'demo@user.io', password: 'password'}
        return dispatch(sessionActions.login(demoUser))
    }
  
    return (
    <div className="bgImg">
        <div className="signUpAuthDiv">
            <div className='signUpwelcomeDiv'>
                <label className="welcomeTxt">
                    Create an account
                </label>
            </div>
            <div className="signUpauthFormDiv">
                <form onSubmit={handleSubmit} className="signUpauthForm">
                    <ul>
                    {errors.map(error => <li key={error}>{error}</li>)}
                    </ul>
                    <label>
                    Email
                    <input
                        className="signUptxtBox"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    </label>
                    <label>
                    Username
                    <input
                        className="signUptxtBox"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    </label>
                    <label>
                    Password
                    <input
                        className="signUptxtBox"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    </label>
                    <input className="signUpsubmitBtn" type="submit" value="Continue" />
                    <input className="signUpdemoUser" type="button" value="Demo User" onClick={handleDemoLogin} />
                </form>
            </div>
            <div className="signUpDiv">
                <NavLink to="/login" className="signUpBtn">Already have an account?</NavLink>
            </div>
            <div className="signUpregisterTxtDiv">
                <label className="signUpregiTxt">By registering, you agree that </label>
                <label className="signUpblueTxt">Fishcord</label>
                <label className="signUpregiTxt"> is a clone of </label>
                <label className="signUpblueTxt">Discord</label>
            </div>
        </div>
      </div>
    );
}
  
export default SignupFormPage;