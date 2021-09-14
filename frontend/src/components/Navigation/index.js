import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink className="navBarLinks" to="/login">Log In</NavLink>
        <NavLink className="navBarLinks" to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className="navBar1">
     <ul className="navBar">
       <li className="navs">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Quora_logo_2015.svg/1200px-Quora_logo_2015.svg.png" alt="" />
       </li>
       <li className="navs">
        <NavLink exact to="/">
          <i className="fas fa-home"></i>
        </NavLink>
       </li>
       <li className="navs">
        <NavLink to="/">
          <i className="fas fa-list-alt"></i>
        </NavLink>
       </li>
       <li className="navs">
        <NavLink to="/">
          <i className="fas fa-edit"></i>
        </NavLink>
       </li>
       <li className="navs">
        <NavLink to="/">
          <i className="fas fa-users"></i>
        </NavLink>
       </li>
       <li className="navs">
        <NavLink to="/">
          <i className="fas fa-bell"></i>
        </NavLink>
       </li>
       <li className="navs">
        <input type="text" placeholder="Search..." />
       </li>
       <li className="navs">
        {isLoaded && sessionLinks}
       </li>
        <li className="navs">
        <NavLink to="/">
          <i className="fas fa-globe"></i>
        </NavLink>
       </li>
       <li className="navs">
         <button>Ask Question</button>
       </li>
     </ul>
    </div>
  );
}

export default Navigation;