import React from 'react';
import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom';
import SideNav from './SideNav.jsx';
import { useState } from 'react';


const Header = () => {
  //local component state variable to hold the menu
  const [menu, setMenu] = useState([]);
  
  //function to delete the menu div
  const removeMenu = () => {
    setMenu([]);
  }

  //function to create the side menu onClick of the Menu button
  const showMenu = () => {
    setMenu([
      <div id='sideNav'>
        <Link to='/createpost' onClick={removeMenu}>CreatePost</Link>
        <Link to='/listings' onClick={removeMenu}>Listings</Link>
        <Link to='/signup' onClick={removeMenu}>Signup</Link>
        <Link to='/login' onClick={removeMenu}>Login</Link>
      </div>
    ])
  }

  return (
    <div id='header'>
      
      <button onClick={showMenu}>
        <span className="material-symbols-outlined">menu</span>
      </button>

      <Routes>
        {/* Takes you to the login page */}
        {/* Takes you to the users profile */}
        <Route path='/user-profile/*' element></Route>
        {/* Renders the dropdown menu on the page */}
        {/* <Route path='/dropdown/*' element={<SideNav/>}></Route> */}
      </Routes>
        {menu}

    </div>
  )
}

export default Header;