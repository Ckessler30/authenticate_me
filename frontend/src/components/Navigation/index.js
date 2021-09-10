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
     <ul className="navBar">
         <li className="navs">
             <NavLink className="navBarLinks" exact to="/">Home</NavLink>
         </li>
         <li className="navs">
             {isLoaded && sessionLinks}
         </li>
     </ul>
  );
}

export default Navigation;