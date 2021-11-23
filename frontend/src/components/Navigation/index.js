import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

import CreateQuestionForm from '../CreateQuestion';
import SearchBar from '../SearchBar';

function Navigation({ isLoaded  }){
  
  const sessionUser = useSelector(state => state.session.user);

  const [showForm, setShowForm] = useState(false);

  const [searchInputVal, setSearchInputVal] = useState('')



  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  }

  return (
    <div className="navBar1">
      <ul className="navBar">
        <li className="navs">
          <NavLink to="/">
            <div className="logoBox">
              <h2>!Quora</h2>
              {/* <img
                src="/images/157364-abstract-red-background-vector-illustration.jpg"
                alt=""
              /> */}
            </div>
          </NavLink>
        </li>
        <li className="navs">
          <NavLink exact to="/">
            <i className="fas fa-home"></i>
          </NavLink>
        </li>
        <li className="navs">
          <NavLink to="/working-on-it">
            <i className="fas fa-list-alt"></i>
          </NavLink>
        </li>
        <li className="navs">
          <NavLink to="/working-on-it">
            <i className="fas fa-edit"></i>
          </NavLink>
        </li>
        <li className="navs">
          <NavLink to="/working-on-it">
            <i className="fas fa-users"></i>
          </NavLink>
        </li>
        <li className="navs">
          <NavLink to="/working-on-it">
            <i className="fas fa-bell"></i>
          </NavLink>
        </li>
        <li className="navs">
          <SearchBar />
          {/* <label htmlFor="search">Search</label>
          <input type="text" placeholder="Search..." value={searchInputVal} onChange={(e) => setSearchInputVal(e.target.value)}/> */}
        </li>
        <li className="navs">{isLoaded && sessionLinks}</li>
        <li className="navs">
          <NavLink to="/working-on-it">
            <i className="fas fa-globe"></i>
          </NavLink>
        </li>
        <li className="navs">
          <button onClick={() => setShowForm(true)}>Ask Question</button>
        </li>
      </ul>
      {sessionUser && (
        <div>
          {showForm && (
            <CreateQuestionForm hideForm={() => setShowForm(false)} />
          )}
        </div>
      )}
    </div>
  );
}

export default Navigation;