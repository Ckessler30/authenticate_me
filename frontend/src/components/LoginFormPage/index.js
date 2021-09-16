import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

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

  return (
    <div className="loginBox">
      <div className="loginBoxHead">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Quora_logo_2015.svg/1200px-Quora_logo_2015.svg.png"
          alt=""
        />
        <h3>A place to share knowledge and better understand the world</h3>
      </div>
      <div className="loginBoxLoginArea">
        <div className="signUpSide">
          <NavLink to="/signup">
            <button className="signUpButton">Sign Up Here</button>
          </NavLink>
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
                <label htmlFor="userName">UserName</label>
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
              <button className="submitButton" type="submit">
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="loginBottom">
        
        <a href="https://github.com/Ckessler30" className="gitHubChase">
        <div className="gitHubPic">

        </div>
          Chase Kessler</a>
      </div>
    </div>
  );
}

export default LoginFormPage;