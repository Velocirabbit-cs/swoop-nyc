import React from 'react';
import LandingPage from './LandingPage.jsx';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SideNav from './SideNav.jsx';
import '../styles.css'
import '../../build/calendar.css'
import CreatePost from './sidenav/CreatePost.jsx';
import Listings from './containers/Listings.jsx';
import Login from './sidenav/Login.jsx';
import Signup from './sidenav/SignUp.jsx';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { updateItems } from './reducers/swoopSlice.js';


export default function App() {
  const dispatch = useDispatch()
  const [showShareView, setShowShareView] = useState(false);

  function shareButton() {
    
  }

  return (
    <Router>
      
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/listings">View Listings</Link></li>
          <li><Link to="/createpost">Create Listing</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/listings' element={<Listings/>}></Route>
        <Route path='/createpost' element={<CreatePost/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
      </Routes>

      {/* <Share view={showShareView} /> */}
    
      <footer>
        <p>A Velocirabbit Production</p>
        <p>Jade | Jake | Jackson | Jandrew | Jdennis </p>
      </footer>

    </Router>
  )
}