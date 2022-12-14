import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ email, password }))
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
  }

    const handleDemoLogin = (e) => {
        e.preventDefault()
        const demoUser = {email: 'demo@user.io', password: 'password'}
        return dispatch(sessionActions.login(demoUser))
    }

  return (
    <div className="bgImg">
        <div className="authDiv">
            <div className='welcomeDiv'>
                <label className="welcomeTxt">
                    Welcome back!
                </label>
                <label className="fillerTxt">
                    We're so excited to see you again!
                </label>
            </div>
            <div className="authFormDiv">
                <form onSubmit={handleSubmit} className="authForm">
                <label className="emailLabel">
                    {(errors[0]) ? "EMAIL - " + errors[0] : "EMAIL"}
                    <input
                    className="txtBox"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </label>
                <label className="passwordLabel">
                    {(errors[0]) ? "PASSWORD - " + errors[0] : "PASSWORD"}
                    <input
                    className="txtBox"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </label>
                <input className="submitBtn" type="submit" value="Log In" />
                </form>
            </div>
            <div className="registerDiv">
                <label>Need an account? <NavLink to="/signup" className="registerBtn">Register</NavLink></label>
            </div>
            <div className="demoUserDiv">
                <div className="demoUserPfp">
                </div>
                <input className="signInDemoUser" type="button" value="Demo User" onClick={handleDemoLogin} />
                <label className="demoSignInText">SIGN IN AS A DEMO USER</label>
            </div>
        </div>
    </div>
  );
} 

export default LoginFormPage;