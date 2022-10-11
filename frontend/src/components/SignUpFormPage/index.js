import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
  
    return (
    <div className="authDiv">
        <div className='welcomeDiv'>
            <label className="welcomeTxt">
                Create an account
            </label>
        </div>
        <div className="authFormDiv">
            <form onSubmit={handleSubmit} className="authForm">
                <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
                </ul>
                <label>
                Email
                <input
                    className="txtBox"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                </label>
                <label>
                Username
                <input
                    className="txtBox"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                </label>
                <label>
                Password
                <input
                    className="txtBox"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </label>
                <input className="submitBtn" type="submit" value="Continue" />
                <input className="demoUser" type="button" value="Demo User" />
            </form>
        </div>
        <div className="signUpDiv">
            <text className="signUpBtn">Already have an account?</text>
        </div>
        <div className="registerTxtDiv">
            <text className="regiTxt">By registering, you agree that </text>
            <text className="blueTxt">Fishcord</text>
            <text className="regiTxt"> is a clone of </text>
            <text className="blueTxt">Discord</text>
        </div>
      </div>
    );
}
  
export default SignupFormPage;