import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink, Route } from 'react-router-dom';
import './LoginForm.css';

import SignupFormPage from '../SignUpFormPage';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [showSignUp, setShowSignUp] = useState(false)

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  const handleDemoUser = () => {
    setCredential("Demo-lition")
    setPassword("password")
    return dispatch(sessionActions.login({
      credential: "Demo-lition",
      password: "password"
    }))
  }

  return (
    <div className="loginBox">
      <div className="loginBoxHead">
        <div className="loginLogo">
          <h2>!Quora</h2>
        </div>
        {/* <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Quora_logo_2015.svg/1200px-Quora_logo_2015.svg.png"
          alt=""
        /> */}
        <h3>A place to share knowledge and better understand the world</h3>
      </div>
      <div className="loginBoxLoginArea">
        <div className="signUpSide">
          <button className="signUpButton" onClick={() => setShowSignUp(true)}>
            Sign Up Here
          </button>
        </div>
        <div className="LoginSide">
          <form onSubmit={handleSubmit}>
            <div className="loginBox2">
              <h3>Login</h3>
              <ul>
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
              <div className="inputFields" id="inputField">
                <label htmlFor="userName">Email</label>
                <input
                  type="text"
                  value={credential}
                  placeholder="Username or Email"
                  onChange={(e) => setCredential(e.target.value)}
                  required
                />
              </div>
              <div className="inputFields">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="loginDemoButtons">
                <button onClick={handleDemoUser} className="demoButton">
                  Demo
                </button>
                <button className="submitButton" type="submit">
                  Log In
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="loginBottom">
        <a href="https://github.com/Ckessler30" target="_blank" className="gitHubChase">
          <div className="gitHubPic"></div>
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/chase-kessler-97a135221/"
          className="gitHubChase"
          target="_blank"
        >
          <div className="linkedInPic1"></div>
          LinkedIn
        </a>
      </div>
      {showSignUp && <SignupFormPage hideForm={() => setShowSignUp(false)} />}
    </div>
  );
}

export default LoginFormPage;